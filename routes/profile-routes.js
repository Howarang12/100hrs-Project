const router = require('express').Router()
const authCheck = require('../middleware/ensureAuth')

router.get('/', authCheck.ensureAuth,  (req, res) => {
  res.render('profile', {user: req.user})
})

module.exports = router