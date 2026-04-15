import React, { useState } from "react";
import axios from 'axios';

function Create({ fetchData }) {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (!task) return;
        axios.post('http://localhost:3001/add', { task: task })
            .then(() => {
                setTask("");
                fetchData();
            })
            .catch(err => console.log(err));
    }

    // Fungsi untuk handle tekan Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }

    return (
        <div className="create_form">
            <input 
                type="text" 
                placeholder="Enter Task" 
                value={task}
                onChange={(e) => setTask(e.target.value)} 
                onKeyDown={handleKeyDown} // Tambahkan event listener di sini
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;