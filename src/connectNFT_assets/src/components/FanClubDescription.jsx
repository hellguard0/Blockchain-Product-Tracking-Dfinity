import React, { useEffect, useState,useRef,memo } from "react";
import { BrowserRouter, Link, Switch, Route,useLocation } from "react-router-dom";
import concertImage from "../../assets/concert.png";
import user1Image from "../../assets/user1.png";
import user2Image from "../../assets/user2.png";
import user3Image from "../../assets/user3.png";
import user4Image from "../../assets/user4.png";
import avatarHost from "../../assets/avataruser.png";
import condition from "../../assets/condition.png";
import error from "../../assets/close.png";
import correct from "../../assets/correct.png";
import alifImage from "../../assets/alifsafar.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { EveryUser, Pin } from '@icon-park/react';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Principal } from "@dfinity/principal";
import { Connect2ICProvider, useConnect,useWallet,useCanister } from "@connect2ic/react";

function convertToImage(e){
  const imageData = e;
  const imageContent = new Uint8Array(imageData);
  const image = URL.createObjectURL(
    new Blob([imageContent.buffer], { type: "image/png" })
  );
  return image;
}

function substring(e){
  let a = e;
  const str1 = a.substr(0, e.length/3);
  const str2 = a.substr(e.length/1.5, e.length);
  return str1+'...'+str2;
}

