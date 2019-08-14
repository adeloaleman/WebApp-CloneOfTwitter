import { getConnection } from "typeorm";
import { Like } from "../entities/like";

export function getLikeRepository() {
    const connection = getConnection();
    const likeRepository = connection.getRepository(Like);
    return likeRepository;
}