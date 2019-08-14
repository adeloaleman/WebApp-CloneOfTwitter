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
var users_repository_1 = require("../repositories/users_repository");
var tweet_repository_1 = require("../repositories/tweet_repository");
var comment_repository_1 = require("../repositories/comment_repository");
function getUserController() {
    var _this = this;
    var userRepository = users_repository_1.getUserRepository();
    var tweetRepository = tweet_repository_1.getTweetRepository();
    var commentRepository = comment_repository_1.getCommentRepository();
    var router = express.Router();
    var userDetailsSchema = {
        email: joi.string().email(),
        password: joi.string(),
        name: joi.string().allow('', null),
        bio: joi.string().allow('', null),
        pic: joi.string().allow('', null),
    };
    // Creates a new user account
    // Is public: YES
    // HTTP POST http://localhost:8080/api/v1/users
    router.post("/", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newUser, result, emailAlreadyUsed, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = req.body;
                        result = joi.validate(newUser, userDetailsSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.status(400).send({ msg: "The user entered does not have the right format" });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, userRepository.findOne({
                            where: {
                                email: newUser.email
                            }
                        })];
                    case 2:
                        emailAlreadyUsed = _a.sent();
                        if (!emailAlreadyUsed) return [3 /*break*/, 3];
                        res.status(400).send({ msg: "The email entered is alreday used by anothe account" });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, userRepository.save(newUser)];
                    case 4:
                        user = _a.sent();
                        // Return the new user
                        // res.json(user);
                        res.json(user).send();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    // Returns all users
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/users
    router.get("/", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Returns a user with all its activity (tweets and comments)
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/users/1
    router.get("/:id", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, user, tweets, tweetsIds, len, i, _tweetsWithComments, id_1, tweet, _comments, tweet_comments, userDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, userRepository.findOne(id)];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 2];
                        res.status(404).send({ msg: "There is no user with the specified id" });
                        return [3 /*break*/, 9];
                    case 2: return [4 /*yield*/, tweetRepository.find({
                            where: {
                                referenceUser: { id: req.params.id },
                            },
                            relations: ["referenceUser"]
                        })];
                    case 3:
                        tweets = _a.sent();
                        tweetsIds = tweets.map(function (tweet) { return tweet.id; });
                        len = tweetsIds.length;
                        i = 0;
                        _tweetsWithComments = [];
                        _a.label = 4;
                    case 4:
                        if (!(i < len)) return [3 /*break*/, 8];
                        id_1 = tweetsIds[i];
                        return [4 /*yield*/, tweetRepository.findOne(id_1, {
                                relations: ["referenceUser"]
                            })];
                    case 5:
                        tweet = _a.sent();
                        return [4 /*yield*/, commentRepository.find({
                                where: {
                                    referenceTweet: { id: id_1 },
                                },
                                relations: ["referenceUser", "referenceTweet"]
                            })];
                    case 6:
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
                                    pic: tweet.referenceUser.pic
                                },
                                comments: _comments
                            };
                            // const tweet_comments = [tweet, {comments: comments}];
                            _tweetsWithComments.push(tweet_comments);
                            // res.json(tweet_comments);
                        }
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 4];
                    case 8:
                        userDetails = {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            bio: user.bio,
                            pic: user.pic,
                            tweetsWithComments: _tweetsWithComments
                        };
                        res.json(userDetails);
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); })();
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
exports.getUserController = getUserController;
