var mongoose = require("mongoose");
var schema = mongoose.Schema;
var postSchema = new schema(
  {
    categoria: String,
    titulo: String,
    autor: String,
    img: String,
    conteudo: String,
    slug: String,
  },
  { collection: "noticias" }
);
var Post = mongoose.model("Posts", postSchema);
module.exports = Post;
