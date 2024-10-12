var mongoose = require("mongoose");
var schema = mongoose.Schema;
var userSchema = new schema(
  {
    email: String,
    senha: String,
    Nome: String,
    pid: String,
  },
  { collection: "Usuarios" }
);
var Usuario = mongoose.model("Usuarios", userSchema);
module.exports = Usuario;
