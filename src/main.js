import React, { useEffect } from "react";
import Caver from "caver-js";
import { users } from "./userList_test";
import { elements } from "./elements_test";
import { address, abi } from "./contractInfo";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";
import ModalEmpty from "./ModalEmpty";
import "./main.css";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const caver = new Caver(window.klaytn);
const klaytn = window.klaytn;
const merkleTree = new MerkleTree(elements, keccak256, { sort: true });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Main() {
  const [userAddr, setUserAddr] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [alertModalShow, setAlertModalShow] = React.useState(false);
  const [emptyModalShow, setEmptyModalShow] = React.useState(false);
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

  const onChange = (e) => {
    setUserAddr(e.target.value);
  };
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
          <div className="inputAddr">
            <form className="userAddr">
              <input
                className="input"
                type="text"
                name="userAddress"
                onChange={onChange}
                value={userAddr}
                placeholder="Address"
              ></input>
            </form>

            <div className="des">
              고양이 별의 첫번째 NFT 발행을 축하드립니다! <br />
              이벤트에 참여해 주셔서 감사합니다. <br />
              앞으로 고양이 별에 많은 관심 부탁드립니다. <br />
              <br />
              <br />
              Congratulations on the first NFT minting of the Cat Star! <br />
              Thank you for participating in the event. <br />
              Please pay a lot of attention to "Cat Star".
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
              <button
                className="bubbly-button"
                onClick={async () => {
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
                          .mint(0, userAddr, proof, data)
                          .send({
                            from: klaytn.selectedAddress,
                            gas: 1000000,
                          })
                          .then(function (receipt) {
                            console.log(receipt);
                          });
                      } catch (e) {
                        if (e) {
                          setAlertModalShow(true);
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
        </div>
      )}
    </>
  );
}
export default Main;
