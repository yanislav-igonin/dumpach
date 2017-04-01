import express from 'express';
import path from 'path';

const router = express.Router();

router.use((req, res, next) => {
    console.log(req.method, req.url, (new Date).toUTCString());
    next();
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../view/main.html'));
});

router.get('/threads/:threadId', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../view/thread.html'));
});

module.exports = router;