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
var comment_repository_1 = require("../repositories/comment_repository");
var auth_middleware_1 = require("../middleware/auth_middleware");
function getCommentController() {
    var _this = this;
    var commentRepository = comment_repository_1.getCommentRepository();
    var router = express.Router();
    var commentDetailsSchema = {
        referenceUser: joi.number(),
        referenceTweet: joi.number(),
        content: joi.string()
    };
    // Returns all comments
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/comments
    router.get("/", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, commentRepository.find({
                            relations: ["referenceUser", "referenceTweet"]
                        })];
                    case 1:
                        comment = _a.sent();
                        res.json(comment);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Retuns a comment by ID
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/comments/1
    router.get("/:id", function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, commentRepository.findOne(id, {
                                relations: ["referenceUser", "referenceTweet"]
                            })];
                    case 1:
                        comment = _a.sent();
                        res.json(comment);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // Create a new comment
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/comments
    router.post("/", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newComment, result, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newComment = req.body;
                        result = joi.validate(newComment, commentDetailsSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.status(400).send({ msg: "The comment entered does not have the right format" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, commentRepository.save(newComment)];
                    case 2:
                        comment = _a.sent();
                        // Return the new comment
                        res.json(comment);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    });
    // Updates the content of a comment
    // Is public: NO
    // HTTP PATCH http://localhost:8080/api/v1/comments/:id
    router.patch("/:id", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, userID, update, Comment, key, val, updatedComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req);
                        id = req.params.id;
                        userID = req.userId;
                        update = req.body;
                        return [4 /*yield*/, commentRepository.findOne(id, {
                                relations: ["referenceUser", "referenceTweet"],
                            })];
                    case 1:
                        Comment = _a.sent();
                        if (!!Comment) return [3 /*break*/, 2];
                        res.status(404).send({ msg: "There is no comment with the specified id" });
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(Comment.referenceUser.id != userID)) return [3 /*break*/, 3];
                        res.status(403).send({ msg: "This comment does not belong to you, so you can not update it" });
                        return [3 /*break*/, 5];
                    case 3:
                        key = Object.keys(update)[0];
                        val = update[key];
                        Comment[key] = val;
                        return [4 /*yield*/, commentRepository.save(Comment)];
                    case 4:
                        updatedComment = _a.sent();
                        res.json(updatedComment);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    // Deletes a comment by ID
    // Is public: NO
    // HTTP DELETE http://localhost:8080/api/v1/comments/:id
    // router.delete("/:id", authMiddleware, (req, res) => {
    router.delete("/:id", auth_middleware_1.authMiddleware, function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, userID, comment, id_1, comment_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        userID = req.userId;
                        return [4 /*yield*/, commentRepository.findOne(id, {
                                relations: ["referenceUser", "referenceTweet"],
                            })];
                    case 1:
                        comment = _a.sent();
                        if (!!comment) return [3 /*break*/, 2];
                        res.status(404).send({ msg: "There is no comment with the specified id" });
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(comment.referenceUser.id != userID)) return [3 /*break*/, 3];
                        res.status(403).send({ msg: "This comment does not belong to you, so you can not delete it" });
                        return [3 /*break*/, 5];
                    case 3:
                        id_1 = req.params.id;
                        return [4 /*yield*/, commentRepository.delete(id_1)];
                    case 4:
                        comment_1 = _a.sent();
                        res.json(comment_1);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    return router;
}
exports.getCommentController = getCommentController;
