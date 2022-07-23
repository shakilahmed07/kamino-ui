import { useEffect, useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, resolveToWalletAddress, } from "@nfteyez/sol-rayz";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import { Modal } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { selectBalance, setBalance } from '../features/balanceSlice';
import TeamAModal from "../components/TeamAModal";
import Mynft from '../components/Mynft';
import Stakenft from '../components/Stakenft';
import Progressbar from '../components/Progress_bar';
import Opbar from '../components/Opbar';
import TutorialService from '../services/TutorialService';
//import { PublicKey, Connection } from '@solana/web3.js';
import { _stake, _lockStake, _claim, _unStake, _getATA, _getPDA, _getUserStakingIndex, 
  _lootBox, _getStakingdata, _kageMint, auryMintPubkey, _getGlobalData } from '../contract/utils';
//import { BN } from '@project-serum/anchor';
import * as metaplex from "@metaplex/js";
import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Program, Provider, utils, BN } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import idl from '../shadow/idl.json';
import CancelIcoWhite from "../assets/icons/CancelIcoWhite";
import TeamAMark from '../assets/images/team_a_mark.png';
import TeamBMark from '../assets/images/team_b_mark.png';
import Between from '../assets/images/between.png';
import Logo from '../assets/images/logo.png';
import VS from '../assets/images/VS.png';
import CommuniMad from '../assets/images/Communi3-Mad-Scientists-1.png';
import FamousFox from '../assets/images/Famous-Fox-Federation-1.png';
import BoryokuDragonz from '../assets/images/Boryoku-Dragonz-1.png';
import OkayBears from '../assets/images/Okay-Bears-1.png';
import GhostKidDAO from '../assets/images/GhostKidDAO-1.png';
import CETSONCRECK from '../assets/images/CETS-ON-CRECK-1.png';
import Twitter from '../assets/images/twitter.png';
import Discord from '../assets/images/discord.png';


const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
const mintPubkey = new PublicKey('F5EEbpa26qJmeEfU1uTqcTrYkRf55QVKtM23ERJwYpRz');


