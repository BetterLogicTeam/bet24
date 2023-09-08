import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import moment from "moment/moment";
import "./Dashboard.css";
import tv from "./tv-solid.svg";
import { API, API_Match } from "../../API";
import AllSide from "../Dropdown/AllSide";
import SideBar2 from "../Dropdown/SideBar2";
import { Scrollbars } from "react-custom-scrollbars";
import Mobile_side_bar from "../Mobile_side_bar/Mobile_side_bar";
import Dropdown from "react-bootstrap/Dropdown";
import { CgScreen } from "react-icons/cg";
import { GiGamepad } from "react-icons/gi";

function Dashboard() {
  let { name, type } = useParams();
  const [data, setData] = useState([]);

  const [cricketMatches, setCricketMatches] = useState([]);
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");
  const [play, setPlay] = useState("");
  let navigate = useNavigate();

  const Live_Match_Api = async () => {
    try {
      let res = await API.get(`getcricketmatches`);
      res = res.data.data;
      let data = res;
      console.log("setCricketMatches", data);
      setCricketMatches(data);
      setData(data);
    } catch (e) {
      console.log("Error While Fatch Live_Match_Api", e);
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

  useEffect(() => {
    Live_Match_Api();
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      let res = await API_Match.get("FetchAllMatchesData");
      // console.log("getAllEvents=>", res.data);
      setevents_Data(res.data);
    } catch (error) {
      console.log("Something Error in getAllEvents API", error);
    }
  };

  const eventCatagory = async (EventTypeID) => {
    try {
      // console.log("EventType=>", EventTypeID, event_name);
      let res = await API_Match.get(
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

  const InPlay = async (EventId) => {
    setPlay(EventId);
    try {
      let res = await API.get(`GetAllInPlayMatches`);
      res = res.data.data;
      console.log("InPlay", res);
    } catch (e) {
      console.log("Somthing");
    }
  };

  useEffect(() => {
    handleClick();
    // InPlay()
  }, [name, type]);

  return (
    <div>
      <Navbar />

      <ul className="d-flex ps-0">
        <li className="mobile_upper_links">inplay</li>
        <li className="mobile_upper_links">Sports</li>
        <li className="mobile_upper_links">Casino + slot</li>
        <li className="mobile_upper_links">Sports book</li>
        <li className="mobile_upper_links">Other</li>
      </ul>

      <main className="main_root wrapper">
        {/* <AllSide /> */}
        <div style={{ backgroundColor: "#9595a4" }} className="sidebar_respon">
          <SideBar2 />
        </div>
        {/*<!-----=======body section start=======----> */}
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Scrollbars className="Scrollbarss">
                  <ul className="blink2">
                    {eventCatagory_Data?.map((item, index) => {
                      const currentTime = new Date();
                      const itemTime = new Date(item.openDate);
                      if (itemTime < currentTime) {
                        return (
                          <li key={index}>
                            <span>{item.name}</span>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </ul>
                </Scrollbars>
                <div className=" tab-content_bg mt-2">
                  {/* mobile lower links and viewn by drop down starts */}
                  <Mobile_side_bar />

                  <div className="right  ">
                    <div className="content-left d-flex align-items-center gap-2">
                      <p className="view_by mb-0">view by</p>
                      <Dropdown className="main_here_drop">
                        <Dropdown.Toggle
                          variant=""
                          className="drop_mb_down"
                          id="dropdown-basic"
                        >
                        Time
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                          Time
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                           Competitions
                          </Dropdown.Item>
                         
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* ends here  */}

                  {/* this is used 0nly for desktop  */}

                  <ul
                    className="nav desktop_nav_bar  nav-pills d-flex"
                    role="tablist"
                  >
                    <h1></h1>
                    {/* <li className="nav-item">
                      <a href="" className="nav-link"
                      onClick={()=>{
                       navigate(/Dashboard/${items.name}/${items.eventType})
                      }}
                      >
                        Inplay
                      </a>
                    </li> */}
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <a
                        onClick={() => {
                          InPlay("Inplay");
                        }}
                        className="nav-link"
                      >
                        InPlay
                      </a>
                    </li>

                    {/* {events_Data?.slice(0, 3)?.map((items, index) => {
                      return (
                        <>
                          <li className="nav-item" key={index}>
                            <a
                              href=""
                              className="nav-link"
                              data-toggle="pill"
                              onClick={() => (
                                eventCatagory(items.eventType),
                                Current_Match(items.eventType),
                                setevent_Type(items.eventType),
                                setevent_name(items.name),
                                navigate(
                                  `/Dashboard/${items.name}/${items.eventType}`
                                )
                              )}
                            >
                              {items.name}
                            </a>
                          </li>
                        </>
                      );
                    })} */}
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        Horse Racing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        GreyHound Racing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        Kabaddi
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        Politics
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        Casino
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        INT Casino
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link">
                        Binary
                      </a>
                    </li>
                  </ul>

                  {/* ends here */}

                  {/* <!-----tab pane------>  */}

                  {/* this is the table that is being used for the  desktop */}
                  <div className="tab-content d-none d-lg-block ">
                    <div className="tab-content">
                      <div id="Home3" className="container tab-pane active">
                        <div className="">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  {/* <th scope="col">#</th>
                                  <th scope="col">id</th> */}
                                  <th scope="col">Game</th>
                                  {/* <th scope="col">OpenDate</th> */}
                                  <th scope="col"></th>
                                  <th scope="col" className="temp2"></th>
                                  <th scope="col" className="temp">
                                    1
                                  </th>
                                  <th scope="col" className="temp">
                                    X
                                  </th>
                                  <th scope="col" className="temp">
                                    2
                                  </th>
                                </tr>
                              </thead>
                              {play == "Inplay" ? (
                                <tbody className="text-white dashboard_game">
                                  {eventCatagory_Data?.map((item, index) => (
                                    <tr>
                                      {/* <th scope="row">{index + 1}</th>
                                    <td>{item.id}</td> */}
                                      <td>
                                        <a
                                          href=""
                                          style={{
                                            color: "grey",
                                            textDecoration: "none",
                                            textAlign: "center",
                                          }}
                                          onClick={() =>
                                            navigate(
                                              event_name === "Tennis"
                                                ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}`
                                                : event_name === "Soccer"
                                                ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}`
                                                : `/Live_Matches?Id=${item.id}&Time=${item.openDate}`
                                            )
                                          }
                                        >
                                          {item.name}-
                                          {moment(item.openDate).format(
                                            "DD/MM/YYYY h:m:s A"
                                          )}
                                        </a>
                                      </td>
                                      {/* <td></td> */}
                                      <th scope="row">
                                        {new Date(item.openDate) <=
                                          new Date() && (
                                          <span className="circle"> </span>
                                        )}
                                      </th>
                                      <td>
                                        <img src={tv} alt="" width="14" />
                                      </td>

                                      <th className="temp2">
                                        <span className="back_space">-</span>
                                        <span className="back_space1">-</span>
                                      </th>
                                      <th className="temp2">
                                        <span className="back_space">-</span>
                                        <span className="back_space1">-</span>
                                      </th>
                                      <td className="temp2">
                                        <span className="back_space">-</span>
                                        <span className="back_space1">-</span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              ) : (
                                <tbody className="text-white">
                                  {eventCatagory_Data?.map((item, index) => (
                                    <tr>
                                      {/* <th scope="row">{index + 1}</th>
                                  <td>{item.id}</td> */}
                                      <td className="">
                                        <a
                                          href=""
                                          style={{
                                            color: "grey",
                                            textDecoration: "none",
                                            textAlign: "center",
                                          }}
                                          onClick={() =>
                                            navigate(
                                              event_name === "Tennis"
                                                ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}`
                                                : event_name === "Soccer"
                                                ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}`
                                                : `/Live_Matches?Id=${item.id}&Time=${item.openDate}`
                                            )
                                          }
                                        >
                                          {item.name}-
                                          {moment(item.openDate).format(
                                            "DD/MM/YYYY h:m:s A"
                                          )}
                                        </a>
                                      </td>
                                      {/* <td></td> */}
                                      <th scope="row">
                                        {new Date(item.openDate) <=
                                          new Date() && (
                                          <span className="circle"> </span>
                                        )}
                                      </th>
                                      <td>
                                        <img src={tv} alt="" width="14" />
                                      </td>

                                      <th className="temp2">
                                        <span className="back_space">-</span>
                                        <span className="back_space1">-</span>
                                      </th>
                                      <th className="temp2">
                                        <span className="back_space">-</span>
                                        <span className="back_space1">-</span>
                                      </th>
                                      <td className="temp2">
                                        <span className="back_space">-</span>
                                        <span className="back_space1">-</span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="Home3"
                      class="container tab-pane active"
                      style={{ display: "none" }}
                    >
                      <div className="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">id</th>
                              <th scope="col">Name</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {eventCatagory_Data?.map((item, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.id}</td>
                                <td>
                                  <a
                                    href=""
                                    style={{
                                      color: "#fff",
                                      textDecoration: "none",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        event_name === "Tennis"
                                          ? `/Tennis/${item.id}/${event_Type}`
                                          : event_name === "Soccer"
                                          ? `/Soccer/${item.id}/${event_Type}`
                                          : `/scoreboard/${item.id}/${event_Type}`
                                      )
                                    }
                                  >
                                    {item.name}
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* ends here  */}

                  {/* <div id="Home4" class="container tab-pane fade">
                      <br />
                      <h3>Home4</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home5" class="container tab-pane fade">
                      <br />
                      <h3>Home5</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home6" class="container tab-pane fade">
                      <br />
                      <h3>Home6</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home7" class="container tab-pane fade">
                      <br />
                      <h3>Home7</h3>
                      <p className="text-dark">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home8" class="container tab-pane fade">
                      <br />
                      <h3>Home8</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home9" class="container tab-pane fade">
                      <br />
                      <h3>Home9</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home10" class="container tab-pane fade">
                      <br />
                      <h3>Home10</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home11" class="container tab-pane fade">
                      <br />
                      <h3>Home11</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home12" class="container tab-pane fade">
                      <br />
                      <h3>Home12</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div> */}
                </div>
              </div>

              {/* now mobile  version for the table  */}
<div className="scroll-verti">


              <div className="container-fluid mt-3 mbl_version_table_daata">
                <div className="row m-0">
                  <div className="col-8">
                    <strong className="name_tabl">
                      OVAL INVINCIBLES T10 VS TRENT ROCKETS T10
                    </strong>
                    <p className="info_game">Sep 08 2023 15:30 (IST)</p>
                  </div>
                  <div className="col-4">
                    <div className="game-icons d-flex gap-2">
                      <div className="d-flex gap-2">
                        <div className="live_icons"></div>
                        <CgScreen />
                      </div>
                      <div className="d-flex gap-2">
                        <p className="about_th">BM</p>
                        <GiGamepad />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-0 second">
                  <div className="col-4 text-center"><p className="ganme_numberrr">1</p></div>
                  <div className="col-4 text-center"><p className="ganme_numberrr">x</p></div>
                  <div className="col-4 text-center"><p className="ganme_numberrr">2</p></div>
                </div>
                <div className="row m-0 third">
                  <div className="col-4 px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                  <div className="col-4 px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                  <div className="col-4  px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-3 mbl_version_table_daata">
                <div className="row m-0">
                  <div className="col-8">
                    <strong className="name_tabl">
                      OVAL INVINCIBLES T10 VS TRENT ROCKETS T10
                    </strong>
                    <p className="info_game">Sep 08 2023 15:30 (IST)</p>
                  </div>
                  <div className="col-4">
                    <div className="game-icons d-flex gap-2">
                      <div className="d-flex gap-2">
                        <div className="live_icons"></div>
                        <CgScreen />
                      </div>
                      <div className="d-flex gap-2">
                        <p className="about_th">BM</p>
                        <GiGamepad />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-0 second">
                  <div className="col-4 text-center"><p className="ganme_numberrr">1</p></div>
                  <div className="col-4 text-center"><p className="ganme_numberrr">x</p></div>
                  <div className="col-4 text-center"><p className="ganme_numberrr">2</p></div>
                </div>
                <div className="row m-0 third">
                  <div className="col-4 px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                  <div className="col-4 px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                  <div className="col-4  px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-3 mbl_version_table_daata">
                <div className="row m-0">
                  <div className="col-8">
                    <strong className="name_tabl">
                      OVAL INVINCIBLES T10 VS TRENT ROCKETS T10
                    </strong>
                    <p className="info_game">Sep 08 2023 15:30 (IST)</p>
                  </div>
                  <div className="col-4">
                    <div className="game-icons d-flex gap-2">
                      <div className="d-flex gap-2">
                        <div className="live_icons"></div>
                        <CgScreen />
                      </div>
                      <div className="d-flex gap-2">
                        <p className="about_th">BM</p>
                        <GiGamepad />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-0 second">
                  <div className="col-4 text-center"><p className="ganme_numberrr">1</p></div>
                  <div className="col-4 text-center"><p className="ganme_numberrr">x</p></div>
                  <div className="col-4 text-center"><p className="ganme_numberrr">2</p></div>
                </div>
                <div className="row m-0 third">
                  <div className="col-4 px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                  <div className="col-4 px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                  <div className="col-4  px-0 d-flex">
                    <div className="blue_mbn">-</div>
                    <div className="pink_mbn">-</div>
                  </div>
                </div>
              </div>
              </div>

              {/* ends here  */}

              {/* poster of all the games that are in the home page  */}
              <div class="games_images">
                <div class="container ">
                  <div class="row">
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/1.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/2.png" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/3.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/4.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/5.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/6.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/7.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/8.png" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/9.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/10.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/11.jpg" />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-2 px-0 px-md-3">
                      <div class="img_item text-center">
                        <a>
                          <img src="/assets/images/games/12.jpg" />
                        </a>
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

export default Dashboard;
