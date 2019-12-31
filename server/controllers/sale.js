let router = require("express").Router();
let api = require("../api/sale");

router.post("/create", (req, res) => {
  // req.body.customer = req.body.customer.id;

  api.createSale(req.body, (err, sale) => {
    sale.populate("customer", (err, sale) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(sale);
      }
    });
  });
});
router.post("/deleteSale", (req, res) => {
  api.deleteSale(req.body, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});

module.exports = router;
