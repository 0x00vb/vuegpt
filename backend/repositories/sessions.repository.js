import pool from '../db.js';

export const getAllSessions = async () => {
    const { rows } = await pool.query('SELECT * FROM chat_sessions');
    console.log(rows)
    return rows;
};

export const createSession = async (title) => {
    const { rows } = await pool.query('INSERT INTO chat_sessions (title) VALUES ($1) RETURNING *', [title]);
    return rows[0];
};

export const getSessionById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM chat_messages WHERE session_id = $1', [id]);
    return rows;
}; 

export const renameSession = async (id, title) => {
    const { rows } = await pool.query('UPDATE chat_sessions SET title = $1 WHERE id = $2 RETURNING *', [title, id]);
    return rows[0];
};

export const deleteSession = async (id) => {
    const { rows } = await pool.query('DELETE FROM chat_sessions WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};