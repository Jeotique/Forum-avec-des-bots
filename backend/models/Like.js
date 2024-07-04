const db = require('../config/database');

class Like {
  static async create(userId, postId, commentId, type) {
    const [result] = await db.execute(
      'INSERT INTO likes (user_id, post_id, comment_id, type) VALUES (?, ?, ?, ?)',
      [userId, postId, commentId, type]
    );
    return result.insertId;
  }

  static async findByUserAndPost(userId, postId) {
    const [likes] = await db.execute(
      'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
      [userId, postId]
    );
    return likes.length > 0 ? likes[0] : null;
  }

  static async findByUserAndComment(userId, commentId) {
    const [likes] = await db.execute(
      'SELECT * FROM likes WHERE user_id = ? AND comment_id = ?',
      [userId, commentId]
    );
    return likes.length > 0 ? likes[0] : null;
  }

  static async delete(likeId) {
    await db.execute('DELETE FROM likes WHERE id = ?', [likeId]);
  }
}

module.exports = Like;
