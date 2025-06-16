const admin = require('firebase-admin');
//firebase admin sdk
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString(
  'utf-8'
)
var serviceAccount = JSON.parse(decoded)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
