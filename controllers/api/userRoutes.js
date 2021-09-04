const router = require('express').Router();
const { User, Post } = require('../../models');


// router.get('/', async (req, res) => {
//     try {
//         const userData = await User.findAll();
//         res.status(200).json(userData);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// })


// router.get('/:id', async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [
//         {
//           model: Post
//         }
//       ]
//     })
//     res.status(200).json(userData)
//   } catch (err) {
//     res.status(500).json(err);
//   }
  
// })


//Sign up
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userName = userData.dataValues.userName;
      req.session.userId = userData.dataValues.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
    console.log(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


//login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({ where: { userName: req.body.userName } });
    

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.dataValues.id;
      req.session.userName = userData.dataValues.userName;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    console.log(userData.dataValues);
    console.log(req.session);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  res.json({message: "You are now logged out"})
});



module.exports = router;
