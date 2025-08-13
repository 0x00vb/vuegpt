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