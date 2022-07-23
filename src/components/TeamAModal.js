import React, { useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { useRef } from 'react';

const TeamAModal = (props) => {
  const stakeVal = useRef();
  const burnVal = useRef();
  const [totalPoints, setTotalPoints] = useState(0);
  const [stakePoints, setStakePoints] = useState(0);
  const [burnPoints, setBurnPoints] = useState(0);

  const stake = () => {
    let val = stakeVal.current.value;
    if(val > props.myBalance) {
      stakeVal.current.value = props.myBalance;
    }
    props.stake(stakeVal.current.value);
  }
  const burn = () => {
    let val = burnVal.current.value;
    if(val > props.myBalance) {
      burnVal.current.value = props.myBalance;
    }
    props.burn(burnVal.current.value);
  }
  const handleStake = () => {
    setStakePoints(stakeVal.current.value);
    setTotalPoints(stakeVal.current.value*1+burnVal.current.value*2);
  }
  const handleBurn = () => {
    setBurnPoints(burnVal.current.value*2);
    setTotalPoints(stakeVal.current.value*1+burnVal.current.value*2);
  }
  const setMax1 = () => {
    stakeVal.current.value = props.myBalance;
    handleStake();
  }
  const setMax2 = () => {
    burnVal.current.value = props.myBalance;
    handleBurn();
  }
 
  return (
    <div>
      <h2 className="text-white">BOOST WITH $SHADOW</h2>
      <Row>
        <Col>
          <h6 className="text-white"><u>In-Wallet Balance</u></h6>
          <h6 className="text-white"><u>Staked</u></h6>
          <h6 className="text-white"><u>Earned</u></h6>
          <h6 className="text-white"><u>Total</u></h6>
          <h6 className="text-white mt-4">Total Points</h6>
        </Col>
        <Col>
          <h6 className="text-white">{props.myBalance}</h6>
          <h6 className="text-white">{props.stakedAmount}</h6>
          <h6 className="text-white">{props.deposit-props.stakedAmount}</h6>
          <h6 className="text-white">{props.myBalance+props.deposit}</h6>
          <h6 className="text-white mt-4">{totalPoints}</h6>
        </Col>
        <Col className="flex justify-end">
          <Image src={props.teamMark} style={{width:150}} />
        </Col>
      </Row>
      <div className="flex justify-start text-white">
        <button className="bg-[#C90000] rounded-lg px-3 mb-3" onClick={props.claimAll}>ClaimAll(test)</button>
      </div>  
      <div>
        <div className="flex justify-between items-center bg-black rounded-lg text-white p-3">
          <div className="text-lg font-bold">STAKE</div>
          <div className="relative flex flex-grow items-center justify-center">
          <input className="rounded-md border-2 border-white px-2 customInput bg-black" ref={stakeVal}
            min='0' step='0.1' type='number' placeholder={props.myBalance} onChange={handleStake}></input>
          <button className="text-[#C90000] maxbtn" onClick={setMax1}>| MAX</button>  
          </div>
          <button className="bg-[#C90000] rounded-lg px-3" onClick={stake}>Stake</button>
          <div className="ml-3" style={{width:60}}>{stakePoints}</div>
        </div>
        <div className="flex justify-between items-center bg-black rounded-lg text-white p-3 mt-3">
          <div className="text-lg font-bold">BURN</div>
          <div className="relative flex flex-grow items-center justify-center">
          <input className="rounded-md border-2 border-white px-2 customInput bg-black" ref={burnVal}
            min='0' step='0.1' type='number' placeholder={props.myBalance} onChange={handleBurn} ></input>
          <button className="text-[#C90000] maxbtn" onClick={setMax2}>| MAX</button>  
          </div>  
          <button className="bg-[#C90000] rounded-lg px-3" onClick={burn}>Burn*</button>
          <div className="ml-3" style={{width:60}}>{burnPoints}</div>
        </div>
        <h6 className="text-[#5c5c5c]">*Double points toward and Dashboard score</h6>
      </div>
    </div>
  );
};

export default TeamAModal;
