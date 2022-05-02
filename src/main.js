import React, { useEffect } from "react";
import Caver from "caver-js";
import { users } from "./list/basicUser";
import { elements } from "./list/elements";
import { emails } from "./list/emailListBasic";
//import { smtpTransport } from "../email";
import { address, abi, _mintabi } from "./contractInfo";
import Modal from "./modal/Modal";
import ModalAlert from "./modal/ModalAlert";
import ModalEmpty from "./modal/ModalEmpty";
import ModalSuccess from "./modal/SuccessModal";
import ModalAuth from "./modal/AuthModal";
import "./main.css";
import kaikas from "./img/kaikas.png";
import { Link } from "react-router-dom";

import $ from "jquery";
import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const caver = new Caver(window.klaytn);
const klaytn = window.klaytn;
const merkleTree = new MerkleTree(elements, keccak256, { sort: true });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Main() {
  const [email, setEmail] = React.useState("");
  const [klipAddr, setKlipAddr] = React.useState("");
  const [authModalShow, setAuthModalShow] = React.useState(false);
  const [userAddr, setUserAddr] = React.useState("");
  const [newUserAddr, setNewUserAddr] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [alertModalShow, setAlertModalShow] = React.useState(false);
  const [emptyModalShow, setEmptyModalShow] = React.useState(false);
  const [successModalShow, setSuccessModalShow] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [test, setTest] = React.useState([
    {
      styleClass: "",
      inlineStyle: {
        animationDelay: "0s",
        left: 0,
        top: 0,
        opacity: 0,
      },
    },
  ]);

  let style = ["style1", "style2", "style3", "style4"];
  let tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  let opacity = [
    "opacity1",
    "opacity1",
    "opacity1",
    "opacity2",
    "opacity2",
    "opacity3",
  ];
  let widthWindow = window.innerWidth;
  let heightWindow = window.innerHeight;

  const fff = () => {
    setTest(
      Array(200)
        .fill(0)
        .map(() => {
          return {
            styleClass:
              "estrela " +
              style[getRandomArbitrary(0, 4)] +
              " " +
              opacity[getRandomArbitrary(0, 6)] +
              " " +
              tam[getRandomArbitrary(0, 5)] +
              " ",

            inlineStyle: {
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(0, heightWindow),
              opacity: [getRandomArbitrary(0, 6)],
            },
          };
        })
    );
  };

  const sendEmail = () => {
    if (email == undefined) {
      setModalShow(true);
    } else {
      createUserWithEmailAndPassword(auth, email, klipAddr)
        .then(() => {
          // send verification mail.
          sendEmailVerification(auth.currentUser);

          alert("메일함을 확인해 주세요.");
          auth.signOut();
        })
        .catch(async (error) => {
          if (error.code === "auth/email-already-in-use") {
            signInWithEmailAndPassword(auth, email, klipAddr).then(
              (userCredential) => {
                sendEmailVerification(userCredential.user)
                  .then((e) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    alert("메일함을 확인해 주세요.");
                  })
                  .catch((error) => {
                    //console.log("안된 안됨", error);
                  });
              }
            );
          }
        });
    }
  };

  var bubblyButtons = document.getElementsByClassName("bubbly-button");

  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        //reset animation
        e.target.classList.remove("animate");

        e.target.classList.add("animate");
        setTimeout(function () {
          e.target.classList.remove("animate");
        }, 900);
      },
      false
    );
  }

  async function name(params) {
    contract = new caver.klay.Contract(abi, address);
    console.log("sssssss", await contract.methods.optionToTokenID(1).call());
  }

  useEffect(() => {
    fff();
    name();
    setIsLoading(true);
  }, []);

  let contract;
  let leaf;

  return (
    <>
      {!isLoading ? (
        <div />
      ) : (
        <div className="back">
          <div className="constelacao">
            {Array(200)
              .fill(0)
              .map((_, index) => {
                return (
                  <span
                    id={index}
                    className={test[index].styleClass}
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShow({
                        setShow: true,
                        id: index,
                      });
                    }}
                    style={test[index].inlineStyle}
                  ></span>
                );
              })}
          </div>

          <div className="title">Basic NFT</div>
          <div className="wallet">
            {(klaytn === undefined || klaytn.selectedAddress === undefined) && (
              <button
                className="mainWalletConnect"
                onClick={async () => {
                  if (klaytn === undefined) {
                    alert("카이카스 지갑을 설치해 주세요!");
                  } else {
                    await klaytn.enable();
                    window.location.reload();
                  }
                }}
              >
                <img
                  src={kaikas}
                  style={{
                    height: 18,
                    width: 18,
                    marginRight: 8,
                    marginBottom: 6,
                  }}
                ></img>
                Kaikas로 로그인
              </button>
            )}
            {klaytn !== undefined && klaytn.selectedAddress !== undefined && (
              <button className="mainWalletConnect">
                <img
                  src={kaikas}
                  style={{
                    height: 18,
                    width: 18,
                    marginRight: 8,
                    marginBottom: 6,
                  }}
                ></img>
                Kaikas 연결됨
              </button>
            )}
          </div>
          <br />
          <div className="title">
            점검 중입니다. 이용에 불편을 드려 죄송합니다.
            <br />
            It's under inspection. We apologize for the inconvenience.
          </div>
          <div className="title"></div>
          {/* {console.log(auth.currentUser)} */}
          {/* <div className="inputAddr">
            <div className="des">
              고양이 별의 첫번째 NFT 발행을 축하드립니다! <br />
              이벤트에 참여해 주셔서 감사합니다. <br />
              앞으로 고양이 별에 많은 관심 부탁드립니다. <br />
              <br />
              <br />
              <p>
                &#128680; 클립(Klip) 지갑으로 등록하신 경우 Opensea 에서 NFT를
                볼 수 없습니다. <br />
                <div style={{ fontWeight: "bold" }}>
                  따라서 klip wallet 을 체크하시고 아래의 설명에 따라 새로운
                  지갑을 입력해 주세요.
                </div>
              </p>
            </div>
            <form className="userAddr">
              <input
                className="input"
                type="text"
                name="userAddress"
                onChange={(e) => {
                  setUserAddr(e.target.value);
                }}
                value={userAddr}
                placeholder="Address"
              ></input>
            </form>
            <br />
            <div className="klipWalletCheck">
              <input
                type="checkbox"
                className="checkBox"
                onClick={() => controlCheckBox()}
                style={{ cursor: "pointer" }}
              />
              <label
                htmlFor="klipCheck"
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: "gray",
                }}
              >
                Klip Wallet
              </label>
              <div
                className="sendEmail"
                style={{
                  display: "none",
                }}
              >
                <p className="des_">
                  1. 이메일 인증 : Klip 주소를 입력해 주세요. <br />
                  (*참고 : 인증 메일은 이벤트 참여시 입력하셨던 이메일로
                  전송됩니다.)
                </p>
                <input
                  type="text"
                  placeholder="Klip Address"
                  onChange={(e) => {
                    setKlipAddr(e.target.value);
                    setEmail(emails[users.indexOf(e.target.value)]);
                  }}
                ></input>
                <button className="auth" onClick={sendEmail}>
                  인증
                </button>
                <br />
                <p className="des_">
                  2. 새 kaikas 지갑 주소 : klip 지갑 주소와 새 kaikas 지갑
                  주소를 입력해 주세요.
                </p>
                <form className="userAddr_">
                  <input
                    className="input"
                    type="text"
                    name="userAddress"
                    onChange={(e) => {
                      setUserAddr(e.target.value);
                    }}
                    value={userAddr}
                    placeholder="Klip Address"
                  ></input>
                </form>
                <br />
                <form className="newUserAddr">
                  <input
                    className="input"
                    type="text"
                    name="newUserAddress"
                    onChange={(e) => {
                      setNewUserAddr(e.target.value);
                    }}
                    value={newUserAddr}
                    placeholder="Kaikas Address"
                  ></input>
                </form>
              </div>
            </div>

            <div>
              <Modal show={modalShow} onHide={() => setModalShow(false)} />
              <ModalAlert
                show={alertModalShow}
                onHide={() => setAlertModalShow(false)}
              />
              <ModalEmpty
                show={emptyModalShow}
                onHide={() => setEmptyModalShow(false)}
              />

              <ModalSuccess
                show={successModalShow}
                onHide={() => setSuccessModalShow(false)}
              />

              <ModalAuth
                show={authModalShow}
                onHide={() => setAuthModalShow(false)}
              />
              <button
                className="bubbly-button"
                onClick={async () => {
                  if (
                    (await klaytn._kaikas.isUnlocked()) === false ||
                    klaytn.selectedAddress === undefined
                  ) {
                    alert("kaikas 로 로그인 해주세요!");
                  } else if ($(".checkBox").is(":checked")) {
                    const email = emails[users.indexOf(userAddr)];
                    if (email == undefined) {
                      setModalShow(true);
                    } else {
                      signInWithEmailAndPassword(auth, email, userAddr)
                        .then(async (userCredential) => {
                          if (userCredential.user.emailVerified !== true) {
                            setAuthModalShow(true);
                          } else if (newUserAddr === "") {
                            setEmptyModalShow(true);
                          } else {
                            const data =
                              "0x0000000000000000000000000000000000000000000000000000000000000000";
                            const contract = new caver.klay.Contract(
                              abi,
                              address
                            );
                            const leaf = elements[users.indexOf(userAddr)];

                            if (leaf === undefined) {
                              setModalShow(true);
                            } else {
                              const proof = merkleTree.getHexProof(leaf);
                              try {
                                await contract.methods
                                  .mintBasicWithNewAddr(
                                    userAddr,
                                    newUserAddr,
                                    proof,
                                    data
                                  )
                                  .send({
                                    from: klaytn.selectedAddress,
                                    gas: 1000000,
                                  })
                                  .then(function (receipt) {
                                    setSuccessModalShow(true);
                                  });
                              } catch (e) {
                                if (e) {
                                  setAlertModalShow(true);
                                  //console.log(e);
                                }
                              }
                            }
                          }
                        })
                        .catch((error) => {
                          if (error.code === "auth/user-not-found") {
                            alert("이메일 인증을 해주세요.");
                          }
                        });
                    }
                  } else {
                    if (userAddr === "") {
                      setEmptyModalShow(true);
                    } else {
                      const data =
                        "0x0000000000000000000000000000000000000000000000000000000000000000";
                      const contract = new caver.klay.Contract(abi, address);
                      const leaf = elements[users.indexOf(userAddr)];

                      if (leaf === undefined) {
                        setModalShow(true);
                      } else {
                        const proof = merkleTree.getHexProof(leaf);

                        try {
                          await contract.methods
                            .mintBasic(userAddr, proof, data)
                            .send({
                              from: klaytn.selectedAddress,
                              gas: 1000000,
                            })
                            .then(function (receipt) {
                              setSuccessModalShow(true);
                            });
                        } catch (e) {
                          if (e) {
                            setAlertModalShow(true);
                            //console.log(e);
                          }
                        }
                      }
                    }
                  }
                }}
              >
                mint
              </button>
            </div>
          </div> */}
          <div className="lua">
            <div className="textura"></div>
          </div>
          <br />
          <div className="language">
            <div className="eng">
              <Link to="/event/eng" className="move">
                Engnlish
              </Link>
            </div>
            <div className="kor">한국어</div>
          </div>
        </div>
      )}
    </>
  );
}

function controlCheckBox() {
  if ($(".checkBox").is(":checked")) {
    $(".sendEmail").show();
  } else {
    $(".sendEmail").hide();
  }
}
export default Main;
