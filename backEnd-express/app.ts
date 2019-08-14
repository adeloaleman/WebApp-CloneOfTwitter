// "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NzY0MDIwfQ.4NVMemKu9s_h-r68gy-QKHjBtJSWpYPLjSPBwWGylbY"
// "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTQ4ODc4MTQ2fQ.kHab4WgO4qCntxtmo5TLY1uGJ1YcTfRKmBmpErn79ho"
// "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4OTY2NDg2fQ.M4ABVRuvIFQhaBk7o1OMQlse3ETg6PCfqv3YsqxJ92E"

import express from "express";
import bodyParser from "body-parser";

import { createDbConnection } from "./db";

import { getAuthController }    from "./src/backend/controllers/auth_controller";
import { getCommentController } from "./src/backend/controllers/comment_controller";
import { getTweetController }   from "./src/backend/controllers/tweet_controller";
import { getUserController }    from "./src/backend/controllers/users_controller";


export async function getApp() {
  // Create db connection
  await createDbConnection();


  // Creates app
  const app = express();


  // Server config to be able to send JSON
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  // Controllers
  const tweetController   = getTweetController();
  const usersController   = getUserController();
  const commentController = getCommentController();
  const authController    = getAuthController();


  // Routes
  app.get("/", (req, res) => {
    res.send("This is the home page!");
  });

  app.use("/api/v1/tweets",   tweetController);
  app.use("/api/v1/users",    usersController);
  app.use("/api/v1/comments", commentController);
  app.use("/api/v1/auth",     authController);

  return app;
}