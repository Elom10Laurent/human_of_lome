const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const BlogPost = require("./models/BlogPost");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = 3002;
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.SECRET_KEY;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("Human of Lomé");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet utilisateur existe déjà." });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userData = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json(userData);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'utilisateur.",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      res.status(404).json("not found");
    } else {
      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { sameSite: "none", secure: true })
              .json(userDoc);
          }
        );
      } else {
        res.status(401).json("pass not ok");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret);
      const { username, email, _id } = await User.findById(userData.id);
      res.json({ username, email, _id });
    } catch (err) {
      res.status(401).json("Pas autorisé");
    }
  } else {
    res.json(null);
  }
});

app.post("/article", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { checkBox, image, title, content } = req.body;
    try {
      const userData = jwt.verify(token, jwtSecret);
      const { username, email, _id } = await User.findById(userData.id);

      const newArticle = await BlogPost.create({
        owner: _id,
        checkBox,
        image,
        title,
        content,
      });
      res.json(newArticle);
    } catch (err) {
      res.json("Pas autorisé");
    }
  } else {
    res.json(null);
  }
});

app.get("/article", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret);
      const { id } = userData;
      res.json(await BlogPost.find({ owner: id }));
    } catch (err) {
      res.json("Pas autorisé");
    }
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { sameSite: "none", secure: true }).json(true);
});


app.get('/articles/:id',async (req, res) =>{
  const {id} = req.params;
  res.json(await BlogPost.findById(id))
})

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.error("Connexion à MongoDB échouée :", error);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Blog API en écoute sur le port ${port}`);
});
