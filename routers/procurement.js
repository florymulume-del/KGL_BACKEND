const express = require("express");
const router = express.Router();
const Procurement = require("../modules/procurement");

const auth = require("../middlewares/auth");
const { managerOnly } = require("../middlewares/roles");




// CREATE

// CREATE (Managers only)
router.post("/", auth, managerOnly, async (req,res)=>{


  try{
    const data = await Procurement.create(req.body);
    res.status(201).json({success:true, data});
  }catch(err){
    res.status(400).json({success:false,message:err.message});
  }
});

// READ WITH PAGINATION
router.get("/", auth, async (req,res)=>{


  try{
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||5;
    const skip = (page-1)*limit;
    const total = await Procurement.countDocuments();
    const data = await Procurement.find().sort({createdAt:-1}).skip(skip).limit(limit);
    res.json({
      success:true,
      currentPage: page,
      totalPages: Math.ceil(total/limit),
      totalRecords: total,
      data
    });
  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
});

// UPDATE

  // UPDATE SALE
// UPDATE (Managers only)
router.put("/:id", auth, managerOnly, async (req,res)=>{


  try{
    const updated = await Procurement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument:"after", runValidators:true }
    );
    res.json({success:true, data:updated});
  }catch(err){
    res.status(400).json({success:false,message:err.message});
  }
});

// DELETE
// DELETE (Managers only)
router.delete("/:id", auth, managerOnly, async (req,res)=>{

  try{
    await Procurement.findByIdAndDelete(req.params.id);
    res.json({success:true,message:"Procurement deleted"});
  }catch(err){
    res.status(400).json({success:false,message:err.message});
  }
});

module.exports = router;


