const express = require ("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

// //


//create a todo
app.post("/todos", async(req,res) => {
    try {
        console.log(req.body)
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );
        // const tid = await pool.query(
        //     "SELECT todo_id FROM todo WHERE description = $1", [description]
        // );
        // const newTodo = await pool.query(
        //     "INSERT INTO user_todos (uid, tid) VALUES($1, $2) RETURNING *", 
        //     [uid, tid]
        // );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

//add a new entry into users todos
app.post("/todos/:uid&:tid", async(req,res) => {
    try {
        const uid = req.params.uid;
        const tid = req.params.tid;

        const newUserTodo = await pool.query(
            "INSERT INTO user_todos (uid, tid) VALUES($1, $2) RETURNING *", 
            [uid, tid]
        );
        res.json(newUserTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//get all a user's todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(error)
    {
        console.error(error.message)
    }
})

//get a todo 
app.get("/todos/:uid&:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

        res.json(todo.rows[0])
    } catch(error)
    {
        console.error(error.message)
    }
})


//update a todo
//doesn't need uid bc it doesn't matter who it belongs to the todo id is unique to that todo
//arguement could be made that a user other than the own could some how alter it but I don't 
// think that matters for this project so I'm not changing it
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
        );

        res.json("Todo was updated");
    } catch (error)
    {
        console.error(error.message)
    }
})

//delete a todo
app.delete("/todos/:uid&:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was Deleted");
    } catch(error)
    {
        console.error(error.message)
    }
})


app.listen(5000, () => {
    console.log("server has started on port 5000")
});