import * as express from "express";
import * as joi from "joi";
import jwt from "jsonwebtoken";
import { getUserRepository } from "../repositories/users_repository";

export function getAuthController() {

    const AUTH_SECRET = process.env.AUTH_SECRET;
    const userRepository = getUserRepository();
    const router = express.Router();

    const userDetailsSchema = {
        email: joi.string().email(),
        password: joi.string()
    };


    // Returns an auth token
    // Is public: YES
    // HTTP POST http://localhost:8080/api/v1/auth/login
    router.post("/login", (req, res) => {
        (async () => {
            const userDetails = req.body;
            // Input validation
            const result = joi.validate(userDetails, userDetailsSchema);
            if (result.error) {
                res.status(400).send({msg: "The user entered does not have the right format"});
            } else {
                const match = await userRepository.findOne(userDetails);
                if (match === undefined) {
                    res.status(401).send({msg: "Unauthorized access. Email or Password incorrect"});
                } else {
                    if (AUTH_SECRET === undefined) {
                        res.status(500).send({msg: "Internal server error"});
                    } else {
                        const token = jwt.sign({ id: match.id }, AUTH_SECRET);
                        // Returns an JWT auth token
                        res.json({ token: token, user: match }).send();
                    }
                }
            }
        })();
    });

    return router;
}
