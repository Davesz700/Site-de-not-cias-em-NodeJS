const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { error } = require("console");
const url = 'mongodb://localhost:27017/NoticiasCRUD'
const Posts = require('./Posts.js')
const Users = require('./Users.js')
var session = require('express-session');
const { ppid } = require("process");
app.use(session({
  secret:"Apolo21",
  resave:false,
  saveUninitialized: true,
  cookie:{maxAge:3600000}
}))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));
mongoose.connect(url).then(()=>{console.log("conectado ao banco de dados")}).catch((error)=>{console.log(error.message)})

app.get("/login", (req,res)=>{
  res.render("login.ejs", {})
  if(req.session.user != null){
    console.log(`Olá ${req.session.user}, você está logado`)
  }
})
app.post("/login", (req,res)=>{
  let email = req.body.email
  let password = req.body.password
  if(req.session.login == null){
    Users.find({email:email}).exec().then((user)=>{
      if(user.length == 0){
        res.send("Nenhum usuário com esse email foi encontrado!")
      }else{
        if (password == user[0].senha){
          req.session.user = user[0].Nome
          res.redirect("/login")
        }
        else{
          res.send("senha incorreta!")
        }
      }

    })
  }else{
    res.send(req.session.user)
    console.log("você está logado!")
  }
  
})
app.get("/perfil", (req,res)=>{
  console.log(generate_pid())
  if(req.session.user == null){
    res.redirect("/login")
  }else{
    res.render("perfil.ejs", {})
  }
})
app.post("/registrar", (req,res)=>{
  let nome = req.body.nome
  let email = req.body.email_r
  let senha = req.body.senha_r
  let c_senha = req.body.c_senha
  if(senha == c_senha){
    Users.exists({email:email}).exec().then((user)=>{
      if(user == null){
        Users.create({
          email: email,
          senha: senha,
          Nome: nome,
          pid: generate_pid()
        })
        console.log("Cadastrado com sucesso!")
        res.redirect("/login")
      }else{
        res.send("Email já cadastrado!")
      }
    })

  }else{
    res.send("as senhas não conferem!")
  }
})


app.get("/:slug", (req,res)=>{
  Posts.find({slug: req.params.slug}).exec().then((post)=>{
    console.log(post )
   res.render("single.ejs", {post:post})
  })
  if(req.query.busca){
    res.redirect(`/?busca=${req.query.busca}`)
  }
})


app.get("/", (req,res)=>{
    let buscaq = req.query.busca
    if(buscaq == null | buscaq == 0){
        Posts.find({}).sort({'_id': -1}).exec().then((posts)=>{
          res.render("index.ejs",{posts:posts})
        })
        
        
    }
    else{
        Posts.find({titulo: {$regex:req.query.busca, $options:"i"}}).exec().then((resultados)=>{
          res.render("busca.ejs",{res:resultados})
          console.log(resultados)
        })
    }
    
})

function generate_pid(){
  const letters = ['a', 'b' ,'c', 'd','e','f','g','h','i','j']
  let pid = ""
  let ver = false
  for(i=0;i<10;i++){
    pid+=letters[Math.floor(Math.random() * letters.length)]
  }
  pid = pid+"#"+Math.floor(Math.random() * 10000)
 return pid
}



app.listen(5000, () => {
    console.log("Server no ar.");
  });
  