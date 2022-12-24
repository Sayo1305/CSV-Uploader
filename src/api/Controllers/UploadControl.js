const csvdata = require("../model/Csvfile");
exports.Getallupload = async (req, res) => {
  const data = await csvdata.find();
  return res.status(200).json(data);
};

exports.PostFileUpload = async (req, res) => {
  const file_upload = await req.body.file;
  const _id = await req.body.user_id;
  const data = new csvdata({
    arrofdata: file_upload,
    user_id : _id,
  });
  data.save();
  res.status(200).json({ data });
};

exports.GetPopulate =  async(req, res)=>{
  const data = await csvdata.find().populate('user_id');
  res.json(data);
};
