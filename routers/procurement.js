const express = require("express");
const router = express.Router();
const Procurement = require("../modules/procurement");
const auth = require("../middleware/auth");
const { managerOnly } = require("../middleware/roles");
const {getAllProcurement,createProcurement,updateProcurement,deleteProcurement} = require("../controllers/procurement.js");
// CREATE (Managers only)
router.post("/", auth, managerOnly,createProcurement);
router.get("/", auth,getAllProcurement );
// UPDATE (Managers only)
router.put("/:id", auth, managerOnly,updateProcurement );
// DELETE (Managers only)
router.delete("/:id", auth, managerOnly,deleteProcurement);

module.exports = router;


