import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./AllSide.css";
import AllSide from "./AllSide";
import moment from "moment";
import Table_Buttons from "../Table_Buttons/Table_Button";
import { API } from "../../API";

function Bet_History_Drop() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  let { name, type } = useParams();

  const [cricketMatches, setCricketMatches] = useState([]);
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);
  let navigate = useNavigate();
  const PlaceBet_History = async () => {
    try {
      let res = await API.get(`BetHistory?id=${uId}`);
      res = res.data.data;
      // console.log("PlaceBet_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch Bet_History API", e);
    }
  };

  const Current_Match = async (EventTypeID) => {
    // console.log("EventTypeIDCurrent_Match", EventTypeID);
    try {
      let res = await API.get(
        `GetAllCurrentMatches?eventTypeID=${EventTypeID}`
      );
      // res = res.data.data;
      seteventCatagory_Data(res.data.data);
      console.log("Current_Match", res.data.data);
    } catch (e) {
      console.log("Error While Fatch Current_Match API", e);
    }
  };

  const eventCatagory = async (EventTypeID) => {
    try {
      // console.log("EventType=>", EventTypeID, event_name);
      let res = await API.get(
        `GetAllCompetitionsData?EventTypeID=${EventTypeID}`
      );
      // console.log("Res", res.data);
      seteventCatagory(res.data);
    } catch (error) {
      console.log("Something Error in eventCatagory API", error);
    }
  };

  function handleClick() {
    let eventType1 = type ?? "4";
    let name1 = name ?? "Cricket";
    eventCatagory(eventType1);
    Current_Match(eventType1);
    setevent_Type(eventType1);
    setevent_name(name1);
  }

  useEffect(() => {
    handleClick();
  }, [name, type]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   Live_Score();
    PlaceBet_History();
    // }, 2000);
    // return () => clearInterval(intervalId);
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
                            <h2>Bet History</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        {/* <div className="col-md-12" style={{ display: "flex" }}>
                          <div className="col-md-2">
                          <label className="fromdate"></label>

                            <select
                              class="form-control"
                              aria-label="Default select example"
                            >
                              <option selected>All Sports</option>
                              
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-md-2">
                          <label className="fromdate"></label>
                            <select
                              class="form-control"
                              aria-label="Default select example"
                            >
                              
                              <option selected>Bet Status</option>
                              <option value="1">Matched</option>
                              <option value="2">Unmatched</option>
                            
                            </select>
                          </div>
                          <div className="col-md-2">
                            <label className="fromdate">From Date</label>
                            <input className="from-control" type="date" />
                          </div>
                          <div className="col-md-2">
                            <label className="todate">To Date</label>
                            <br />
                            <input className="from-control" type="date" />
                          </div>
                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn btn-info"
                              type="submit"
                              value="Submit"
                            />
                          </div>
                        </div> */}
                      </from>
                    </div>
                    <br />
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead className="Statement_head">
                            <tr>
                              <th>Matched Bet</th>
                              <th>Odds</th>
                              <th>Remark</th>
                              <th>Back</th>
                              <th>Lay</th>
                              <th>Date & Time</th>
                              <th>Ball Session</th>
                              <th>Match Id</th>
                              <th>Match Status</th>
                              <th>Status</th>
                              <th>Stake</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item) => (
                              <tr key={item.id}>
                                <td>{item.team}</td>
                                <td>{item.type}</td>
                                <td>{item.remark}</td>
                                <td>{item.back}</td>
                                <td>{item.lay}</td>
                                <td>
                                  {moment(item.edate).format(
                                    "DD/MM/YYYY h:m:s A"
                                  )}
                                </td>
                                <td>{item.ballsess}</td>
                                <td>{item.matchid}</td>
                                {item.status == "1" ? (
                                  <td>
                                    {item.MatchStatus == "0" ? (
                                      <div className="result5 text-center" style={{backgroundColor:"red"}}>
                                        -
                                      </div>
                                    ) : (
                                      <div className="result5 text-center" style={{backgroundColor:"green"}}>
                                        +
                                      </div>
                                    )}
                                  </td>
                                ) : (
                                  <td>
                                    {item.lay > 0 ? (
                                      <div className="result5" style={{backgroundColor:"#faa9ba"}}>.</div>
                                    ) : (
                                      <div className="result5">.</div>
                                    )}
                                  </td>
                                )}
                                <td>
                                  {item.status == "0" ? "Unsettled" : "Settled"}
                                </td>
                                <td>{item.stake}</td>
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

export default Bet_History_Drop;
