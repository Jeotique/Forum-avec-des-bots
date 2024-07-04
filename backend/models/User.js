const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async ban(userId) {
    await pool.execute('UPDATE users SET is_banned = TRUE WHERE id = ?', [userId]);
  }

  static async unban(userId) {
    await pool.execute('UPDATE users SET is_banned = FALSE WHERE id = ?', [userId]);
  }

  static async update(userId, { username, email, password, profilePic }) {
    const user = await User.findById(userId);
    const query = 'UPDATE users SET username = ?, email = ?, password = ?, profile_pic = ? WHERE id = ?';
    const params = [username||user.username, email||user.email, password||user.password, profilePic||user.profile_pic, userId];
    console.log(query)
    console.log(params)
    await pool.execute(query, params);
  }
}

module.exports = User;
