import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import './App.css';

function Home() {
    const [todos, setTodos] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        // Mengirim request DELETE dengan ID yang benar
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                console.log("Data terhapus:", result);
                fetchData(); // Memperbarui tampilan secara instan
            })
            .catch(err => console.log("Error hapus:", err));
    }

    return (
        <div className="home">
            <div className="container">
                <h1>To Do List</h1>
                <Create fetchData={fetchData} />
                <div className="todo-list">
                    {todos.length === 0 ? (
                        <div className="no-record"><h2>No Tasks</h2></div>
                    ) : (
                        todos.map(todo => (
                            <div key={todo.id} className="task-card">
                                <p>{todo.task}</p>
                                <div className="actions">
                                    <span onClick={() => handleDelete(todo.id)}>
                                        <BsFillTrashFill style={{color: 'red', cursor: 'pointer'}} />
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;