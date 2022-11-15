import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Attribute {
  'key' : string,
  'value' : string,
  'description' : string,
}
export type Errors = { 'Unauthorized' : null } |
  { 'TokenNotExist' : null } |
  { 'InvalidOperator' : null };
export type ListID = bigint;
export interface Listing {
  'creator' : Principal,
  'tokenId' : bigint,
  'isListed' : boolean,
  'price' : bigint,
}
export type Location = { 'Web' : string } |
  { 'AssetCanister' : [Principal, Array<number>] } |
  { 'IPFS' : string } |
  { 'InCanister' : Array<number> };
export interface Metadata {
  'owner' : Principal,
  'desc' : string,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'cycles' : bigint,
  'symbol' : string,
}
export type MintResult = { 'Ok' : [bigint, bigint] } |
  { 'Err' : Errors };
export interface NFTSale {
  'approve' : ActorMethod<[bigint, Principal], TxReceipt>,
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'batchMint' : ActorMethod<
    [Principal, Array<[] | [TokenMetadata]>],
    MintResult,
  >,
  'batchTransferFrom' : ActorMethod<
    [Principal, Principal, Array<bigint>],
    TxReceipt,
  >,
  'burn' : ActorMethod<[bigint], TxReceipt>,
  'buy' : ActorMethod<[bigint, bigint], Result_2>,
  'claimFunds' : ActorMethod<[], Result_1>,
  'delistNFT' : ActorMethod<[bigint], Result>,
  'desc' : ActorMethod<[], string>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getIsListed' : ActorMethod<[bigint], boolean>,
  'getListedNFTs' : ActorMethod<[], Array<[ListID, Listing]>>,
  'getListingPrice' : ActorMethod<[bigint], bigint>,
  'getMetadata' : ActorMethod<[], Metadata>,
  'getOperator' : ActorMethod<[bigint], Principal>,
  'getSaleInfo' : ActorMethod<[], [] | [SaleInfoExt]>,
  'getTokenInfo' : ActorMethod<[bigint], TokenInfoExt>,
  'getTransaction' : ActorMethod<[bigint], TxRecord>,
  'getTransactions' : ActorMethod<[bigint, bigint], Array<TxRecord>>,
  'getUserInfo' : ActorMethod<[Principal], UserInfoExt>,
  'getUserTokens' : ActorMethod<[Principal], Array<TokenInfoExt>>,
  'getUserTransactionAmount' : ActorMethod<[Principal], bigint>,
  'getUserTransactions' : ActorMethod<
    [Principal, bigint, bigint],
    Array<TxRecord>,
  >,
  'historySize' : ActorMethod<[], bigint>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], boolean>,
  'listNFT' : ActorMethod<[bigint, bigint], Result>,
  'logo' : ActorMethod<[], string>,
  'mint' : ActorMethod<[Principal, [] | [TokenMetadata]], MintResult>,
  'name' : ActorMethod<[], string>,
  'ownerOf' : ActorMethod<[bigint], Principal>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], TxReceipt>,
  'setOwner' : ActorMethod<[Principal], Principal>,
  'setSaleInfo' : ActorMethod<[[] | [SaleInfoExt]], [] | [SaleInfoExt]>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, bigint], TxReceipt>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
}
export type Operation = { 'transferFrom' : null } |
  { 'burn' : null } |
  { 'approveAll' : null } |
  { 'mint' : [] | [TokenMetadata__1] } |
  { 'approve' : null } |
  { 'setMetadata' : null } |
  { 'transfer' : null } |
  { 'revokeAll' : null };
export type Record = { 'metadata' : [] | [TokenMetadata__1] } |
  { 'user' : Principal };
export type Result = { 'ok' : boolean } |
  { 'err' : boolean };
export type Result_1 = { 'ok' : [boolean, boolean] } |
  { 'err' : string };
export type Result_2 = { 'ok' : bigint } |
  { 'err' : string };
export interface SaleInfoExt {
  'startTime' : bigint,
  'whitelist' : [] | [Principal],
  'endTime' : bigint,
  'minPerUser' : bigint,
  'fundClaimed' : boolean,
  'devFee' : bigint,
  'amountLeft' : bigint,
  'feeClaimed' : boolean,
  'devAddr' : Principal,
  'fundRaised' : bigint,
  'paymentToken' : Principal,
  'price' : bigint,
  'amount' : bigint,
  'maxPerUser' : bigint,
}
export type Time = bigint;
export interface TokenInfoExt {
  'owner' : Principal,
  'metadata' : [] | [TokenMetadata__1],
  'operator' : [] | [Principal],
  'timestamp' : Time,
  'index' : bigint,
}
export interface TokenMetadata {
  'filetype' : string,
  'attributes' : Array<Attribute>,
  'location' : Location,
}
export interface TokenMetadata__1 {
  'filetype' : string,
  'attributes' : Array<Attribute>,
  'location' : Location,
}
export type TxReceipt = { 'Ok' : bigint } |
  { 'Err' : Errors };
export interface TxRecord {
  'op' : Operation,
  'to' : Record,
  'tokenIndex' : [] | [bigint],
  'from' : Record,
  'timestamp' : Time,
  'caller' : Principal,
  'index' : bigint,
}
export interface UserInfoExt {
  'allowedTokens' : Array<bigint>,
  'tokens' : Array<bigint>,
  'operators' : Array<Principal>,
  'allowedBy' : Array<Principal>,
}
export interface _SERVICE extends NFTSale {}
