const router = require("express").Router();
const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const itemsController = require("./controllers/itemsController");

// add: routes
router.use(homeController);
router.use(authController);
router.use(itemsController);
router.use((req, res) => {
  res.render("home/404");
});
module.exports = router;
