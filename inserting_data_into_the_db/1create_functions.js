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
var _this = this;
var JWT = "";
// // User controller
// Create a new user account
var createUser = function (user_email, user_pass, user_name, user_pic, user_bio) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        email: user_email,
                        password: user_pass,
                        name: user_name,
                        bio: user_bio,
                        pic: user_pic
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // Auth controller
// Returns an auth token
var authUser = function (user_email, user_pass) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        email: user_email,
                        password: user_pass
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    JWT = json.token;
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // Tweets controllers
// Creates a new tweet
var createTweet = function (ref_user, title_tweet, content_tweet, image_tweet) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        referenceUser: ref_user,
                        title: title_tweet,
                        content: content_tweet,
                        imageUrl: image_tweet
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": JWT
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Deletes a tweet by ID
var deleteTweet = function (tweet_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets/" + tweet_id, {
                        method: "DELETE",
                        headers: {
                            "x-auth-token": JWT
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Likes tweet
var likeTweet = function (tweet_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets/" + tweet_id + "/like", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": JWT
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // // // // // // // // // // // // // // //
// Downvotes tweet
var downvoteTweet = function (tweet_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets/" + tweet_id + "/downvote", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": JWT
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // // // // // // // // // // // // // // //
// // Comment controller
// Create a new comment
var createComment = function (ref_user, ref_tweet, texto) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        referenceUser: ref_user,
                        referenceTweet: ref_tweet,
                        content: texto
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/comments", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": JWT
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Updates the content of a comment
var updateComment = function (comment_id, texto) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        content: texto
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/comments/" + comment_id, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": JWT
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Deletes a comment by ID
var deleteCommentById = function (comment_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/comments/" + comment_id, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": JWT
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};


