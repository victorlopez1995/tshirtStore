const Sequence = require("../models/sequence");

var maxProductId;
// var maxMessageId;
// var maxContactId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxProductId = sequence.maxProductId;
    //   maxMessageId = sequence.maxMessageId;
    //   maxContactId = sequence.maxContactId;
    })
    .catch((err) => {
        // return console.log(err)
      return res.status(500).json({
        title: "An error occurred",
        error: err
      });
    });
}
SequenceGenerator.prototype.nextId =  function (collectionType) {
  var updateObject = {};
  var nextId;
  switch (collectionType) {
    case "products":
      maxProductId++;
      updateObject = { maxProductId: maxProductId };
      nextId = maxProductId;
      break;
    // case "messages":
    //   maxMessageId++;
    //   updateObject = { maxMessageId: maxMessageId };
    //   nextId = maxMessageId;
    //   break;
    // case "contacts":
    //   maxContactId++;
    //   updateObject = { maxContactId: maxContactId };
    //   nextId = maxContactId;
    //   break;
    default:
      return -1;
  }
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
  .then(result => console.log(result))
  .catch((err) => {
        console.log("nextId error = ", err);
        return null;
  });
  return nextId;
};
module.exports = new SequenceGenerator();