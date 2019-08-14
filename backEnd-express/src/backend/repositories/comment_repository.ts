import { getConnection } from "typeorm";
import { Comment } from "../entities/comment";

export function getCommentRepository() {
    const connection = getConnection();
    const commentRepository = connection.getRepository(Comment);
    return commentRepository;
}