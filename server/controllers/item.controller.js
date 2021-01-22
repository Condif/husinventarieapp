const Item = require("../models/item.model");

// GET ALL
const getAllItems = async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
};
// GET ONE
const getItemsById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.status(200).json(item);
      } catch (err) {
        res.status(500).json(err);
      }
};
// CREATE NEW 
const createNewItem = async (req, res) => {
  const newItem = {
    itemName: req.body.itemName,
    userParentId: req.session.userId,
    imageId: req.body.imageId,
    description: req.body.description,
    receipt: req.body.receipt,
    orderDate: req.body.orderDate,
    warranty: req.body.warranty,
    projectId: req.body.projectId,
    roomId: req.body.roomId,
  }
    const item = new Item(newItem);

    item.save((err, item) => {
        if (err) {
        console.log("error", err);
        res.status(400).json(err);
        } else res.status(201).json(item);
    });
};

// UPDATE
const updateItem = async (req, res) => {
    try {
        
      let item = await Item.findById(req.params.itemId);
  
      if (item) {
        item.itemName = req.body.itemName;
        item.imageId = req.body.imageId;
        item.description = req.body.description;
        item.receipt = req.body.receipt ;
        item.orderDate = req.body.orderDate;
        item.projectId = req.body.projectId;
        item.roomId = req.body.roomId;
        item.warranty = req.body.warranty;
        await item.save();
  
        res.status(200).json(item);
      } else {
        res.status(404).json({ status: "Item not found in db" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };


// DELETE

const deleteItem = async (req, res) => {
    try {
      const removedItem = await Item.deleteOne({ _id: req.params.itemId });
      res.status(200).json({message: "Item deleted"});
    } catch (err) {
      res.status(500).json(err);
    }
  };
module.exports = {
    getAllItems,
    getItemsById,
    createNewItem,
    updateItem,
    deleteItem
};