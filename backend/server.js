const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();
const renderTemplate = require('./utils/renderTemplate');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  res.locals.user = req.session.userId ? { id: req.session.userId, isAdmin: req.session.isAdmin } : null;
  res.locals.messages = req.flash();
  next();
});

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const topicRoutes = require('./routes/topicRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/topics', topicRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  renderTemplate(res, 'index');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
