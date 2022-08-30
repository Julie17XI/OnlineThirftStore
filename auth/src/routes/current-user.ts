import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-users';
import { notAuthorized } from '../middlewares/not-authorized';
const router = express.Router();

router.get('/api/users/currentuser', currentUser, notAuthorized, (req, res) => {
   res.send(req.currentUser);
});

export {router as currentUserRouter};
