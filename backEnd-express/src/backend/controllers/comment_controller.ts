import * as express from "express";
import * as joi from "joi";

import { getCommentRepository } from "../repositories/comment_repository";
import { authMiddleware }       from "../middleware/auth_middleware";


export function getCommentController() {

    const commentRepository = getCommentRepository();
    const router = express.Router();

    const commentDetailsSchema = {
        referenceUser: joi.number(),
        referenceTweet: joi.number(),
        content: joi.string()
    };


    // Returns all comments
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/comments
    router.get("/", (req, res) => {
        (async () => {
            const comment = await commentRepository.find(
                {
                    relations: ["referenceUser", "referenceTweet"]
                }
            );
            res.json(comment);
        })();
    });


    // Retuns a comment by ID
    // Is public: YES
    // HTTP GET http://localhost:8080/api/v1/comments/1
    router.get("/:id", (req, res) => {
        (async () => {
            const id = req.params.id;
            const comment = await commentRepository.findOne(
                id,
                {
                    relations: ["referenceUser", "referenceTweet"]
                });
            res.json(comment);
        })();
    });


    // Create a new comment
    // Is public: NO
    // HTTP POST http://localhost:8080/api/v1/comments
    router.post("/", authMiddleware, (req, res) => {
        (async () => {
            const newComment = req.body;
            // Input validation
            const result = joi.validate(newComment, commentDetailsSchema);
            if (result.error) {
                res.status(400).send({msg: "The comment entered does not have the right format"});
            } else {
                const comment = await commentRepository.save(newComment);
                // Return the new comment
                res.json(comment);
            }
        })();
    });

    
    // Updates the content of a comment
    // Is public: NO
    // HTTP PATCH http://localhost:8080/api/v1/comments/:id
    router.patch("/:id", authMiddleware, (req, res) => {
        (async () => {
            console.log(req);
            const id = req.params.id;
            const userID = (req as any).userId;
            const update = req.body;
            const Comment = await commentRepository.findOne(
                id,
                {
                    relations: ["referenceUser", "referenceTweet"],
                });
                // An error 404 is thrown if the comment is not found
                if (!Comment) {
                    res.status(404).send({msg: "There is no comment with the specified id"});
                } else {
                    // A user is not be able to delete a comment if he is not the owner
                    if (Comment.referenceUser.id != userID){
                        res.status(403).send({msg: "This comment does not belong to you, so you can not update it"});
                    }
                    else{                        
                        const key = Object.keys(update)[0];
                        const val = update[key];
                        (Comment as any)[key] = val;
                        const updatedComment = await commentRepository.save(Comment);
                        res.json(updatedComment);
                    }
                }
        })();
     });


    // Deletes a comment by ID
    // Is public: NO
    // HTTP DELETE http://localhost:8080/api/v1/comments/:id
    // router.delete("/:id", authMiddleware, (req, res) => {
    router.delete("/:id", authMiddleware, (req, res) => {
        (async () => {
            const id = req.params.id;
            const userID = (req as any).userId;

            const comment = await commentRepository.findOne(
                id,
                {
                    relations: ["referenceUser", "referenceTweet"],
                });
                // An error 404 is thrown if the comment is not found
                if (!comment) {
                    res.status(404).send({msg: "There is no comment with the specified id"});
                } else {
                    // A user is not be able to delete a comment if he is not the owner
                    if (comment.referenceUser.id != userID){
                        res.status(403).send({msg: "This comment does not belong to you, so you can not delete it"});
                    }
                    else{
                        const id = req.params.id;
                        const comment = await commentRepository.delete(id);
                        res.json(comment);
                    }
                }
        })();
    });

    return router;

}
