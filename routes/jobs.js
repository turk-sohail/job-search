const router = require("express").Router();
const {getAll,getJob,deleteJob,updateJob,createJob} = require("../controllers/jobs");


router.route("/").get(getAll).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router