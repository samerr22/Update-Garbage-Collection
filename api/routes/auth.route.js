import express from "express";
import {  addPoints, signgin, signup } from "../controllers/auth.controller.js";


const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/addpoint", addPoints);


export default route;
