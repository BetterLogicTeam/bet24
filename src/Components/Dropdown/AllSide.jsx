import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import { useNavigate, useParams } from "react-router-dom";
import { API, API_Match } from "../../API";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";

function AllSide() {
  let { name, type } = useParams();
  const [cricketMatches, setCricketMatches] = useState([]);
  const [Cricket_dropdown, setCricket_dropdown] = useState(false);
  const [All_Sport_dropdown, setAll_Sport_dropdown] = useState(false);

  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");
  let navigate = useNavigate();

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
      let res = await API_Match.get(
        `GetAllCompetitionsData?EventTypeID=${EventTypeID}`
      );
      // console.log("Res", res.data);
      seteventCatagory(res.data);
    } catch (error) {
      console.log("Something Error in eventCatagory API", error);
    }
  };

  console.log("name",name);
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

  return (
    <div>
      {/* <!-- Sidebar start  --> */}
      <div className="" >

      <nav id="sidebar" className="sidemenu">
        <ul className="list-unstyled components">
          <div
            className="badge badge-info "
            style={{ fontSize: "16px" }}
            onClick={() => setCricket_dropdown(!Cricket_dropdown)}
          >
            <div className="crick" style={{cursor:"pointer"}}>
              {event_name}
              {Cricket_dropdown ? (
                <>
                  <IoIosArrowDown />
                </>
              ) : (
                <>
                  <IoIosArrowForward />
                </>
              )}
            </div>
          </div>

          {Cricket_dropdown && (
            <>
              <li class="active">
                {eventCatagorydata?.map((item, index) => (
                  <ul class="collapse list-unstyled show" id="homeSubmenu">
                    {/* <span>{event_name}</span */}
                    <li>
                      <a
                        href=""
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                        }}
                        onClick={() =>
                          navigate(
                            event_name === "Tennis"
                              ? `/Tennis/${item.competition.id}/${event_Type}`
                              : event_name === "Soccer"
                              ? `/Soccer/${item.competition.id}/${event_Type}`
                              : `/scoreboard/${item.competition.id}/${event_Type}`
                          )
                        }
                      >
                        {item?.competition?.name}
                      </a>
                    </li>
                  </ul>
                ))}
              </li>
            </>
          )}
        </ul>
        <ul className="list-unstyled components" style={{ marginTop: "-1rem" }}>
          <div
            className="badge badge-info "
            style={{ fontSize: "16px", borderRadius: "0px" }}
            onClick={() => setAll_Sport_dropdown(!All_Sport_dropdown)}
          >
            <div className="crick" style={{cursor:"pointer"}}>
              All Sports
              {All_Sport_dropdown ? (
                <>
                  <IoIosArrowDown />
                </>
              ) : (
                <>
                  <IoIosArrowForward />
                </>
              )}
            </div>
          </div>

          {All_Sport_dropdown && (
            <>
              <div
                _ngcontent-kxi-c76=""
                id="events"
                className="mtree-main collapse events show"
              >
                <div _ngcontent-kxi-c76="" className="ps">
                  <nav _ngcontent-kxi-c76="">
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse0"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Cricket
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse0"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse1"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Football
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse1"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse2"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Tennis
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse2"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse3"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Horse Racing
                          </a>
                        </div>
                        {/**/}
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse3"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse4"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Greyhound Racing
                          </a>
                        </div>
                        {/**/}
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse4"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse5"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Kabaddi
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse5"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse6"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Politics
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse6"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse7"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Casino
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse7"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse8"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Sports book
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse8"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse9"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Int Casino
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse9"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    <ul _ngcontent-kxi-c76="" className="mtree transit bubba">
                      <li _ngcontent-kxi-c76="" className="mtree-node item">
                        <div _ngcontent-kxi-c76="" className="text-dark">
                          <a
                            _ngcontent-kxi-c76=""
                            data-bs-toggle="collapse"
                            href="#collapse10"
                          >
                            <span _ngcontent-kxi-c76="">
                              <AiOutlinePlusSquare />
                            </span>{" "}
                            Binary
                          </a>
                        </div>
                        <ul
                          _ngcontent-kxi-c76=""
                          className="mtree-level-1 collapse"
                          id="collapse10"
                        >
                          {/**/}
                        </ul>
                        {/**/}
                        {/**/}
                      </li>
                    </ul>
                    {/**/}
                  </nav>
                </div>
              </div>

              <li class="active">
                {/* {eventCatagorydata?.map((item, index) => (
                  <ul class="collapse list-unstyled show" id="homeSubmenu">
                   
                    <li>
                      <a
                        href=""
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                        }}
                        onClick={() =>
                          navigate(
                            event_name === "Tennis"
                              ? `/Tennis/${item.competition.id}/${event_Type}`
                              : event_name === "Soccer"
                              ? `/Soccer/${item.competition.id}/${event_Type}`
                              : `/scoreboard/${item.competition.id}/${event_Type}`
                          )
                        }
                      >
                        {item?.competition?.name}
                      </a>
                    </li>
                  </ul>
                ))} */}
              </li>
            </>
          )}
        </ul>
      </nav>
      </div>

      {/* <!-- Sidebar end  --> */}
    </div>
  );
}

export default AllSide;
