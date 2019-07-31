const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
const Status = require('../models/Status');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
const parser = require('../config/cloud');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const userLogged = req.session.currentUser._id;
    const userAlbums = await User.findById(userLogged).populate({
      path: 'albums',
      populate: {
        path: 'photos'
      }
    });
    res.render('user/profile', userAlbums);
  } catch (err) {
    next(err);
  }
});

router.get('/edit', isNotLoggedIn, (req, res, next) => {
  res.locals.title = 'Perfil';
  res.render('user/edit');
});

router.get('/edit/account', isNotLoggedIn, (req, res, next) => {
  res.locals.title = `Cuenta`;
  res.render('user/editaccount');
});

router.get('/edit/security', isNotLoggedIn, (req, res, next) => {
  res.locals.title = `Seguridad`;
  res.render('user/editsecurity');
});

router.post('/edit/security', isNotLoggedIn, async (req, res, next) => {
  const { oldpassword, password, repassword } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const currentUser = req.session.currentUser.username;
  const user = await User.findOne({ username: currentUser });
  if (password === repassword) {
    if (bcrypt.compareSync(oldpassword, user.password)) {
      try {
        const newPasswordHashed = bcrypt.hashSync(password, salt);
        await User.findByIdAndUpdate(req.session.currentUser._id, { password: newPasswordHashed });
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    }
  } else {
    res.redirect('/t/profile/edit/security');
  }
});

router.post('/updateStatus', isNotLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const status = req.body.status;
    const newStatus = await Status.create({ status, userId });
    const statusId = newStatus._id;
    await User.findByIdAndUpdate(userId, { $push: { status: statusId } });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.post('/edit/account', isNotLoggedIn, async (req, res, next) => {
  const { username } = req.body;
  const idUser = req.session.currentUser._id;
  await User.findByIdAndUpdate(idUser, { username });
  req.session.currentUser.username = username;
  res.redirect(`/t/user/${req.session.currentUser.username}`);
});

router.post('/edit/profile', isNotLoggedIn, async (req, res, next) => {
  const { name, surnames, description, job, studies } = req.body;
  const idUser = req.session.currentUser._id;
  await User.findByIdAndUpdate(idUser, { name, surnames, description, job, studies });
  req.session.currentUser.name = name;
  req.session.currentUser.surnames = surnames;
  req.session.currentUser.description = description;
  req.session.currentUser.job = job;
  req.session.currentUser.studies = studies;
  res.redirect(`/t/user/${req.session.currentUser.username}`);
});

router.post('/changepic', isNotLoggedIn, parser.single('profileImg'), async (req, res, next) => { // parser.array('photo', 8)
  const imageUrl = req.file.secure_url;
  const idUser = req.session.currentUser._id;
  await User.findByIdAndUpdate(idUser, { profileImg: imageUrl });
  req.session.currentUser.profileImg = imageUrl;
  res.redirect('/t/profile/edit');
});
router.post('/upload', isNotLoggedIn, parser.array('photo', 8), async (req, res, next) => {
  const files = req.files;
  const album = req.body.album;
  console.log(album);
  files.forEach(async (element) => {
    const newPhoto = await Photo.create({ photo: element.secure_url, idAlbum: album });
    await Album.findByIdAndUpdate(album, { $push: { photos: newPhoto._id } });
  });
  res.redirect(`/t/user/${req.session.currentUser.username}`);
});

module.exports = router;
