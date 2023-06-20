const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'user', password: 'password' }
];

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);

  if (!user) {
    return done(null, false, { message: 'Usuário não encontrado' });
  }

  if (user.password !== password) {
    return done(null, false, { message: 'Senha incorreta' });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(require('express-session')({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
