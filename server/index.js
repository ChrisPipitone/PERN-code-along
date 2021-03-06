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

//add a new entry into users todos
app.post("/todos/:uid", async(req,res) => {
    try {
        const {uid} = req.params;
        const {description} = req.body;

        const newUserTodo = await pool.query(
            "INSERT INTO todo (description, uid) VALUES($1, $2) RETURNING *", 
            [description, uid]
        );
        res.json(newUserTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//get all a user's todos
app.get("/todos/:uid", async(req, res) => {
    try {
        const {uid} = req.params;
        const userTodos = await pool.query("SELECT description, todo_id FROM todo WHERE uid = $1", [uid]);
        res.json(userTodos.rows);
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
//samething here it looks like its techniqally possible for someone to delete a todo without 
//being its owner but again i'm not sure if that's really in the scope of this assingment to prevent that
//if I'm wrong... oh well its my fault for not asking 
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was Deleted");
    } catch(error)
    {
        console.error(error.message)
    }
})


app.listen(5000, () => {
    console.log("server has started on port 5000")
});




//===========OLD WORK IGNORE ===============
//=========kept as reference===========
// //create a todo OLD WITHOUT USERS
// app.post("/todos", async(req,res) => {
//     try {
//         console.log(req.body)
//         const {description} = req.body;
//         const newTodo = await pool.query(
//             "INSERT INTO todo (description) VALUES($1) RETURNING *", 
//             [description]
//         );
//         // const tid = await pool.query(
//         //     "SELECT todo_id FROM todo WHERE description = $1", [description]
//         // );
//         // const newTodo = await pool.query(
//         //     "INSERT INTO user_todos (uid, tid) VALUES($1, $2) RETURNING *", 
//         //     [uid, tid]
//         // );
//         res.json(newTodo.rows[0]);
//     } catch (error) {
//         console.error(error.message)
//     }
// })
//===============================================

//===========OLD WORK IGNORE ===============
//=========kept as reference===========
// app.get("/todos", async(req, res) => {
//     try {
//         //const userTodos = await pool.query("SELECT tid FROM user_todos WHERE uid = '$1' ", [uid]);
//         const allTodos = await pool.query("SELECT * FROM todo");
//         res.json(allTodos.rows);
//     } catch(error)
//     {
//         console.error(error.message)
//     }
// })


//get a todo 
//idk where we use this, not used 
// app.get("/todos/:id", async(req, res) => {
//     try {
//         const {id} = req.params;
//         const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

//         res.json(todo.rows[0])
//     } catch(error)
//     {
//         console.error(error.message)
//     }
// })
//==========================