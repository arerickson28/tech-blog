const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoute = require("./homeRoutes");
const dashboardRoute = require("./dashboardRoutes");


router.use("/", homeRoute);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoute);

module.exports = router;