// import history from '../../historyProvider';
import messages from "../../message";
import { toast } from "react-toastify";
import { connect } from "react-redux";

export default {
  /// Needs Customer ID and desired state
  deleteSale(data) {
    return dispatch => {
      fetch("/api/purchases/delete", {
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
              type: "PURCHASE_ORDER_DELETED"
            });
            toast.success(messages.purchase.created);
          } else {
            toast.error(messages.purchase.error.cannotCreate);
          }
        });
    };
  },
  createSale(data) {
    return dispatch => {
      fetch("/api/purchases/create", {
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
          if (sale._id) {
            dispatch({
              type: "PURCHASE_CREATED",
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
