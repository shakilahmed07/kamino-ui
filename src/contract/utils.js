import { Connection, PublicKey } from '@solana/web3.js';
import {
  Program, Provider, web3, utils, BN
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import idl from './idl.json';
import { programs } from '@metaplex/js';
const Transaction = programs.Transaction;
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  );
const opts = {
    preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
export const auryMintPubkey = new PublicKey('F5EEbpa26qJmeEfU1uTqcTrYkRf55QVKtM23ERJwYpRz');

async function getProvider(wallet) {
  /* create the provider and return it to the caller */
  /* network set to local network for now */
  const network = "https://metaplex.devnet.rpcpool.com";//https://api.devnet.solana.com
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new Provider(
    connection, wallet, opts.preflightCommitment,
  );
  return provider;
}

export async function _stake(wallet, stakingIndex, nftVaultBumps, remainingAccounts, teamId) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [stakingPubkey, stakingBump] =
  await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('nft_staking'))],
    program.programId
  );
  const  [userStakingCounterPubkey, userStakingCounterBump] =
  await web3.PublicKey.findProgramAddress(
    [provider.wallet.publicKey.toBuffer()],
    program.programId
  );
  const [userStakingPubkey, userStakingBump] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(
          utils.bytes.utf8.encode(
            new BN(stakingIndex).toString()
          )
        ),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );
  await program.rpc.stake(
    nftVaultBumps,
    stakingBump,
    userStakingCounterBump,
    userStakingBump,
    teamId,
    {
      accounts: {
        nftFromAuthority: provider.wallet.publicKey,
        stakingAccount: stakingPubkey,
        userStakingCounterAccount: userStakingCounterPubkey,
        userStakingAccount: userStakingPubkey,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      remainingAccounts,
    }
  );
}

export async function _lockStake(wallet, stakingIndex, kageAmount, period, userATA) {
  let auryDepositAmount = new BN(1e9);
  auryDepositAmount = auryDepositAmount.mul(new BN(kageAmount));
  let userStakingPeriod = new BN(period);
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [stakingPubkey, stakingBump] =
  await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('nft_staking'))],
    program.programId
  );
  const [auryVaultPubkey, auryVaultBump] =
  await web3.PublicKey.findProgramAddress(
    [auryMintPubkey.toBuffer()],
    program.programId
  );
  const userAuryTokenAccount = new PublicKey(userATA);
  // const [userAuryTokenAccount] = await web3.PublicKey.findProgramAddress(
  //   [
  //     provider.wallet.publicKey.toBuffer(),
  //     TOKEN_PROGRAM_ID.toBuffer(),
  //     auryMintPubkey.toBuffer(),
  //   ],
  //   SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  // );
  console.log(userAuryTokenAccount.toString(),":uarutc");
  const  [userStakingCounterPubkey, userStakingCounterBump] =
  await web3.PublicKey.findProgramAddress(
    [provider.wallet.publicKey.toBuffer()],
    program.programId
  );
  const [userStakingPubkey, userStakingBump] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(
          utils.bytes.utf8.encode(
            new BN(stakingIndex).toString()
          )
        ),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

  await program.rpc.lockStake(
    stakingBump,
    userStakingCounterBump,
    userStakingBump,
    auryVaultBump,
    userStakingPeriod,
    auryDepositAmount,
    {
      accounts: {
        nftFromAuthority: provider.wallet.publicKey,
        stakingAccount: stakingPubkey,
        userStakingCounterAccount: userStakingCounterPubkey,
        userStakingAccount: userStakingPubkey,
        auryMint: auryMintPubkey,
        auryVault: auryVaultPubkey,
        auryFrom: userAuryTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
  });
}

export async function _claim(wallet, stakingIndex, userATA) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [auryVaultPubkey, auryVaultBump] =
  await web3.PublicKey.findProgramAddress(
    [auryMintPubkey.toBuffer()],
    program.programId
  );
  const userAuryTokenAccount = new PublicKey(userATA);
  // const [userAuryTokenAccount] = await web3.PublicKey.findProgramAddress(
  //   [
  //     provider.wallet.publicKey.toBuffer(),
  //     TOKEN_PROGRAM_ID.toBuffer(),
  //     auryMintPubkey.toBuffer(),
  //   ],
  //   SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  // );
  const [userStakingPubkey, userStakingBump] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(
          utils.bytes.utf8.encode(
            new BN(stakingIndex).toString()
          )
        ),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );
  await program.rpc.claimAuryReward(
    auryVaultBump,
    stakingIndex,
    userStakingBump,
    {
      accounts: {
        auryMint: auryMintPubkey,
        auryVault: auryVaultPubkey,
        auryTo: userAuryTokenAccount,
        auryToAuthority: provider.wallet.publicKey,
        userStakingAccount: userStakingPubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    }
  );
}

