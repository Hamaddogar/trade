import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddPayment from '../addPayment/addPayment';

const SupplierDetails = (props) => {

    // let payment = 0;
    let [addingPayment, setPayment] = useState(false);

    const toggleMenu = (open) => {
        console.log(props.match.params)
        // console.log("A");
        setPayment(open);

    }

    const onPaymentAdded = (paymentAmount) => {

        props.addPaymentToSupplier({
            supplierID: props.match.params.id,
            totalPayable: 7500,
            amountPaid: paymentAmount,
            date: new Date()
        });

        setPayment(false);


    }

    return <section className="app-section">
       {addingPayment && <AddPayment visible={addingPayment} toggleMenu={toggleMenu} onPaymentAdded={onPaymentAdded} /> }
        <div className="label-head">
            <img src="/images/label-head.png" />
            <h4>Account Details</h4>
        </div>
        <div className="row">
            <div class="input-field col s3">
                {/* <input placeholder="Placeholder" id="supplierSearch" type="text" class="validate" />
                <label className="adjusted-label" for="supplierSearch">Search Payment</label> */}
            </div>
        </div>

        <div>

            <table>
                <thead>
                    <tr>
                        <th className="wd-200">TOTAL PAYABLE</th>
                        <th className="wd-200">AMOUNT PAID</th>
                        <th className="wd-200">BALANCE</th>
                        <th className="wd-200"></th>
                        <th>
                            <img onClick={() => {
                                toggleMenu(true)
                            }} className="icon add-item" src="/images/add-icon.png" />
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {props.data.supplierAccounts.map((supplierAcc, i) => {

                        return <tr>
                            <td className="wd-200">{supplierAcc.totalPayable}</td>
                            <td className="wd-200">{supplierAcc.amountPaid}</td>
                            <td className="wd-200">{supplierAcc.totalPayable - supplierAcc.amountPaid}</td>
                            {/* <td className="wd-200">{new Date(supplierAcc.date).toDateString()}</td> */}
                            <td className="wd-200"></td>
                        </tr>;

                    })}

                </tbody>
            </table>
        </div>


    </section>


}

export default connect((store) => {
    return {
        data: store.dataReducers
    }
}, (dispatch) => {
    return {
        addPaymentToSupplier(args) {
            dispatch({
                type: 'PAY_TO_SUPPLIER',
                payload: args
            })
        }
    }
})(SupplierDetails);

// fetch the supplier array filter the the suppler with paramms id 