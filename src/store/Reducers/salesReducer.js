import utlities from "../../utlities";

let initialData = {
  sales: [
    // { _id: 1, area: "a1", customer: { name: "c1" }, data: new Date(), deliveryDate: new Date(), notes: "" },
    // { _id: 2, area: "a2", customer: { name: "c2" }, data: new Date(), deliveryDate: new Date(), notes: "" },
    // { _id: 3, area: "a3", customer: { name: "c3" }, data: new Date(), deliveryDate: new Date(), notes: "" },
    // { _id: 4, area: "a4", customer: { name: "c4" }, data: new Date(), deliveryDate: new Date(), notes: "" },
    // { _id: 5, area: "a5", customer: { name: "c5" }, data: new Date(), deliveryDate: new Date(), notes: "" },
  ]
};

export default (state = initialData, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "persist/REHYDRATE":
      action.payload && (newState.sales = action.payload.salesReducer.sales);
      break;

    case "SALES_LOADED":
      newState.sales = action.payload;
      break;

    case "SALE_CREATED":
      newState.sales.push(action.payload);
      break;
    // case "SALE_UPDATED":
    //   debugger;
    //   newState.sales.map(sale => {
    //     if (sale._id == action.payload._id) {
    //       console.log("sale", sale);
    //       return sale;
    //     }
    //   });
    //   break;
    case "SALE_STATUS_UPDATED":
      newState.sales.forEach(sale => {
        if (sale._id == action.payload._id) {
          sale.status = action.payload.status;
          return false;
        }
      });
      break;
  }

  newState.saleCode = utlities.getID("EXP", "billNo", newState.sales, true);

  return newState;
};
