import React, {Fragment, useState} from "react";

const InputTodo = (userId) => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {

            // //const body = {description};
            // const response = await fetch(`http://localhost:5000/todos`, {
            //     method: "POST",
            //     headers: {"Content-Type": "application/json" },
            //     body: JSON.stringify(body)
            // });

            // //get todo from response to 'tie' it to the user
            // const parseRes = await response.json();
            // const tid = parseRes.todo_id;

            // //now we have the uid and tid
            // //do new api call to add the two to the other table

            // //above is if i used a 3rd table
            
            const body = {description};
            const newRes = await fetch(`http://localhost:5000/todos/${userId.uId}`, {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
             window.location = "/dashboard"; // /dashboard/ ??
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5"> Pern Todo List</h1>

            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="type" 
                    className="form-control"
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success"> Add </button>
            </form>
        </Fragment>
        
    );
}

export default InputTodo;