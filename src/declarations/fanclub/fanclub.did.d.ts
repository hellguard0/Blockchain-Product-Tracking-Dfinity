import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Club {
  'time_created' : Time,
  'owner' : Principal,
  'name' : string,
  'isPublic' : boolean,
  'clubImg' : Array<number>,
}
export type ClubError = { 'ExistError' : null } |
  { 'UserNotApproved' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'Success' : null } |
  { 'AddError' : null } |
  { 'UserNotJoined' : null } |
  { 'UserNotFound' : null };
export interface ClubWithID {
  'id' : Id,
  'time_created' : Time,
  'owner' : Principal,
  'name' : string,
  'isPublic' : boolean,
  'clubImg' : Array<number>,
}
export interface Comment {
  'time_created' : Array<Time>,
  'author' : Array<Principal>,
  'comments' : Array<string>,
}
export interface CommentWithId {
  'gid' : Id,
  'time_created' : Array<Time>,
  'author' : Array<Principal>,
  'comments' : Array<string>,
}
export interface ConnectOwner {
  'name' : string,
  'email' : string,
  'address' : string,
  'profile' : Array<number>,
}
export type ConnectOwnerError = { 'UserNotAuthenticated' : null } |
  { 'AddError' : null };
export interface ConnectOwnerWithId {
  'id' : Wallet,
  'name' : string,
  'email' : string,
  'address' : string,
  'profile' : Array<number>,
}
export interface FanClub {
  'addComment' : ActorMethod<[Id, Comment], Result_6>,
  'addConnectOwner' : ActorMethod<[ConnectOwner], Result_5>,
  'createClub' : ActorMethod<[Club], Result_4>,
  'findAll' : ActorMethod<[], Array<ConnectOwnerWithId>>,
  'findAllClub' : ActorMethod<[], Array<ClubWithID>>,
  'findAllMember' : ActorMethod<[], Array<OwnerClubWithID>>,
  'findClubByID' : ActorMethod<[Id], [] | [Club]>,
  'findConnectOwnedById' : ActorMethod<[Wallet], [] | [ConnectOwner]>,
  'findMemberByID' : ActorMethod<[Id], [] | [OwnerClub]>,
  'getAllComment' : ActorMethod<[], Array<CommentWithId>>,
  'getCommentById' : ActorMethod<[Id], [] | [Comment]>,
  'getOwner' : ActorMethod<[], Principal>,
  'requestJoin' : ActorMethod<[OwnerClub], Result_3>,
  'setOwner' : ActorMethod<[Principal], Result_2>,
  'updateOrDeleteClub' : ActorMethod<[Id, [] | [Club]], Result_1>,
  'updateOrDeleteConnectOwner' : ActorMethod<
    [Wallet, [] | [ConnectOwner]],
    Result,
  >,
}
export type Id = number;
export interface OwnerClub {
  'joined_date' : Time,
  'joinClub' : number,
  'owner' : Array<Principal>,
  'approve' : boolean,
}
export interface OwnerClubWithID {
  'gid' : Id,
  'joined_date' : Time,
  'joinClub' : number,
  'owner' : Array<Principal>,
  'approve' : boolean,
}
export type OwnerError = { 'UserNotAuthenticated' : null };
export type Result = { 'ok' : boolean } |
  { 'err' : ConnectOwnerError };
export type Result_1 = { 'ok' : boolean } |
  { 'err' : ClubError };
export type Result_2 = { 'ok' : Principal } |
  { 'err' : OwnerError };
export type Result_3 = { 'ok' : ClubError } |
  { 'err' : ClubError };
export type Result_4 = { 'ok' : null } |
  { 'err' : ClubError };
export type Result_5 = { 'ok' : string } |
  { 'err' : null };
export type Result_6 = { 'ok' : null } |
  { 'err' : string };
export type Time = bigint;
export type Wallet = Principal;
export interface _SERVICE extends FanClub {}
