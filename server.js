const express = require ("express");
const database = require("./src/database")
const { PORT } = require("./src/config");
const app = express();

app.use(express.json());



app.get("/api/users", (req, res) => {
    res.json(database.DB);
});

app.post("/api/users", (req, res) => {
    const user = {        
        name: req.body.name,
        age: req.body.age,
    };
   
    const userName = user.name.toLocaleLowerCase().trim();

    if (database.DB.some((item) => item.name.toLocaleLowerCase().trim() == userName )){
        res.status(409).json({
            messege: "'name' debe ser unico"
        });     
    } else {
        database.add(user);       
        res.json(user);
    }
});

app.get("/api/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = database.DB.filter((item) => item.id === userId)[0];

    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }        
});

app.delete("/api/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const userIndex = database.DB.findIndex((item) => item.id === userId);

    if (userIndex > -1) {
        database.DB.splice(userIndex, 1);
        res.json({
            messege: 'user deleted'
        });
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});