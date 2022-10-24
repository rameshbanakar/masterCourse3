const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = mongoose.Schema;
const userSchema = new schema({
  email: { type: String, required: true },
  password: { type: String, required: true, seleted: false },
  name: { type: String, required: true },
  following:[{type:schema.Types.ObjectId,ref:"user"}]
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.validPassword = async function (candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};

module.exports = mongoose.model("user", userSchema);
