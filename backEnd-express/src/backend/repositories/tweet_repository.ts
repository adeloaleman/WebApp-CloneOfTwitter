import { getConnection } from "typeorm";
import { Tweet } from "../entities/tweet";

export function getTweetRepository() {
    const connection = getConnection();
    const tweetRepository = connection.getRepository(Tweet);
    return tweetRepository;
}