// EXPRESS AND OTHER SETUP
const express = require('express');
const {setupExpressApp} = require('./setupExpress');
// const {setupHBS} = require('./setupHBS');
const MongoUtil = require('./MongoUtil.js');



// allows us to inject into the environment (the OS) our environmental variabkes
require('dotenv').config();

// create the app
const app = express();
setupExpressApp(app);
// setupHBS();

async function main() {
    const MONGO_URL=process.env.MONGO_URL;
    await MongoUtil.connect(MONGO_URL, "life_simulator_game");

    const usersRoutes = require('./routes/usersRoutes')
    const tasksRoutes = require('./routes/tasksRoutes')
    const savedGames = require('./routes/savedGames')
    const housesRoutes = require('./routes/housesRoutes')

    app.use('/users', usersRoutes);
    app.use('/tasks', tasksRoutes);
    app.use('/savedGames', savedGames);
    app.use('/houses', housesRoutes)
}

main();

// LISTEN
app.listen(3002, ()=>{
    console.log("Express is running")
})