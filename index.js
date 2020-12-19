// EXPRESS AND OTHER SETUP
const express = require('express');
// const {setupExpressApp} = require('./setupExpress');
// const {setupHBS} = require('./setupHBS');
const MongoUtil = require('./MongoUtil.js');
const cors = require('cors')


// allows us to inject into the environment (the OS) our environmental variabkes
require('dotenv').config();

// create the app
const app = express();
// setupExpressApp(app);
// setupHBS();

async function main() {
    const MONGO_URL=process.env.MONGO_URL;
    await MongoUtil.connect(MONGO_URL, "life_simulator_game");

    const usersRoutes = require('./routes/usersRoutes')
    const tasksRoutes = require('./routes/tasksRoutes')
    const saveandloadRoutes = require('./routes/saveandloadRoutes')

    app.use(cors())

    app.use('/users', usersRoutes);
    app.use('/tasks', tasksRoutes);
    app.use('/saveandload', saveandloadRoutes);

}

main();

// LISTEN
app.listen(3001, ()=>{
    console.log("Express is running")
})