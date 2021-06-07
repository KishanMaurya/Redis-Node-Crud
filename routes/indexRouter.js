const express = require("express");
const router = express.Router();
const redisController = require("../controller/indexController");

router.post("", async (req, res) => {
    try {
        let payload = {
            userId: req.body.userId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        };
      console.log(payload);
      const response = await redisController.redisPost(payload);
      return res.status(response.code).send(response);
    } catch (e) {
      return res.send(e.message);
    }
});

router.get("", async (req, res) => {
    try {
      const response = await redisController.redisGet();
      return res.status(response.code).send(response);
    } catch (e) {
      return res.send(e.message);
    }
});

router.get("by_id", async (req, res) => {
    try {
        let payload = {
            name: req.query.id,
        };
      const response = await redisController.redisSingleGet(payload);
      return res.status(response.code).send(response);
    } catch (e) {
      return res.send(e.message);
    }
});

router.put("", async (req, res) => {
    try {
        let payload = {
            id : req.body.id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        };
      const response = await redisController.redisUpdate(payload);
      return res.status(response.code).send(response);
    } catch (e) {
      return res.send(e.message);
    }
});

router.delete("", async (req, res) => {
    try {
        let payload = { 
            id: req.query.id,
        };
        console.log(payload);
      const response = await redisController.redisDelete(payload);
      return res.status(response.code).send(response);
    } catch (e) {
      return res.send(e.message);
    }
});

module.exports = router;