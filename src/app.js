import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    usuarios.push({
        username,
        avatar
    });

    res.send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet} = req.body;

    const usuarioExistente = usuarios.find(usuario => usuario.username === username);

    if(!usuarioExistente){
        return res.status(401).send("UNAUTHORIZED");
    }

    tweets.push({
        username,
        tweet
    });
    res.send("OK");
});




const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}, yay!`);
});