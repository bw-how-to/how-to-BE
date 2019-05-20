module.exports = type => {
  return function(req, res, next) {
    if (req.decodedJwt.type && req.decodedJwt.type.includes(type)) {
      next();
    } else {
      res.status(403).json({ you: 'you have no power here!' });
    }
  };
};