import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";
import { API } from "../../API";

function ProfitLoss() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  const [todate, settodate] = useState("");
  const [fromdate, setfromdate] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);

  const ProfitLossAPI = async () => {
    try {
      let res = await API.get(
        `Loss_Profit?uid=${uId}&fromDate=${fromdate}&toDate=${todate}`
      );
      res = res.data.data;
      console.log("ProfitLossAPI", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch ProfitLossAPI API", e);
    }
  };

  useEffect(() => {
    ProfitLossAPI();
  }, []);

  const indexOfLastPost = currentPage * listPerpage;
  const indexOfFirstPage = indexOfLastPost - listPerpage;
  const currentPost = tableData.slice(indexOfFirstPage, indexOfLastPost);
  return (
    <div>
      <Navbar />
      <main class="main_root wrapper">
      <div style={{ backgroundColor: "#9595a4" }} className="sidebar_respon">
        <AllSide />
        </div>
        {/* <!-----=======body section start=======----> */}
        <div id="content">
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="section_bg">
                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="section_heading">
                            <h2>Profit Loss</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="col-md-12 mod_12">
                          <div className="col-md-2">
                            <label className="fromdate">From Date</label>
                            <input
                              className="from-control"
                              type="date"
                              value={fromdate}
                              onChange={(e) => setfromdate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="todate">To Date</label>
                            <br />
                            <input
                              className="from-control"
                              type="date"
                              value={todate}
                              onChange={(e) => settodate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn submit_BTN"
                              // type="submit"
                              value="Submit"
                              onClick={() => ProfitLossAPI()}
                              readOnly
                            />
                          </div>
                        </div>
                        <br />
                      </from>
                    </div>
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead className="Statement_head">
                            <tr>
                              <th>No</th>
                              <th>User</th>
                              <th>Event</th>
                              <th>Event Type</th>
                              <th>Yes</th>
                              <th>No</th>
                              <th>Profit/Loss</th>
                              <th>Stack Amount</th>
                              <th>Win Amount</th>
                              <th>Profit Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  {(currentPage - 1) * listPerpage + index + 1}
                                </td>
                                <td>{item.username}</td>
                                {/* <td>{moment(item.edate[0]).format(
                                        "DD/MM/YYYY h:m:s A"
                                        team
                                      )}</td> */}
                                <td>{item.remark}</td>
                                <td>{item.team}</td>
                                <td>{item.back}</td>
                                <td>{item.lay}</td>

                                <td>
                                  {item.matchstatus == "0" ? (
                                    <span className="badge badge-danger">
                                      Loss
                                    </span>
                                  ) : (
                                    <span className="badge badge-success">
                                      Profit
                                    </span>
                                  )}
                                </td>

                                <td>{item.amount}</td>
                                <td>{item.winamount}</td>
                                <td>{item.profitamount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-center mt-2">
                          <Table_Buttons
                            indexOfFirstPage={indexOfFirstPage}
                            indexOfLastPost={indexOfLastPost}
                            setcurrentPage={setcurrentPage}
                            currentPage={currentPage}
                            totalData={tableData.length}
                            listPerpage={listPerpage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-----=======body section end=========----> */}
      </main>
    </div>
  );
}

export default ProfitLoss;
