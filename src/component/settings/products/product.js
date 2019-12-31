import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddProduct from './addProduct';
import Pagination from "react-js-pagination";                                       

// const Product = (this.props)=>{
class Product extends React.Component {
       constructor(props)
       {
           super(props)
          this.state={
           activePage: 1,
           itemPerPage: 10,
           targetProduct: {
            company: {},
            category: {}
        },
        openProductForm: false
          }
       }
       handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
      }

    render() {
    
        let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
        let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
        let renderedproducts = this.props.data.products.slice(
          indexOfFirstitem,
          indexOfLastitem
        );

        //    let [addingProduct, showAddProduct] = useState(false);
        

        return <section className="app-section">
            {this.state.openProductForm ? <AddProduct product={this.state.targetProduct} showAddProduct={() => {
                this.setState({
                    targetProduct: {
                        company: {},
                        category: {}
                    },
                    openProductForm: false
                })
            }} /> : null}
            <div className="label-head">
                <img src="/images/label-head.png" />
                <h4>Products</h4>
            </div>
            <div className="row">
                <div class="input-field col s3">
                    <input placeholder="Placeholder" id="productID" type="text" class="validate" />
                    <label className="adjusted-label" for="productID">Search Products</label>
                </div>
            </div>

            <div>

                <table>
                    <thead>
                        <tr>
                            <th className="wd-20">SR.</th>
                            <th>CODE</th>
                            <th className="wd-200">NAME</th>
                            <th>SUPPLIER</th>
                            <th>COST</th>
                            <th>SHOPKEEPPER PRICE</th>
                            <th>MARGIN</th>
                            <th>CUSTOMER PRICE</th>
                            <th>QTY</th>
                            <th>TIME</th>
                            <th>
                                {/* {this.props.showAddBtn &&   */}
                                <img onClick={() => {
                                    // showAddProduct(true)
                                    this.setState({
                                        targetProduct:{
                                            company: {},
                                            category: {}
                                        },
                                        openProductForm:true
                                    });
                                }} className="icon add-item" src="/images/add-icon.png" />
                                {/* } */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* TBC, product purchasing should be hanlde seperately, inlist  */}

                        {this.props.data.products.map((product, i) => {
                            return <tr>
                                <td className="wd-20"><b>{(i + 1)}</b></td>
                                <td>{product.code}</td>
                                <td className="wd-200">{product.name}</td>
                                {/* <td>{product.product.name}</td> */}
                                <td>{product.company.name}</td>
                                <td>{product.cost}</td>
                                <td>{product.shopkeeperPrice}</td>
                                <td>{product.margin}</td>
                                <td>{product.customerPrice}</td>
                                <td>{product.productQty}</td>
                                <td>{product.time}</td>
                                <td>
                                <img title="Edit" onClick={() => {
                                        this.setState({
                                            targetProduct: product,
                                            openProductForm: true
                                        })
                                    }
                                    } className="icon pointer" src="/images/table-icons/edit-icon.png" />
                                    <Link to={'/accountsdetails/' + product.id}>
                                        <img className="icon" src="/images/details-icon.png" />
                                    </Link>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
            <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={renderedproducts.length}
              totalItemsCount={this.props.data.products.length}
              pageRangeDisplayed={renderedproducts.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
          </center>

        </section>

    }

}
    export default connect((store) => {
        return {
            data: store.productReducers
        }
    }) (Product);