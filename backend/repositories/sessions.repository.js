import pool from '../db.js';

export const getAllSessions = async () => {
    const { rows } = await pool.query('SELECT * FROM chat_sessions');
    return rows;
};

export const createSession = async (title) => {
    const { rows } = await pool.query('INSERT INTO chat_sessions (title) VALUES ($1) RETURNING *', [title]);
    return rows[0];
};

export const getSessionById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM chat_sessions WHERE id = $1', [id]);
    return rows[0];
}; 