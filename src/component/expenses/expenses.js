import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddExpense from './addExpenses';

// const User = (this.props) => {
class Expenses extends React.Component {


    state = {
        targetUser: { areas: [] },
        openUserForm: false
    }

    // let [addingUser, showAddUser] = useState(false);

    render = () => {

        // let uIndex = this.props.data.users.indexOf(this.state.targetUser);

        // uIndex == -1 && (
        //     this.state.targetUser = this.props.data.users.find((user) => {
        //         return user._id == this.state.targetUser._id;
        //     }) || {
        //         areas: []
        //     }
        // );

        return <section className="app-section">
            {this.state.openUserForm ? <AddExpense user={this.state.targetUser} showAddUser={() => {
                this.setState({
                    openUserForm: false,
                })
            }} /> : null}
            <div className="label-head">
                <img src="/images/label-head.png" />
                <h4>Expenses</h4>
            </div>
            <div className="row">
                <div class="input-field col s3">
                    <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                    <label className="adjusted-label" for="first_name">Search Users</label>
                </div>
            </div>

            <div>

                <table>
                    <thead>
                        <tr>
                            <th>SR.</th>
                            <th>EXPENSE CODE</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                            <th className="wd-200">NOTES</th>
                            <th>
                                {<img onClick={() => {
                                    this.setState({
                                        targetUser: {                                          
                                        },
                                        openUserForm: true
                                    });
                                }} className="icon add-item" src="/images/add-icon.png" />}
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.data.expenses.map((user, i) => {
                            return <tr>
                                <td><b>{(i + 1)}</b></td>
                                <td>{user.code}</td>
                                <td>{user.amount}</td>
                                <td>{new Date(user.date).toDateString()}</td>
                                <td className="wd-200">{user.notes}</td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>


        </section>

    }

}
export default connect((store) => {
    return {
        data: store.expensesReducer
    }
})(Expenses);