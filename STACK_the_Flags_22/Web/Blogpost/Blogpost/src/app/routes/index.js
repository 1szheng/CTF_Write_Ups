import express from 'express';
import multer from 'multer';
export const router = express.Router();
import { viewPosts } from '../bot.js';
import { sign, verify } from '../helpers/JWTHelper.js';
import auth from '../middleware/AuthMiddleware.js';

let db;
const response = data => ({ message: data });
const upload = multer();

export default function routes(db) {
        
    router.get('/', async (req, res)=>{
        res.status(200)
        res.render('index.html');
    });

    router.get('/login', (req, res)=>{
        res.status(200);
        res.render('login.html');
    });

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        if (username && password) {
            return db.loginUser(username, password)
                .then(user => {
                    sign({ username: user.username})
                        .then(token => {
                            res.cookie('session', token, { maxAge: 43200000 });
                            res.send(response('Success'));
                        })
                })
                .catch(() => res.status(403).send(response('Failure')));
        }
        return res.status(500).send(response('Failure'));
    });

    router.get('/register', async (req, res)=>{
        res.status(200);
        res.render('register.html');
    });

    router.post('/register', async (req, res) => {
        const { username, password } = req.body;

        if (username && password) {
            return db.getUser(username)
                .then(user => {
                    if (user) return res.status(401).send(response('Failure'));
                    return db.registerUser(username, password)
                        .then(()  => res.status(200).send(response('Success')))
                })
                .catch(() => res.status(500).send(response('Error')));
        }
        return res.status(401).send();
    });

    router.get('/blog', auth, async (req, res)=>{
        let posts = await db.listPosts();
        var user = await db.getUser(req.user.username)
        res.status(200);
        res.render(`blog.html`, { posts, user });
    });

    router.get('/post', auth, async (req, res)=>{
        var user = await db.getUser(req.user.username)
        res.status(200);
        res.render(`post.html`, { user });
    });

    router.post('/post', auth, async (req, res)=>{
        const { title, content } = req.body;
        if (title && content) {
            db.addPost(title, req.user.username, content)
                .then(async () => {
                    if (req.user.username != 'admin') { 
                        await viewPosts();
                    }
                    res.status(200).send(response('Success'))})
                .catch(() => {console.log('oof');res.status(500).send(response('Error'))});
        }
    });

    router.get('/settings', auth, async (req, res)=>{
        var username = req.user.username;
        var user = await db.getUser(username)
        res.status(200);
        res.render('settings.html', { user});
    });

    router.get('/theme', auth, async (req, res)=>{
        var user = await db.getUser(req.user.username)
        if (user.theme === 'light') {
            user.theme = 'dark';
        } else {
            user.theme = 'light';
        }
        db.updateTheme(user)
        res.send(response(user.theme));
    });

    router.get('/profile', auth, async (req, res)=>{
        var user = await db.getUser(req.user.username)
        res.status(200);
        res.render(`profile.html`, { user });
    });


    router.get('/logout', auth, async (req, res) => {
        res.clearCookie('session');
        return res.redirect('/');
    });

    return router;
}

/*
module.exports = database => {
	db = database;
	return router;
};
*/
