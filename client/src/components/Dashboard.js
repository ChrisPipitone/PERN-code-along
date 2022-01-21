import React,{Fragment, useState, useEffect} from "react";

//Todo components
import InputTodo from './InputTodo';
import ListTodos from './ListTodo';


const Dashboard = ( {setAuth} ) => {

    const [name, setName] = useState ();
    const [userId, setuserId] = useState();

    async function getName () {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json();
            setName( parseRes.user_name );

            setuserId( parseRes.user_id);

        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect( () => {
        getName();
    },[]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    return (
        <Fragment>
            <h1>Dashboard  { name } </h1>
        
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout?</button>

            {/* for todo list */}         
            <div className='container'>
                <InputTodo uId={userId}/>
                <ListTodos uId={userId}/>
            </div>

        </Fragment>
    );
}

export default Dashboard;