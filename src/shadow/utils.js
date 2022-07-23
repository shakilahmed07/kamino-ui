import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Program, Provider, utils, BN } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import idl from './idl.json';

const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
const mintPubkey = new PublicKey('F5EEbpa26qJmeEfU1uTqcTrYkRf55QVKtM23ERJwYpRz');
async function getProvider() {
  const network = "https://metaplex.devnet.rpcpool.com";
  const connection = new Connection(network, opts.preflightCommitment);
  const wallet = window.solana;

  const provider = new Provider(
    connection, wallet, opts.preflightCommitment,
  );
  return provider;
}
export async function stake(wallet, amount) {
  const provider = await getProvider();
  const program = new Program(idl, programID, provider);
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
    amount_bn,).accounts(
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
  console.log(tokenAmount.current.value,":stake");
}
export async function unstake(wallet, amount) {
  const provider = await getProvider();
  const program = new Program(idl, programID, provider);

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
    amount_bn,).accounts(
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
  console.log(xtokenAmount.current.value,":unstake");
}
export async function getMyReward() {
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
  const vaultInfo = await provider.connection.getTokenAccountBalance(vaultPubkey);
  const tta = vaultInfo.value.uiAmount;
  setTotalStaked(tta);
  try{
    const stakingInfo = await program.account.stakingAccount.fetch(stakingPubkey);
    const txta = stakingInfo.totalXToken / 1000000000;
    const userStakingInfo = await program.account.userStakingAccount.fetch(userStakingPubkey);
    const uta = userStakingInfo.amount / 1000000000;
    const uxta = userStakingInfo.xTokenAmount / 1000000000;
    const uct = userStakingInfo.lockEndDate.toNumber();
    console.log(userStakingInfo.lockEndDate.toString(), Date.now() / 1000);
    console.log(userStakingInfo);
    let curprice = 0;
    if(txta === 0) {
      curprice = 1;
    }else {
      curprice = tta / txta;
    }
    let date_ob = new Date(uct*1000);
    setEstApr(date_ob.toLocaleString());
    const curTime = Math.floor(Date.now() / 1000);
    if( uct > curTime ) {
      const rt = (uct - curTime + 100) / 60;
      setEstPerDay(Math.floor(rt));
      setExpire(false);
    } else {
      setEstPerDay(0);
      setExpire(true);
    }
    setCurPrice(curprice);
    const cura = uxta * curprice;
    setCurShadow(cura);
    console.log(tta, txta, uta, uxta, curprice);  
    setMyXShadow(uta);
    setUserXShadow(uxta);
  }catch{
    console.log('none user staking.');
  }
}
