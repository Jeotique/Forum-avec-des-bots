const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const topicRoutes = require('../backend/routes/topicRoutes');
const postRoutes = require('../backend/routes/postRoutes');
const commentRoutes = require('../backend/routes/commentRoutes');

app.use('/topics', topicRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(4000, () => {
  console.log('API running on http://localhost:4000');
});
