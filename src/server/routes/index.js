import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../views/main.html'));
});

router.get('/threads/:threadId', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../views/main.html'));
});

module.exports = router;