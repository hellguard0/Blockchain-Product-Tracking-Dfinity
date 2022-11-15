export const idlFactory = ({ IDL }) => {
  const Id = IDL.Nat32;
  const Time = IDL.Int;
  const Comment = IDL.Record({
    'time_created' : IDL.Vec(Time),
    'author' : IDL.Vec(IDL.Principal),
    'comments' : IDL.Vec(IDL.Text),
  });
  const Result_6 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const ConnectOwner = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'address' : IDL.Text,
    'profile' : IDL.Vec(IDL.Nat8),
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Null });
  const Club = IDL.Record({
    'time_created' : Time,
    'owner' : IDL.Principal,
    'name' : IDL.Text,
    'isPublic' : IDL.Bool,
    'clubImg' : IDL.Vec(IDL.Nat8),
  });
  const ClubError = IDL.Variant({
    'ExistError' : IDL.Null,
    'UserNotApproved' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'Success' : IDL.Null,
    'AddError' : IDL.Null,
    'UserNotJoined' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Null, 'err' : ClubError });
  const Wallet = IDL.Principal;
  const ConnectOwnerWithId = IDL.Record({
    'id' : Wallet,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'address' : IDL.Text,
    'profile' : IDL.Vec(IDL.Nat8),
  });
  const ClubWithID = IDL.Record({
    'id' : Id,
    'time_created' : Time,
    'owner' : IDL.Principal,
    'name' : IDL.Text,
    'isPublic' : IDL.Bool,
    'clubImg' : IDL.Vec(IDL.Nat8),
  });
  const OwnerClubWithID = IDL.Record({
    'gid' : Id,
    'joined_date' : Time,
    'joinClub' : IDL.Nat32,
    'owner' : IDL.Vec(IDL.Principal),
    'approve' : IDL.Bool,
  });
  const OwnerClub = IDL.Record({
    'joined_date' : Time,
    'joinClub' : IDL.Nat32,
    'owner' : IDL.Vec(IDL.Principal),
    'approve' : IDL.Bool,
  });
  const CommentWithId = IDL.Record({
    'gid' : Id,
    'time_created' : IDL.Vec(Time),
    'author' : IDL.Vec(IDL.Principal),
    'comments' : IDL.Vec(IDL.Text),
  });
  const Result_3 = IDL.Variant({ 'ok' : ClubError, 'err' : ClubError });
  const OwnerError = IDL.Variant({ 'UserNotAuthenticated' : IDL.Null });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : OwnerError });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : ClubError });
  const ConnectOwnerError = IDL.Variant({
    'UserNotAuthenticated' : IDL.Null,
    'AddError' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Bool, 'err' : ConnectOwnerError });
  const FanClub = IDL.Service({
    'addComment' : IDL.Func([Id, Comment], [Result_6], []),
    'addConnectOwner' : IDL.Func([ConnectOwner], [Result_5], []),
    'createClub' : IDL.Func([Club], [Result_4], []),
    'findAll' : IDL.Func([], [IDL.Vec(ConnectOwnerWithId)], ['query']),
    'findAllClub' : IDL.Func([], [IDL.Vec(ClubWithID)], ['query']),
    'findAllMember' : IDL.Func([], [IDL.Vec(OwnerClubWithID)], ['query']),
    'findClubByID' : IDL.Func([Id], [IDL.Opt(Club)], ['query']),
    'findConnectOwnedById' : IDL.Func(
        [Wallet],
        [IDL.Opt(ConnectOwner)],
        ['query'],
      ),
    'findMemberByID' : IDL.Func([Id], [IDL.Opt(OwnerClub)], ['query']),
    'getAllComment' : IDL.Func([], [IDL.Vec(CommentWithId)], ['query']),
    'getCommentById' : IDL.Func([Id], [IDL.Opt(Comment)], []),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'requestJoin' : IDL.Func([OwnerClub], [Result_3], []),
    'setOwner' : IDL.Func([IDL.Principal], [Result_2], []),
    'updateOrDeleteClub' : IDL.Func([Id, IDL.Opt(Club)], [Result_1], []),
    'updateOrDeleteConnectOwner' : IDL.Func(
        [Wallet, IDL.Opt(ConnectOwner)],
        [Result],
        [],
      ),
  });
  return FanClub;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
