const express = require('express');
const {GetAllUserData , PostUserLogin , PostUserRegister , GetUserDetail} = require('../Controllers/UserControl');

const router = express.Router();

router.get('/getall' , GetAllUserData);
router.post('/userlogin' ,PostUserLogin);
router.post('/userregister' , PostUserRegister);
router.get('/userdetail/:email' , GetUserDetail);

module.exports = router;