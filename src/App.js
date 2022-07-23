import React, { useState } from 'react';
import { Button, Col, Container, Row, Image, ProgressBar, Table } from "react-bootstrap";
import Box from "./assets/images/box.png";
import line from './assets/images/line.png'
function App(props) {
  return (
    <div className='main text-white bg-[url("./assets/images/home_hero_bg.png")] overflow-hidden'>
      <Container className="mt-[20px]">
        <h1 className="text-white">Total $Shadow</h1>
        <Row className="mb-[40px]">
          <Col className="d-flex border-2 rounded-xl border-black p-4 bg-[#212121] h-full">
            <Col className="col-2 text-center">
              <Col className="rounded-lg bg-[#000000]">
                <h1 className="text-light">2,863 K</h1>
              </Col>
              <p className="font-family">
                Total $Shadow <br /> Minted
              </p>
            </Col>
            <h1 className="text-light px-3">=</h1>
            <Col className="col-2 text-center">
              <Col className="rounded-lg bg-[#000000]">
                <h1 className="text-light">1,833 K</h1>
              </Col>
              <p className="font-family">
                Total $Shadow <br /> Staked
              </p>
            </Col>
            <h1 className="text-light px-3">+</h1>
            <Col className="col-2 text-center">
              <Col className="rounded-lg bg-[#000000]">
                <h1 className="text-light">745 K</h1>
              </Col>
              <p className="font-family">
                Total $Shadow <br /> burned
              </p>
            </Col>
            <h1 className="text-light px-3">+</h1>
            <Col className="col-2 text-center">
              <Col className="rounded-lg bg-[#000000]">
                <h1 className="text-light">285 K</h1>
              </Col>
              <p className="font-family">
                Total $Shadow <br /> circuloting
              </p>
            </Col>
            <Col className="col ml-10">
              <Image src={line} className="h-[100%] w-[2px]" />
            </Col>
            <Col className="col-2 text-center">
              <Col className="rounded-lg bg-[#000000]">
                <h1 className="text-light">42,234</h1>
              </Col>
              <p className="font-family">Total players</p>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mb-[40px]">
          <Col className="d-flex flex-column col-8">
            <h1 className="text-white">My Dashboard</h1>
            <Col className="bg-[#212121]  border-2 rounded-xl border-black p-4 h-full">
              <Col className=" d-flex justify-content-between">
                <Col className="col-3 text-center">
                  {/* <p>Total Points</p> */}
                  <Col className="rounded-lg bg-[#000000]">
                    <h1 className="text-light">7,209</h1>
                  </Col>
                </Col>
                <h1 className="text-light">=</h1>
                <Col className="col-3 text-center">
                  <Col className="rounded-lg bg-[#000000]">
                    <h1 className="text-light">5,833</h1>
                  </Col>
                </Col>
                <h1 className="text-light">+</h1>
                <Col className="col-3 text-center">
                  <Col className="rounded-lg bg-[#000000]">
                    <h1 className="text-light">1,376</h1>
                  </Col>
                </Col>
              </Col>
              <Col className=" d-flex justify-content-between">
                <Col className="col-3 text-center">
                  <Col className="d-flex flex-column align-items-center rounded-lg bg-[#000000] py-3">
                    <p className="font-family">My rank</p>
                    <h1 className="text-light font-family">54</h1>
                    <p className="text-muted mt-4 font-family">
                      Ends In: 10 hr 23 min 38 sec
                    </p>
                    <ProgressBar
                      className="w-75 mb-3"
                      variant="danger"
                      now={80}
                    />
                  </Col>
                </Col>

                <Col className="col-3 text-center">
                  <Col className="rounded-lg bg-[#000000]">
                    <h1 className="text-light font-family">5,833</h1>
                  </Col>
                  <p className="font-family">
                    Total $SHADOW <br /> Staked
                  </p>
                </Col>
                <Col className="col-3 text-center">
                  <Col className="rounded-lg bg-[#000000]">
                    <h1 className="text-light font-family">688</h1>
                  </Col>
                  <p className="font-familyß">
                    Total $Shadow <br /> Burned
                  </p>
                </Col>
              </Col>
              <p className="text-end font-family">
                *Double points toward team and Dashboard score
              </p>
            </Col>
          </Col>
          <Col className="d-flex flex-column col-4 ">
            <h1 className="text-white">weekly loot</h1>
            <Col className="bg-[#212121] text-center  border-2 rounded-xl border-black p-4 h-full">
              <h2 className="text-danger">Your are not qualified</h2>
              <p className="font-family">
                Need to be in the top 50% of all stakers to take the weekly
                loot. Your place{" "}
                <span className="text-danger font-family">156 out of 222</span>.
              </p>
              <ProgressBar variant="danger" now={80} />
              <button className="mt-3 py-2 w-50 rounded-2xl bg-[#C90000] font-family">
                BOOST
              </button>
              <p className="text-muted mt-[50px] font-family">
                Ends In: 10 hr 23 min 38 sec
              </p>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
        <Row>
          <Col className="d-flex flex-column col-6">
            <h1 className="text-white">Past History</h1>
            <Col
              className="bg-[#212121] text-center  border-2 rounded-xl border-black p-4 h-full"
              style={{ overflow: "hidden" }}
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th className="font-family">APE vs Bears</th>
                    <td className="text-success font-family">you won</td>
                    <th className="text-success font-family">Buy Rebol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="font-family">Monkey vs Donkey</th>
                    <td className="text-danger font-family">you lost</td>
                  </tr>
                  <tr>
                    <th className="font-family">APE vs Bears</th>
                    <td className="text-success font-family">you won</td>
                    <th className="text-success font-family">Buy Rebol</th>
                  </tr>
                  <tr>
                    <th className="font-family">Monkey vs Donkey</th>
                    <td className="text-danger font-family">you lost</td>
                  </tr>
                  <tr>
                    <th className="font-family">APE vs Bears</th>
                    <td className="text-success font-family">you won</td>
                    <th className="text-success font-family">Buy Rebol</th>
                  </tr>
                  <tr>
                    <th className="font-family">Monkey vs Donkey</th>
                    <td className="text-danger font-family">you lost</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Col>
          <Col
            className="d-flex flex-column col-6"
            style={{ overflow: "hidden" }}
          >
            <h1 className="text-white">Clam Lootbox</h1>
            <Col className="bg-[#212121] text-center  border-2 rounded-xl border-black p-4 h-full">
              <p className="mt-4 text-left underline font-family">
                Total $SHADOW to open: 15
              </p>
              <Col className="col-12 d-flex bg-[#000000] text-center  border-2 rounded-xl border-black">
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
              </Col>
              <Col className="mt-1 col-12 d-flex bg-[#000000] text-center  border-2 rounded-xl border-black">
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
                <Col className="col-3 d-flex justify-content-center">
                  <Image src={Box} />
                </Col>
              </Col>
              <Col>
                <div className="space-x-4 flex">
                  <Button
                    variant="outline-secondary"
                    className="mt-3 w-50 rounded-2xl font-family"
                  >
                    Select all
                  </Button>
                  <Button
                    variant="danger"
                    className="mt-3 w-50 rounded-2xl font-family"
                  >
                    Open
                  </Button>
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
      </Container>

      <Container className="mb-5">
        <Row>
          <Col className="d-flex flex-column col-12 mb-[150px]">
            <h1 className="text-white">LEADERBOARD</h1>
            <Col className="bg-[#212121] text-center  border-2 rounded-xl border-black p-4 col-12">
              <div className="">
                <h1 className="text-white">BOARD</h1>
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                      <div className="table-responsive border rounded-lg overflow-y-scroll h-[600px]">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-black">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-white uppercase font-family"
                              >
                                Medols
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-white uppercase font-family"
                              >
                                Wallet Adress
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-white uppercase font-family"
                              >
                                Rank
                              </th>

                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                              >
                                $Shadow Staked
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                              >
                                $Shadow Burned
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                              >
                                Total Points
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                              >
                                Total Bounus
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 ">
                            <tr className="bg-[#212121]">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-[#212121]">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white " href="#">
                                  17
                                </a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-[#212121]">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white " href="#">
                                  17
                                </a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                            <tr className="bg-gradient-to-r from-black via-[#212121] to-black">
                              <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap font-family">
                                Ape Butts 1
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                4,543
                              </td>
                              <td className="px-6 py-4 text-sm text-white whitespace-nowrap font-family">
                                94
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">4500 K</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white ">17</a>
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap font-family">
                                <a className="text-white">17</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;