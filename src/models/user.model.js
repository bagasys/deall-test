const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

const User = mongoose.model("User", userSchema);

module.exports = User;
