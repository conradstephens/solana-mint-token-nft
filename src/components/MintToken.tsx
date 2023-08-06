"use client";

import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
  Account,
  getMint,
  getAccount,
} from "@solana/spl-token";
import LoadingButton from "./LoadingButton";

export default function MintToken() {
  // collection to solana network
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  // create a random wallet
  const fromWallet = Keypair.generate();
  let mint: PublicKey;
  let fromTokenAccount: Account;
  const toWallet = new PublicKey(
    "3LSZNgpQoHGiZyGviGn5CAHmeq9gd6NphkGy4STimPRK",
  );

  const onCreateToken = async () => {
    // airdrop some SOL to pay for the fees
    const fromAirdropSignature = await connection.requestAirdrop(
      fromWallet.publicKey,
      LAMPORTS_PER_SOL, // smallets unit of SOL 1 SOL = 10^9 lamports (1,000,000,000)
    );
    await connection.confirmTransaction(fromAirdropSignature);

    // create new token mint
    mint = await createMint(
      connection,
      fromWallet, // payer
      fromWallet.publicKey, // account who has the mint authority
      null,
      9, // 9 here means we have a decimal of 9 0's
    );
    console.log(`create token: ${mint.toBase58()}`);

    // get the token acount of the fromWallet Solana address, if it does not exist, create it
    fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey,
    );
    console.log(`create token account: ${fromTokenAccount.address.toBase58()}`);
  };

  const onMintToken = async () => {
    // minting 1 token to the "fromTokenAccount" account we just returned/created
    const signature = await mintTo(
      connection,
      fromWallet,
      mint,
      fromTokenAccount.address, // mint to the token account
      fromWallet.publicKey,
      10000000000, // 10 billion
    );
    console.log(`mint token signature: ${signature}`);
  };

  const onCheckBalance = async () => {
    // get the supply of the token we have minted
    const mintInfo = await getMint(connection, mint);
    console.log(`token supply: ${mintInfo.supply}`);

    // get the amount of tokens left in the account
    const tokenAccountInfo = await getAccount(
      connection,
      fromTokenAccount.address,
    );
    console.log(`token balance: ${tokenAccountInfo.amount}`);
  };

  const onSendToken = async () => {
    // get the token account of the toWallet Solana address, if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      toWallet,
    );
    console.log(`toTokenAccount: ${toTokenAccount.address.toBase58()}`);

    const signature = await transfer(
      connection,
      fromWallet, // payer
      fromTokenAccount.address, // sender
      toTokenAccount.address, // receiver
      fromWallet.publicKey, // owner of the sender account
      10000000000, // 10 billion
    );
    console.log(`transfer token signature: ${signature}`);
  };

  return (
    <div className="text-center gap-5 flex flex-col">
      <div className="text-3xl font-bold">Mint Token</div>
      <div className="flex gap-2">
        <LoadingButton className="btn" onClick={onCreateToken}>
          Create token
        </LoadingButton>
        <LoadingButton className="btn" onClick={onMintToken}>
          Mint token
        </LoadingButton>
        <LoadingButton className="btn" onClick={onCheckBalance}>
          Check balance
        </LoadingButton>
        <LoadingButton className="btn" onClick={onSendToken}>
          Send token
        </LoadingButton>
      </div>
    </div>
  );
}
