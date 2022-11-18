const express = require("express");
const promotionRouter = express.Router();
const authenticate = require("../authenticate");

const Promotion = require("../models/promotion");

promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find()
      .then((paromotion) => res.status(200).json(paromotion))
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.deleteMany()
      .then((paromotion) => res.status(200).json(paromotion))
      .catch((err) => next(err));
  });

promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId),
      {
        $set: req.body,
      },
      { new: true }
        .then((promotion) => res.status(200).json(promotion))
        .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  });

module.exports = promotionRouter;
