const Userschema = require('../Model/userSchema')
const bcrypt = require('bcrypt')

const object = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
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
        newUser.save()
      }
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = object;
