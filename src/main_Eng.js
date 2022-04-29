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

var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

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

          alert("Please check your mailbox.");
          auth.signOut();
        })
        .catch(async (error) => {
          if (error.code === "auth/email-already-in-use") {
            signInWithEmailAndPassword(auth, email, klipAddr).then(
              (userCredential) => {
                sendEmailVerification(userCredential.user)
                  .then((e) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    alert("Please check your mailbox.");
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

  useEffect(() => {
    fff();
    setIsLoading(true);
  }, []);

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
                    alert("Please install Kaikas wallet!");
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
                Login as Kaikas
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
                Kaikas connected
              </button>
            )}
          </div>
          <br />
          {/* {console.log(auth.currentUser)} */}
          <div className="inputAddr">
            <div className="des">
              Congratulations on the first NFT minting of Cat Star! <br />
              Thank you for participating in the event.
              <br />
              We ask for your interest and support. <br />
              <br />
              <br />
              <p>
                &#128680; If you have registered as a Klip wallet, you will not
                be able to view the NFT in Opensea. <br />
                <div style={{ fontWeight: "bold" }}>
                  Therefore, please check the klip wallet and enter a new wallet
                  address as described below.
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
                  1. Email authentication: Please enter your Klip address.{" "}
                  <br />
                  (*Note: Certification mail will be sent to the email you
                  entered in the form when you participated in the event.)
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
                  Authentication
                </button>
                <br />
                <p className="des_">
                  2. New kaikas Wallet Address: Enter klip Wallet Address and
                  New kaikas Wallet Address.
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
                    placeholder="New Kaikas Address"
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
                    alert("Please login with Kaikas!");
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
                            alert("Please verify your email.");
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
          </div>
          <div className="lua">
            <div className="textura"></div>
          </div>
          <br />
          <div className="language_eng">
            <div className="kor_eng">
              <Link to="/event" className="move">
                한국어
              </Link>
            </div>
            <div className="eng_eng">Engnlish</div>
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
