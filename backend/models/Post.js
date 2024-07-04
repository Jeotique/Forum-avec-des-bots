const db = require('../config/database');

class Post {
  static async create(userId, topicId, title, content, tags, image) {
    const [result] = await db.execute(
      'INSERT INTO posts (user_id, topic_id, title, content, tags, image) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, topicId, title, content, tags, image]
    );
    return result.insertId;
  }

  static async findById(postId) {
    const [posts] = await db.execute(
      'SELECT posts.*, users.username, users.profile_pic FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?',
      [postId]
    );
    return posts.length > 0 ? posts[0] : null;
  }

  static async findByTopicId(topicId, limit = 10, offset = 0) {
    const topicIdInt = parseInt(topicId, 10); // Convertir topicId en entier
    const limitInt = parseInt(limit, 10); // Convertir limit en entier
    const offsetInt = parseInt(offset, 10); // Convertir offset en entier

    if (isNaN(topicIdInt) || isNaN(limitInt) || isNaN(offsetInt)) {
      throw new Error('Invalid topicId, limit or offset');
    }

    const [posts] = await db.execute(
      'SELECT posts.*, users.username, users.profile_pic FROM posts JOIN users ON posts.user_id = users.id WHERE posts.topic_id = ?',
      [topicIdInt]
    );

    return posts;
  }

  static async findByUserId(userId) {
    const [posts] = await db.execute(
      'SELECT posts.*, users.username, users.profile_pic FROM posts JOIN users ON posts.user_id = users.id WHERE posts.user_id = ?',
      [userId]
    );
    return posts;
  }

  static async update(postId, title, content, tags) {
    await db.execute(
      'UPDATE posts SET title = ?, content = ?, tags = ? WHERE id = ?',
      [title, content, tags, postId]
    );
  }

  static async delete(postId) {
    await db.execute('DELETE FROM posts WHERE id = ?', [postId]);
  }

  static async like(postId) {
    await db.execute('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId]);
  }

  static async dislike(postId) {
    await db.execute('UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?', [postId]);
  }
}

module.exports = Post;
