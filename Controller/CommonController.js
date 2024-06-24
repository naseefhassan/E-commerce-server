const Userschema = require("../Model/userSchema");
const bcrypt = require("bcrypt");

const object = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      const existingUser = await Userschema.findOne({ email });
      console.log(existingUser);

      if (existingUser) {
        console.log("email is aleady in use");
        res.status(400).json({ message: "email is aleady in use" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const newUser = await Userschema({
          username,
          email,
          password: hashPassword,
        });
        newUser.save();
        res.status(200).json({message:'signup success'})
      }
    } catch (error) {
      console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await Userschema.find({ email });
      console.log(existingUser,'user');
      if (!existingUser) {
        return res
          .status(400)
          .json({ message: `user not found with email ${email}` });
      }

      const passChek = bcrypt.compareSync(
        password,
        existingUser[0].password
      );
      console.log(passChek,'pass');
      if (!passChek) {
        return res.status(400).json({ message: "password not match" });
      }

      return res.status(200).json({ message: "Login Success" });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = object;
