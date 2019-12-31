const Sale = require("../db/models/sale");

module.exports = {
  api_getAll(args) {
    var args = args || {};

    return new Promise((c, e) => {
      this.get(args, function(err, sales) {
        if (err) {
          e(err);
        } else {
          c(sales);
        }
      });
    });
  },
  get(args, cb) {
    return Sale.find(args)
      .populate("area company customer")
      .exec(cb);
  },
  createSale(data, cb) {
    let newSale = new Sale(data);
    data.lastUpdated = new Date();
    newSale.save(cb);
  },
  removeSale(id, cb) {
    return Sale.findOneAndRemove({ id: id }, cb);
  }
};
