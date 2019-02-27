const router = require('express').Router();

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: 'public/uploads/polls/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage });

const Auth = require('../Auth');
const Poll = require('../../models/Poll');

const uploadPersonal = upload.fields([{ name: 'image_1', maxCount: 1 }, { name: 'image_2', maxCount: 1 }])
router.post('/personal', Auth.validate, uploadPersonal, async (req, res) => {
    console.log(req.files);
    console.log(req.body);

    const result = await Poll.createPersonal(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.post('/challenge', Auth.validate, async (req, res) => {
    const result = await Poll.createChallenge(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests', Auth.validate, async (req, res) => {
    const result = await Poll.getChallengeRequests(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/challenge', Auth.validate, async (req, res) => {
    const result = await Poll.AcceptChallengeRequest(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/search', Auth.validate, async (req, res) => {
    const result = await Poll.search(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.put('/vote', Auth.validate, async (req, res) => {
    const result = await Poll.vote(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

module.exports = router;
