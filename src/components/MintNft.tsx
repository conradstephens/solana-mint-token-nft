"use client";

import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  Account,
  AuthorityType,
  createSetAuthorityInstruction,
} from "@solana/spl-token";
import LoadingButton from "./LoadingButton";

export default function MintNft() {
  // collection to solana network
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  // random wallet
  const fromWallet = Keypair.generate();
  let mint: PublicKey;
  let fromTokenAccount: Account;
  // const toWallet = new PublicKey(
  //   "3LSZNgpQoHGiZyGviGn5CAHmeq9gd6NphkGy4STimPRK",
  // );

  const onCreateNft = async () => {
    // airdrop some SOL to pay for the fees
    const fromAirdropSignature = await connection.requestAirdrop(
      fromWallet.publicKey,
      LAMPORTS_PER_SOL, // smallets unit of SOL 1 SOL = 10^9 lamports (1,000,000,000)
    );
    await connection.confirmTransaction(fromAirdropSignature);

    // create new nft mint
    mint = await createMint(
      connection,
      fromWallet, // payer
      fromWallet.publicKey, // account who has the mint authority
      null,
      0, // only allow whole tokens
    );
    console.log(`create nft: ${mint.toBase58()}`);

    // get the nft acount of the fromWallet Solana address, if it does not exist, create it
    fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey,
    );
    console.log(`create nft account: ${fromTokenAccount.address.toBase58()}`);
  };

  const onMintNft = async () => {
    // minting 1 nft to the "fromTokenAccount" account we just returned/created
    const signature = await mintTo(
      connection,
      fromWallet,
      mint,
      fromTokenAccount.address,
      fromWallet.publicKey,
      0, // 10 billion
    );
    console.log(`mint nft signature: ${signature}`);
  };

  const onLockNft = async () => {
    // create our tx to change minting permissions
    let transaction = new Transaction().add(
      createSetAuthorityInstruction(
        // create/set the authority of the mint to the "toWallet" account
        mint,
        fromWallet.publicKey,
        AuthorityType.MintTokens,
        null, // new authority is a null address, meaning no one can mint anymore
      ),
    );

    // send transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromWallet, // signer of the tx
    ]);
    console.log(`lock signature: ${signature}`);
  };

  return (
    <div className="text-center gap-5 flex flex-col">
      <div className="text-3xl font-bold">Mint NFT</div>
      <div className="flex gap-2">
        <LoadingButton className="btn" onClick={onCreateNft}>
          Create NFT
        </LoadingButton>
        <LoadingButton className="btn" onClick={onMintNft}>
          Mint NFT
        </LoadingButton>
        <LoadingButton className="btn" onClick={onLockNft}>
          Lock NFT
        </LoadingButton>
      </div>
    </div>
  );
}
