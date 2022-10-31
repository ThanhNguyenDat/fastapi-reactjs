// const path = require('path');
const express = require('express'); 
const morgan = require('morgan');
// const methodOverride = require('method-override');
// const { engine } = require('express-handlebars');
const cors = require('cors');

// const route = require('./routes');
// const db = require('./config/db');
const { connect_postgresql, pool } = require('./config/db/postgresql_connection');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// routes init
// route(app);
// create a todo_task
app.post("/todos", async (req, res) => {
    try {
        console.log("req: ", req.body);
        const { name_task, url_task, description } = req.body;

        const newTodo = await pool.query("INSERT INTO todoTask(name_task, url_task, description) \
            VALUES($1, $2, $3) RETURNING *", [name_task, url_task, description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log("err: ", err.mesage);
    }

})

// get all todoTask
app.get("/todos", async(req, res) => {
    try {
        const allTodoTask = await pool.query("SELECT * FROM todoTask");
        res.json(allTodoTask.rows);
    } catch (err) {
        console.log("error: ", err.mesage);
    }
})






app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
})