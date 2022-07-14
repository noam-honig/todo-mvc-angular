import express from "express";
import { api } from "./api";

const app = express();

import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt'

// basic username based sign in
const validUsers = [
    { id: "1", name: "Jane", roles: ["admin"] },
    { id: "2", name: "Steve", roles: [] }
];
app.use(express.json());
app.post("/api/signIn", (req, res) => {
    const user = validUsers.find(user => user.name === req.body.username);
    if (user)
        res.json(jwt.sign(user, process.env['JWT_SECRET'] || "my secret"));
    else
        res.status(404).send("Invalid user, try 'Steve' or 'Jane'");
});
// end basic sign in implementation
app.use(expressjwt({
    secret: process.env['JWT_SECRET'] || "my secret",
    credentialsRequired: false,
    algorithms: ['HS256']
}));
app.use(api);
app.get("/hello", (req, res) => {
    res.send("Hello 123");
})
app.listen(3002, () => console.log("Started"));