import express from 'express';
import {  currentuser, deleteUser, getAlluser, signout, test, updateUser } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/test', test); 
router.post('/signout', signout);
router.put( '/update/:userId', updateUser);
router.delete('/delete/:userId',  deleteUser);
router.get('/useral', getAlluser); 
router.get('/userr/:userId', currentuser); 


export default router;