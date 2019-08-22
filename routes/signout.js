var express = require('express');
var router = express.Router();

/* sign-out the currently signed-in user */
router.get('/', async (req, res, next) => {
    if (!req.user) {
        res.status(409).json({ error: 'no user is logged in' });
    }
    await req.logout();
    console.log(req.user);
    res.redirect('/');
}
);

module.exports = router;
