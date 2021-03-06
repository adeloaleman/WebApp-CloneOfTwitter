"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var users_1 = require("./users");
var tweet_1 = require("./tweet");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Comment.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return users_1.Users; }, function (referenceUser) { return referenceUser.id; }),
        __metadata("design:type", users_1.Users)
    ], Comment.prototype, "referenceUser", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return tweet_1.Tweet; }, function (referenceTweet) { return referenceTweet.id; }),
        __metadata("design:type", tweet_1.Tweet)
    ], Comment.prototype, "referenceTweet", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Comment.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } }),
        __metadata("design:type", String)
    ], Comment.prototype, "date", void 0);
    Comment = __decorate([
        typeorm_1.Entity()
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
