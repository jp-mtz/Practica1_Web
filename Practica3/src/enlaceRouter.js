import express from 'express';
import { getAlbums } from './albums.js';

const router = express.Router();

router.get('/', (req, res) => {

    const albums = getAlbums(0,4);

    res.render('index', {
        albums: albums
    });
});

router.get('/albums', (req, res) => {

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const albums = getAlbums(from,to);

    res.render('albums', {
        albums: albums
    });
});

export default router;