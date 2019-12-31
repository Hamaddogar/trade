const Purchase = require('../db/models/purchases');

module.exports = {
    api_getAll(args) {

        var args = args || {};

        return new Promise((c, e) => {

            this.get(args, function (err, sales) {

                if (err) {
                    e(err);
                } else {
                    c(sales);
                }

            });

        });

    },
    get(args, cb) {

        return Purchase.find(args).populate('supplier').exec(cb);

    },
    createPurchase(data, cb) {

        let newPurchase = new Purchase(data);
        newPurchase.save(cb)
        // data.lastUpdated = new Date();

    },
    removePurchase(id, cb) {

        return Purchase.findOneAndRemove({ id: id }, cb);

    }
   
}