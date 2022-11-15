import List "mo:base/List";
import Time "mo:base/Time";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Order "mo:base/Order";
import Trie "mo:base/Trie";
import Option "mo:base/Option";

// (Enable when production)
// NFT Contract File
// import NFToken "./Main";

shared(msg) actor class FanClub (
  _owner : Principal,
  ) = this {
  // Club List
  type Club = {
    name: Text;
    owner: Principal;
    isPublic: Bool;
    time_created:Time.Time;
    clubImg: [Nat8];
  };
  // ClubWithID List
  type ClubWithID = {
    id: Id;
    name: Text;
    owner: Principal;
    isPublic: Bool;
    time_created:Time.Time;
    clubImg: [Nat8];
  };
  // OwnerClub List
  type OwnerClub = {
    joinClub: Nat32;
    approve: Bool;
    owner: [Principal];
    joined_date: Time.Time;
  };
  // OwnerClubWithID List
  type OwnerClubWithID = {
    gid: Id;
    joinClub: Nat32;
    approve: Bool;
    owner: [Principal];
    joined_date: Time.Time;
  };
  // Comment List
  type Comment = {
    comments : [Text];
    author : [Principal];
    time_created : [Time.Time];
  };
  // CommentWithId List
  type CommentWithId = {
    gid : Id;
    comments : [Text];
    author : [Principal];
    time_created : [Time.Time];
  };
  // ConnectOwner List
  type ConnectOwner = {
    name: Text;
    address: Text;
    email:Text;
    profile: [Nat8];
  };
  // ConnectOwnerWithId List
  type ConnectOwnerWithId = {
    id: Wallet;
    name: Text;
    address: Text;
    email:Text;
    profile: [Nat8];
  };

  public type Id = Nat32;
  public type Wallet = Principal;
  private stable var nextClub : Id = 0;
  private stable var nextMember : Id = 0;
  private stable var nextComment : Id = 0;
  private stable var owner_: Principal = _owner;

  private stable var stableClub : Trie.Trie<Id, Club> = Trie.empty();
  private stable var stableOwner : Trie.Trie<Id, OwnerClub> = Trie.empty();
  private stable var stableComment : Trie.Trie<Id, Comment> = Trie.empty();
  private stable var stablemember : Trie.Trie<Wallet, ConnectOwner> = Trie.empty();

  private var clublist : Trie.Trie<Id, Club> = Trie.empty();
  private var ownerlist : Trie.Trie<Id,OwnerClub> = Trie.empty();
  private var commentList : Trie.Trie<Id, Comment> = Trie.empty();
  private var connectOwnedList : Trie.Trie<Wallet, ConnectOwner> = Trie.empty();

  // Possible errors for Club function
  type ClubError = {
    #UserNotAuthenticated;
    #UserNotJoined;
    #UserNotApproved;
    #AddError;
    #ExistError;
    #UserNotFound;
    #Success;
  };

  // Possible errors for Owner function
  type OwnerError = {
    #UserNotAuthenticated;
  };

  // Possible errors for Comment function
  type CommentError = {
    #UserNotAuthenticated;
    #PostNotFound;
  };

  // Possible errors for ConnectOwner function
  type ConnectOwnerError = {
    #UserNotAuthenticated;
    #AddError;
  };

  // Preupgrade function will store all clubs and members data into stable array before update
  system func preupgrade() {
    stableClub := Trie.clone<Id, Club>(clublist);
    stableOwner := Trie.clone<Id, OwnerClub>(ownerlist);
    stableComment := Trie.clone<Id, Comment>(commentList);
    stablemember := Trie.clone<Wallet, ConnectOwner>(connectOwnedList);
  };
  // Postupgrade function will then populate Trie with club and member data after the update is finished
  system func postupgrade() {
    clublist := Trie.clone<Id, Club>(stableClub);
    stableClub := Trie.empty();
    ownerlist := Trie.clone<Id, OwnerClub>(stableOwner);
    stableOwner := Trie.empty();
    commentList := Trie.clone<Id, Comment>(stableComment);
    stableComment := Trie.empty();
    connectOwnedList := Trie.clone<Wallet, ConnectOwner>(stablemember);
    stablemember := Trie.empty();
  };
  private func eq(x : Id, y : Id) : Bool {
    return x == y;
  };
  private func key(x : Id) : Trie.Key<Id> {
    return { hash = x; key = x };
  };
  private func eqConnectOwner(x : Principal, y : Principal) : Bool {
    return x == y;
  };
  private func keyConnectOwner(x : Principal) : Trie.Key<Principal> {
    return { hash = Principal.hash(x); key = x };
  };
  /**
    * @dev To get current timestamp
    * return @Int with Time.now() of the ICP on-chain timestamp
    */
  private func getTimestamp() : Int{
    return Time.now();
  };
  /**
    * @dev Actor Owner
    *
    */
  public query func getOwner() : async Principal {
    return owner_;
  };
  /**
    * @new Ownership transfer function
    *
    */
  public shared(msg) func setOwner(new: Principal): async Result.Result<(Principal),(OwnerError)> {
    if(msg.caller == owner_){
      owner_ := new;
      return #ok((new));
    }else { 
      return #err((#UserNotAuthenticated));
    };
	};
  // ConnectOwner
  /**
    * @newConnectCustomer ConnectOwner data
    * return @Text result for success or failed to add ConnectOwner
    */
  public func addConnectOwner (newConnectCustomer: ConnectOwner) : async Result.Result<(Text),()> {
    let id = msg.caller;
    let result = Trie.find(connectOwnedList, keyConnectOwner(id), eqConnectOwner);
    let exists = Option.isSome(result);
    if(exists){
      connectOwnedList := Trie.replace(
          connectOwnedList,
          keyConnectOwner(id),
          eqConnectOwner,
          ?newConnectCustomer,
      ).0;
      return #ok(("updated"));
    } else {
      connectOwnedList := Trie.put(
          connectOwnedList,
          keyConnectOwner(id),
          eqConnectOwner,
          newConnectCustomer,
      ).0;
      return #ok(("created"));
    };
  };
  /**
    * return @ConnectOwnerWithId that bind @id into the return value
    */
  public query func findAll() : async [ConnectOwnerWithId] {
    let customersAsArray = Trie.toArray<Wallet, ConnectOwner, ConnectOwnerWithId>(connectOwnedList, transformConnectOwner);
    return customersAsArray;
  };
  /**
    * @id Principal id
    * @cust ConnectOwner data
    * return @ConnectOwnerWithId that bind @id into the return value
    */
  private func transformConnectOwner(id:Wallet, cust:ConnectOwner): ConnectOwnerWithId{
    let newCustomerWithId : ConnectOwnerWithId = {
        id = id;
        name = cust.name;
        address =  cust.address;
        email = cust.email;
        profile = cust.profile;
    };
    return newCustomerWithId;
  };
  /**
    * @id Principal id
    * return @ConnectOwner if @id exist in connectOwnedList
    */
  public query func findConnectOwnedById(id : Wallet) : async ?ConnectOwner {
    let result = Trie.find(connectOwnedList, keyConnectOwner(id), eqConnectOwner);
    return result;
  };
  /**
    * @id Principal id
    * @updatedCustomer ConnectOwner information
    * @dev only @owner_ can perform update and delete of the requested/reported ConnectOwner
    * return @Bool or @ConnectOwnerError if update or delete success or failed
    */
  public func updateOrDeleteConnectOwner(id : Wallet, updatedCustomer: ?ConnectOwner) : async Result.Result<(Bool),(ConnectOwnerError)> {
    let result = Trie.find(connectOwnedList, keyConnectOwner(id), eqConnectOwner);
    let exists = Option.isSome(result);
    if(msg.caller != owner_) {
        return #err(#UserNotAuthenticated);
    };
    
    if (exists) {
      connectOwnedList := Trie.replace(
          connectOwnedList,
          keyConnectOwner(id),
          eqConnectOwner,
          updatedCustomer,
      ).0;
    };
    return #ok((exists));
  };
  // Fans Club
  /**
    * @newClub For NFT Creator to create their own club
    *
    */
  public func createClub(newClub: Club) : async Result.Result<(),(ClubError)> {
    let cid = nextClub;
    nextClub +%= 1;
    let result = Trie.find(clublist, key(cid), eq);
    let exists = Option.isSome(result);
    let clubData : Club = compileClub(cid,newClub,msg.caller);
    if(exists){
      return #err((#ExistError));
    } else {
      switch (result){
        case null { 
          clublist := Trie.put(
              clublist,
              key(cid),
              eq,
              clubData,
          ).0;
          return #ok(());
        };
        case (?v) {
          if(v.owner == msg.caller){
            clublist := Trie.replace(
                clublist,
                key(cid),
                eq,
                ?clubData,
            ).0;
            return #ok(());
          }else{
            clublist := Trie.put(
                clublist,
                key(cid),
                eq,
                clubData,
            ).0;
            return #ok(());
          };
        };
      };
    };
  };
  /**
    * @id Club id
    * @clubData Club submitted data
    * @submitBy Submit by which Principal
    * return @Club data of the current @id
    */
  private func compileClub(id:Id, clubData:Club, submitBy:Principal):Club{
      let newClub : Club = {
          name = clubData.name;
          owner = submitBy;
          isPublic =  clubData.isPublic;
          time_created = getTimestamp();
          clubImg = clubData.clubImg;
      };
    return newClub;
  };
  /**
    * @dev To list out all Club information
    *
    */
  public query func findAllClub() : async [ClubWithID] {
    let clubAsArray = Trie.toArray<Id, Club, ClubWithID>(clublist, transform);
    return clubAsArray;
  };
  /**
    * @id Club ID
    * @cust Club Data
    * return @ClubWithID information with their Club ID assigned to it
    */
  private func transform(id:Id, cust:Club): ClubWithID{
    let newClubWithId : ClubWithID = {
        id = id;
        name = cust.name;
        owner =  cust.owner;
        isPublic = cust.isPublic;
        time_created = cust.time_created;
        clubImg = cust.clubImg;
    };
    return newClubWithId;
  };
  /**
    * @id Find Club by id to grab Club information
    *
    */
  public query func findClubByID(id : Id) : async ?Club {
    let result = Trie.find(clublist, key(id), eq);
    return result;
  };
  /**
    * @id Club id
    * @updateClub Club information
    * @dev only @owner_ can perform update and delete of the requested/reported Club
    * return @Bool or @ClubError if update or delete success or failed
    */
  public func updateOrDeleteClub(id : Id, updateClub: ?Club) : async Result.Result<(Bool),(ClubError)> {
    let result = Trie.find(clublist, key(id), eq);
    let exists = Option.isSome(result);
    if(msg.caller != owner_) {
        return #err(#UserNotAuthenticated);
    };
    
    if (exists) {
      clublist := Trie.replace(
          clublist,
          key(id),
          eq,
          updateClub,
      ).0;
    };
    return #ok((exists));
  };
  // Club Member
  /**
    * @gid To filter Member who had submit request to join the Club
    * return @?OwnerClub value of the Member who join @gid group
    */
  public query func findMemberByID(gid : Id) : async ?OwnerClub {
    let result = Trie.find(ownerlist, key(gid), eq);
    return result;
  };
  /**
    * @dev To list all members with their submission request to join the Club
    * return @OwnerClubWithID list of members with their gid group who join the club
    */
  public query func findAllMember() : async [OwnerClubWithID] {
    let ownerAsArray = Trie.toArray<Id, OwnerClub, OwnerClubWithID>(ownerlist, convert);
    return ownerAsArray;
  };
  /**
    * @id Club id
    * @cust OwnerClub data
    * return @OwnerClubWithID list of members with their gid group who join the club
    */
  private func convert(id:Id, cust:OwnerClub): OwnerClubWithID{
    let newOwnerClubWithID : OwnerClubWithID = {
        gid = id;
        joinClub = cust.joinClub;
        approve = cust.approve;
        owner =  cust.owner;
        joined_date = cust.joined_date;
    };
    return newOwnerClubWithID;
  };
  /**
    * @msg.caller send request to join the club based on id created with verifying of Owner had purchased the NFT
    *
    */
  public func requestJoin(newjoin: OwnerClub) : async Result.Result<(ClubError),(ClubError)>{
    let result = Trie.find(clublist, key(newjoin.joinClub), eq);
    let result2 = Trie.find(ownerlist, key(newjoin.joinClub), eq);
    let exists = Option.isSome(result);
    let cid = nextMember;
    nextMember +%= 1;
    let ownerClubData : OwnerClub = compileOwnerClub(newjoin);
    
    if (exists) {
      switch (result2) {
        case (null) {
          ownerlist := Trie.put(
              ownerlist,
              key(newjoin.joinClub),
              eq,
              ownerClubData,
            ).0;
          return #ok((#Success));
        };
        case (?v){
          let currentOwner : Buffer.Buffer<Principal> = Buffer.Buffer(v.owner.size());
          for(i in v.owner.vals()){
              currentOwner.add(i);
            if(i != msg.caller){
              currentOwner.add(msg.caller);
              let nextjoin : OwnerClub = updateClubMember(newjoin.joinClub,newjoin,currentOwner.toArray());
              ownerlist := Trie.replace(
                ownerlist,
                key(newjoin.joinClub),
                eq,
                ?nextjoin,
              ).0;
              return #ok((#Success));
            }else{
              return #err((#ExistError));
            };
          };
          return #ok((#Success));
        };
      };
    } else {
      return #err((#UserNotFound));
    };
  };
  /**
    * @clubData OwnerClub submitted data
    * @submitBy Submit by which Principal
    * return @OwnerClub data of the current @id
    */
  private func compileOwnerClub(ownerClubData : OwnerClub) : OwnerClub{
      let newOwnerClub : OwnerClub = {
          joinClub = ownerClubData.joinClub;
          approve = ownerClubData.approve;
          owner = ownerClubData.owner;
          joined_date = getTimestamp();
      };
    return newOwnerClub;
  };
  /**
    * @id Club id
    * @cust OwnerClub data
    * @newjoin Array of Address to be newly appended into @OwnerClub
    * return @OwnerClub compiled data of the current id
    */
  private func updateClubMember(id:Id, cust:OwnerClub, newjoin:[Principal]):OwnerClub{
      let existOwnerClub : OwnerClub = {
          approve = false;
          joinClub = id;
          owner =  newjoin;
          joined_date = cust.joined_date;
      };
    return existOwnerClub;
  };
  /**
    * @dev For testing purpose
    * 
    */
  private func verifyOwner(id:Id) : async Result.Result<(Principal,Principal),(Text)>{
    let result : ?Club = await findClubByID(id);
    switch (result){
      case null { return #err(("Failed"))};
      case (?v) {
        return #ok((v.owner,msg.caller));
        // if(v.owner == msg.caller){
        //   return v.owner;
        // };
      };
    };
  };
  /**
    * @dev For testing purpose
    * 
    */
  private func matchOwner(id:Id, cust:OwnerClub): OwnerClub{
    let existOwnerClubWithID : OwnerClub = {
        approve = true;
        joinClub = cust.joinClub;
        owner =  cust.owner;
        joined_date = cust.joined_date;
    };
    return existOwnerClubWithID;
  };
  // Comment
  /**
    * @gid Club id
    * @newComment Comment data
    * return #ok(()) or #err(("Error")) for comment 
    */
  public func addComment(gid: Id,newComment: Comment) : async Result.Result<(),(Text)> {
    let cid = nextComment;
    nextComment +%= 1;
    let result = Trie.find(commentList, key(gid), eq);
    let exists = Option.isSome(result);
    let result2 = Trie.find(clublist, key(gid), eq);
    let exists2 = Option.isSome(result2);
    let currentNewComments : Buffer.Buffer<Text> = Buffer.Buffer(newComment.comments.size());
    let currentNewAuthor : Buffer.Buffer<Principal> = Buffer.Buffer(newComment.comments.size());
    let currentNewTimeCreated : Buffer.Buffer<Time.Time> = Buffer.Buffer(newComment.comments.size());
    for(a in newComment.comments.vals()){
      currentNewComments.add(a);
      currentNewAuthor.add(msg.caller);
      currentNewTimeCreated.add(getTimestamp());
    };
    let nextNewComment : Comment = updateComment(currentNewComments.toArray(),currentNewAuthor.toArray(),currentNewTimeCreated.toArray());
    if(exists and exists2){
      switch(result){
        case null {
          commentList := Trie.put(
            commentList,
            key(gid),
            eq,
            nextNewComment,
          ).0;
        };
        case (?v){
          let currentComments : Buffer.Buffer<Text> = Buffer.Buffer(v.comments.size());
          let currentAuthor : Buffer.Buffer<Principal> = Buffer.Buffer(v.comments.size());
          let currentTimeCreated : Buffer.Buffer<Time.Time> = Buffer.Buffer(v.comments.size());
          for(j in v.author.vals()){
            currentAuthor.add(j);
          };
          for(k in v.time_created.vals()){
            currentTimeCreated.add(k);
          };
          for(i in v.comments.vals()){
            currentComments.add(i);
          };
          for(a in newComment.comments.vals()){
            currentComments.add(a);
            currentAuthor.add(msg.caller);
            currentTimeCreated.add(getTimestamp());
          };
          let nextNewComments : Comment = updateComment(currentComments.toArray(),currentAuthor.toArray(),currentTimeCreated.toArray());
          commentList := Trie.replace(
            commentList,
            key(gid),
            eq,
            ?nextNewComments,
          ).0;
        };
      };
    }else{
      if(exists2){
        commentList := Trie.put(
            commentList,
            key(gid),
            eq,
            nextNewComment,
        ).0;
      }else{
        return #err(("Fan Club not found!"));
      };
    };
    return #ok(());
  };
  /**
    * @dev To list out all Comment 
    *
    */
  public query func getAllComment () : async [CommentWithId] {
    let commentAsArray = Trie.toArray<Id, Comment, CommentWithId>(commentList, transformComment);
    return commentAsArray;
  };
  /**
    * @id Club id
    * @existCommentData Comment data
    * @currentComments Comments Record Array
    * @currentAuthor Comments Owner Array
    * @currentTimeCreated Comments Created Time Array
    * return @Comment data of the current @id
    */
  private func updateComment(currentComments:[Text],currentAuthor:[Principal],currentTimeCreated:[Time.Time]):Comment{
    let existComment : Comment = {
      comments = currentComments;
      author = currentAuthor;
      time_created = currentTimeCreated;
    };
    return existComment;
  };
  /**
    * @gid Club id
    * return @Comment value find based on @gid
    */
  public func getCommentById(gid: Id) : async ?Comment{
    let result = Trie.find(commentList, key(gid), eq);
    return result;
  };
  /**
    * @gid Club id
    * @cmt Comment Data
    * return @CommentWithId value together with @gid
    */
  private func transformComment(gid:Id, cmt:Comment): CommentWithId{
    let newCommentWithId : CommentWithId = {
        gid = gid;
        comments =  cmt.comments;
        author = cmt.author;
        time_created = cmt.time_created;
    };
    return newCommentWithId;
  };
}