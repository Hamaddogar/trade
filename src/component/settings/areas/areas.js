import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddArea from "./addArea";
import middleware from "../../../store/Middleware/area";
import Pagination from "react-js-pagination";

// const Area = (this.propss) => {
class Area extends React.Component {
  // let [addingArea, showAddArea] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10
    };
  }

  state = {
    targetArea: {},
    openAreaForm: false
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  toggleStatus = company => {
    company.status = !company.status;
    this.props.toggleState(company);
  };
  render() {
    // pagination Code
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedProjects = this.props.data.areas.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    return (
      <section className="app-section">
        {this.state.openAreaForm ? (
          <AddArea
            area={this.state.targetArea}
            showAddArea={() => {
              this.setState({
                openAreaForm: false
              });
            }}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Areas</h4>
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
              Search Areas
            </label>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <div></div>
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th className="wd-200">NAME</th>
                <th className="wd-200">LAST UPDATED</th>
                <th>
                  <img
                    onClick={() => {
                      // showAddArea(true)
                      this.setState({
                        targetArea: {},
                        openAreaForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {renderedProjects.map((area, i) => {
                return (
                  <tr>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{area.code}</td>
                    <td className="wd-200">{area.name}</td>
                    <td className="wd-200">
                      {new Date(area.lastUpdated).toDateString()}
                    </td>
                    <td>
                      <img
                        title="Edit"
                        onClick={() => {
                          this.setState({
                            targetArea: area,
                            openAreaForm: true
                          });
                        }}
                        className="icon pointer"
                        src="/images/table-icons/edit-icon.png"
                      />
                      <button
                        onClick={this.toggleStatus.bind(null, area)}
                        className={
                          area.status
                            ? "control-btn"
                            : "control-btn disabled-btn"
                        }
                      >
                        {area.status ? "Activate" : "Deactivate"}
                      </button>
                    </td>
                    {/* <td>
                    <Link to={'/accountsdetails/'+supplier.id}>
                            <img className="icon" src="/images/details-icon.png" />
                    </Link>
                     </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Paggination Code */}
          <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={renderedProjects.length}
              totalItemsCount={this.props.data.areas.length}
              pageRangeDisplayed={renderedProjects.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
          </center>
        </div>
      </section>
    );
  }
}

export default connect(
  store => {
    return {
      data: store.areaReducers
    };
  },
  dispatch => {
    return {
      toggleState: args => {
        dispatch(middleware.toggleAreaState(args));
      }
    };
  }
)(Area);