function Upcoming(props) {
  const { publicKey } = useWallet();
  const wallet = useWallet();
  const { connection } = props;
  const dispatch = useDispatch();
  // state change
  useEffect(() => {
    setNfts([]);
    setShow(false);
     if (publicKey) {
      initialize();
//      airdrop50();
     }
  }, [publicKey, connection]);

  const [nfts, setNfts] = useState([]);
  //alert props
  const [show, setShow] = useState(false);

  //loading props
  const [loading, setLoading] = useState(false);
  const [applyModalA, setApplyModalA] = useState(false);
  const [applyModalB, setApplyModalB] = useState(false);

  const [remainingsA, setRemainingsA] = useState([]);
  const [remainingsB, setRemainingsB] = useState([]);

  const [aNFTs, setANFTs] = useState([]);
  const [bNFTs, setBNFTs] = useState([]);
  const [aStakedNFTs, setAStakedNFTs] = useState([]);
  const [bStakedNFTs, setBStakedNFTs] = useState([]);
  const [aSelectedNFTs, setASelNFTs] = useState([]);
  const [bSelectedNFTs, setBSelNFTs] = useState([]);
  const [aUnstakedNFTs, setAUnstakedNFTs] = useState([]);
  const [bUnstakedNFTs, setBUnstakedNFTs] = useState([]);
  const [aCounter, setACounter] = useState('0');
  const [bCounter, setBCounter] = useState('0');
  const [claimAmount, setClaimAmount] = useState('0');

  const tokenAmount = useRef();
  const tokenAmountB = useRef();
  const balance = useSelector(selectBalance);
  const [myShadow, setMyShadow] = useState(0);
  const [myXShadow, setMyXShadow] = useState(0);
  const [userXShadow, setUserXShadow] = useState(0);
  const [curPrice, setCurPrice] = useState(1);
  const [curShadow, setCurShadow] = useState(0);
  const [expire, setExpire] = useState(true);
  const [aTotal, setATotal] = useState("0");
  const [bTotal, setBTotal] = useState("0");
  const [aPoints, setAPoints] = useState("0");
  const [bPoints, setBPoints] = useState("0");
  const [aSingleStaked, setASingleStaked] = useState(0);
  const [bSingleStaked, setBSingleStaked] = useState(0);


  async function initialize() {
    setRemainingsA([]);
    setRemainingsB([]);
    const gData = await _getGlobalData(wallet);
    console.log('gData', gData);
    const aNames = gData.teamANames;
    const bNames = gData.teamANames;
    const aCnt = gData.teamANfts.toString();
    const bCnt = gData.teamBNfts.toString();
    setACounter(aCnt);
    setBCounter(bCnt);
    getNfts(aNames, bNames);
    // get staked nfts
    const mData = await _getStakingdata(wallet, 0);
    console.log('mData', mData);
    startClock();
    if(mData.claimableAuryAmount) {
      const val = mData.claimableAuryAmount.div(new BN(1e9)).toString();
      setClaimAmount(val);
    }
    const mintNfts = mData.nftMintKeys;
    const tmpA = [];
    const tmpB = [];
    if(!mintNfts) return;
    for(const mintNft of mintNfts) {
      const pdaAddress = await _getPDA(wallet, mintNft);
      const [pubkey, bump] = await _getATA(wallet, mintNft);
      const _nft = [];
      const meta = await getMetaData(mintNft.toString());
      _nft.data = {name:meta.metadata.data.data.name};
      const response = await fetch(meta.metadata.data.data.uri);
	    const data = await response.json();
      _nft.mint = mintNft.toString();
      _nft.image = data.image;
      _nft.pda = pdaAddress;
      _nft.pk = mintNft;
      _nft.pubkey = pubkey;
      _nft.bump = bump
      // for(const a of aNames) {
        if(_nft.data.name.includes("WarriorA")) {
          tmpA.push(_nft);
          // break;
        }
      // }
      // for(const b of bNames) {
        if(_nft.data.name.includes("WarriorB")) {
          tmpB.push(_nft);
          // break;
        }
      // }
      
    }
    setAStakedNFTs(tmpA);
    setBStakedNFTs(tmpB);
    console.log(tmpA, tmpB);
  }

  const getMetaData = async (tokenAddress) => {
    const con = new Connection(
      "https://metaplex.devnet.rpcpool.com",
      "confirmed"
    );
    const metadataPDA = await metaplex.programs.metadata.Metadata.getPDA(
      tokenAddress
    );
    const mintAccInfo = await con.getAccountInfo(metadataPDA); // fetch account info 
    const metadata = metaplex.programs.metadata.Metadata.from(
      new metaplex.Account(tokenAddress, mintAccInfo)
    );
  
    console.log(metadata);
    return {
      metadata: metadata,
      metaPDA: metadataPDA,
    };
  }

  const getNfts = async (aNames, bNames) => {
    setShow(false);
    let address = publicKey;
    if (!isValidSolanaAddress(address)) {
      setLoading(false);
      setShow(true);
      return;
    }
    let con = connection;
    if(connection == "https://api.devnet.solana.com") {
      con = "https://metaplex.devnet.rpcpool.com";
    }
    const connect = createConnectionConfig(con);
    setLoading(true);
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress: address,
      connection: connect,
      serialization: true,
    });
    if (nftArray.length === 0) {
      setLoading(false);
      setShow(true);
      return;
    }

    const metadatas = await fetchMetadata(nftArray);
    var group = {
      TeamA: [],
      TeamB: [],
    };

    for (const nft of metadatas) {
      // for(const teamAName of aNames) {
        if(nft.data.name.includes("WarriorA")){
          group['TeamA'].push(nft);
          // break;
        }
      // }
      // for(const teamBName of bNames) {
        if(nft.data.name.includes("WarriorB")){
          group['TeamB'].push(nft);
          // break;
        }
      // }
    }
    console.log(group);
    setANFTs(group['TeamA']);
    setBNFTs(group['TeamB']);
    setLoading(false);
    return setNfts(metadatas);
  };

  const fetchMetadata = async (nftArray) => {
    let metadatas = [];
    for (const nft of nftArray) {
      try {
        await fetch(nft.data.uri)
        .then((response) => response.json())
        .then((meta) => { 
          metadatas.push({...meta, ...nft});
        });
      } catch (error) {
        console.log(error);
      }
    }
    return metadatas;
  };

  async function addRemainingsA(_nft) {
    for(const snft of aStakedNFTs) {
      if(snft.mint === _nft.mint) {
        await selStakedNftsA(snft);
        return;
      }
    }
    setAUnstakedNFTs([]);
    let newSelNft = [];
    let inFlag = false;
    for(const t of aSelectedNFTs) {
      if(t.mint !== _nft.mint) {
        newSelNft.push(t);
      }else{
        inFlag = true;
      }
    }
    if(!inFlag) {
      const pk = new PublicKey(_nft.mint);
      const pdaAddress = await _getPDA(wallet, pk);
      const [pubkey, bump] = await _getATA(wallet, pk);
      _nft.pda = pdaAddress;
      _nft.pk = pk;
      _nft.pubkey = pubkey;
      _nft.bump = bump
      newSelNft.push(_nft);
    }
    setASelNFTs(newSelNft);
  }

  async function addRemainingsB(_nft) {
    for(const snft of bStakedNFTs) {
      if(snft.mint === _nft.mint) {
        await selStakedNftsB(snft);
        return;
      }
    }
    setBUnstakedNFTs([]);
    let newSelNft = [];
    let inFlag = false;
    for(const t of bSelectedNFTs) {
      if(t.mint !== _nft.mint) {
        newSelNft.push(t);
      }else{
        inFlag = true;
      }
    }
    if(!inFlag) {
      const pk = new PublicKey(_nft.mint);
      const pdaAddress = await _getPDA(wallet, pk);
      const [pubkey, bump] = await _getATA(wallet, pk);
      _nft.pda = pdaAddress;
      _nft.pk = pk;
      _nft.pubkey = pubkey;
      _nft.bump = bump
      newSelNft.push(_nft);
    }
    setBSelNFTs(newSelNft);
  }

  async function selStakedNftsA(_nft) {
    setASelNFTs([]);
    let newSelNft = [];
    let inFlag = false;
    for(const t of aUnstakedNFTs) {
      if(t.pk !== _nft.pk) {
        newSelNft.push(t);
      }else{
        inFlag = true;
      }
    }
    if(!inFlag) {
      newSelNft.push(_nft);
    }
    setAUnstakedNFTs(newSelNft);
  }

  async function selStakedNftsB(_nft) {
    setBSelNFTs([]);
    let newSelNft = [];
    let inFlag = false;
    for(const t of bUnstakedNFTs) {
      if(t.pk !== _nft.pk) {
        newSelNft.push(t);
      }else{
        inFlag = true;
      }
    }
    if(!inFlag) {
      newSelNft.push(_nft);
    }
    setBUnstakedNFTs(newSelNft);
  }

  async function selectAllA() {
    if(aUnstakedNFTs.length > 0) {
      setAUnstakedNFTs(aStakedNFTs);
    }else {
      setAUnstakedNFTs([]);
      setASelNFTs([]);
      let newSelNft = [];
      for(const _nft of aNFTs) {
        const pk = new PublicKey(_nft.mint);
        const pdaAddress = await _getPDA(wallet, pk);
        const [pubkey, bump] = await _getATA(wallet, pk);
        _nft.pda = pdaAddress;
        _nft.pk = pk;
        _nft.pubkey = pubkey;
        _nft.bump = bump
        newSelNft.push(_nft);
      }
      setASelNFTs(newSelNft);
    }
  }

  async function selectAllB() {
    if(bUnstakedNFTs.length > 0) {
      setBUnstakedNFTs(bStakedNFTs);
    }else {
      setBUnstakedNFTs([]);
      setBSelNFTs([]);
      let newSelNft = [];
      for(const _nft of bNFTs) {
        const pk = new PublicKey(_nft.mint);
        const pdaAddress = await _getPDA(wallet, pk);
        const [pubkey, bump] = await _getATA(wallet, pk);
        _nft.pda = pdaAddress;
        _nft.pk = pk;
        _nft.pubkey = pubkey;
        _nft.bump = bump
        newSelNft.push(_nft);
      }
      setBSelNFTs(newSelNft);
    }
  }

  async function stakeA() {
    if(aSelectedNFTs.length === 0) return;
    const stakingIndex = 0;
    let remainingAccounts = [];
    let nftVaultBump = [];
    for(const tmp of aSelectedNFTs) {
      let ra = {
        pubkey: tmp.pk,
        isWritable: false,
        isSigner: false,
      };
      remainingAccounts.push(ra);
      const meta = await getMetaData(tmp.pk.toString());
      let ra0 = {
        pubkey: meta.metaPDA,
        isWritable: false,
        isSigner: false,
      };
      remainingAccounts.push(ra0);
      let ra1 = {
        pubkey: tmp.pda,
        isWritable: true,
        isSigner: false,
      };
      remainingAccounts.push(ra1);
      let ra2 = {
        pubkey: tmp.pubkey,
        isWritable: true,
        isSigner: false,
      };
      nftVaultBump.push(tmp.bump);
      remainingAccounts.push(ra2);
    }
    let nftVaultBumps = Buffer.from(nftVaultBump);
    console.log(remainingAccounts);
    try{
      await _stake(wallet, stakingIndex, nftVaultBumps, remainingAccounts, 1);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log('stake');
      initialize();
    }catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function stakeB() {
    if(bSelectedNFTs.length === 0) return;
    const stakingIndex = 0;
    let remainingAccounts = [];
    let nftVaultBump = [];
    for(const tmp of bSelectedNFTs) {
      let ra = {
        pubkey: tmp.pk,
        isWritable: false,
        isSigner: false,
      };
      remainingAccounts.push(ra);
      const meta = await getMetaData(tmp.pk.toString());
      let ra0 = {
        pubkey: meta.metaPDA,
        isWritable: false,
        isSigner: false,
      };
      remainingAccounts.push(ra0);
      let ra1 = {
        pubkey: tmp.pda,
        isWritable: true,
        isSigner: false,
      };
      remainingAccounts.push(ra1);
      let ra2 = {
        pubkey: tmp.pubkey,
        isWritable: true,
        isSigner: false,
      };
      nftVaultBump.push(tmp.bump);
      remainingAccounts.push(ra2);
    }
    let nftVaultBumps = Buffer.from(nftVaultBump);

    try{
      await _stake(wallet, stakingIndex, nftVaultBumps, remainingAccounts, 2);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log('stake');
      initialize();
    }catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function unstakeA() {
    if(aUnstakedNFTs.length === 0) return;
    let remainingAccounts = [];
    for(const obj of aUnstakedNFTs) {
      let tmp1 = {
        pubkey: new PublicKey(obj.pda),
        isWritable: true,
        isSigner: false,
      };
      remainingAccounts.push(tmp1);
      let tmp2 = {
        pubkey: new PublicKey(obj.pubkey),
        isWritable: true,
        isSigner: false,
      };
      remainingAccounts.push(tmp2);
    }
    const stakingIndex = 0;
    try{
      await _unStake(wallet, stakingIndex, remainingAccounts, 1);
      setAUnstakedNFTs([]);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log('unstake');
      initialize();
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function unstakeB() {
    if(bUnstakedNFTs.length === 0) return;
    let remainingAccounts = [];
    for(const obj of bUnstakedNFTs) {
      let tmp1 = {
        pubkey: new PublicKey(obj.pda),
        isWritable: true,
        isSigner: false,
      };
      remainingAccounts.push(tmp1);
      let tmp2 = {
        pubkey: new PublicKey(obj.pubkey),
        isWritable: true,
        isSigner: false,
      };
      remainingAccounts.push(tmp2);
    }
    const stakingIndex = 0;
    try{
      await _unStake(wallet, stakingIndex, remainingAccounts, 2);
      setBUnstakedNFTs([]);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log('unstake');
      initialize();
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function claim() {
    var data = {
      wallet: wallet.publicKey.toString(),
      mintKey: auryMintPubkey,
      amount: 50
    };
    TutorialService.mintKage(data).then(response => {
      console.log(response);
      let ata = response.data;
      if(ata) {
        claimKage(ata);
      }      
    }).catch(e => { console.log(e); });
  }

  async function claimKage(ata) {
    await _claim(wallet, 0, ata);
    console.log('claim');
  }

  async function startClock() {
    await getMyReward();
    const mData = await _getStakingdata(wallet, 0);
    if(mData.claimableAuryAmount) {
      const val = mData.claimableAuryAmount.div(new BN(1e9)).toString();
      setClaimAmount(val);
    }
    setTimeout(() => {
      startClock();
    }, 8000);
  }

  async function airdrop50() {
    var data = {
      wallet: wallet.publicKey.toString(),
    };
    TutorialService.shadowMint(data).then(response => {
      alert('Mint Success!!!');
      initialize();
    }).catch(e => {
      alert("fail:", e);
    });
  }

  async function getProvider() {
    const network = "https://metaplex.devnet.rpcpool.com";
    const connection = new Connection(network, opts.preflightCommitment);
    const wallet = window.solana;

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    );
    return provider;
  }

  async function getMyReward() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const [vaultPubkey] = await PublicKey.findProgramAddress(
      [mintPubkey.toBuffer()],
      program.programId
    );
    const [stakingPubkey] =
      await PublicKey.findProgramAddress(
        [Buffer.from(utils.bytes.utf8.encode('staking'))],
        program.programId
      );
    const  [userStakingPubkey] =
      await PublicKey.findProgramAddress(
        [wallet.publicKey.toBuffer()],
        program.programId
      );
    const [walletTokenAccount] = await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mintPubkey.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    const accountInfo = await provider.connection.getTokenAccountBalance(walletTokenAccount);
    setMyShadow(accountInfo.value.uiAmount);
    dispatch(setBalance(accountInfo.value.uiAmount));
    const vaultInfo = await provider.connection.getTokenAccountBalance(vaultPubkey);
    const tta = vaultInfo.value.uiAmount;
    // setTotalStaked(tta);
    try{
      const stakingInfo = await program.account.stakingAccount.fetch(stakingPubkey);
      const txta = stakingInfo.totalXToken / 1000000000;
      const aTS = stakingInfo.aTotalStaked / 1000000000;
      const aTB = stakingInfo.aTotalBurned / 1000000000;
      const bTS = stakingInfo.bTotalStaked / 1000000000;
      const bTB = stakingInfo.bTotalBurned / 1000000000;
      const atotal = aTS + aTB * 2;
      const btotal = bTS + bTB * 2;
      const apoints = aTS + aTB * 2;
      const bpoints = bTS + bTB * 2;
      setATotal(atotal);
      setBTotal(btotal);
      setAPoints(apoints);
      setBPoints(bpoints);
      const userStakingInfo = await program.account.userStakingAccount.fetch(userStakingPubkey);
      const uta = userStakingInfo.amount / 1000000000;
      const uxta = userStakingInfo.xTokenAmount / 1000000000;
      const uct = userStakingInfo.lockEndDate.toNumber();
      const aut = userStakingInfo.aStaked / 1000000000;
      const but = userStakingInfo.bStaked / 1000000000;
      setASingleStaked(aut);
      setBSingleStaked(but);
      let curprice = 0;
      if(txta === 0) {
        curprice = 1;
      }else {
        curprice = tta / txta;
      }
      let date_ob = new Date(uct*1000);
      // setEstApr(date_ob.toLocaleString());
      const curTime = Math.floor(Date.now() / 1000);
      // if( uct > curTime ) {
      //   const rt = (uct - curTime + 100) / 60;
      //   setEstPerDay(Math.floor(rt));
      //   setExpire(false);
      // } else {
      //   setEstPerDay(0);
      //   setExpire(true);
      // }
      setCurPrice(curprice);
      const cura = uxta * curprice;
      setCurShadow(cura);
      setMyXShadow(uta);
      setUserXShadow(uxta);
    }catch{
      console.log('none user staking.');
    }
  }

  async function stake(amountRef, teamID) {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const amount = amountRef*1000;
    const amount_bn = new BN(1e6).mul(new BN(amount));
    const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress(
      [mintPubkey.toBuffer()],
      program.programId
    );
    const [stakingPubkey, stakingBump] =
      await PublicKey.findProgramAddress(
        [Buffer.from(utils.bytes.utf8.encode('staking'))],
        program.programId
      );
    const [walletTokenAccount] = await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mintPubkey.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );    
    const  [userStakingPubkey, userStakingBump] =
    await PublicKey.findProgramAddress(
      [wallet.publicKey.toBuffer()],
      program.programId
    );
    await program.methods.stake(
      vaultBump,
      stakingBump,
      userStakingBump,
      amount_bn,
      teamID,
      ).accounts(
        {
          tokenMint: mintPubkey,
          tokenFrom: walletTokenAccount,
          tokenFromAuthority: wallet.publicKey,
          tokenVault: vaultPubkey,
          stakingAccount: stakingPubkey,
          userStakingAccount: userStakingPubkey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
    ).rpc();
    console.log(amountRef,":stake");
  }

  async function burn(amountRef, teamID) {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const amount = amountRef*1000;
    const amount_bn = new BN(1e6).mul(new BN(amount));
    const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress(
      [mintPubkey.toBuffer()],
      program.programId
    );
    const [stakingPubkey, stakingBump] =
      await PublicKey.findProgramAddress(
        [Buffer.from(utils.bytes.utf8.encode('staking'))],
        program.programId
      );
    const [walletTokenAccount] = await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mintPubkey.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );    
    const  [userStakingPubkey, userStakingBump] =
    await PublicKey.findProgramAddress(
      [wallet.publicKey.toBuffer()],
      program.programId
    );
    await program.methods.burn(
      vaultBump,
      stakingBump,
      userStakingBump,
      amount_bn,
      teamID,
      ).accounts(
        {
          tokenMint: mintPubkey,
          tokenFrom: walletTokenAccount,
          tokenFromAuthority: wallet.publicKey,
          tokenVault: vaultPubkey,
          stakingAccount: stakingPubkey,
          userStakingAccount: userStakingPubkey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
    ).rpc();
    console.log(amountRef,":burn");
  }

  async function unstake(unstakeAmount, team) {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    console.log(userXShadow, myXShadow);
    const amount = Math.floor(unstakeAmount * 1000000 * userXShadow / myXShadow);
    console.log('aa', amount);
    const amount_bn = new BN(1e3).mul(new BN(amount));
    const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress(
      [mintPubkey.toBuffer()],
      program.programId
    );
    const [stakingPubkey, stakingBump] =
      await PublicKey.findProgramAddress(
        [Buffer.from(utils.bytes.utf8.encode('staking'))],
        program.programId
      );
    const [walletTokenAccount] = await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mintPubkey.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );    
    const  [userStakingPubkey, userStakingBump] =
    await PublicKey.findProgramAddress(
      [wallet.publicKey.toBuffer()],
      program.programId
    );
    await program.methods.unstake(
      vaultBump,
      stakingBump,
      userStakingBump,
      amount_bn,
      team).accounts(
        {
          tokenMint: mintPubkey,
          xTokenFromAuthority: wallet.publicKey,
          tokenVault: vaultPubkey,
          stakingAccount: stakingPubkey,
          userStakingAccount: userStakingPubkey,
          tokenTo: walletTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
    ).rpc();
    var data = {
      wallet: publicKey.toString(),
    };
    // TutorialService.setSingleUnstakeInfo(data)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  async function singleBurnA(amount) {
    try{
      await burn(amount, 1);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }catch(err) {
      console.log(err);
    }
  }

  async function singleBurnB(amount) {
    try{
      await burn(amount, 2);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }catch(err) {
      console.log(err);
    }
  }

  async function singleStakeA(amount) {
    try{
      await stake(amount, 1);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
     }catch(err) {
      console.log(err);
    }
  }

  async function singleStakeB(amount) {
    try{
      await stake(amount, 2);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
     }catch(err) {
      console.log(err);
    }
  }

  async function singleUnstakeA() {
    try{
      await unstake(aSingleStaked, 1);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }catch(err){
      console.log(err);
    }
  }

  async function singleUnstakeB() {
    try{
      await unstake(bSingleStaked, 2);
      var data = {
        wallet: publicKey.toString(),
      };
      TutorialService.setUserStakeInfo(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='main text-white bg-[url("./assets/images/home_hero_bg.png")]'>
      <Container>
        <h1 className="text-white">ACTIVES</h1>
        <div className="flex flex-col items-center my-3">
          <p className="text-white underline font-family">Time remaining</p>
          <p className="text-white font-family">10 hr 23 min 38 sec</p>
        </div>
        <Row className=" border-2 rounded-xl border-black p-4 bg-[#212121]">
          <Col className="rounded-lg p-4 bg-[#000000]">
            <h1 className="kfont flex justify-end text-white">PRIMATES</h1>
            <Row>
              <Col className="pr-0">
                <Image
                  src={TeamAMark}
                  className="border border-white rounded-lg"
                />
                <button
                  className="mt-3 w-full rounded-2xl bg-[#C90000] font-family py-2"
                  onClick={() => setApplyModalA(true)}
                >
                  BOOST
                </button>
              </Col>
              <Col className="pl-0">
                <div className="bg-[#212121] h-1 mt-5"></div>
                {/* <h1 className='flex justify-end mt-2 text-white'>{Math.floor(aTotal+aCounter*100)}</h1>
              <h6 className='flex justify-end mt-4 text-white'>{aCounter}</h6>
              <h6 className='flex justify-end text-white'>{Math.floor(aPoints)}</h6> */}
                <h1 className="flex justify-end mt-2 text-white">5,453 K</h1>
                <h6 className="flex justify-end mt-4 text-white font-family">6,546</h6>
                <h6 className="flex justify-end text-white font-family">453,765</h6>
              </Col>
            </Row>
          </Col>
          <Col
            lg="3"
            sm="3"
            className="pt-4 flex flex-col items-center justify-center"
          >
            {/* <h5 className='flex justify-center text-white'><u>Battle remaining</u></h5>
          <h6 className='flex justify-center text-white'>10 hr 23 min 38sec</h6> */}
            <div className="flex justify-center p-3">
              <Image src={VS} className="h-[72px] w-[125px]" />
            </div>
            <h6 className="flex justify-center text-white">
              <u className='font-family'>NFTs Staked</u>
            </h6>
            <h6 className="flex justify-center text-white">
              <u className='font-family'>$Shadow Points</u>
            </h6>
          </Col>
          <Col className="rounded-lg p-4 bg-[#000000]">
            <h1 className="flex justify-start text-white">
              TRIPPIN' APE TRIBE
            </h1>
            <Row>
              <Col className="pl-0">
                <div className="bg-[#212121] h-1 mt-5 text-white"></div>
                {/* <h1 className='flex justify-start mt-2 text-white'>{Math.floor(bTotal+bCounter*100)}</h1>
              <h6 className='flex justify-start mt-4 text-white'>{bCounter}</h6>
              <h6 className='flex justify-start text-white'>{Math.floor(bPoints)}</h6> */}
                <h1 className="flex justify-start mt-2 text-white">7,7763 K</h1>
                <h6 className="flex justify-start mt-4 text-white font-family">7,968</h6>
                <h6 className="flex justify-start text-white font-family">2,223,765</h6>
              </Col>
              <Col className="pr-0">
                <Image
                  src={TeamBMark}
                  className="border border-white rounded-lg"
                />
                <button
                  className="mt-3 w-full rounded-2xl bg-[#C90000] font-family py-2"
                  onClick={() => setApplyModalB(true)}
                >
                  BOOST
                </button>
              </Col>
            </Row>
          </Col>
          <div className="mt-3 p-0">
            <Progressbar
              bgcolor="#007A67"
              progress={Math.floor(
                (aCounter * 100) / (aCounter * 1 + bCounter * 1)
              )}
              height={20}
            />
          </div>
        </Row>
      </Container>

      {/* Actives */}
      <Container className="mt-10">
        <h1 className="text-white">UPCOMING</h1>
        <Row className=" border-2 rounded-xl border-black p-4 bg-[#212121] mb-5">
          <Col className="d-flex flex-column align-items-center rounded-lg p-4 bg-[#000000]">
            <h1 className="kfont flex justify-end text-white">Communi3</h1>
            <Row>
              <Col className="pr-0">
                <Image src={CommuniMad} />
              </Col>
            </Row>
          </Col>

          <Col
            lg="3"
            sm="3"
            className="pt-4 bg-[#000000] flex flex-col items-center justify-center"
          >
            <div className="flex justify-center p-3">
              <Image src={VS} className="h-[72px] w-[125px]" />
            </div>
          </Col>

          <Col className="d-flex flex-column align-items-center  rounded-lg p-4 bg-[#000000]">
            <h1 className="flex justify-start text-white">
              Famous Fox Federation
            </h1>
            <Row>
              <Col className="pr-0">
                <Image src={FamousFox} />
              </Col>
            </Row>
          </Col>

          <div className="d-flex align-items-center justify-content-between mt-3 p-0">
            <h6 className="flex justify-center text-white">
              <u className='font-family'>Starts in 6 Days 10 hr</u>
            </h6>
            <button className="mt-3 p-2 w-25 rounded-2xl bg-[#C90000] font-family">
              Set Remainder
            </button>
          </div>
        </Row>
        <Row className=" border-2 rounded-xl border-black p-4 bg-[#212121] mb-5">
          <Col className="d-flex flex-column align-items-center rounded-lg p-4 bg-[#000000]">
            <h1 className="kfont flex justify-end text-white">
              Boryoku DragonZ
            </h1>
            <Row>
              <Col className="pr-0">
                <Image src={BoryokuDragonz} />
              </Col>
            </Row>
          </Col>

          <Col
            lg="3"
            sm="3"
            className="pt-4 bg-[#000000] flex flex-col items-center justify-center"
          >
            <div className="flex justify-center p-3">
              <Image src={VS} className="h-[72px] w-[125px]" />
            </div>
          </Col>

          <Col className="d-flex flex-column align-items-center  rounded-lg p-4 bg-[#000000]">
            <h1 className="flex justify-start text-white">OKAY Bears</h1>
            <Row>
              <Col className="pr-0">
                <Image src={OkayBears} />
              </Col>
            </Row>
          </Col>

          <div className="d-flex align-items-center justify-content-between mt-3 p-0">
            <h6 className="flex justify-center text-white">
              <u className='font-family'>Starts in 6 Days 10 hr</u>
            </h6>
            <button className="mt-3 p-2 w-25 rounded-2xl bg-[#C90000] font-family">
              Set Remainder
            </button>
          </div>
        </Row>
      </Container>

      <Container className="mb-[100px] mt-5">
        <h1 className="text-white">COMPLETE</h1>
        <Row className=" border-2 rounded-xl border-black p-4 bg-[#212121]">
          <Col className="d-flex flex-column align-items-center rounded-lg p-4 bg-[#000000]">
            <h1 className="kfont flex justify-end text-white">GHOST KID DAO</h1>
            <Col className="pr-0">
              <Image src={GhostKidDAO} />
            </Col>
          </Col>

          <Col
            lg="3"
            sm="3"
            className="pt-4 bg-[#000000] flex flex-col items-center justify-center"
          >
            <div className="flex justify-center p-3">
              <Image src={VS} className="h-[72px] w-[125px]" />
            </div>
          </Col>

          <Col className="d-flex flex-column align-items-center  rounded-lg p-4 bg-[#000000]">
            <h1 className="flex justify-start text-white">CETS ON CRECK</h1>
            <Col className="pr-0">
              <Image src={CETSONCRECK} />
            </Col>
          </Col>

          <div className="d-flex justify-content-end mt-3 p-0">
            <h1 className="text-light text-[60px]">WINNER</h1>
          </div>
          <div className="mt-3 p-0">
            <Progressbar
              bgcolor="#007A67"
              progress={Math.floor(
                (aCounter * 100) / (aCounter * 1 + bCounter * 1)
              )}
              height={20}
            />
          </div>
        </Row>
      </Container>

       {/* footer */}
       <div className="mb-[50px] flex items-center justify-center space-x-4">
          <Image src={Twitter} alt="twitter" className="w-7 h-7" />
          <Image src={Discord} alt="twitter" className="w-7 h-7" />
          <Image src={Twitter} alt="twitter" className="w-7 h-7" />
        </div>
    </div>
  );
}

export default Upcoming;