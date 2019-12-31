import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddSupplier from "./addSupplier";
import AutoComplete from "../autocompletion/autocompletion";
import customers from "../../store/Middleware/customers";
import Pagination from "react-js-pagination";
// const Supplier = (props)=>{
class Customersledgers extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      customer: { id: 0 },
      customers: [],
      area: {}
    };
  }

  updateState = evt => {
    debugger;
    console.log(evt);
    this.state[evt.target.id] = evt.target.value;
    // this.setState(this.state);
    console.log("area", this.state.area);
    let filterdCustomer = this.state.customers.filter(customer => {
      if (evt.target.id === "area") {
        return customer.area._id == evt.target.value;
      } else if (evt.target.id === "customer") {
        return customer.firstName == evt.target.value;
      } else {
        return customer;
      }
    });

    console.log("fl", filterdCustomer);
    if (evt.target.value) {
      this.setState({ customers: filterdCustomer });
    }
  };

  componentDidMount() {
    this.setState({
      customers: this.props.data.customers
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedCustomer =this.state.customers.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    return (
      <section className="app-section">
        <div className="row">
          <div class="input-field col s5">
            <AutoComplete
              property="name"
              defaultValue="thsisfd"
              defaultValue={this.props.data.customers[0]}
              onChange={(evt, area) => {
                area &&
                  this.updateState({
                    target: {
                      id: "area",
                      value: area._id
                    }
                  });
              }}
              data={this.props.data.areas}
              placeholder="Select Area"
            />
          </div>

          <div class="input-field col s5">
            <AutoComplete
              property="firstName"
              defaultValue={this.props.data.customers[0]}
              onChange={(evt, customer) => {
                customer &&
                  this.updateState({
                    target: {
                      id: "customer",
                      value: customer.firstName
                    }
                  });
              }}
              data={this.state.customers.filter(customer => {
                return customer.area._id == this.state.area;
              })}
              placeholder="Select Customer"
            />
          </div>
        </div>
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Suppliers</h4>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>FULL NAME</th>
                <th>COMPANY</th>
                <th className="wd-200">PHONE</th>
                <th className="wd-200">ADDRESS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {renderedCustomer.map((supplier, i) => {
                return (
                  <tr>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{supplier.code}</td>
                    <td>
                      {supplier.firstName + " " + (supplier.lastName || "")}
                    </td>
                    <td>{supplier.company.name}</td>
                    <td className="wd-200">{supplier.phone}</td>
                    <td className="wd-200">{supplier.address}</td>
                    <td>
                      <Link to={"/accountsdetails/" + supplier.id}>
                        <img className="icon" src="/images/details-icon.png" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={renderedCustomer.length}
              totalItemsCount={this.state.customers.length}
              pageRangeDisplayed={renderedCustomer.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
          </center>
      </section>
    );
  }
}
export default connect(store => {
  return {
    data: {
      ...store.customerReducer
    }
  };
})(Customersledgers);
