const mongoose = require('mongoose');

module.exports = mongoose.model('Sale', {
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customer"
    },
    area: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Area"
    },
    payments: [],
    total:0,
    discount:Number,
    billNo:Number,
    salesDate: Date,
    deliveryDate:Date,
    notes:String
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