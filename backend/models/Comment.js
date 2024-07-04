const db = require('../config/database');

class Comment {
  static async create(userId, postId, content) {
    const [result] = await db.execute(
      'INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)',
      [userId, postId, content]
    );
    return result.insertId;
  }

  static async findById(commentId) {
    const [comments] = await db.execute(
      'SELECT comments.*, users.username, users.profile_pic FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = ?',
      [commentId]
    );
    return comments.length > 0 ? comments[0] : null;
  }

  static async findByPostId(postId) {
    const [comments] = await db.execute(
      'SELECT comments.*, users.username, users.profile_pic FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ?',
      [postId]
    );
    return comments;
  }

  static async findByUserId(userId) {
    const [comments] = await db.execute(
      'SELECT comments.*, users.username, users.profile_pic FROM comments JOIN users ON comments.user_id = users.id WHERE comments.user_id = ?',
      [userId]
    );
    return comments;
  }

  static async update(commentId, content) {
    await db.execute(
      'UPDATE comments SET content = ? WHERE id = ?',
      [content, commentId]
    );
  }

  static async delete(commentId) {
    await db.execute('DELETE FROM comments WHERE id = ?', [commentId]);
  }

  static async like(commentId) {
    await db.execute('UPDATE comments SET likes = likes + 1 WHERE id = ?', [commentId]);
  }

  static async dislike(commentId) {
    await db.execute('UPDATE comments SET dislikes = dislikes + 1 WHERE id = ?', [commentId]);
  }
}

module.exports = Comment;
