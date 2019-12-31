import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddSales from './addSales';

const Sales = props => {
  let getEditData = (data) => {
  localStorage.setItem('_id',data._id)

  };

  return (
    <section className="app-section">
      {/* <AddSales visible={addingSales} showAddSales={showAddSales} /> */}
      <div className="label-head">
        <img src="/images/label-head.png" />
        <h4>Sale Orders</h4>
      </div>
      <div className="row">
        <div class="input-field col s3">
          <input
            placeholder="Placeholder"
            id="first_name"
            type="text"
            class="validate"
          />
          <label className="adjusted-label" for="first_name">
            Search Sales
          </label>
        </div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>SR.</th>
              <th>BIL</th>
              <th className="wd-200">CUSTOMER</th>
              <th>TOTAL</th>
              <th>DISCOUNT</th>
              <th>NET BILL</th>
              <th>SALES DATE</th>
              <th>DELIVERY</th>
              <th>TIME</th>
              <th>
                {
                  <Link to="/newsale">
                    <img
                      // onClick={() => {
                      //   props.history.push("/newsale");
                      // }}
                      className="icon add-item"
                      src="/images/add-icon.png"
                    />
                  </Link>
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data.sales.map((sale, i) => {
              return (
                <tr key={i}>
                  <td>
                    <b>{i + 1}</b>
                  </td>
                  <td>{sale.billNo}</td>
                  <td className="wd-200">
                    {sale.customer.firstName + " " + sale.customer.lastName}
                  </td>
                  <td>{sale.total}</td>
                  <td>{sale.discount}</td>
                  <td>{sale.total - sale.discount}</td>
                  <td>{new Date(sale.salesDate).toDateString()}</td>
                  <td>{new Date(sale.deliveryDate).toDateString()}</td>
                  <td>{sale.time}</td>
                  <td>
                    <Link
                      to={"/newsale/" + sale._id}
                      onClick={() => getEditData(sale)}
                    >
                      <img
                        title="Edit"
                        className="icon pointer"
                        src="/images/table-icons/edit-icon.png"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default connect(store => {
  return {
    data: store.salesReducer
  };
})(Sales);
