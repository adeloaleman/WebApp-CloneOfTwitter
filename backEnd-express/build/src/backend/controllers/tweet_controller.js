"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var joi = __importStar(require("joi"));
var tweet_repository_1 = require("../repositories/tweet_repository");
var like_repository_1 = require("../repositories/like_repository");
var comment_repository_1 = require("../repositories/comment_repository");
var auth_middleware_1 = require("../middleware/auth_middleware");
function getTweetController() {
    var _this = this;
    var tweetRepository = tweet_repository_1.getTweetRepository();
    var likeRepository = like_repository_1.getLikeRepository();
    var commentRepository = comment_repository_1.getCommentRepository();
    var router = express.Router();
    var tweetDetailsSchema = {
        referenceUser: joi.number(),
        content: joi.string(),
        title: joi.string().allow('', null),
        imageUrl: joi.string().allow('', null)
    };
    var likeDetailsSchema = {
        referenceUser: joi.number(),
        referenceTweet: joi.number(),
        is_positive: joi.boolean()
    };
    // // Return all tweets
    // // Is public: YES
    // // HTTP GET http://localhost:8080/api/v1/tweets
    router.get("/", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var tweets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tweetRepository.find({
                            relations: ["referenceUser"]
                        })];
                    case 1:
                        tweets = _a.sent();
                        res.json(tweets);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Return all tweets and its comments
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/tweets/tweetsWithComments
    router.get("/tweetsWithComments", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var tweets, tweetsIds, len, i, tweetsWithComments, id, tweet, _comments, tweet_comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tweetRepository.find({
                            relations: ["referenceUser"]
                        })];
                    case 1:
                        tweets = _a.sent();
                        tweetsIds = tweets.map(function (tweet) { return tweet.id; });
                        len = tweetsIds.length;
                        i = 0;
                        tweetsWithComments = [];
                        _a.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 6];
                        id = tweetsIds[i];
                        return [4 /*yield*/, tweetRepository.findOne(id, {
                                relations: ["referenceUser"]
                            })];
                    case 3:
                        tweet = _a.sent();
                        return [4 /*yield*/, commentRepository.find({
                                where: {
                                    referenceTweet: { id: id },
                                },
                                relations: ["referenceUser", "referenceTweet"]
                            })];
                    case 4:
                        _comments = _a.sent();
                        if (tweet === undefined) {
                            res.status(404)
                                .json({ error: "Not found" })
                                .send();
                        }
                        else {
                            tweet_comments = {
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
                            };
                            // const tweet_comments = [tweet, {comments: comments}];
                            tweetsWithComments.push(tweet_comments);
                            // res.json(tweet_comments);
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        res.json(tweetsWithComments);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Returns a tweet and its comments
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/tweets/1
    router.get("/:id", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, tweet, _comments, tweet_comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, tweetRepository.findOne(id, {
                                relations: ["referenceUser"]
                            })];
                    case 1:
                        tweet = _a.sent();
                        return [4 /*yield*/, commentRepository.find({
                                where: {
                                    referenceTweet: { id: req.params.id },
                                },
                                relations: ["referenceUser", "referenceTweet"]
                            })];
                    case 2:
                        _comments = _a.sent();
                        if (tweet === undefined) {
                            res.status(404)
                                .json({ error: "Not found" })
                                .send();
                        }
                        else {
                            tweet_comments = {
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
                            };
                            // const tweet_comments = [tweet, {comments: comments}];
                            res.json(tweet_comments);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Returns all comments for a given tweet
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/tweets/comments/1
    router.get("/comments/:id", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, commentRepository.find({
                                where: {
                                    referenceTweet: { id: req.params.id },
                                },
                                relations: ["referenceUser", "referenceTweet"]
                            })];
                    case 1:
                        comments = _a.sent();
                        res.json(comments);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Creates a new tweet
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/tweets
    router.post("/", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newTweet, result, tweet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTweet = req.body;
                        result = joi.validate(newTweet, tweetDetailsSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.status(400).send({ msg: "The tweet entered does not have the right format" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, tweetRepository.save(newTweet)];
                    case 2:
                        tweet = _a.sent();
                        // Return the new tweet
                        res.json(tweet);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    });
    // Deletes a tweet by ID
    // Is public: NO
    // HTTP DELETE http://localhost:8080/api/v1/tweets/:id
    router.delete("/:tweetID", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var tweetID, userID, tweet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req);
                        tweetID = req.params.tweetID;
                        userID = req.userId;
                        return [4 /*yield*/, tweetRepository.findOne(tweetID, {
                                relations: ["referenceUser"]
                            })];
                    case 1:
                        tweet = _a.sent();
                        if (!!tweet) return [3 /*break*/, 2];
                        res.status(404).send({ msg: "There is no tweet with the specified id" });
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(tweet.referenceUser.id != userID)) return [3 /*break*/, 3];
                        res.status(403).send({ msg: "This tweet does not belong to you, so you can not delete it" });
                        return [3 /*break*/, 7];
                    case 3: 
                    // Delete Comments related to the tweet
                    return [4 /*yield*/, commentRepository.delete({
                            referenceTweet: { id: tweetID }
                        })];
                    case 4:
                        // Delete Comments related to the tweet
                        _a.sent();
                        // Delete likes related to the tweet
                        return [4 /*yield*/, likeRepository.delete({
                                referenceTweet: { id: tweetID }
                            })];
                    case 5:
                        // Delete likes related to the tweet
                        _a.sent();
                        // Delete the tweet
                        return [4 /*yield*/, tweetRepository.delete(tweetID)];
                    case 6:
                        // Delete the tweet
                        _a.sent();
                        // Return the deleted tweet
                        res.json(tweet);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); })();
    });
    // like tweets
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/tweets/:id/like
    router.post("/:id/like", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newLike, result, likes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newLike = {
                            referenceUser: req.userId,
                            referenceTweet: req.params.id,
                            is_positive: true
                        };
                        result = joi.validate(newLike, likeDetailsSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.status(400).send({ msg: "The like entered does not have the right format" });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, likeRepository.findOne({
                            where: {
                                referenceTweet: { id: req.params.id },
                                referenceUser: { id: req.userId, }
                            },
                            relations: ["referenceTweet", "referenceUser"]
                        })];
                    case 2:
                        likes = _a.sent();
                        console.log(likes);
                        if (!!likes) return [3 /*break*/, 4];
                        return [4 /*yield*/, likeRepository.save(newLike)];
                    case 3:
                        _a.sent();
                        res.json(newLike);
                        return [3 /*break*/, 5];
                    case 4:
                        // A user is not be able to like the same tweet multiple times
                        res.status(403).send({ msg: "You have already liked for this tweet" });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    // // // // // // // // // // // // // // // // // // // // 
    // Downlikes tweet
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/tweets/:id/downlike
    router.post("/:id/downlike", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newLike, result, likes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newLike = {
                            referenceUser: req.userId,
                            referenceTweet: req.params.id,
                            is_positive: false
                        };
                        result = joi.validate(newLike, likeDetailsSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.status(400).send({ msg: "The like entered doesn't have the right format" });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, likeRepository.findOne({
                            where: {
                                referenceTweet: { id: req.params.id },
                                referenceUser: { id: req.userId, }
                            },
                            relations: ["referenceTweet", "referenceUser"]
                        })];
                    case 2:
                        likes = _a.sent();
                        console.log(likes);
                        if (!!likes) return [3 /*break*/, 4];
                        return [4 /*yield*/, likeRepository.save(newLike)];
                    case 3:
                        _a.sent();
                        res.json(newLike);
                        return [3 /*break*/, 5];
                    case 4:
                        // A user is not be able to like the same tweet multiple times
                        res.status(403).send({ msg: "You have already liked for this tweet" });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    // // // // // // // // // // // // // // // // // // // // 
    return router;
}
exports.getTweetController = getTweetController;
