const express = require('express');
const log = require('loglevel');
const bodyParser = require('body-parser');
const { isUserLoaded } = require('../services/auth');
const req = require('express/lib/request');

module.exports = function () {
    const router = express.Router();
    router.use(bodyParser.json());

    router.post()

    router.delete('/:id', async (req, {
        headers: {
            Authorization: isUserLoaded,
        },
        data: {
            user: req.user.userId,
        },
    })

    return router;
};  