"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var users_1 = require("../entities/users");
function getUserRepository() {
    var connection = typeorm_1.getConnection();
    var userRepository = connection.getRepository(users_1.Users);
    return userRepository;
}
exports.getUserRepository = getUserRepository;
