import React, {   } from "react";
import "./Mobile_side_bar.css"

// import { API, API_Match } from "../../API";
// import { useNavigate } from "react-router-dom";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import moment from "moment/moment";
// import "./Dashboard.css";
// import tv from "./tv-solid.svg";
import { API, API_Match } from "../../API";
import AllSide from "../Dropdown/AllSide";
import SideBar2 from "../Dropdown/SideBar2";
import { Scrollbars } from "react-custom-scrollbars";
import  { useEffect, useState } from "react";
import bALL from "../Assets/ball.png"
import foot from "../Assets/football.png"
import tennis from "../Assets/tennis.png"
import horse from "../Assets/horse.png"
import gr from "../Assets/gr.png"
import kabdi from "../Assets/kabdi.png"
import poli from "../Assets/polictics.png"
import binary from "../Assets/binary.png"


export default function Mobile_side_bar() {


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
    <div className="main_mobile_links">
      <ul className="Mobile_side_bar ps-0">
      <li className="nav-item" style={{ cursor: "pointer" }}>
  
                      <a
                        onClick={() => {
                          InPlay("Inplay");
                        }}
                        className="nav-link new_nav_links_with_pic"
                      >
                          <img src={bALL} alt="" className="w-25" /> <br />
                        InPlay
                      </a>
                    </li>
                   
                    {/* {events_Data?.slice(0, 3)?.map((items, index) => {
                      return (
                        <>
                          <li className="nav-item  " key={index}>
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
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={foot} className="w-25" alt="" /> <br />
                        soccer
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={tennis} className="w-25" alt="" /> <br />
                        Tennis
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={bALL} className="w-25" alt="" /> <br />
                        Cricket
                      </a>
                    </li>


                    <li className="nav-item">


                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                    <img src={horse} className="w-25" alt="" /> <br />

                        Horse Racing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={gr} className="w-25" alt="" /> <br />
                        GreyHound Racing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={kabdi} className="w-25" alt="" /> <br />
                        Kabaddi
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={poli} className="w-25" alt="" /> <br />
                        Politics
                      </a>
                    </li>
                    <li className="nav-item ">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                        Casino
                      </a>
                    </li>
                    <li className="nav-item ">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                        INT Casino
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="0" className="nav-link new_nav_links_with_pic_green">
                      <img src={binary} className="w-25" alt="" /> <br />

                        Binary
                      </a>
                    </li>
      </ul>
    </div>
  );
}
