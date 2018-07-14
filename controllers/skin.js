const express = require("express");
const router = express.Router();
const models = require("../models");
const skins = models.skins;

router.get("/info", function(req, res) {
  let result = skins.getSkinInfo(req.body.uuid);
  res.send(JSON.stringify(result));
});
//
router.get("/skins", function(req, res) {
  let result = skins.getSkins(req.body.category);
  res.send(JSON.stringify(result));
});

module.exports = router;
