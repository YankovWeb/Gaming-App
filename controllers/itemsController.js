const router = require("express").Router();

const User = require("../models/User");

const {isAuth} = require("../middlewares/authenticationMiddleware");

const {getErrorMessage} = require("../utils/errorUtils");

const itemsService = require("../services/itemsService");

const authService = require("../services/authService");

const {map} = require("../constants");

router.get("/catalog", async (req, res) => {
  const items = await itemsService.getAll().lean();
  res.render("items/catalog", {items});
});

router.get("/create", (req, res) => {
  res.render("items/create");
});

router.post("/create", isAuth, async (req, res) => {
  debugger;
  const itemsData = req.body;

  try {
    await itemsService.create(req.user._id, itemsData);
  } catch (error) {
    return res
      .status(400)
      .render("items/create", {error: getErrorMessage(error)});
  }

  res.redirect("/catalog");
});

router.get("/:itemsId/details", async (req, res) => {
  //here must get needed information to use in the object to send to the template
  //is auth
  const item = await itemsService.getOne(req.params.itemsId);

  const isUser = Boolean(req.user);
  const isOwner = item?.owner == req.user?._id;
  const isBuyer = item.boughtBy.some((id) => id == req?.user?._id);
  const isNotOwner = !isOwner;

  res.render("items/details", {item, isOwner, isNotOwner, isUser, isBuyer});
});

router.get("/:itemId/edit", isAuth, async (req, res) => {
  const item = await itemsService.getOne(req.params.itemId);
  const platform = Object.keys(map).map((key) => ({
    value: key,
    label: map[key],
  }));

  res.render("items/edit", {item, platform});
});
router.post("/:itemId/edit", isAuth, async (req, res) => {
  const itemData = req.body;
  await itemsService.edit(req.params.itemId, itemData);

  //todo: check if owner
  res.redirect(`/${req.params.itemId}/details`);
});

router.get("/:itemId/delete", isAuth, async (req, res) => {
  await itemsService.delete(req.params.itemId);
  res.redirect("/catalog");
});

router.get("/:itemId/buy", isAuth, async (req, res) => {
  //todo check if user has alredy bougt
  await itemsService.buy(req.user, req.params.itemId);

  res.redirect(`/${req.params.itemId}/details`);
});

module.exports = router;
