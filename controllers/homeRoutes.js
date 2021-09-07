const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log(req.session);
  console.log(req.session.loggedIn)
    try { 
      const postData = await Post.findAll({
          include: [
            {
                model: User,
                attributes: ["userName"]
            },
        ],
    });
    //   res.status(200).json(postData)
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts)
    res.render("homepage", {
        posts, 
        loggedIn: req.session.loggedIn 
    })
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  });

// router.get('/', async (req, res) => {
//     try {
//         res.render("homepage", {
//             posts, 
//             loggedIn: req.session.loggedIn 
//         })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route

    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {
      loggedIn: req.session.loggedIn
    });
  });

  // router.post('/logout', (req, res) => {
  //   if (req.session.loggedIn) {
  //     req.session.destroy(() => {
  //       res.status(204).end();
  //     });
  //   } else {
  //     res.status(404).end();
  //   }
  // });

  router.get('/dashboard', async (req, res) => {
    try {
      console.log(req.session)
      const userData = await User.findByPk(req.session.userId, {
        include: [{model: Post}]
      })
      // console.log(userData)
      const user = userData.get({ plain: true });
      res.render('dashboard', {
        user,
        loggedIn: req.session.loggedIn 
      });
      console.log(user);
    } catch (err) {
      res.status(500).json(err);
    }
    
  })

module.exports = router