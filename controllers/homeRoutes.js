const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    try { 
      const postData = await Post.findAll({
          include: [
            {
                model: User,
                attributes: ["userName"]
            },
        ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(req.session.cookie.logged_in)
    console.log(req.session)
    res.render("homepage", {
        posts, 
        loggedIn: req.session.loggedIn 
    })
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  });

router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {
      loggedIn: req.session.loggedIn
    });
  });


  router.get('/dashboard', async (req, res) => {
    try {

      const userData = await User.findByPk(req.session.userId, {
        include: [{model: Post}]
      })

      const user = userData.get({ plain: true });
      res.render('dashboard', {
        user,
        loggedIn: req.session.loggedIn 
      });

    } catch (err) {
      res.status(500).json(err);
    }
    
  })

module.exports = router