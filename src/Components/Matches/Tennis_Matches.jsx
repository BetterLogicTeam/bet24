import Navbar from "../Header/Navbar";
import axios from "axios";
import "./Match.css";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Rule from "../Popup/popup";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import AllSide from "../Dropdown/AllSide";
import { API } from "../../API";

function Tennis_Matches() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get("Id"));
  const [date_time, setTime] = useState(searchParams.get("Time"));
  let [updateBal, setUpdateBal] = useState(false);
  const [t1, setT1] = useState("0.0");
  const [t2, setT2] = useState("0.0");
  const [t3, setT3] = useState("0");
  const [t4, setT4] = useState("0");
  const [u1t1, setu1t1] = useState("");
  const [u2t2, setu2t2] = useState("");
  const [C2N1, setC2N1] = useState("");
  const [C2N3, setC2N3] = useState("");
  const [u2t1, setu2t1] = useState("");
  const [u2t3, setu2t3] = useState("");
  const [remark1, setRemark1] = useState("");
  const [remark2, setRemark2] = useState("");
  const [C2N4, setC2N4] = useState("");
  const [C2N5, setC2N5] = useState("");
  const [u2t4, setu2t4] = useState("");
  const [u2t5, setu2t5] = useState("");
  const [t5, setT5] = useState("");
  const [t6, setT6] = useState("");
  const [data, setData] = useState([]);
  const [fancy, setFancy] = useState([]);
  const [sid, setSid] = useState("");
  const [sr, setSr] = useState("");
  const [sess, setBall] = useState("");
  const [win, setWin] = useState("");
  const [sets, setsets] = useState([]);
  const [home, sethome] = useState({});
  const [away, setAway] = useState({});
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [score3, setScore3] = useState("");
  const [score4, setScore4] = useState("");
  const [dataValue, setValue] = useState("0");
  const [country, setCountry] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [back, setback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [matchType, setMatchType] = useState("");
  const [firstCountry, setFirstCountry] = useState("");
  const [secondCountry, setSecondCountry] = useState("");
  const [match, setMatch] = useState("");
  const [sessionMarket, setSessionMarket] = useState("");
  const [oddBet, setOddBet] = useState("");

  const SOCKET_URL = "https://battleminey-api.nakshtech.info";
  // const SOCKET_URL = "http://localhost:3344";

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatch", id);
    cricketMatchesSocket.on("CricketOddMatch_FromAPI", (data) => {
      let res = data[0];
      // console.log("Match_data", res);
      setMatchType(res.marketId);
      setFirstCountry(res.runners[0]);
      setSecondCountry(res.runners[1]);
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("FootballTenisMatchData", id);
    cricketMatchesSocket.on("FootballTenisMatchData_FromAPI", (data) => {
      let res = data;
      // console.log("Score_match==>", res);
      setsets(res[0].currentSet);
      sethome(res[0].score.home);
      setAway(res[0].score.away);
      setScore1(res[0].score.away.gameSequence[0]);
      setScore2(res[0].score.away.gameSequence[1]);
      setScore3(res[0].score.home.gameSequence[0]);
      setScore4(res[0].score.home.gameSequence[1]);
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Market_Id_Data:",matchType);
    if (matchType) {
      const cricketMatchesSocket = io(SOCKET_URL);
      cricketMatchesSocket.emit("CricketOddMatchType", matchType);
      cricketMatchesSocket.on("CricketOddMatchType_FromAPI", (data) => {
        let res = data[0];
        setOddBet(res.runners);
        // console.log("Market_Id_Data", res);
        setMatch(res.market);
        setT1(res.runners[0].ex.availableToBack);
        setT2(res.runners[0].ex.availableToLay);
        setT3(res.runners[1].ex.availableToBack);
        setT4(res.runners[1].ex.availableToLay);
      });

      return () => {
        cricketMatchesSocket.disconnect();
      };
    }
  }, [matchType]);

  const popupRef = useRef(null);
  function BetValue(
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8
  ) {
    popupRef.current.scrollIntoView({ behavior: "smooth" });

    if (value4 == "back") {
      setShowPopup(true);
      setModalIsOpen(true);
      setValue(value1);
      setCountry(value2);
      setSessionMarket(value3);
      setback(value4);
      setSid(value5);
      setSr(value6);
      setBall(value7);
      setWin(value8);
    } else {
      setShowPopup(true);
      setModalIsOpen(true);
      setValue(value1);
      setCountry(value2);
      setSessionMarket(value3);
      setback(value4);
      setSid(value5);
      setSr(value6);
      setBall(value7);
      setWin(value8);
    }
  }

  const [betValue, setbetValue] = useState("");
  function handleClick(value) {
    // console.log("value",value);
    setbetValue(value);
  }

  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const encryptdata = async (payload) => {
    try {
      let response = await API.get("getPublicKey");
      let publicKey = response.data.publicKey;
      if (publicKey) {
        const data = JSON.stringify(payload);

        const textBuffer = new TextEncoder().encode(data);

        // Convert base64 publicKey to Uint8Array
        const binaryString = window.atob(publicKey);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const cryptoKey = await window.crypto.subtle.importKey(
          "spki",
          bytes,
          {
            name: "RSA-OAEP",
            hash: "SHA-256",
          },
          true,
          ["encrypt"]
        );
        const encryptedData = await window.crypto.subtle.encrypt(
          {
            name: "RSA-OAEP",
          },
          cryptoKey,
          textBuffer
        );
        // Convert encryptedData to base64
        const base64EncryptedData = btoa(
          String.fromCharCode(...new Uint8Array(encryptedData))
        );
        return base64EncryptedData;
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
    }
  };
  const Live_Bet_Api = async () => {
    if (dataValue > 0) {
      if (sessionMarket == "MATCH_ODDS") {
        // console.log("dataMatch3", oddBet);
        // console.log("dataMatch4==>", country, sid, dataValue);
        if (
          oddBet[0].runner == country ||
          (oddBet[1].runner == country && oddBet[0].selectionId == sid) ||
          (oddBet[1].selectionId == sid && oddBet[0].status == "") ||
          (oddBet[1].status == "" &&
            oddBet[0]?.ex?.availableToBack[0]?.price == dataValue) ||
          oddBet[0]?.ex?.availableToBack[1]?.price == dataValue ||
          oddBet[0]?.ex?.availableToBack[2]?.price == dataValue ||
          oddBet[1]?.ex?.availableToBack[0]?.price == dataValue ||
          oddBet[1]?.ex?.availableToBack[1]?.price == dataValue ||
          oddBet[1]?.ex?.availableToBack[2]?.price == dataValue ||
          oddBet[0]?.ex?.availableToLay[0]?.price == dataValue ||
          oddBet[0]?.ex?.availableToLay[1]?.price == dataValue ||
          oddBet[0]?.ex?.availableToLay[2]?.price == dataValue ||
          oddBet[1]?.ex?.availableToLay[0]?.price == dataValue ||
          oddBet[1]?.ex?.availableToLay[1]?.price == dataValue ||
          oddBet[1]?.ex?.availableToLay[2]?.price == dataValue
        ) {
          // console.log("back123=>",back);
          if (
            (back == "back",
            {
              /*&& t6.b1 == dataValue*/
            })
          ) {
            try {
              let body = await encryptdata({
                uid: uId,
                type: sessionMarket,
                team: country,
                stake: betValue,
                back: dataValue,
                lay: "0",
                matchid: id,
                ballsess: sess,
                sid: sid,
                srno: sr,
                WinPerc: win,
                result: "",
              });
              let res = await API.post("PlaceBet", {
                encryptedData: body,
              });
              res = res.data.data;
              // console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                toast.success(res);
                setUpdateBal(!updateBal);
                PlaceBet_History();
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Dashboard API", e);
            }
          } else if (
            (back == "lay",
            {
              /* && t6.l1 == dataValue*/
            })
          ) {
            try {
              let body = await encryptdata({
                uid: uId,
                type: sessionMarket,
                team: country,
                stake: betValue,
                back: "0",
                lay: dataValue,
                matchid: id,
                ballsess: sess,
                sid: sid,
                srno: sr,
                WinPerc: win,
                result: "",
              });
              let res = await API.post("PlaceBet", {
                encryptedData: body,
              });
              res = res.data.data;
              // console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                toast.success(res);
                setUpdateBal(!updateBal);
                PlaceBet_History();
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Dashboard API", e);
            }
          } else {
            toast.error("Odd Value is miss Match");
          }
        } else {
          toast.error("Odd Value is miss Match");
        }
      } else {
        console.log("Something Error in betting API");
      }
    } else {
      toast.error("Invalid Request !");
    }
  };

  const [tableData, setTableData] = useState([]);
  const PlaceBet_History = async () => {
    try {
      let res = await API.get(`BetHistory?id=${uId}`);
      res = res.data.data;
      // console.log("PlaceBet_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  const handleReset = () => {
    setbetValue("");
    setValue("");
    setCountry("");
  };

  const [liveScore, settLiveScore] = useState("");
  const [PerBall, setPerBall] = useState([]);
  const Live_Score = async () => {
    // console.log("id");
    try {
      let res = await axios.get(
        `https://score2.sqlr.xyz/t10score?marketId=${id}`
      );
      res = res.data.data;
      // console.log("res-->", res);
      if (res) {
        settLiveScore(res);
        setPerBall(res.balls);
        // console.log("Live_Score", res);
      } else {
        settLiveScore("");
        setPerBall([]);
      }
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  const [abhi, setabhi] = useState([]);

  const Result_By_Game = async () => {
    try {
      let res = await API.post("resultbygame", {
        gameId: id,
      });
      res = res?.data;
      setabhi(res);

      // console.log("Game_Result===>", res);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  const data_filter = async () => {
    const filteredArray = abhi?.filter((item) => item.result != "...");

    for (let i = 0; i < filteredArray.length; i++) {
      //  console.log("Fillter",filteredArray[i])
      let res = await API.post("Result_Declare", {
        uid: uId,
        matchid: filteredArray[i]["gameId"],
        sid: filteredArray[i]["sid"],
        srno: filteredArray[i]["srno"],
        result: filteredArray[i]["result"],
        type: "",
      });
      // console.log("res1", res);
      res = res.Promise;
    }
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    Result_By_Game();
    data_filter();
    Live_Score();
    PlaceBet_History();
    // }, 2000);
    // return () => clearInterval(intervalId);
  }, [abhi, uId]);

  const Completionist = () => {
    return (
      <>
        {/* <h6>PreSale Started</h6> */}

        {/* <div className="text_days fs-5 ">Presale ended!</div> */}
      </>
    );
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown

      return (
        <>
          <div></div>
        </>
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", fixed_top);
    return () => {
      window.removeEventListener("scroll", fixed_top);
    };
  });
  const fixed_top = (e) => {
    const header = document.querySelector("#bettingSection");
    const scrollTop = window.scrollY;
    scrollTop >= 50
      ? header.classList.add("set_sticky")
      : header.classList.remove("set_sticky");
  };

  return (
    <div>
      <Navbar updateBal={updateBal} />
      <main class="main_root wrapper">
        <div style={{ backgroundColor: "#9595a4" }} className="sidebar_respon">
          <AllSide />
        </div>
        {/* <!-----=======body section start=======----> */}
        <div id="content">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="section_bg">
                  <div className="bars_bg">
                    <div className="game_timer">
                      <div className="game_vs">
                        <div className="countryName">
                          <h1>{firstCountry.runnerName}</h1>
                        </div>
                        <div className="countVs">
                          <h1>vs</h1>
                        </div>
                        <div className="countryName">
                          <h1>{secondCountry.runnerName}</h1>
                        </div>
                        <div class="section_heading streaming">
                          <p className="btn btn-primary" onClick={toggleShow}>
                            <i
                              class="fa fa-television"
                              style={{ color: "white" }}
                            ></i>
                          </p>
                        </div>
                        {/* <i class="fa fa-television" style={{color:'white'}}></i> */}
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#040e3a" }}>
                    <div className="bars_bg_vs_2">
                      <div className="col-md-4 midVSes_flex">
                        <div className="mid_left_icon sc1">
                          {/* <img src="assets/images/cricket_bat.png" /> */}
                          <span>
                            {firstCountry.runnerName}
                            <br />
                          </span>
                          <span> {secondCountry.runnerName}</span>
                          <br />
                          <span>Sets : {sets}</span>
                        </div>
                      </div>
                      <div className="col-md-4 midVSes_flex"></div>
                      <div className="col-md-4 midVSes_flex ball_map">
                        <div
                          className="mid_left_icon sc1"
                          style={{
                            float: "right",
                            backgroundColor: "#000",
                            padding: "0px 5px 6px",
                          }}
                        >
                          <span>
                            {score3 ? score3 : "\u00A0"} {"\u00A0"}{" "}
                            {score4 ? score4 : "\u00A0"} {"\u00A0"} {"\u00A0"}
                            {home?.games ? home?.games : "\u00A0"} {"\u00A0"}{" "}
                            {home?.score ? home?.score : "\u00A0"}
                          </span>
                          <br />
                          <span>
                            {score1 ? score1 : "\u00A0"} {"\u00A0"}{" "}
                            {score2 ? score2 : "\u00A0"} {"\u00A0"} {"\u00A0"}
                            {away?.games ? away?.games : "\u00A0"} {"\u00A0"}{" "}
                            {away?.score ? away?.score : "\u00A0"}
                          </span>
                          <br />
                          <span>
                            1 {"\u00A0"} 2 {"\u00A0"} 3 {"\u00A0"} Point
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mid_left_icon">
                      <td
                        _ngcontent-rro-c88=""
                        class="text-right ng-tns-c88-2"
                      ></td>
                    </div>
                  </div>

                  <Countdown
                    date={Date.now() + (parseInt(1681918116689) - Date.now())}
                    renderer={renderer}
                  />

                  {show && (
                    <div class="live_video streaming">
                      <iframe
                        src={`https://nlivetv.lagaikhaipro.com/rtv.php?eventId=${id}`}
                        height="200"
                        width="300"
                        title="Iframe Example"
                      ></iframe>
                    </div>
                  )}

                  {/* <div >{mappedArray}</div>; */}

                  {/* <!-----================match odds row============------> */}
                  <div class="bars_bg">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="section_heading">
                          <h2>{match}</h2>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="section_heading">
                          <h3>
                            Maximum Bet 100000 <Rule />
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Box
                    sx={{
                      width: "100%",
                      // backgroundImage:
                      //   "radial-gradient(circle farthest-corner at 83.7% 4.3%,rgba(173,0,171,.72) 0,#0d3c71 90%)",
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className=""
                    ></Box>
                    {/* <TabPanel value={valueTab} index={0}> */}
                    <div class="match_odds_table">
                      <div class="table-responsive-sm">
                        <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td class="min_width"></td>
                              <td class="td_width display"></td>
                              <td class="td_width display"></td>
                              <td class="td_width">
                                <div class="td_item tdbg3">
                                  <h4>BACK</h4>
                                </div>
                              </td>
                              <td class="td_width">
                                <div class="td_item tdbg4">
                                  <h4>LAY</h4>
                                </div>
                              </td>
                              <td class="td_width display"></td>
                              <td class="td_width display"></td>
                            </tr>
                            {/* {t1.status == "SUSPENDED" ? (
                              <tr className="tr_data_2">{t1.status}</tr>
                            ) : (
                              <></>
                            )} */}
                            <tr>
                              <td class="min_width">
                                <div class="td1">
                                  <h4>{firstCountry.runnerName}</h4>
                                  {/* <p>{u1t1}</p> */}
                                </div>
                              </td>
                              {isNaN(t1[2]?.price) || t1[2]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg1 tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t1[2]?.price,
                                        firstCountry.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[0].selectionId,
                                        0,
                                        t1[2]?.size
                                      )
                                    }
                                  >
                                    <h4>{t1[2]?.price}</h4>
                                    {t1[2]?.size < 1000 ? (
                                      <p>{t1[2]?.size}</p>
                                    ) : (
                                      <p>{(t1[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t1[1]?.price) || t1[1]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg2  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t1[1]?.price,
                                        firstCountry.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[0].selectionId,
                                        0,
                                        t1[1]?.size
                                      )
                                    }
                                  >
                                    <h4>{t1[1]?.price}</h4>
                                    {t1[1]?.size < 1000 ? (
                                      <p>{t1[1]?.size}</p>
                                    ) : (
                                      <p>{(t1[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t1[0]?.price) || t1[0]?.price == 0 ? (
                                <td class="td_width pp">
                                  <div class="td_item tdbg1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg3"
                                    onClick={() =>
                                      BetValue(
                                        t1[0]?.price,
                                        firstCountry.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[0].selectionId,
                                        0,
                                        t1[0]?.size
                                      )
                                    }
                                  >
                                    <h4>{t1[0]?.price}</h4>
                                    {t1[0]?.size < 1000 ? (
                                      <p>{t1[0]?.size}</p>
                                    ) : (
                                      <p>{(t1[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t2[0]?.price) || t2[0]?.price == 0 ? (
                                <td class="td_width pp1">
                                  <div class="td_item tdbg4">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg4"
                                    onClick={() =>
                                      BetValue(
                                        t2[0]?.price,
                                        firstCountry.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[0].selectionId,
                                        0,
                                        t2[0]?.size
                                      )
                                    }
                                  >
                                    <h4>{t2[0]?.price}</h4>
                                    {t2[0]?.size < 1000 ? (
                                      <p>{t2[0]?.size}</p>
                                    ) : (
                                      <p>{(t2[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t2[1]?.price) || t2[1]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg5  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t2[1]?.price,
                                        firstCountry.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[0].selectionId,
                                        0,
                                        t2[1]?.size
                                      )
                                    }
                                  >
                                    <h4>{t2[1]?.price}</h4>
                                    {isNaN(t2[1]?.size) ? (
                                      <p></p>
                                    ) : t2[1]?.size < 1000 ? (
                                      <p>{t2[1]?.size}</p>
                                    ) : (
                                      <p>{(t2[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t2[2]?.price) || t2[2]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg6  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t2[2]?.price,
                                        firstCountry.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[0].selectionId,
                                        0,
                                        t2[2]?.size
                                      )
                                    }
                                  >
                                    <h4>{t2[2]?.price}</h4>
                                    {t2[2]?.size < 1000 ? (
                                      <p>{t2[2]?.size}</p>
                                    ) : (
                                      <p>{(t2[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                            </tr>
                            {/* {t2.status == "SUSPENDED" ? (
                              <tr className="tr_data_2">{t2.status}</tr>
                            ) : (
                              <></>
                            )} */}
                            <tr>
                              <td class="min_width">
                                <div class="td1">
                                  <h4>{secondCountry.runnerName}</h4>
                                  {/* <p>{u2t2}</p> */}
                                </div>
                              </td>
                              {isNaN(t3[2]?.price) || t3[2]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg1 tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t3[2]?.price,
                                        secondCountry.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[1].selectionId,
                                        0,
                                        t3[2]?.size
                                      )
                                    }
                                  >
                                    <h4>{t3[2]?.price}</h4>
                                    {t3[2]?.size < 1000 ? (
                                      <p>{t3[2]?.size}</p>
                                    ) : (
                                      <p>{(t3[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t3[1]?.price) || t3[1]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg2  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t3[1]?.price,
                                        secondCountry.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[1].selectionId,
                                        0,
                                        t3[1]?.size
                                      )
                                    }
                                  >
                                    <h4>{t3[1]?.price}</h4>
                                    {t3[1]?.size < 1000 ? (
                                      <p>{t3[1]?.size}</p>
                                    ) : (
                                      <p>{(t3[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t3[0]?.price) || t3[0]?.price == 0 ? (
                                <td class="td_width pp">
                                  <div class="td_item tdbg1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg3"
                                    onClick={() =>
                                      BetValue(
                                        t3[0]?.price,
                                        secondCountry.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[1].selectionId,
                                        0,
                                        t3[0]?.size
                                      )
                                    }
                                  >
                                    <h4>{t3[0]?.price}</h4>
                                    {t3[0]?.size < 1000 ? (
                                      <p>{t3[0]?.size}</p>
                                    ) : (
                                      <p>{(t3[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t4[0]?.price) || t4[0]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg4"
                                    onClick={() =>
                                      BetValue(
                                        t4[0]?.price,
                                        secondCountry.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[1].selectionId,
                                        0,
                                        t4[0]?.size
                                      )
                                    }
                                  >
                                    <h4>{t4[0]?.price}</h4>
                                    {t4[0]?.size < 1000 ? (
                                      <p>{t4[0]?.size}</p>
                                    ) : (
                                      <p>{(t4[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t4[1]?.price) || t4[1]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg5  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t4[1]?.price,
                                        secondCountry.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[1].selectionId,
                                        0,
                                        t4[1]?.size
                                      )
                                    }
                                  >
                                    <h4>{t4[1]?.price}</h4>
                                    {t4[1]?.size < 1000 ? (
                                      <p>{t4[1]?.size}</p>
                                    ) : (
                                      <p>{(t4[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t4[2]?.price) || t4[2]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg6  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t4[2]?.price,
                                        secondCountry.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[1].selectionId,
                                        0,
                                        t4[2]?.size
                                      )
                                    }
                                  >
                                    <h4>{t4[2]?.price}</h4>
                                    {t4[2]?.size < 1000 ? (
                                      <p>{t4[2]?.size}</p>
                                    ) : (
                                      <p>{(t4[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Box>
                </div>
              </div>

              <div class="col-md-4 bet_icon ">
                <div class="section_bg" id="bettingSection">
                  <div class="bars_bg live_stream">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="section_heading">
                          <h2>Live Match</h2>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="section_heading" id="video_tab">
                          <p>
                            <i class="fa fa-television"></i> live stream started
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="live_video video_tab_pan"
                    style={{ display: "none" }}
                  >
                    <iframe
                      allowfullscreen="true"
                      style={{
                        width: "100%",
                        height: "210px",
                        border: "none",
                        opacity: "1",
                        visibility: "visible",
                      }}
                      id="frame_video"
                      src={`https://nlivetv.lagaikhaipro.com/rtv.php?eventId=${id}`}
                    ></iframe>
                  </div>
                  {back == "back" ? (
                    <div class="Back_color bars_bg ngb1" ref={popupRef}>
                      <div class="row">
                        <div class="card m-b-10 place-bet ">
                          <div _ngcontent-hvs-c85="" class="card-header ">
                            <h6 class="card-title d-inline-block ">
                              Place Bet
                            </h6>
                          </div>
                          {showPopup ? (
                            <div>
                              <div
                                class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                style={{ paddingBottom: "4px;" }}
                              >
                                {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                  <thead
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <th
                                        style={{
                                          width: "35%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        (Bet for)
                                      </th>
                                      <th
                                        style={{
                                          width: "25%",
                                          textAlign: "left;",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        odds{" "}
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        Stake
                                      </th>
                                      <th
                                        id="profit-head"
                                        style={{
                                          width: "15%",
                                          textAlign: "right",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        {" "}
                                        Profit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        id="team_nm"
                                        class=" country_color ng-tns-c85-1"
                                      >
                                        {country}
                                      </td>
                                      <td
                                        style={{ width: "75px" }}
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group ng-tns-c85-1">
                                          <input
                                            placeholder="0"
                                            name="odds"
                                            type="text"
                                            required=""
                                            value={dataValue}
                                            id="odds"
                                            readonly=""
                                            class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            style={{
                                              width: "45px",
                                              verticalAlign: "middle",
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group bet-stake ng-tns-c85-1">
                                          <input
                                            id="btn_val"
                                            required=""
                                            value={betValue}
                                            type="text"
                                            onChange={(e) =>
                                              setbetValue(e.target.value)
                                            }
                                            // autocomplete="off"
                                            style={{ width: "82px" }}
                                            class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        id="prft"
                                        class="text-right ng-tns-c85-1 ng-star-inserted"
                                        style={{ color: "#fff" }}
                                      >
                                        {" "}
                                        0.000
                                      </td>
                                    </tr>
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        colspan="5"
                                        class="value-buttons ng-tns-c85-1"
                                        style={{ padding: "5px;" }}
                                      >
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("1000")}
                                          value="1000"
                                        >
                                          1000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("2000")}
                                          value="2000"
                                        >
                                          2000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) => handleClick(5000)}
                                          value="5000"
                                        >
                                          5000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(10000)
                                          }
                                          value="10000"
                                        >
                                          10000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(20000)
                                          }
                                          value="20000"
                                        >
                                          20000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(50000)
                                          }
                                          value="50000"
                                        >
                                          50000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(100000)
                                          }
                                          value="100000"
                                        >
                                          100000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(250000)
                                          }
                                          value="250000"
                                        >
                                          250000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(500000)
                                          }
                                          value="500000"
                                        >
                                          500000
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  _ngcontent-hvs-c85=""
                                  class="col-md-12 ng-tns-c85-1"
                                >
                                  <button
                                    type=""
                                    onClick={handleReset}
                                    class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                  >
                                    Reset
                                  </button>
                                  <button
                                    type="submit"
                                    id="submit_btn"
                                    onClick={() => Live_Bet_Api()}
                                    class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    id="tmp_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_section_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_market_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update_lambi"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                </div>
                                {/* </form> */}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : back == "lay" ? (
                    <div class="Lay_color bars_bg ngb1" ref={popupRef}>
                      <div class="row">
                        <div class="card m-b-10 place-bet ">
                          <div _ngcontent-hvs-c85="" class="card-header ">
                            <h6
                              class="card-title d-inline-block 
                            "
                            >
                              Place Bet
                            </h6>
                          </div>
                          {showPopup ? (
                            <>
                              <input
                                type="hidden"
                                id="back-lay"
                                value=""
                                class="ng-tns-c85-1"
                              />
                              <ngx-spinner
                                bdcolor="rgba(51,51,51,0.8)"
                                size="medium"
                                color="#fff"
                                type="ball-scale-multiple"
                                _nghost-hvs-c75=""
                                class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                              ></ngx-spinner>
                              <div
                                class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                style={{ paddingBottom: "4px;" }}
                              >
                                {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                  <thead
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <th
                                        style={{
                                          width: "35%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        (Bet for)
                                      </th>
                                      <th
                                        style={{
                                          width: "25%",
                                          textAlign: "left;",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        odds{" "}
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        Stake
                                      </th>
                                      <th
                                        id="profit-head"
                                        style={{
                                          width: "15%",
                                          textAlign: "right",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        {" "}
                                        Profit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        id="team_nm"
                                        class=" country_color ng-tns-c85-1"
                                      >
                                        {country}
                                      </td>
                                      <td
                                        style={{ width: "75px" }}
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group ng-tns-c85-1">
                                          <input
                                            placeholder="0"
                                            name="odds"
                                            type="text"
                                            required=""
                                            value={dataValue}
                                            id="odds"
                                            readonly=""
                                            class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            style={{
                                              width: "45px",
                                              verticalAlign: "middle",
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group bet-stake ng-tns-c85-1">
                                          <input
                                            id="btn_val"
                                            required=""
                                            value={betValue}
                                            type="text"
                                            // autocomplete="off"
                                            onChange={(e) =>
                                              setbetValue(e.target.value)
                                            }
                                            style={{ width: "82px" }}
                                            class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        id="prft"
                                        class="text-right ng-tns-c85-1 ng-star-inserted"
                                        style={{ color: "#fff" }}
                                      >
                                        {" "}
                                        0.00
                                      </td>
                                    </tr>
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        colspan="5"
                                        class="value-buttons ng-tns-c85-1"
                                        style={{ padding: "5px;" }}
                                      >
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("1000")}
                                          value="1000"
                                        >
                                          1000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("2000")}
                                          value="2000"
                                        >
                                          2000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) => handleClick(5000)}
                                          value="5000"
                                        >
                                          5000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(10000)
                                          }
                                          value="10000"
                                        >
                                          10000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(20000)
                                          }
                                          value="20000"
                                        >
                                          20000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(50000)
                                          }
                                          value="50000"
                                        >
                                          50000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(100000)
                                          }
                                          value="100000"
                                        >
                                          100000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(250000)
                                          }
                                          value="250000"
                                        >
                                          250000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(500000)
                                          }
                                          value="500000"
                                        >
                                          500000
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  _ngcontent-hvs-c85=""
                                  class="col-md-12 ng-tns-c85-1"
                                >
                                  <button
                                    type=""
                                    onClick={handleReset}
                                    class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                  >
                                    Reset
                                  </button>
                                  <button
                                    type="submit"
                                    id="submit_btn"
                                    onClick={() => Live_Bet_Api()}
                                    class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    id="tmp_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_section_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_market_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update_lambi"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                </div>
                                {/* </form> */}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="dp_none bars_bg" ref={popupRef}>
                      <div class="row">
                        <div class="card m-b-10 place-bet ">
                          <div _ngcontent-hvs-c85="" class="card-header ">
                            <h6 class="card-title d-inline-block ">
                              Place Bet
                            </h6>
                          </div>
                          {showPopup ? (
                            <>
                              <input
                                type="hidden"
                                id="back-lay"
                                value=""
                                class="ng-tns-c85-1"
                              />
                              <ngx-spinner
                                bdcolor="rgba(51,51,51,0.8)"
                                size="medium"
                                color="#fff"
                                type="ball-scale-multiple"
                                _nghost-hvs-c75=""
                                class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                              ></ngx-spinner>
                              <div
                                class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                style={{ paddingBottom: "4px;" }}
                              >
                                {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                  <thead
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <th
                                        style={{
                                          width: "35%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        (Bet for)
                                      </th>
                                      <th
                                        style={{
                                          width: "25%",
                                          textAlign: "left;",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        odds{" "}
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        Stake
                                      </th>
                                      <th
                                        id="profit-head"
                                        style={{
                                          width: "15%",
                                          textAlign: "right",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        {" "}
                                        Profit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        id="team_nm"
                                        class=" country_color ng-tns-c85-1"
                                      >
                                        {country}
                                      </td>
                                      <td
                                        style={{ width: "75px" }}
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group ng-tns-c85-1">
                                          <input
                                            placeholder="0"
                                            name="odds"
                                            type="text"
                                            required=""
                                            value={dataValue}
                                            id="odds"
                                            readonly=""
                                            class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            style={{
                                              width: "45px",
                                              verticalAlign: "middle",
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group bet-stake ng-tns-c85-1">
                                          <input
                                            id="btn_val"
                                            required=""
                                            value={betValue}
                                            type="text"
                                            // autocomplete="off"
                                            onChange={(e) =>
                                              setbetValue(e.target.value)
                                            }
                                            style={{ width: "82px" }}
                                            class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        id="prft"
                                        class="text-right ng-tns-c85-1 ng-star-inserted"
                                        style={{ color: "#fff" }}
                                      >
                                        {" "}
                                        0.00
                                      </td>
                                    </tr>
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        colspan="5"
                                        class="value-buttons ng-tns-c85-1"
                                        style={{ padding: "5px;" }}
                                      >
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("1000")}
                                          value="1000"
                                        >
                                          1000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("2000")}
                                          value="2000"
                                        >
                                          2000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) => handleClick(5000)}
                                          value="5000"
                                        >
                                          5000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(10000)
                                          }
                                          value="10000"
                                        >
                                          10000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(20000)
                                          }
                                          value="20000"
                                        >
                                          20000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(50000)
                                          }
                                          value="50000"
                                        >
                                          50000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(100000)
                                          }
                                          value="100000"
                                        >
                                          100000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(250000)
                                          }
                                          value="250000"
                                        >
                                          250000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(500000)
                                          }
                                          value="500000"
                                        >
                                          500000
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  _ngcontent-hvs-c85=""
                                  class="col-md-12 ng-tns-c85-1"
                                >
                                  <button
                                    type=""
                                    onClick={handleReset}
                                    class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                  >
                                    Reset
                                  </button>
                                  <button
                                    type="submit"
                                    id="submit_btn"
                                    onClick={() => Live_Bet_Api()}
                                    class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    id="tmp_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_section_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_market_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update_lambi"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                </div>
                                {/* </form> */}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <button onClick={openModal}>Open Popup</button> */}
                  <Modal
                    isOpen={modalIsOpen}
                    className="mobile_popup"
                    onRequestClose={closeModal}
                  >
                    {back == "back" ? (
                      <div class="Back_color bars_bg">
                        <div class="row">
                          <div class="card m-b-10 place-bet ">
                            <div _ngcontent-hvs-c85="" class="card-header ">
                              <h6 class="card-title d-inline-block ">
                                Place Bet
                              </h6>
                              <button
                                onClick={closeModal}
                                className="close_button"
                              >
                                <img
                                  src="assets/images/xmark-solid.svg"
                                  width="100%"
                                  alt=""
                                />
                              </button>
                            </div>
                            {showPopup ? (
                              <>
                                <input
                                  type="hidden"
                                  id="back-lay"
                                  value=""
                                  class="ng-tns-c85-1"
                                />
                                <ngx-spinner
                                  bdcolor="rgba(51,51,51,0.8)"
                                  size="medium"
                                  color="#fff"
                                  type="ball-scale-multiple"
                                  _nghost-hvs-c75=""
                                  class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                ></ngx-spinner>
                                <div
                                  class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                  style={{ paddingBottom: "4px;" }}
                                >
                                  {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                  <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                    <thead
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <th
                                          style={{
                                            width: "35%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          (Bet for)
                                        </th>
                                        <th
                                          style={{
                                            width: "25%",
                                            textAlign: "left;",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          odds{" "}
                                        </th>
                                        <th
                                          style={{
                                            width: "15%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          Stake
                                        </th>
                                        <th
                                          id="profit-head"
                                          style={{
                                            width: "15%",
                                            textAlign: "right",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          {" "}
                                          Profit{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          id="team_nm"
                                          class=" country_color ng-tns-c85-1"
                                        >
                                          {country}
                                        </td>
                                        <td
                                          style={{ width: "75px" }}
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group ng-tns-c85-1">
                                            <input
                                              placeholder="0"
                                              name="odds"
                                              type="text"
                                              required=""
                                              value={dataValue}
                                              id="odds"
                                              readonly=""
                                              class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              style={{
                                                width: "45px",
                                                verticalAlign: "middle",
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group bet-stake ng-tns-c85-1">
                                            <input
                                              id="btn_val"
                                              required=""
                                              value={betValue}
                                              type="text"
                                              // autocomplete="off"
                                              onChange={(e) =>
                                                setbetValue(e.target.value)
                                              }
                                              style={{ width: "82px" }}
                                              class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            />
                                          </div>
                                        </td>
                                        <td
                                          id="prft"
                                          class="text-right ng-tns-c85-1 ng-star-inserted"
                                          style={{ color: "#fff" }}
                                        >
                                          {" "}
                                          0.00
                                        </td>
                                      </tr>
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          colspan="5"
                                          class="value-buttons ng-tns-c85-1"
                                          style={{ padding: "5px;" }}
                                        >
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("1000")}
                                            value="1000"
                                          >
                                            1000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("2000")}
                                            value="2000"
                                          >
                                            2000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(5000)
                                            }
                                            value="5000"
                                          >
                                            5000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(10000)
                                            }
                                            value="10000"
                                          >
                                            10000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(20000)
                                            }
                                            value="20000"
                                          >
                                            20000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(50000)
                                            }
                                            value="50000"
                                          >
                                            50000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(100000)
                                            }
                                            value="100000"
                                          >
                                            100000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(250000)
                                            }
                                            value="250000"
                                          >
                                            250000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(500000)
                                            }
                                            value="500000"
                                          >
                                            500000
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    _ngcontent-hvs-c85=""
                                    class="col-md-12 ng-tns-c85-1"
                                  >
                                    <button
                                      type=""
                                      onClick={handleReset}
                                      class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                    >
                                      Reset
                                    </button>
                                    <button
                                      type="submit"
                                      id="submit_btn"
                                      onClick={() => Live_Bet_Api()}
                                      class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                    >
                                      Submit
                                    </button>
                                    <input
                                      id="tmp_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_section_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_market_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update_lambi"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                  </div>
                                  {/* </form> */}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : back == "lay" ? (
                      <div class="Lay_color bars_bg">
                        <div class="row">
                          <div class="card m-b-10 place-bet ">
                            <div _ngcontent-hvs-c85="" class="card-header ">
                              <h6 class="card-title d-inline-block ">
                                Place Bet
                              </h6>
                              <button
                                onClick={closeModal}
                                className="close_button"
                              >
                                <img
                                  src="assets/images/xmark-solid.svg"
                                  width="100%"
                                  alt=""
                                />
                              </button>
                            </div>
                            {showPopup ? (
                              <>
                                <input
                                  type="hidden"
                                  id="back-lay"
                                  value=""
                                  class="ng-tns-c85-1"
                                />
                                <ngx-spinner
                                  bdcolor="rgba(51,51,51,0.8)"
                                  size="medium"
                                  color="#fff"
                                  type="ball-scale-multiple"
                                  _nghost-hvs-c75=""
                                  class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                ></ngx-spinner>
                                <div
                                  class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                  style={{ paddingBottom: "4px;" }}
                                >
                                  {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                  <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                    <thead
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <th
                                          style={{
                                            width: "35%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          (Bet for)
                                        </th>
                                        <th
                                          style={{
                                            width: "25%",
                                            textAlign: "left;",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          odds{" "}
                                        </th>
                                        <th
                                          style={{
                                            width: "15%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          Stake
                                        </th>
                                        <th
                                          id="profit-head"
                                          style={{
                                            width: "15%",
                                            textAlign: "right",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          {" "}
                                          Profit{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          id="team_nm"
                                          class=" country_color ng-tns-c85-1"
                                        >
                                          {country}
                                        </td>
                                        <td
                                          style={{ width: "75px" }}
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group ng-tns-c85-1">
                                            <input
                                              placeholder="0"
                                              name="odds"
                                              type="text"
                                              required=""
                                              value={dataValue}
                                              id="odds"
                                              readonly=""
                                              class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              style={{
                                                width: "45px",
                                                verticalAlign: "middle",
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group bet-stake ng-tns-c85-1">
                                            <input
                                              id="btn_val"
                                              required=""
                                              value={betValue}
                                              type="text"
                                              // autocomplete="off"
                                              onChange={(e) =>
                                                setbetValue(e.target.value)
                                              }
                                              style={{ width: "82px" }}
                                              class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            />
                                          </div>
                                        </td>
                                        <td
                                          id="prft"
                                          class="text-right ng-tns-c85-1 ng-star-inserted"
                                          style={{ color: "#fff" }}
                                        >
                                          {" "}
                                          0.00
                                        </td>
                                      </tr>
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          colspan="5"
                                          class="value-buttons ng-tns-c85-1"
                                          style={{ padding: "5px;" }}
                                        >
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("1000")}
                                            value="1000"
                                          >
                                            1000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("2000")}
                                            value="2000"
                                          >
                                            2000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(5000)
                                            }
                                            value="5000"
                                          >
                                            5000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(10000)
                                            }
                                            value="10000"
                                          >
                                            10000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(20000)
                                            }
                                            value="20000"
                                          >
                                            20000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(50000)
                                            }
                                            value="50000"
                                          >
                                            50000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(100000)
                                            }
                                            value="100000"
                                          >
                                            100000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(250000)
                                            }
                                            value="250000"
                                          >
                                            250000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(500000)
                                            }
                                            value="500000"
                                          >
                                            500000
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    _ngcontent-hvs-c85=""
                                    class="col-md-12 ng-tns-c85-1"
                                  >
                                    <button
                                      type=""
                                      onClick={handleReset}
                                      class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                    >
                                      Reset
                                    </button>
                                    <button
                                      type="submit"
                                      id="submit_btn"
                                      onClick={() => Live_Bet_Api()}
                                      class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                    >
                                      Submit
                                    </button>
                                    <input
                                      id="tmp_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_section_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_market_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update_lambi"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                  </div>
                                  {/* </form> */}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div class="dp_none bars_bg">
                        <div class="row">
                          <div class="card m-b-10 place-bet ">
                            <div _ngcontent-hvs-c85="" class="card-header">
                              <h6 class="card-title d-inline-block ">
                                Place Bet
                              </h6>
                            </div>
                            {showPopup ? (
                              <>
                                <input
                                  type="hidden"
                                  id="back-lay"
                                  value=""
                                  class="ng-tns-c85-1"
                                />
                                <ngx-spinner
                                  bdcolor="rgba(51,51,51,0.8)"
                                  size="medium"
                                  color="#fff"
                                  type="ball-scale-multiple"
                                  _nghost-hvs-c75=""
                                  class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                ></ngx-spinner>
                                <div
                                  class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                  style={{ paddingBottom: "4px;" }}
                                >
                                  {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                  <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                    <thead
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <th
                                          style={{
                                            width: "35%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          (Bet for)
                                        </th>
                                        <th
                                          style={{
                                            width: "25%",
                                            textAlign: "left;",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          odds{" "}
                                        </th>
                                        <th
                                          style={{
                                            width: "15%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          Stake
                                        </th>
                                        <th
                                          id="profit-head"
                                          style={{
                                            width: "15%",
                                            textAlign: "right",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          {" "}
                                          Profit{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          id="team_nm"
                                          class=" country_color ng-tns-c85-1"
                                        >
                                          {country}
                                        </td>
                                        <td
                                          style={{ width: "75px" }}
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group ng-tns-c85-1">
                                            <input
                                              placeholder="0"
                                              name="odds"
                                              type="text"
                                              required=""
                                              value={dataValue}
                                              id="odds"
                                              readonly=""
                                              class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              style={{
                                                width: "45px",
                                                verticalAlign: "middle",
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group bet-stake ng-tns-c85-1">
                                            <input
                                              id="btn_val"
                                              required=""
                                              value={betValue}
                                              type="text"
                                              // autocomplete="off"
                                              onChange={(e) =>
                                                setbetValue(e.target.value)
                                              }
                                              style={{ width: "82px" }}
                                              class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            />
                                          </div>
                                        </td>
                                        <td
                                          id="prft"
                                          class="text-right ng-tns-c85-1 ng-star-inserted"
                                          style={{ color: "#fff" }}
                                        >
                                          {" "}
                                          0.00
                                        </td>
                                      </tr>
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          colspan="5"
                                          class="value-buttons ng-tns-c85-1"
                                          style={{ padding: "5px;" }}
                                        >
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("1000")}
                                            value="1000"
                                          >
                                            1000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("2000")}
                                            value="2000"
                                          >
                                            2000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(5000)
                                            }
                                            value="5000"
                                          >
                                            5000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(10000)
                                            }
                                            value="10000"
                                          >
                                            10000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(20000)
                                            }
                                            value="20000"
                                          >
                                            20000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(50000)
                                            }
                                            value="50000"
                                          >
                                            50000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(100000)
                                            }
                                            value="100000"
                                          >
                                            100000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(250000)
                                            }
                                            value="250000"
                                          >
                                            250000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(500000)
                                            }
                                            value="500000"
                                          >
                                            500000
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    _ngcontent-hvs-c85=""
                                    class="col-md-12 ng-tns-c85-1"
                                  >
                                    <button
                                      type=""
                                      onClick={handleReset}
                                      class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                    >
                                      Reset
                                    </button>
                                    <button
                                      type="submit"
                                      id="submit_btn"
                                      onClick={() => Live_Bet_Api()}
                                      class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                    >
                                      Submit
                                    </button>
                                    <input
                                      id="tmp_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_section_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_market_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update_lambi"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                  </div>
                                  {/* </form> */}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </Modal>

                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            class="section_heading"
                            style={{ display: "flex" }}
                          >
                            <h2>My Bet</h2>
                            <a className="Bet_button btn" href="/Bet_History">
                              Bet History
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mybet_table">
                      <div
                        class="table-responsive"
                        style={{
                          overflowY: "scroll",
                          overflowX: "hidden",
                          maxHeight: "400px",
                        }}
                      >
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Matched Bet</th>
                              <th>Odds</th>
                              <th>Result</th>
                              <th>Stake</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData?.map((item) => (
                              <tr key={item.id}>
                                <td>{item.team}</td>
                                <td>{item.type}</td>
                                {item.status == "1" ? (
                                  <td>
                                    {item.MatchStatus == "0" ? (
                                      <div className="result2">-</div>
                                    ) : (
                                      <div className="result1">+</div>
                                    )}
                                  </td>
                                ) : (
                                  <td>
                                    <div className="result5">.</div>
                                  </td>
                                )}
                                <td>{item.stake}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default Tennis_Matches;
