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
    let error = "";
    if(artist === ""){
        error = error + "Artist, ";
    }
    if(year === ""){
        error = error + "Year, ";
    }
    if(album === ""){
        error = error + "Album, ";
    }
    if(cover === ""){
        error = error + "Cover, ";
    }
    if(genre === ""){
        error = error + "Genre, ";
    }
    if(score === ""){
        error = error + "Score, ";
    }
    if(review === ""){
        error = error + "Review ";
    }

    if (error.length > 0){
        res.render('error_post', {error});
    }
    else {
        enlaceServicio.addPost({artist, year, album, cover, genre, score, review, comment});
        res.render('saved_post');
    }

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
    let{ artist, year, album, cover, genre, score, review, comment} = req.body;
    let id = req.params.id;
    enlaceServicio.editPost({artist, year, album, cover, genre, score, review, comment}, id);
    res.render('saved_post');
});

router.post('/post/:id/update', (req, res) => {
    const {artist, year, album, cover, genre, score, review, comment } = req.body;
    const postId = req.params.id; 
    const commentArray = comment ? [comment]: []; 
    enlaceServicio.updatePost(postId, {artist, year, album, cover, genre, score, review, comment: commentArray[0], });
    res.redirect(`/post/${postId}`);
});


router.get('/post/:id/delete', (req, res) =>{
    enlaceServicio.deletePost(req.params.id);
    res.render('deleted_post'); });


    
export default router;