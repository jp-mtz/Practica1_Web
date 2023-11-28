import express from 'express';
import * as enlaceServicio from './enlaceServicio.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('RockolaMainPage', {
        posts: enlaceServicio.getPosts()
    });
});

router.post('/post/new', (req,res) => {
    let{ artist, year, album, cover, genre, score, review, comment} = req.body;
    enlaceServicio.addPost({artist, year, album, cover, genre, score, review});
    res.render('saved_post');
});

router.get('/post/:id', (req, res) => {
    let post = enlaceServicio.getPost(req.params.id); 
    res.render('RockolaPagDetallada', { post });
});

router.get('/post/:id/edit', (req, res) => {
    let post = enlaceServicio.getPost(req.params.id); 
    res.render('pagEditRockola', { post });
});

router.post('/post/:id/edit/edits', (req, res) => {
    let{ artist, year, album, cover, genre, score, review} = req.body;
    let id = req.params.id;
    enlaceServicio.editPost({artist, year, album, cover, genre, score, review}, id);
    res.render('saved_post');
});

router.post('/post/:id/update', (req, res) => {
    let {artist, year, album, cover, genre, score, review, comment} = req.body;
    let postId = req.params.id; 
    comment = comment || {};
    enlaceServicio.updatePost(postId, {artist, year, album, cover, genre, score, review, comment: { content: comment.content, user: comment.user, score1: comment.score1 } });
    res.redirect('/');
});

router.get('/post/:id/delete', (req, res) =>{
    enlaceServicio.deletePost(req.params.id);
    res.render('deleted_post'); });


    
export default router;