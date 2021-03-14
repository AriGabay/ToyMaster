const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);

const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
// Express App Config
app.use(express.json());
app.use(session);

if (process.env.NODE_ENV !== 'production') {
  const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030'],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(
    express.static(
      path.resolve(
        'C:\\Users\\Ari Gabay\\OneDrive\\שולחן העבודה\\Ari Gabay\\Day50-MongoDB\\New folder\\frontend',
        'dist'
      )
    )
  );
}

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const toyRoutes = require('./api/toy/toy.route');
const reviewRoutes = require('./api/review/review.routes');
const { connectSockets } = require('./services/socket.service');

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

app.use('/api/auth', authRoutes);
app.use('/api/toy', toyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
connectSockets(http, session);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
  res.sendFile(
    path.join(
      'C:\\Users\\Ari Gabay\\OneDrive\\שולחן העבודה\\Ari Gabay\\Day50-MongoDB\\New folder\\frontend\\dist',
      'index.html'
    )
  );
});

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});