function FanClubDescription() {
  const [wallet] = useWallet();
  const [fanclub] = useCanister("fanclub");
  const [NFTSale] = useCanister("NFTSale");
  const [walletPrincipal,setWalletPrincipal] = useState('');
  const { isConnected,principal } = useConnect();
  const [alertHidden, setAlertHidden] = useState(true);
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [showAlert,setShowAlert] = useState('');
  const wasConnectedRef = useRef(false);

  const initialListClub = new Array();
  const [currentOwnedClub,setOwnedClub] = useState(initialListClub);
  const [ownerList,setOwnerList] = useState(initialListClub);
  const [clubMember,setClubMember] = useState(initialListClub);
  const [commentMember,setCommentMember] = useState(initialListClub);
  const [isJoined,setIsJoined] = useState(false);
  const [isBought,setIsBought] = useState(false);
  const [isCreator,setIsCreator] = useState(false);
  const [isOwned,setIsOwned] = useState(false);
  const [boughtNFTCount,setBoughtNFTCount] = useState(0);
  const{search} = useLocation();
  let propsid = new URLSearchParams(search).get('id')
  useEffect(() => {
    if (isConnected && !wasConnectedRef.current) {
      setWalletPrincipal(wallet.principal);
      getfanlist();
      wasConnectedRef.current = true;
    }
  }, [isConnected]);
  async function getClubOwnerName(id){
    const findClubByID = await fanclub.findClubByID(id);
    if(findClubByID.length > 0){
      const findConnectOwnedById = await fanclub.findConnectOwnedById(findClubByID[0].owner);
      return findConnectOwnedById;
    }
  };
  async function getClubData(id){
    const findClubByID = await fanclub.findClubByID(id);
    if(findClubByID.length > 0){
      return findClubByID;
    }
  };

  async function getClubOwner(id){
    const findClubByID = await fanclub.findClubByID(id);
    if(findClubByID.length > 0){
      return findClubByID[0].owner;
    }
  }

  async function findMemberByID(id){
    const findMemberByID = await fanclub.findMemberByID(id);
    console.log(findMemberByID,id);
    if(findMemberByID.length > 0){
      return findMemberByID;
    }else{
      return [];
    }
  };
  async function findCommentById(id){
    const getCommentById = await fanclub.getCommentById(id);
    if(getCommentById.length > 0){
      return getCommentById;
    }else{
      return [];
    }
  }
  async function refreshClubMember(clubdata,clubOwner){
    if(clubdata.length>0){
      for(let i=0 ; i<clubdata.length;i++){
        if(clubdata[i].length > 0){
          if((clubdata[i][0].owner[0]).toText() == (wallet.principal)){
            return "joined";
          }else if(clubOwner[i].toText() == (wallet.principal)){
            return "owned";
          }
        }else{
          console.log(clubOwner,clubdata)
          if(clubOwner[i].toText() == (wallet.principal)){
            return "owned";
          }else{
            return "join";
          }
        }
      }
    }else{
      if(clubOwner[i].toText() == (wallet.principal)){
        return "owned";
      }else{
        return "join";
      }
    }
  }
  async function onSubmit(){
    setLoaderHidden(false);
    setAlertHidden(false);
    setShowAlert("Submitting");
    const ownerlist = [];
    ownerlist.push(Principal.fromText(wallet.principal))
    const ownerClub = {
      joinClub: Number(propsid),
      approve: true,
      owner: ownerlist,
      joined_date: new Date().getTime()
    }
    const joinClub = await fanclub.requestJoin(ownerClub);
    if(joinClub){
      if(joinClub.ok){
        setShowAlert("Success");
        setTimeout(()=>{
          setLoaderHidden(true);
          setIsJoined(true);
          setAlertHidden(true);
        },500)
      }else if(joinClub.err){
        setShowAlert(joinClub.err.ExistError == null ? "Already Joined!": "User Not Register!");
        setTimeout(()=>{
          setLoaderHidden(true);
          setAlertHidden(true);
        },500)
      }
    }
  }
  async function getfanlist(){
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let arr5 = [];
    let clubData = await getClubData(Number(propsid));
    arr4.push(clubData[0]);
    let ownerData = await getClubOwnerName(Number(propsid));
    arr.push(ownerData[0]);
    let clubMember = await findMemberByID(Number(propsid));
    let clubowner = await getClubOwner(Number(propsid));
    arr5.push(clubowner);
    arr2.push(clubMember);

    let commentMember = await findCommentById(Number(propsid));
    arr3.push(commentMember);
    setCommentMember(arr3);
    setClubMember(arr2);
    setOwnerList(arr);
    setOwnedClub(clubData);
    let boolData = await refreshClubMember(arr2, arr5);
    setIsJoined(boolData == 'joined' ? true:false);
    setIsBought(boolData == 'joined' ? true:false);
    setIsOwned(boolData == 'owned' ? true:false);
  }
  return (
    <div className="body-content">
      <div className="featured mt-1 p-0">
        <div className="d-flex flex-column gap-3">
          {currentOwnedClub.map((key,value)=>(
            <div className="d-flex flex-column gap-2" key={value}>
              <Card className="fangroup rounded-0 border-0" variant="outlined">
                <CardMedia
                  className="fangroupBanner"
                  component="img"
                  alt={convertToImage(key.clubImg)}
                  height="150"
                  image={convertToImage(key.clubImg)}
                />
                <CardContent className="fangroup-content pb-3">
                  <div className="d-flex flex-column align-items-start gap-3 border-bottom pb-3">
                    <Typography className="fw-bold" variant="h5" component="div">
                      {key.name}
                    </Typography>
                    <AvatarGroup className="avatargroup" total={clubMember[0].length > 0 ? clubMember[0].length:clubMember[0].length+3}>
                      {/* {clubMember.length > 0?clubMember[0].map((key,value)=>(
                        <Avatar className="avataruser" alt="Remy Sharp" src={clubMember[0]} />
                      )):''} */}
                      <Avatar className="avataruser" alt="Remy Sharp" src={user1Image} />
                      <Avatar className="avataruser" alt="Travis Howard" src={user2Image} />
                      <Avatar className="avataruser" alt="Agnes Walker" src={user3Image} />
                      <Avatar className="avataruser" alt="Trevor Henderson" src={user4Image} />
                    </AvatarGroup>
                  </div>
                </CardContent>
              </Card>
              <div className="joinmethod">
                <div className="d-flex flex-column gap-3">
                  <h2 className="my-0">How to Join</h2>
                  <div className="d-flex flex-column gap-2 border-bottom pb-4">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <img src={condition} alt="Condition" />
                      <div className="d-flex flex-column gap-1">
                        <h3 className="my-0">{key.name} NFT ({boughtNFTCount}/{1})</h3>
                        <div className="d-flex flex-row align-items-center gap-2">
                          <img src={error} className="conditionerror" alt="Error" style={!Boolean(isBought) ? {}:{display:'none'}}/>
                          <img src={correct} className="conditionerror" alt="Correct" style={Boolean(isBought) ? {}:{display:'none'}}/>
                          <h4 className="my-0">{Boolean(isBought) ? 'Eligible':'Not Eligible'}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hosted">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <img src={avatarHost} alt="Owner" />
                    <div className="d-flex flex-column gap-1">
                      <h3 className="my-0">{ownerList[0].name}</h3>
                      <h4 className="my-0">Creator</h4>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <h3 className="my-0">About Community</h3>
                    <p className="my-0">{key.name}</p>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <h3 className="my-0">Principal ID</h3>
                    <div className="disButtonBase-root disChip-root makeStyles-price-25">
                      <span className="disChip-label">{substring((key.owner).toText())}</span>
                    </div>
                  </div>
                  <Button className="btn-joined py-3" variant="contained" onClick={onSubmit} style={!Boolean(isJoined) && !isOwned ? {}:{display:'none'}}>Join Now</Button>
                  <CircularProgress hidden={loaderHidden} />
                  <Alert onClose={() => {setAlertHidden(true);}} severity="success" hidden={alertHidden} color="info">{showAlert}</Alert>
                  <Link className="btn-joined py-3" to={{pathname:`./chat`, search: `?id=${propsid}`}} hidden={!isJoined && !isOwned}>Chat</Link>
                </div>
              </div>
            </div>
          ))}
          {/* <Card className="bg-dark text-white rounded-5">
            <Card.Img src={alifImage} className="rounded-5" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>Alif Satar NFT</Card.Title>
              <Card.Text>
                <button className="btn-mint">Mint Now</button>
              </Card.Text>
            </Card.ImgOverlay>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

export default FanClubDescription;
