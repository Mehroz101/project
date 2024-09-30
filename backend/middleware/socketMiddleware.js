// middleware/socketMiddleware.js

// Middleware to attach the Socket.IO instance to the request object
const attachSocketIo = (io) => (req, res, next) => {
    req.io = io;
    next();
  };
  
  module.exports = attachSocketIo;
  