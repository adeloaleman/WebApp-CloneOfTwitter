import * as express from "express";
import jwt from "jsonwebtoken";

// Middleware function used for JWT token validation
export function authMiddleware(
    req:  express.Request,
    res:  express.Response,
    next: express.NextFunction
) {
    // Read token signature from environment variables
    const AUTH_SECRET = process.env.AUTH_SECRET;
    // Read token from request headers
    const token = req.headers["x-auth-token"];
    // Client error if no token found in request headers
    if (typeof token !== "string") {
        res.status(400).send({msg: "No token found in request headers"});
    } else {
        // Server error if enironment variable is not set
        if (AUTH_SECRET === undefined) {
            res.status(500).send({msg: "Internal server error. Enironment variable is not set"});
        } else {
            try {
                // Check that the token is valid
                const obj = jwt.verify(token, AUTH_SECRET) as any;
                // Add the user ID to the HTTP request object so we can access it from the NEXT request handler
                (req as any).userId = obj.id;
                // Invoke NEXT request handler
                next();
            } catch(err) {
                // Unauthorized if the token cannot be verified
                res.status(401).send({msg: "You are trying to access a private endpoint without a known identity"});
            }
        }
    }
}