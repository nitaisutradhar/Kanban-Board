const admin = require('../firebase');

const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1];

  if (!token) return res.status(401).send({ message: 'Unauthorized Access!' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    next()
  } catch (err) {
    console.log('JWT error:', err);
    return res.status(401).send({ message: 'Unauthorized Access!' });
  }
};

module.exports = verifyJWT;
