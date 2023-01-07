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


    const { avatar } = usuarios.find(usuario => usuario.username === username);

    tweets.push({
        username,
        avatar,
        tweet
    });

    
    res.send("OK");
});


app.get("/tweets", (req, res) => {

    if(tweets.length <= 10){
        res.send([...tweets].reverse());
    }
    else{
        res.send([...tweets].reverse().splice(0,10));
    }
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}, yay!`);
});