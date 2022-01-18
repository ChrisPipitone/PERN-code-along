const express = require ("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo
app.post("/todos", async(req,res) => {
    try {
        console.log(req.body)
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

// const {description} = req.body;
// const newTodo = await pool.query(
//     "INSERT INTO todo (description) VALUES($1)", 
//      [description]
// );
//  res.json(newTodo);

//get all todos

//get a todo 

//update a todo

//delete a todo


app.listen(5000, () => {
    console.log("server has started on port 5000")
});