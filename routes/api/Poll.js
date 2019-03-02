const router = require('express').Router();

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: 'static/uploads/polls/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage });

const Auth = require('../Auth');
const utils = require('../../tools/utils');
const Poll = require('../../models/Poll');

const uploadPersonal = upload.fields([{ name: 'image_1', maxCount: 1 }, { name: 'image_2', maxCount: 1 }]);
router.post('/personal', Auth.validate, uploadPersonal, async (req, res) => {
    if (!req.files || Object.keys(req.files).length !== 2) {
        const result = {
            code: 400,
            data: 'request must be multipart/form-data and must include 2 images'
        };
        res.status(result.code).send(result);
        return;
    }

    const data = {
        display_name: req.body.display_name,
        theme: req.body.theme,
        creator: req.jwt.sub,
        duration: req.body.duration,
        scope: req.body.scope,
        image_1: '/' + req.files.image_1[0].path,
        image_2: '/' + req.files.image_2[0].path
    };

    const result = await Poll.createPersonal(
        req.app.locals.db,
        data.display_name, data.theme,
        data.creator, data.duration, data.scope,
        data.image_1, data.image_2
    );

    res.status(result.code).send(result);
});

const uploadChallenge = upload.fields([{ name: 'image', maxCount: 1 }]);
router.post('/challenge', Auth.validate, uploadChallenge, async (req, res) => {
    if (!req.files || Object.keys(req.files).length !== 1) {
        const result = {
            code: 400,
            data: 'request must be multipart/form-data and must include 1 image'
        };
        res.status(result.code).send(result);
        return;
    }

    const data = {
        display_name: req.body.display_name,
        theme: req.body.theme,
        creator: req.jwt.sub,
        opponent: req.body.opponent,
        duration: req.body.duration,
        scope: req.body.scope,
        image: '/' + req.files.image[0].path
    };

    const result = await Poll.createChallenge(
        req.app.locals.db,
        data.display_name, data.theme,
        data.creator, data.opponent,
        data.duration, data.scope,
        data.image
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub
    };

    const result = await Poll.getChallengeRequests(
        req.app.locals.db,
        data.username
    );

    res.status(result.code).send(result);
});

const uploadAcceptChallengeRequest = upload.fields([{ name: 'image', maxCount: 1 }]);
router.put('/challenge/request/:id', Auth.validate, uploadAcceptChallengeRequest, async (req, res) => {
    if (!req.files || Object.keys(req.files).length !== 1) {
        const result = {
            code: 400,
            data: 'request must be multipart/form-data and must include 1 image'
        };
        res.status(result.code).send(result);
        return;
    }

    const data = {
        id: req.params.id,
        username: req.jwt.sub,
        image: '/' + req.files.image[0].path
    };

    const result = await Poll.acceptChallengeRequest(
        req.app.locals.db,
        data.id, data.username, data.image
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests/accepted', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub
    };

    const result = await Poll.getAcceptedChallengeRequests(
        req.app.locals.db,
        data.username
    );

    res.status(result.code).send(result);
});

router.put('/challenge/request/accepted/:id', Auth.validate, async (req, res) => {
    const data = {
        id: req.params.id,
        username: req.jwt.sub
    };

    const result = await Poll.startChallenge(
        req.app.locals.db,
        data.id, data.username
    );

    res.status(result.code).send(result);
});

router.get('/search/private', Auth.validate, async (req, res) => {
    const data = {
        themes_query: req.query.themes,
    };

    const result = await Poll.searchPrivate(
        req.app.locals.db,
        data.themes_query
    );

    res.status(result.code).send(result);
});

router.get('/search/public', Auth.validate, async (req, res) => {
    const data = {
        themes_query: req.query.themes,
    };

    const result = await Poll.searchPublic(
        req.app.locals.db,
        data.themes_query
    );

    res.status(result.code).send(result);
});

router.put('/vote/:id', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub,
        id: req.params.id,
        vote: req.body.vote
    };

    const result = await Poll.vote(
        req.app.locals.db,
        data.id, data.username, data.vote
    );

    res.status(result.code).send(result);
});

router.get('/:id', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub,
        id: req.params.id
    };

    const result = await Poll.getById(
        req.app.locals.db,
        data.username, data.id
    );

    res.status(result.code).send(result);
});

module.exports = router;
