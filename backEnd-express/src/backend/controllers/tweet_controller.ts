import * as express from "express";
import * as joi from "joi";

import { getTweetRepository }   from "../repositories/tweet_repository";
import { getLikeRepository }    from "../repositories/like_repository";
import { getCommentRepository } from "../repositories/comment_repository";
import { authMiddleware }       from "../middleware/auth_middleware";


interface TweetWithComments {
    id: number;
    title: string;
    content: string;
    date: string;
    imageUrl: string;
    referenceUser: {
        id: number;
        email: string;
        password: string;
        name: string;
        bio: string;
        pic: string;
    },
    comments: any;
}


export function getTweetController() {

    const tweetRepository   = getTweetRepository();
    const likeRepository    = getLikeRepository();
    const commentRepository = getCommentRepository();

    const router = express.Router();

    const tweetDetailsSchema = {
        referenceUser: joi.number(),
        content:       joi.string(),
        title:         joi.string().allow('', null),
        imageUrl:      joi.string().allow('', null)
    };

    const likeDetailsSchema = {
        referenceUser: joi.number(),
        referenceTweet: joi.number(),
        is_positive:    joi.boolean()
    };


    // // Return all tweets
    // // Is public: YES
    // // HTTP GET http://localhost:8080/api/v1/tweets
    router.get("/", (req, res) => {
        (async () => {
            const tweets = await tweetRepository.find({
                relations: ["referenceUser"]
            });
            res.json(tweets);
        })();
    });


    // Return all tweets and its comments
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/tweets/tweetsWithComments
    router.get("/tweetsWithComments", (req, res) => {
        (async () => {
            const tweets = await tweetRepository.find({
                relations: ["referenceUser"]
            });
            let tweetsIds = tweets.map(tweet => tweet.id)
            const len = tweetsIds.length
            var i = 0
            var tweetsWithComments = [];
            for ( ; i < len; i++) {
                const id = tweetsIds[i];
                const tweet  = await tweetRepository.findOne(
                    id,
                    {
                        relations: ["referenceUser"]
                    });
                const _comments = await commentRepository.find({
                    where: {
                        referenceTweet: { id: id },
                    },
                    relations: ["referenceUser", "referenceTweet"]
                });
                if (tweet === undefined) {
                    res.status(404)
                       .json({ error: "Not found"})
                       .send();
                } else {
                    const tweet_comments: TweetWithComments = {
                        id: tweet.id,
                        title: tweet.title,
                        content: tweet.content,
                        date: tweet.date,
                        imageUrl: tweet.imageUrl,
                        referenceUser: {
                            id: tweet.referenceUser.id,
                            email: tweet.referenceUser.email,
                            password: tweet.referenceUser.password,
                            name: tweet.referenceUser.name,
                            bio: tweet.referenceUser.bio,
                            pic: tweet.referenceUser.pic,
                        },
                        comments: _comments
                    }
                    // const tweet_comments = [tweet, {comments: comments}];
                    tweetsWithComments.push(tweet_comments);
                    // res.json(tweet_comments);
                }
            } 
            res.json(tweetsWithComments);
        })();
    });


    // Returns a tweet and its comments
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/tweets/1
    router.get("/:id", (req, res) => {
        (async () => {
            const id = req.params.id;
            const tweet  = await tweetRepository.findOne(
                id,
                {
                    relations: ["referenceUser"]
                });
            const _comments = await commentRepository.find({
                where: {
                    referenceTweet: { id: req.params.id },
                },
                relations: ["referenceUser", "referenceTweet"]
            });            
            if (tweet === undefined) {
                res.status(404)
                    .json({ error: "Not found"})
                    .send();
            } else {
                const tweet_comments: TweetWithComments = {
                    id: tweet.id,
                    title: tweet.title,
                    content: tweet.content,
                    date: tweet.date,
                    imageUrl: tweet.imageUrl,
                    referenceUser: {
                        id: tweet.referenceUser.id,
                        email: tweet.referenceUser.email,
                        password: tweet.referenceUser.password,
                        name: tweet.referenceUser.name,
                        bio: tweet.referenceUser.bio,
                        pic: tweet.referenceUser.pic,
                    },
                    comments: _comments
                }
                // const tweet_comments = [tweet, {comments: comments}];
                res.json(tweet_comments);
            }
        })();
    });


    // Returns all comments for a given tweet
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/tweets/comments/1
    router.get("/comments/:id", (req, res) => {
        (async () => {
            const id = req.params.id;
            const comments = await commentRepository.find({
                where: {
                    referenceTweet: { id: req.params.id },
                },
                relations: ["referenceUser", "referenceTweet"]
            });
            res.json(comments);
        })();
    });


    // Creates a new tweet
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/tweets
    router.post("/", authMiddleware, (req, res) => {
        (async () => {
            // // // const userId = (req as any).userId;
            const newTweet = req.body;
            // Input validation
            const result  = joi.validate(newTweet, tweetDetailsSchema);
            if (result.error) {
                res.status(400).send({msg: "The tweet entered does not have the right format"});
            } else {
                const tweet = await tweetRepository.save(newTweet);
                // Return the new tweet
                res.json(tweet);
            }
        })();
    });


    // Deletes a tweet by ID
    // Is public: NO
    // HTTP DELETE http://localhost:8080/api/v1/tweets/:id
    router.delete("/:tweetID", authMiddleware, (req, res) => {
        (async () => {
            console.log(req);
            const tweetID = req.params.tweetID;
            const userID = (req as any).userId;

            const tweet = await tweetRepository.findOne(
                tweetID,
                {
                    relations: ["referenceUser"]
                });
            // An error 404 is thrown if the tweet is not found
            if (!tweet) {
                res.status(404).send({msg: "There is no tweet with the specified id"});
            } else {
                // A user is not be able to delete a tweet if he is not the owner of the tweet:
                if (tweet.referenceUser.id != userID){
                    res.status(403).send({msg: "This tweet does not belong to you, so you can not delete it"});
                }
                else{
                    // Delete Comments related to the tweet
                    await commentRepository.delete({
                            referenceTweet: { id: tweetID }
                    });
                    
                    // Delete likes related to the tweet
                    await likeRepository.delete({
                        referenceTweet: { id: tweetID }
                    });

                    // Delete the tweet
                    await tweetRepository.delete(tweetID);

                    // Return the deleted tweet
                    res.json(tweet);
                }
            }
        })();
    });


    // like tweets
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/tweets/:id/like
    router.post("/:id/like", authMiddleware, (req, res) => {
        (async () => {
            const newLike = {
                referenceUser: (req as any).userId,
                referenceTweet: req.params.id,
                is_positive: true
            };
            // Input validation
            const result = joi.validate(newLike, likeDetailsSchema);
            if (result.error) {
                res.status(400).send({msg: "The like entered does not have the right format"});
            } else {
                const likes = await likeRepository.findOne({
                    where: {
                        referenceTweet: { id: req.params.id   },
                        referenceUser: { id: (req as any).userId, }
                    },
                    relations: ["referenceTweet", "referenceUser"]
                });
                console.log(likes);
                if (!likes){
                    await likeRepository.save(newLike);
                    res.json(newLike);
                }
                else{
                    // A user is not be able to like the same tweet multiple times
                    res.status(403).send({msg: "You have already liked for this tweet"});
                }
            }
        })();
    });


    // // // // // // // // // // // // // // // // // // // // 
    // Downlikes tweet
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/tweets/:id/downlike
    router.post("/:id/downlike", authMiddleware, (req, res) => {
        (async () => {
            const newLike = {
                referenceUser: (req as any).userId,
                referenceTweet: req.params.id,
                is_positive: false
            };
            // Input validation
            const result = joi.validate(newLike, likeDetailsSchema);
            if (result.error) {
                res.status(400).send({msg:"The like entered doesn't have the right format"});
            } else {
                const likes = await likeRepository.findOne({
                    where: {
                        referenceTweet: { id: req.params.id   },
                        referenceUser: { id: (req as any).userId, }
                    },
                    relations: ["referenceTweet", "referenceUser"]
                });
                console.log(likes);
                if (!likes){
                    await likeRepository.save(newLike);
                    res.json(newLike);
                }
                else{
                    // A user is not be able to like the same tweet multiple times
                    res.status(403).send({msg: "You have already liked for this tweet"});
                }
            }
        })();
    });
    // // // // // // // // // // // // // // // // // // // // 


    return router;

}