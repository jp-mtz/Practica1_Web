import express from 'express';
import * as enlaceServicio from './enlaceServicio.js';

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index', {
        posts: enlaceServicio.getPosts()
    });
});

router.post('/post/new', (req,res) => {
    let{ user, title, text} = req.body;
    enlaceServicio.addPost({ user, title, text});
    res.render('saved_post');
});

router.get('/post/:id', (req, res) => {
    let post = enlaceServicio.getPost(req.params.id); 
    res.render('show_post', { post });
});
router.get('/post/:id/delete', (req, res) =>{
    enlaceServicio.deletePost(req.params.id);
    res.render('deleted_post'); });


export default router;