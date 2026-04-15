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

// Ambil data
app.get('/get', (req, res) => {
    db.query("SELECT * FROM todos", (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});

// Hapus data (PASTIKAN BAGIAN INI SAMA)
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM todos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Gagal hapus di database:", err);
            return res.status(500).json(err);
        }
        return res.json({ message: "Berhasil dihapus", result });
    });
});

app.listen(3001, () => console.log("Server running on port 3001"));