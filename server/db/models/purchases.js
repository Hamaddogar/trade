const mongoose = require('mongoose');

module.exports = mongoose.model('Purchase', {
    supplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Supplier"
    },
    payments: [],
    total:0,
    discount:Number,
    billNo:Number,
    deliveryDate:Date
});


// this.state = {
//     deleteDialog: false,
//     customer: { id: 0 },
//     payments: [],       
//     area: {},
//     bills: [
//         this.putNewOrder()
//     ]
// }