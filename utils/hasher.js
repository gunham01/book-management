const config = require('../config');
const crypto = require('crypto');

function hash(str) {
    const hmac = crypto.createHmac('sha256', config.secretkey);
    return hmac.update(str).digest('hex');
}

module.exports = hash;
