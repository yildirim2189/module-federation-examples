import express from "express";
import React from "react";
import initMiddleware from "./middleware";

const app = express();

const done = () => {
  app.listen(3004, () => {
    console.log(`Server is listening on port: 3004`);
  });
};

initMiddleware(express, app, done);
