import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";

export default {
  /// Needs Customer ID and desired state
  deleteSale(data) {
    return dispatch => {
      fetch("/api/sales/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(company => {
          if (company._id) {
            dispatch({
              type: "SALE_ORDER_DELETED"
            });
            toast.success(messages.area.created);
          } else {
            toast.error(messages.area.error.cannotCreate);
          }
        });
    };
  },
  createSale(data) {
    return dispatch => {
      fetch("/api/sales/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(sale => {
          // console.log(sale);
          if (sale._id) {
            dispatch({
              type: "SALE_CREATED",
              payload: sale
            });
            toast.success(messages.sales.saved);
          } else {
            toast.error(messages.sales.error.cannotCreate);
          }
        });
    };
  }
};
