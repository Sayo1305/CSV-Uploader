const express = require('express');
const {Getallupload , PostFileUpload , GetPopulate} = require('../Controllers/UploadControl');

const router = express.Router();

router.get('/getallupload' , Getallupload);
router.post('/postupload' , PostFileUpload);
router.get('/getpop', GetPopulate);

module.exports = router;