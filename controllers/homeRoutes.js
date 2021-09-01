const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try { 
      const postData = await Post.findAll({
          include: [
            {
                model: User,
                attributes: ["user_name"]
            },
        ],
    });
    //   res.status(200).json(postData)
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render("homepage", {
        posts, 
        logged_in: req.session.logged_in 
    })
    } catch(err) {
      res.status(500).json(err)
    }
  });

// router.get('/', async (req, res) => {
//     try {
//         res.render("homepage", {
//             posts, 
//             logged_in: req.session.logged_in 
//         })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {
      logged_in: req.session.logged_in
    });
  });

  // router.post('/logout', (req, res) => {
  //   if (req.session.logged_in) {
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
      const userData = await User.findByPk(1, {
        include: [{model: Post}]
      })
      // console.log(userData)
      const user = userData.get({ plain: true });
      res.render('dashboard', {
        user,
        logged_in: req.session.logged_in 
      });
      console.log(user);
    } catch (err) {
      res.status(500).json(err);
    }
    
  })

module.exports = router