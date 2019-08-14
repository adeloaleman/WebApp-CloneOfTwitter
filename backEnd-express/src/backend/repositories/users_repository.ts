import { getConnection } from "typeorm";
import { Users } from "../entities/users";

export function getUserRepository() {
    const connection = getConnection();
    const userRepository = connection.getRepository(Users);
    return userRepository;
}