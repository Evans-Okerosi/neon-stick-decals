const express = require('express');

const router = express.Router();

// auth check middleware
const authCheckMiddleware = require('../../middleware/auth-check');

router.use('/info', authCheckMiddleware);
module.exports = router;
