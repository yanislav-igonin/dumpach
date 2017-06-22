const path = require('path');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../views/index.html'));
    });
    app.get('/threads/:threadId', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../views/index.html'));
    });
};