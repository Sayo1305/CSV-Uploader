const Userdata = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.GetAllUserData = async (req, res) => {
  const response = await Userdata.find();
  res.json(response);
};

exports.GetUserDetail = async (req, res) =>{
  const data = await Userdata.findOne({email :  req.params.email});
  res.json(data);
}

exports.PostUserRegister = async (req, res) => {
  const { email, password } = req.body;
  if (!email && typeof email != "string") {
    return res.json({ status: "Email is invalid", Ok: "false" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
    const response = await Userdata.create({
      email,
      password: hashedpassword,
    });
    return res.json({ response, Ok: "true" });
  } catch (Err) {
    if (Err.code === 11000) {
      console.log("same name ");
      return res.json({ status: "same Email already exist", Ok: "false" });
    } else console.log(Err);
  }
};



exports.PostUserLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);
  const User = await Userdata.findOne({ email }).lean();
  if (!User) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }
  if (await bcrypt.compare(password, User.password)) {
    const token = jwt.sign(
      {
        id: User._id,
        email: User.email,
      },
      process.env.JWT_SECRET
    );

    return res.json({ status: "ok", data: token, User: User });
  }
  res.json({ status: "error", error: "Invalid email/password" });
};



