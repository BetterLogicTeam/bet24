import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "../Dropdown/AllSide";
import "../Dropdown/AllSide";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";
import { API } from "../../API";

function Direct_Income() {
    const user = sessionStorage.getItem("user");
    let ress = JSON.parse(user);
    let uId = ress.resultid;
    const [tableData, setTableData] = useState([]);
    
    const [currentPage, setcurrentPage] = useState(1);
    const [listPerpage, setlistPerpage] = useState(100);
  
    const DirectIncome_Api = async () => {
      try {
        let res = await API.get(
          `direct_income_list?uid=${uId}`
        );
        res = res.data.data;
        console.log("DirectIncome", res);
        setTableData(res);
      } catch (e) {
        console.log("Error While Fatch Bet_History API", e);
      }
    };
  
    useEffect(() => {
      DirectIncome_Api();
    }, []);
  
    
  
    const indexOfLastPost = currentPage * listPerpage;
    const indexOfFirstPage = indexOfLastPost - listPerpage;
    const currentPost = tableData.slice(indexOfFirstPage, indexOfLastPost);
  
  return (
    <div>
      <Navbar />
      <main class="main_root wrapper">
        <AllSide />
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
                            <h2>Direct Income</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                      </from>
                    </div>
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Income</th>
                              <th>Investment</th>
                              <th>Date</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item,index) => (
                              <tr key={item.id}>
                                <td>{(currentPage - 1) * listPerpage +index+1}</td>
                                <td>{item.income}</td>
                                <td>{item.onamount}</td>
                                <td>{item.edate}</td>
                                <td>{item.remark }</td>                             
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
        {/* <!-----=======body section end=========----> */}
      </main>
    </div>
  )
}

export default Direct_Income