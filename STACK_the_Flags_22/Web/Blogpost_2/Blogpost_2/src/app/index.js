import express from 'express';
const app = express();
import path from 'path';
import Database from './database.js';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import nunjucks from 'nunjucks';

const db = new Database('jagablog.db');

app.use(function (req, res, next) {
	res.setHeader(
	  'Content-Security-Policy',
	  "default-src 'self'; script-src 'self' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src-elem 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self';"
	);
	next();
  });

app.use(express.json());
app.use(cookieParser()); 

nunjucks.configure('templates', { autoescape: false, express: app });
app.use('/static', express.static(path.resolve('static')));
app.set('templates', './templates');

//app.use(routes(db))
app.use('/', routes(db));

app.use(function(err, req, res, next) {
	res.status(500).json({message: 'Something went wrong!'});
});

(async () => {
	await db.connect();
	await db.migrate();
	app.listen(1337, '0.0.0.0', () => console.log('Listening on port 1337'));
})();