export async function _kageMint(wallet, userATA) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const kageAmount = new BN(50e9);
  const [auryVaultPubkey, auryVaultBump] =
  await web3.PublicKey.findProgramAddress(
    [auryMintPubkey.toBuffer()],
    program.programId
  );
  const userAuryTokenAccount = new PublicKey(userATA);
  // const [userAuryTokenAccount] = await web3.PublicKey.findProgramAddress(
  //   [
  //     provider.wallet.publicKey.toBuffer(),
  //     TOKEN_PROGRAM_ID.toBuffer(),
  //     auryMintPubkey.toBuffer(),
  //   ],
  //   SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  // );
  
  await program.rpc.kageMint(
    auryVaultBump,
    kageAmount,
    {
      accounts: {
        auryMint: auryMintPubkey,
        auryVault: auryVaultPubkey,
        auryTo: userAuryTokenAccount,
        auryToAuthority: provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    }
  );
}

export async function _lootBox(wallet, stakingIndex, remainingAccounts) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [stakingPubkey, stakingBump] =
  await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('nft_staking'))],
    program.programId
  );
  const [userStakingPubkey, userStakingBump] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(
          utils.bytes.utf8.encode(
            new BN(stakingIndex).toString()
          )
        ),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );
  await program.rpc.claim(stakingBump, stakingIndex, userStakingBump, {
    accounts: {
      nftToAuthority: provider.wallet.publicKey,
      stakingAccount: stakingPubkey,
      userStakingAccount: userStakingPubkey,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    remainingAccounts,
  });
}

export async function _unStake(wallet, stakingIndex, remainingAccounts, teamId) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [stakingPubkey, stakingBump] =
  await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('nft_staking'))],
    program.programId
  );
  const [userStakingPubkey, userStakingBump] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(
          utils.bytes.utf8.encode(
            new BN(stakingIndex).toString()
          )
        ),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );  
  await program.rpc.unstake(
    stakingBump,
    stakingIndex,
    userStakingBump,
    teamId,
    {
      accounts: {
        nftToAuthority: provider.wallet.publicKey,
        stakingAccount: stakingPubkey,
        userStakingAccount: userStakingPubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      remainingAccounts,
    }
  );
}

export async function _getPDA(wallet, mintKey) {
  const provider = await getProvider(wallet);
  const [pdaAddress] = await web3.PublicKey.findProgramAddress(
      [
          provider.wallet.publicKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          mintKey.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  );
  return pdaAddress;
}

export async function _getATA(wallet, mintKey) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [pubkey, bump] = await web3.PublicKey.findProgramAddress(
    [provider.wallet.publicKey.toBuffer(), mintKey.toBuffer()],
    program.programId
  );
  return [pubkey, bump];
}

export async function _getUserStakingIndex(wallet) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const  [userStakingCounterPubkey] =
  await web3.PublicKey.findProgramAddress(
    [provider.wallet.publicKey.toBuffer()],
    program.programId
  );
  try{
    const curStakeIdx = await program.account.userStakingCounterAccount.fetch(userStakingCounterPubkey);
    console.log('usca', curStakeIdx);
    return curStakeIdx.counter;
  }catch{
    console.log('usca000');
    return 0;
  }
}

export async function _getGlobalData(wallet) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [stakingPubkey] = 
  await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('nft_staking'))],
    program.programId
  );
  try{
    const stakingData = await program.account.stakingAccount.fetch(stakingPubkey);
    return {
      teamANames: stakingData.teamANames,
      teamBNames: stakingData.teamBNames,
      teamANfts: stakingData.teamANfts,
      teamBNfts: stakingData.teamBNfts,
      endTime: stakingData.maximumStakingPeriod,
    };
  }catch{
    console.log('sData NONE');
    return 0;
  }
}

export async function _getStakingdata(wallet, stakingIndex) {
  const provider = await getProvider(wallet);
  const program = new Program(idl, programID, provider);
  const [userStakingPubkey] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(
          utils.bytes.utf8.encode(
            new BN(stakingIndex).toString()
          )
        ),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );  
  try{
    const stakingData = await program.account.userStakingAccount.fetch(userStakingPubkey);
    return stakingData;
  }catch(err){
    return [];
  }
  
}

