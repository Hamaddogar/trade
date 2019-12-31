import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddCustomer from './addCustomer';
import Pagination from "react-js-pagination";

// const Customer = (props)=>{

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 1,
          itemPerPage: 10
        };
      }
    

state = {
    openCustomerForm:false
    // addingCustomer:false,
    // editingCustomer:false
}

    //    let [addingCustomer, showAddCustomer] = useState(false);

    //    let [editingCustomer, showEditCustomer] = useState(false);
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
      }
    render() {

        let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
        let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
        let renderedcustomers = this.props.data.customers.slice(
          indexOfFirstitem,
          indexOfLastitem
        );
        return <section className="app-section">
            {this.state.openCustomerForm && <AddCustomer customer={this.state.targetCustomer} showAddCustomer={(flag)=>{
                this.setState({
                   openCustomerForm:false
                });
            }} />
        }
            <div className="label-head">
                <img src="/images/label-head.png" />
                <h4>Customers</h4>
            </div>
            <div className="row">
                <div class="input-field col s3">
                    <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                    <label className="adjusted-label" for="first_name">Search Customers</label>
                </div>
            </div>

            <div>

                <table>
                    <thead>
                        <tr>
                            <th>SR.</th>
                            <th>CODE</th>
                            <th>AREA</th>
                            <th>FULL NAME</th>
                            <th>COMPANY</th>
                            <th className="wd-200">PHONE</th>
                            <th className="wd-200">ADDRESS</th>
                            <th>
                                {this.props.showAddBtn && <img onClick={() => {
                                    this.setState({
                                        targetCustomer:{
                                            company:{},
                                            area:{}
                                        },
                                        openCustomerForm:true
                                    });
                                }} className="icon add-item" src="/images/add-icon.png" />}
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {renderedcustomers.map((customer, i) => {
                            return <tr>
                                <td><b>{(i + 1)}</b></td>
                                <td>{customer.code}</td>
                                <td>{customer.area.name}</td>
                                <td>{customer.firstName + ' ' + (customer.lastName || '')}</td>
                                <td>{customer.company.name}</td>
                                <td className="wd-200">{customer.phone}</td>
                                <td className="wd-200">{customer.address}</td>
                                <td>
                                    <img title="Edit" onClick={()=>{
                                        this.setState({
                                            targetCustomer:customer,
                                            openCustomerForm:true
                                        })
                                    }
                                    } className="icon pointer" src="/images/table-icons/edit-icon.png" />
                                    <Link to={'/accountsdetails/' + customer.id}>
                                        <img className="icon" src="/images/details-icon.png" />
                                    </Link>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
                {/* Paggination Code */}
          <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={renderedcustomers.length} 
              totalItemsCount={this.props.data.customers.length}
              pageRangeDisplayed={renderedcustomers.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
          </center>
            </div>


        </section>

    }

}


export default connect((store) => {
    return {
        data: store.customerReducer
    }
})(Customer);