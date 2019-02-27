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
    if (Object.keys(req.files).length !== 2) {
        const result = {
            code: 400,
            data: 'must upload 2 images'
        };
        res.status(result.code).send(result);
        return;
    }

    const data = {
        display_name: req.body.display_name,
        theme: req.body.theme,
        creator: req.jwt.sub,
        duration: req.body.duration,
        image_1: '/' + req.files.image_1[0].path,
        image_2: '/' + req.files.image_2[0].path
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            data: 'mandatory multipart/form-data parameters: display_name, theme, creator, duration, image_1, image_2'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await Poll.createPersonal(
        req.app.locals.db,
        data.display_name, data.theme,
        data.creator, data.duration,
        data.image_1, data.image_2
    );

    res.status(result.code).send(result);
});

const uploadChallenge = upload.fields([{ name: 'image_1', maxCount: 1 }]);
router.post('/challenge', Auth.validate, uploadChallenge, async (req, res) => {
    if (Object.keys(req.files).length !== 1) {
        const result = {
            code: 400,
            data: 'must upload 1 image'
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
        image_1: '/' + req.files.image_1[0].path
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            data: 'mandatory multipart/form-data parameters: display_name, theme, creator, opponent, duration, image_1'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await Poll.createChallenge(
        req.app.locals.db,
        data.display_name, data.theme,
        data.creator, data.opponent,
        data.duration, data.image_1
    );

    res.status(result.code).send(result);
});

router.get('/challenge/requests', Auth.validate, async (req, res) => {
    const data = {
        username: req.jwt.sub
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            data: 'invalid JWT'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await Poll.getChallengeRequests(
        req.app.locals.db,
        data.username
    );

    res.status(result.code).send(result);
});

router.put('/challenge', Auth.validate, async (req, res) => {
    const result = await Poll.AcceptChallengeRequest(
        req.app.locals.db
    );

    res.status(result.code).send(result);
});

router.get('/:id', Auth.validate, async (req, res) => {
    const data = {
        id: req.params.id
    };

    if (!utils.validateObject(data)) {
        const result = {
            code: 400,
            data: 'mandatory URL endpoint: id'
        };
        res.status(result.code).send(result);
        return;
    }

    const result = await Poll.getById(
        req.app.locals.db, data.id
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
