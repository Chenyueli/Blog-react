const Koa = require('koa')
const path = require('path');
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const staticCache  = require("koa-static-cache");
const config = require('./config');

const app = new Koa()

// https://github.com/Automattic/mongoose
const mongoose = require('mongoose');

mongoose.connect(config.db,  { useNewUrlParser:true }, (err) => {
  if (err) {
      console.error('Failed to connect to database');
  } else {
      console.log('Connecting database successfully');
  }
});

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// routes
app.use(index.routes(), index.allowedMethods())
app.use(require('koa-static')(__dirname + '../build'))
app.use(staticCache (path.resolve(__dirname,'../build'),{
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}));
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3008';
// app.set('port', port);

app.listen(port, () => {
  console.log('listen on:' + port);
});
