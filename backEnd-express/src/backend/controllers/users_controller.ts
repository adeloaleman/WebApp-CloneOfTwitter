import * as express from "express";
import * as joi from "joi";

import { getUserRepository }    from "../repositories/users_repository";
import { getTweetRepository }    from "../repositories/tweet_repository";
import { getCommentRepository } from "../repositories/comment_repository";


interface UserDetails{
    id: number;
    email: string;
    name: string;
    bio: string;
    pic: string;
    tweetsWithComments: TweetWithComments[]
}

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


export function getUserController() {

    const userRepository    = getUserRepository();
    const tweetRepository    = getTweetRepository();
    const commentRepository = getCommentRepository();

    const router = express.Router();

    const userDetailsSchema = {
        email: joi.string().email(),
        password: joi.string(),
        name: joi.string().allow('', null),
        bio: joi.string().allow('', null),
        pic: joi.string().allow('', null),
    };


    // Creates a new user account
    // Is public: YES
    // HTTP POST http://localhost:8080/api/v1/users
    router.post("/", (req, res) => {
        (async () => {
            const newUser = req.body;
            // Input validation
            const result = joi.validate(newUser, userDetailsSchema);
            if (result.error) {
                res.status(400).send({msg: "The user entered does not have the right format"});
            } else {
                const emailAlreadyUsed = await userRepository.findOne({
                    where: {
                        email: newUser.email
                    }
                });
                // An error 400 is returned if the user email is already used by another account
                if (emailAlreadyUsed) {
                    res.status(400).send({msg: "The email entered is alreday used by anothe account"});
                }else{
                    const user = await userRepository.save(newUser);
                    // Return the new user
                    // res.json(user);
                    res.json(user).send();
                }
            }
        })();
    });


    // Returns all users
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/users
    router.get("/", (req, res) => {
        (async () => {
            const users = await userRepository.find();
            res.json(users);
        })();
    });



    // Returns a user with all its activity (tweets and comments)
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/users/1
    router.get("/:id", (req, res) => {
        (async () => {
            const id = req.params.id;
            const user = await userRepository.findOne(id);
            // It returns an error 404 if the user is not found
            if (!user) {
                res.status(404).send({msg: "There is no user with the specified id"});
            }else{
                const tweets = await tweetRepository.find({
                    where: {
                        referenceUser: { id: req.params.id },
                    },
                    relations: ["referenceUser"]
                });
                let tweetsIds = tweets.map(tweet => tweet.id)
                const len = tweetsIds.length
                var i = 0
                var _tweetsWithComments = [];
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
                                pic: tweet.referenceUser.pic
                            },
                            comments: _comments
                        }
                        // const tweet_comments = [tweet, {comments: comments}];
                        _tweetsWithComments.push(tweet_comments);
                        // res.json(tweet_comments);
                    }
                }
                const userDetails: UserDetails = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    bio: user.bio,
                    pic: user.pic,
                    tweetsWithComments: _tweetsWithComments
                }
                res.json(userDetails);
            }
        })();
    });


    // Return user details
    // Is public: YES
    // HTTP POST http://localhost:8080/api/v1/auth/login
    // router.post("/details", (req, res) => {
    //     (async () => {
    //         const userDetails = req.body;
    //         // Input validation
    //         const result = joi.validate(userDetails, userDetailsSchema);
    //         if (result.error) {
    //             res.status(400).send({msg: "The user entered does not have the right format"});
    //         } else {
    //             const match = await userRepository.findOne(userDetails);
    //             if (match === undefined) {
    //                 res.status(401).send({msg: "Unauthorized access. Email or Password incorrect"});
    //             } else {
    //                 if (AUTH_SECRET === undefined) {
    //                     res.status(500).send({msg: "Internal server error"});
    //                 } else {
    //                     const token = jwt.sign({ id: match.id }, AUTH_SECRET);
    //                     // Returns an JWT auth token
    //                     res.json({ token: token }).send();
    //                 }
    //             }
    //         }
    //     })();
    // });


    // // Returns a user with all its activity (tweets and comments)
    // // Is public: YES
    // // HTTP GET http://localhost:8080/api/v1/users/1
    // router.get("/:id", (req, res) => {
    //     (async () => {
    //         const id = req.params.id;
    //         const user = await userRepository.findOne(id);
    //         // It returns an error 404 if the user is not found
    //         if (!user) {
    //             res.status(404).send({msg: "There is no user with the specified id"});
    //         }else{
    //             const tweets = await tweetRepository.find({
    //                 where: {
    //                     referenceUser: { id: req.params.id },
    //                 },
    //                 relations: ["referenceUser"]
    //             });
    //             const comments = await commentRepository.find({
    //                 where: {
    //                     referenceUser: { id: req.params.id },
    //                 },
    //                 relations: ["referenceUser", "referenceTweet"]
    //             });
    //             const user_tweet_comments = [user , tweets, comments];
    //             res.json(user_tweet_comments);
    //         }
    //     })();
    // });

    
    return router;

}
