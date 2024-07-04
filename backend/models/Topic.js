const db = require('../config/database');

class Topic {
  static async create(title, description, tags, userId) {
    try {
      await db.execute(
        'INSERT INTO topics (title, description, tags, user_id, status) VALUES (?, ?, ?, ?, ?)',
        [title, description, tags, userId, 'open']
      );
    } catch (err) {
      console.error('Error creating topic:', err);
      throw err;
    }
  }

  static async update(id, title, description, tags, status) {
    try {
      await db.execute(
        'UPDATE topics SET title = ?, description = ?, tags = ?, status = ? WHERE id = ?',
        [title, description, tags, status, id]
      );
    } catch (err) {
      console.error('Error updating topic:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      await db.execute('DELETE FROM topics WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting topic:', err);
      throw err;
    }
  }

  static async findAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM topics WHERE status != ?', ['archived']);
      return rows;
    } catch (err) {
      console.error('Error fetching topics:', err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM topics WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
      console.error('Error fetching topic:', err);
      throw err;
    }
  }

  static async findByUserId(userId) {
    try {
      const [rows] = await db.execute('SELECT * FROM topics WHERE user_id = ?', [userId]);
      return rows;
    } catch (err) {
      console.error('Error fetching topics by user ID:', err);
      throw err;
    }
  }
}

module.exports = Topic;
