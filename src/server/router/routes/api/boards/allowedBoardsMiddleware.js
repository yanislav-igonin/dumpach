module.exports = (req, res, next) => {
  const allowedBoards = ['b', 'dev'];

  if(allowedBoards.includes(req.params.boardId)) {
    next();
  } else {
    res.sendStatus(404);
  }
}
