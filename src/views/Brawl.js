import React, { useState } from 'react';
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import Twitter from '../assets/images/twitter.png';
import Discord from '../assets/images/discord.png';
import ArrowTop from '../assets/images/arrow-top.svg';
import ArrowBottom from '../assets/images/arrow-bottom.svg';
function Brawl(props) {
  return (
    <div className='main text-white bg-[url("./assets/images/home_hero_bg.png")] overflow-hidden'>
      <Container>
        <div className="xl:flex mb-[100px] space-y-10 xl:space-y-0">
          <div className="mr-[50px] xl:w-[30%] w-[100%]">
            <h3 className="text-white">SELECT PROJECT</h3>
            <div className="bg-[#212121] py-[30px] px-[25px] rounded-xl">
              <div className="bg-[#000000] py-[8px] px-4 mb-4 flex items-center justify-between rounded-xl">
                <p className="font-family">Trippin’ ape tribe</p>
                <div className="flex flex-col items-center space-y-2">
                  {/* icon */}
                  <Image src={ArrowTop} alt="ArrowTop" className="h-2 w-3" />
                  <Image src={ArrowBottom} alt="ArrowTop" className="h-2 w-3" />
                </div>
              </div>
              <div className="bg-black py-3 px-4 rounded-xl">
                <p className="font-family">Mutant Ape Yacht Club</p>
                <p className="font-family">Mutant Ape Yacht Club</p>
                <p className="font-family">Mutant Ape Yacht Club</p>
              </div>
            </div>
          </div>
          <div className="xl:w-[70%] w-[100%]">
            <h3 className="text-white">BOOST with $SHADOW</h3>
            <div className="bg-[#212121] px-[10px] py-[15px] xl:px-[25px] xl:py-[30px] rounded-xl">
              <div>
                <div className="flex items-center justify-between">
                  <p className="underline font-family">In wallet</p>
                  <p className="xl:pr-[500px] font-family">303.44</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="underline font-family">Earned</p>
                  <p className="xl:pr-[500px] font-family">5,093.32</p>
                </div>
                <div className="flex items-center mb-10 justify-between">
                  <p className="underline font-family">Total</p>
                  <p className="xl:pr-[500px] font-family">5,393.76</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-family">Total points</p>
                  <p className="xl:pr-[500px] font-family">10,783.44</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-black rounded-lg pt-2 py-2 my-4">
                <h3 className="text-white pl-4">STAKE</h3>
                <div className="xl:inline-flex items-center justify-between border border-gray-400 rounded-xl px-[100px] space-x-4 pt-2 hidden">
                  <h4 className="text-gray-700 font-bold">5,393.76</h4>
                  {/* icon */}
                  <h4 className="text-white">|</h4>
                  <h4 className="text-[#C90000]">MAX</h4>
                </div>

                <div className="flex items-center justify-between border border-gray-400 rounded-xl xl:px-[100px] px-2 space-x-1 pt-2 xl:hidden">
                  <h4 className="text-gray-700 font-bold">5,393.76</h4>
                  {/* icon */}
                  <h4 className="text-white">|</h4>
                  <h4 className="text-[#C90000]">MAX</h4>
                </div>

                <p className="pr-4 font-family">0.00</p>
              </div>

              <div className="flex items-center justify-between bg-black rounded-lg pt-2 py-2 my-4">
                <h3 className="text-white pl-4">BURN*</h3>
                <div className="xl:inline-flex items-center justify-between border border-gray-400 rounded-xl px-[100px] space-x-4 pt-2 hidden">
                  <h4 className="text-white font-bold">5,393.76</h4>
                  {/* icon */}
                  <h4 className="text-white">|</h4>
                  <h4 className="text-[#C90000]">MAX</h4>
                </div>

                <div className="flex items-center justify-between border border-gray-400 rounded-xl xl:px-[100px] px-2 space-x-1 pt-2 xl:hidden">
                  <h4 className="text-white font-bold">5,393.76</h4>
                  {/* icon */}
                  <h4 className="text-white">|</h4>
                  <h4 className="text-[#C90000]">MAX</h4>
                </div>
                <p className="pr-4 font-family">0.00</p>
              </div>

              <div className="flex justify-between">
                <p className="text-[#5C5C5C] font-family pr-3 xl:pr-0">
                  *Double points toward team and Dashboard score
                </p>
                <button className="bg-[#C90000] xl:h-[47px] h-10 w-[150px] xl:w-[250px] rounded-lg text-[24px] font-family">
                  BOOST
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* board */}
        <div className="mb-[200px]">
          <h1 className="text-white">BOARD</h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="table-responsive border rounded-lg overflow-y-scroll h-[400px]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-black">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-white uppercase font-family"
                        >
                          Project
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-white uppercase font-family"
                        >
                          Rank
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-white uppercase font-family"
                        >
                          Total NFT
                        </th>
                      
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                        >
                          Bonus %
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                        >
                          Total %
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                        >
                          $Glory <br /> staked
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-white uppercase font-family"
                        >
                          $Glory burned <br /> (GLORY*2)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="mb-[50px] flex items-center justify-center space-x-4">
          <Image src={Twitter} alt="twitter" className="w-7 h-7" />
          <Image src={Discord} alt="twitter" className="w-7 h-7" />
          <Image src={Twitter} alt="twitter" className="w-7 h-7" />
        </div>
      </Container>
    </div>
  );
}

export default Brawl;