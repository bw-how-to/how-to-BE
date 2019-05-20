module.exports = type => {
  return function(req, res, next) {
    if (req.decodedJwt.type.includes(type)) {
      next();
    } else {
      res.status(403).json({ message: 'You must be logged in as a Creator to make,edit or delete content!' });
    }
  };
};
