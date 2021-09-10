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
    console.log(req.session.logged_in)
    console.log(req.session)
    res.render("homepage", { 
        logged_in: req.session.logged_in,
        posts
    })
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  });

router.get('/login', (req, res) => {

    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {
      logged_in: req.session.logged_in
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
        logged_in: req.session.logged_in 
      });

    } catch (err) {
      res.status(500).json(err);
    }
    
  })

module.exports = router