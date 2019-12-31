import React from "react";
import Dashboard from "./dasboard/dashboard";
import Login from "./loginForm/loginform";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import Supplier from "./accounts/supplier";
import Product from "./settings/products/product";
import CompanySettings from "./settings/companies/companySettings";

import CategorySettings from "./settings/categories/categories";
import AreaSettings from "./settings/areas/areas";

import Attendance from "./attendance/attendance";
import Store from "./settings/store/settings";

import Sales from "./sales/sales";
import NewSale from "./sales/newSale";

import Salary from "./settings/salary/salary";

import Expenses from "./expenses/expenses";

import SupplierDetails from "./accounts/supplierDetails";
import SupplierSettings from "./accounts/supplier";
import Customersledgers from "./accounts/customersledgers";
import CustomerSettings from "./settings/customers";
import UserSettings from "./settings/users/users";

import NewPurchase from "./purchases/newPurchases";
import Purchase from "./purchases/purchases";

import Header from "./navbar/navbar";

import Recovery from "./recovery/recovery";

class Main extends React.Component {
  render() {
    let getitemALL = JSON.parse(localStorage.getItem("persist:root"));
   

    return (
      <>
        {Object.keys(JSON.parse(getitemALL.loginReducers).loggedInUser).length != 0 ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        {this.props.loggedInUser ? <Header/> : <Redirect to="/login" />}


        {/* {this.props.children} */}
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/login" component={Login} />

        {/* <Route path='/accounts' component={Login}/> */}
        <Route path="/accounts/suppliers" component={Supplier} />
        <Route path="/accounts/customersledgers" component={Customersledgers} />

        <Route path="/accountsdetails/:id" component={SupplierDetails} />

        <Route path="/attendance" component={Attendance} />

        <Route path="/sales" component={Sales} />
        <Route path="/newsale" component={NewSale} />

        <Route path="/recovery" component={Recovery} />

        <Route path="/newpurchase" component={NewPurchase} />
        <Route path="/purchases" component={Purchase} />

        <Route path="/expenses" component={Expenses} />

        <Route path="/reporting" component={Login} />

        <Route path="/salary" component={Salary} />

        <Route path="/settings/store" component={Store} />

        <Route path="/settings" component={Login} />
        <Route path="/settings/companies" component={CompanySettings} />
        <Route path="/settings/categories" component={CategorySettings} />
        <Route
          path="/settings/customers"
          render={() => {
            return <CustomerSettings showAddBtn={true} />;
          }}
        />

        <Route
          path="/settings/products"
          render={() => {
            return <Product />;
          }}
        />

        <Route path="/settings/users" component={UserSettings} />
        <Route path="/settings/areas" component={AreaSettings} />

        <Route
          path="/settings/suppliers"
          render={() => {
            return <SupplierSettings showAddBtn={true}></SupplierSettings>;
          }}
        />

        {this.props.menuReducers.loadedMenu.length ? (
          <div className="menu-container flex">
            {this.props.menuReducers.loadedMenu.map(item => {
              return (
                <Link to={item.link}>
                  <div className="menuitem">
                    <img src={"/" + item.icon} />
                    <div className="label">{item.name}</div>
                    {/* {item} */}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(store => {
  return {
    menuReducers: store.dropdownReducers,
    ...store.loginReducers
  };
})(withRouter(Main));
