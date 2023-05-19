const Items = require("../models/Items");

exports.getAll = () => Items.find({});

exports.getOne = (itemsId) => Items.findById(itemsId).lean();

exports.create = (ownerId, itemData) =>
  Items.create({...itemData, owner: ownerId});

exports.edit = (itemId, itemData) => Items.findByIdAndUpdate(itemId, itemData);

exports.delete = (itemId) => Items.findByIdAndDelete(itemId);

// exports.comment = async (itemId, userId, comment) => {
//   const item = await Items.findById(itemId);
//   item.commentList.push({
//     userID: userId,
//     comment: comment,
//   });
// };
exports.buy = async (userId, itemId) => {
  const item = await Items.findById(itemId);
  item.boughtBy.push(userId);
  return item.save();
};
