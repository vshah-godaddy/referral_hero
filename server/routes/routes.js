const router = require("express").Router();

const UserRoutes = require('./user');
const TestRoutes = require('./test');

router.use('/users',UserRoutes);
router.use('/tests',TestRoutes);

module.exports = router;