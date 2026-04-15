import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from 'axios';
import { BsFillTrashFill, BsCircleFill, BsFillCheckCircleFill, BsPencilSquare, BsCheckLg } from 'react-icons/bs';
import './App.css';

function Home() {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editValue, setEditValue] = useState("");

    const fetchData = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Bagian fungsi di dalam Home.jsx
// Fitur Ceklis
const handleStatusUpdate = (id) => {
    axios.put('http://localhost:3001/update/' + id)
        .then(() => fetchData())
        .catch(err => console.log(err));
}

// Fitur Simpan Edit
const handleSaveEdit = (id) => {
    if (editValue.trim() !== "") {
        // Mengirim objek { task: editValue } agar teks tidak hilang
        axios.put('http://localhost:3001/edit/' + id, { task: editValue })
            .then(() => {
                setIsEditing(null);
                fetchData();
            })
            .catch(err => console.log(err));
    } else {
        setIsEditing(null);
    }
}

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(() => fetchData())
            .catch(err => console.log(err));
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
                                <div className="checkbox-container">
                                    <span onClick={() => handleStatusUpdate(todo.id)} className="status-icon">
                                        {todo.done ?
                                            <BsFillCheckCircleFill className="icon-check" /> :
                                            <BsCircleFill className="icon-circle" />
                                        }
                                    </span>

                                    {isEditing === todo.id ? (
                                        <input
                                            type="text"
                                            className="edit-input"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            autoFocus
                                        />
                                    ) : (
                                        <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                                    )}
                                </div>
                                <div className="actions">
                                    {isEditing === todo.id ? (
                                        // Tombol Save (Centang)
                                        <button
                                            className="save-btn"
                                            onClick={() => handleSaveEdit(todo.id)} // Pastikan todo.id masuk ke sini
                                        >
                                            <BsCheckLg />
                                        </button>
                                    ) : (
                                        // Tombol Pensil (Masuk mode edit)
                                        <span onClick={() => {
                                            setIsEditing(todo.id);
                                            setEditValue(todo.task);
                                        }}>
                                            <BsPencilSquare className="icon-edit" />
                                        </span>
                                    )}
                                    <span onClick={() => handleDelete(todo.id)}>
                                        <BsFillTrashFill className="icon-trash" />
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