const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db'
});

// 1. Ambil data
app.get('/get', (req, res) => {
    db.query("SELECT * FROM todos", (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});

// 2. Tambah data
app.post('/add', (req, res) => {
    const task = req.body.task;
    db.query("INSERT INTO todos (task, done) VALUES (?, ?)", [task, false], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});

// 3. FITUR CEKLIS (Mengatasi 404 Not Found)
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    db.query("UPDATE todos SET done = NOT done WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});

// 4. FITUR EDIT TEKS
app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    db.query("UPDATE todos SET task = ? WHERE id = ?", [task, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});

// 5. Hapus data
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM todos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Berhasil dihapus", result });
    });
});

app.listen(3001, () => console.log("Server running on port 3001"));