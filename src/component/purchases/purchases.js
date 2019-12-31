import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import AddSales from './addSales';

const Purchases = (props) => {

    let [addingSales, showAddSales] = useState(false);

    return <section className="app-section">
        {/* <AddSales visible={addingSales} showAddSales={showAddSales} /> */}
        <div className="label-head">
            <img src="/images/label-head.png" />
            <h4>Purchase Orders</h4>
        </div>
        <div className="row">
            <div class="input-field col s3">
                <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                <label className="adjusted-label" for="first_name">Search Purchases</label>
            </div>
        </div>

        <div>

            <table>
                <thead>
                    <tr>
                        <th>SR.</th>
                        <th>BIL</th>
                        <th className="wd-200">Supplier</th>
                        <th>TOTAL</th>
                        <th>DISCOUNT</th>
                        <th>NET BILL</th>
                        <th>SALES DATE</th>
                        <th>DELIVERY</th>
                        <th>TIME</th>
                        <th>
                            {<img onClick={() => {
                                props.history.push('/newpurchase');
                            }} className="icon add-item" src="/images/add-icon.png" />}
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {props.data.purchases.map((purchase, i) => {
                        console.log('pur',purchase)
                        return <tr>
                            <td><b>{(i + 1)}</b></td>
                            <td>{purchase.billNo}</td>
                            <td className="wd-200">{purchase.supplier.firstName + ' ' + purchase.supplier.lastName}</td>
                            <td>{purchase.total}</td>
                            <td>{purchase.discount}</td>
                            <td>{purchase.total - purchase.discount}</td>
                            <td>{new Date(purchase.salesDate).toDateString()}</td>
                            <td>{new Date(purchase.deliveryDate).toDateString()}</td>
                            <td>{purchase.time}</td>
                            <td>
                                <Link to={'/details/' + purchase.id}>
                                    <img className="icon" src="/images/details-icon.png" />
                                </Link>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>


    </section>

}


export default connect((store) => {
    return {
        data: store.purchaseReducer
    }
})(Purchases);