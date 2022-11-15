import React, { useEffect, useState,memo,useRef } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import concertImage from "../../assets/concert.png";
import user1Image from "../../assets/user1.png";
import user2Image from "../../assets/user2.png";
import user3Image from "../../assets/user3.png";
import user4Image from "../../assets/user4.png";
import avatarHost from "../../assets/avataruser.png";
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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//this is the import method, first must check got in declarations folder, if bo ,then run dfx deploy, then rerun your dfx deploy contract name

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
// import { fanclub } from "../../../declarations/fanclub";
import { Principal } from "@dfinity/principal";
import { Connect2ICProvider, useConnect,useWallet,useCanister } from "@connect2ic/react";
// import { NFTSale } from "../../../declarations/NFTSale"; 
import { COMPLETIONSTATEMENT_TYPES } from "@babel/types";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '325px',
  bgcolor: 'background.paper',
  borderRadius: '.5rem',
  p: 3,
};

const FETCH_INTERVAL_MS = 155*1000;

function convertToImage(e){
  const imageData = e;
  const imageContent = new Uint8Array(imageData);
  const image = URL.createObjectURL(
    new Blob([imageContent.buffer], { type: "image/png" })
  );
  return image;
}


function FanClub() {
  const [wallet] = useWallet();
  const [fanclub] = useCanister("fanclub");
  const [NFTSale] = useCanister("NFTSale");
  const { isConnected,principal } = useConnect();
  const [walletPrincipal,setWalletPrincipal] = useState('');
  const [showAlert,setShowAlert] = useState('');
  const [alertHidden, setAlertHidden] = useState(true);
  const [loaderHidden, setLoaderHidden] = useState(true);
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const initialListClub = new Array();
  const [listClub,setListClub] = useState(initialListClub);
  const [currentOwnedClub,setOwnedClub] = useState(initialListClub);
  const [ownerList,setOwnerList] = useState(initialListClub);
  const [notOwnerList,setNotOwnerList] = useState(initialListClub);
  const [clubMember,setClubMember] = useState(initialListClub);
  const [notClubMember,setNotOwnClubMember] = useState(initialListClub);
  const [commentMember,setCommentMember] = useState(initialListClub);
  const [notCommentMember,setNotCommentMember] = useState(initialListClub);
  const [arrayIs,setArrayIs] = useState(initialListClub);
  const [isJoined,setIsJoined] = useState({id:0,data:false});
  const [isBought,setIsBought] = useState({id:0,data:false});
  const [isCreator,setIsCreator] = useState(false);
  const [isOwned,setIsOwned] = useState({id:0,data:false});
  const [button, setButton] = useState();
  
  async function getComment(id){
    const getCommentById = await fanclub.getCommentById(id);
  }
  async function onSubmit(data,event) {
    event.preventDefault();
    if(isConnected){
      if(walletPrincipal){
        setAlertHidden(false);
        setLoaderHidden(false);
        setShowAlert("Submitting");
        let clubResult = await createClub(Principal.fromText(wallet.principal),data);
        if(clubResult == "ok"){
          setTimeout(async ()=>{
            setShowAlert("Success");
            setLoaderHidden(false);
            setAlertHidden(true);
            setOpen(false);
            setIsJoined(true);
            await getfanlist(wallet.principal);
            setLoaderHidden(true);
          },2000);
        }
      }
    }
  }

  async function getClubOwnerName(id){
    const findClubByID = await fanclub.findClubByID(id);
    if(findClubByID.length > 0){
      const findConnectOwnedById = await fanclub.findConnectOwnedById(findClubByID[0].owner);
      return findConnectOwnedById;
    }
  }

  async function getClubOwner(id){
    const findClubByID = await fanclub.findClubByID(id);
    if(findClubByID.length > 0){
      return findClubByID[0].owner;
    }
  }

  async function findMemberByID(id){
    const findMemberByID = await fanclub.findMemberByID(id);
    if(findMemberByID.length > 0){
      return findMemberByID;
    }else{
      return [];
    }
  }

  async function findCommentById(id){
    const getCommentById = await fanclub.getCommentById(id);
    if(getCommentById.length > 0){
      return getCommentById;
    }else{
      return [];
    }
  }
  async function refreshClubMember(clubdata,clubOwner){
    console.log(clubdata,clubOwner)
    if(clubdata.length > 0){
      console.log(clubdata,clubdata.length);
      if(clubdata[0] != undefined){
        if((clubdata[0].owner[0]).toText() == principal){
          return "joined";
        }else if((clubdata[0].owner[0]).toText() == clubOwner.toText()){
          return "owned";
        }else{
          return "join";
        }
      }
    }else{
      return "join";
    }
    // if(clubdata.length>0){
    //   for(let i=0; i<clubdata.length;i++){
    //     if(clubdata[i].length > 0){
    //       if(clubdata[i][0] != undefined){
    //         if((clubdata[i][0].owner[0]).toText() == (principal).toText()){
    //           return "joined";
    //         }else{
    //           return "join";
    //         }
    //       }else{
    //         if(clubOwner[i].toText() == (principal).toText()){
    //           return "owned";
    //         }else{
    //           return "join";
    //         }
    //       }
    //     }else{
    //       if(clubdata[i][0] == undefined){
    //         if(clubOwner[i].toText() == (principal).toText()){
    //           return "owned";
    //         }else{
    //           return "join";
    //         }
    //       }
    //     }
    //   }
    // }
  }

  async function readFanClub (e) {
    const listClub= await fanclub.findAllClub();
    let ownedClub = new Array();
    let notownedClub = new Array();
    if(listClub.length > 0){
      for(let i=0; i<listClub.length;i++){
        if((listClub[i].owner).toText() == e){
          ownedClub.push(listClub[i]);
        }else{
          notownedClub.push(listClub[i]);
        }
      }
    }
    ownedClub.sort((a,b)=>(a.id>b.id) ? 1:-1);
    return new Array(notownedClub,ownedClub);
  }
  
  async function checkRegister (e){
    // const checkIfRegister = await fanclub.findConnectOwnedById(Principal.fromText(e));
    const checkIfRegister = await fanclub.findConnectOwnedById(Principal.fromText(e));
    if(checkIfRegister.length == 0) {
      return registerConnect();
    }
  }
  
  async function registerConnect(){
    const profile = {
      name : "connect",
      email : "connect",
      address : "connect",
      profile : [1,2,3],
    }
    const addConnectOwner = await fanclub.addConnectOwner(profile);
    if(addConnectOwner.ok){
      return addConnectOwner.ok;
    }
  }

  async function createClub(e,data){
    const image = data.clubImg[0];
    const imageArray = await image.arrayBuffer();
    const imageByteData = [...new Uint8Array(imageArray)];
    const clubData = {
      name : data.name,
      owner : e,
      isPublic : true,
      time_created : new Date().getTime(),
      clubImg : imageByteData,
    }
    const createClub = await fanclub.createClub(clubData);
    console.log((e).toText(),clubData)
    if(createClub){
      return "ok";
    }
  }

  const FanClubList = memo(({id,img,name,owner,isPublic,ownerDetails,clubmember,comments,arrayIs,isJoined,isBought,isOwned})=> {
    return (
      <Card className="fangroup" variant="outlined">
        <CardMedia
          className="fangroupBanner"
          component="img"
          alt={convertToImage(img)}
          height="150"
          image={convertToImage(img)}
        />
        <div className="avatarHost">
          <div className="d-flex flex-row align-items-center gap-1">
            <img className="avatarHostImg" src={avatarHost} alt={"Host"} />
            <div className="d-flex flex-column gap-1">
              <h4 className="my-0">{ownerDetails[id].name}</h4>
              <p className="my-0">Hosted</p>
            </div>
          </div>
        </div>
        <CardContent className="fangroup-content d-none">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row justify-content-between align-items-center gap-1">
              <div className="d-flex flex-row align-items-center gap-1">
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
              </div>
              <Typography variant="h2" component="div">
                11:36
              </Typography>
            </div>
            <div className="d-flex flex-row gap-2">
              <div className="d-flex flex-row gap-1">
                <Typography className="fan-user" variant="p" component="div">
                  NwHowarf:
                </Typography>
                <Typography className="fan-user-comment" variant="p" component="div">
                  I have posted a video in youtube for testing
                </Typography>
              </div>
              <span className="badge bg-purple">10</span>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <div className="d-flex flex-row align-items-center justify-content-between w-100">
            <AvatarGroup className="avatargroup" total={clubmember[id].length+3}>
              <Avatar className="avataruser" alt="Remy Sharp" src={user1Image} />
              <Avatar className="avataruser" alt="Travis Howard" src={user2Image} />
              <Avatar className="avataruser" alt="Agnes Walker" src={user3Image} />
              <Avatar className="avataruser" alt="Trevor Henderson" src={user4Image} />
            </AvatarGroup>
            <Link className={!Boolean(arrayIs[id] == 'joined' || arrayIs[id] == 'owned') ? "btn-join" : "btn-joined"} to={{pathname:`./fanclubdescription`, search: `?id=${id}`}}>{Boolean(arrayIs[id] == 'owned') ? 'Owned ': (Boolean(arrayIs[id] == 'joined')?'Chat Now':'Join Now')}</Link>
          </div>
        </CardActions>
      </Card>
    );
  });
  //start
  const wasConnectedRef = useRef(false);

  useEffect(() => {
    if (isConnected && !wasConnectedRef.current) {
      
      setWalletPrincipal(wallet.principal);
      setLoaderHidden(false);
      getfanlist(wallet.principal);
      wasConnectedRef.current = true;
    }
  }, [isConnected]);

  async function getfanlist(wallet){
   
    const checkmint= await NFTSale.getUserTokens(Principal.fromText(wallet));

    if(checkmint.length>0){
      setIsCreator(true);
      setButton(<Button variant="contained" onClick={handleOpen}>Create Now</Button>);
    }else{
      setIsCreator(false);
      setButton('');
    }
    // setWalletPrincipal(Principal.fromText(wallet));
    await checkRegister(wallet);
    let clublist = await readFanClub(wallet);
     console.log(clublist);
    if(clublist && clublist.length>0){
      if(clublist[1].length > 0){
        let arr = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        for(let i=0;i<clublist[1].length;i++){
          let ownerData = await getClubOwnerName(clublist[1][i].id);
          arr.push(ownerData[0]);
          let clubmember = await findMemberByID(clublist[1][i].id);
          arr2.push(clubmember);
          let commentMember = await findCommentById(clublist[1][i].id);
          arr3.push(commentMember);
          let clubData = await getClubOwner(clublist[1][i].id);
          arr4.push(clubData);
          // setIsJoined({id:clublist[1][i].id,data:boolData == 'joined' ? true:false});
          // setIsBought({id:clublist[1][i].id,data:boolData == 'joined' ? true:false});
          // setIsOwned({id:clublist[1][i].id,data:boolData == 'owned' ? true:false});
        }
        for(let j=0;j<clublist[1].length;j++){
          let boolData = await refreshClubMember(arr2[j],arr4[j]);
          arr5.push(boolData);
        }
        setOwnerList(arr);
        setCommentMember(arr3);
        setClubMember(arr2);
        setOwnedClub(clublist[1]);
        console.log(arr5,'Print here1');
        setArrayIs(arr5);
      }
      if(clublist[0].length > 0){
        let arr = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        for(let i=0;i<clublist[0].length;i++){
          let ownerData = await getClubOwnerName(clublist[0][i].id);
          arr.push(ownerData[0]);
          let clubmember = await findMemberByID(clublist[0][i].id);
          arr2.push(clubmember);
          let commentMember = await findCommentById(clublist[0][i].id);
          arr3.push(commentMember);
          let clubData = await getClubOwner(clublist[0][i].id);
          arr4.push(clubData);
          // setIsJoined({id:clublist[1][i].id,data:boolData == 'joined' ? true:false});
          // setIsBought({id:clublist[1][i].id,data:boolData == 'joined' ? true:false});
          // setIsOwned({id:clublist[1][i].id,data:boolData == 'owned' ? true:false});
        }
        for(let j=0;j<clublist[0].length;j++){
          let boolData = await refreshClubMember(arr2[j],arr4[j]);
          arr5.push(boolData);
        }
        setNotCommentMember(arr3);
        setNotOwnClubMember(arr2);
        setNotOwnerList(arr);
        setListClub(clublist[0]);
        setArrayIs(arr5);
      }
    }
    setTimeout(()=>{
      setLoaderHidden(true);
    },3000);
  }
  return (
    <div className="body-content">
      <div className="featured mt-1">
        <div className="d-flex flex-column gap-3">
          <Card className="bg-purple text-white border-0 fanclub" variant="outlined">
            <CardContent className="p-3">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <Typography className="text-start my-0" gutterBottom variant="h5" component="div">
                      {Boolean(isCreator) ? 'Create your Fans Club':'Be a creator now and mint NFT'}
                    </Typography>
                    <Typography className="text-start my-0" gutterBottom variant="p" component="div">
                      Build up your fans community today!
                    </Typography>
                  </div>
                  {button}
                  {/* <Button variant="contained" onClick={handleOpen} style={Boolean(isCreator) ? {}:{display:'none'}}>Create Now</Button> */}
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                      <form className="d-flex flex-column gap-4">
                        <h2 className="my-0 fantitle">Create Your Fan Club</h2>
                        <div className="d-flex flex-column gap-2">
                          <h3 className="label-collection my-0">Upload Image</h3>
                          <input
                            {...register("clubImg", { required: true })}
                            className="upload"
                            type="file"
                            accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
                          />
                        </div>
                        <div className="d-flex flex-column gap-2">
                          <h3 className="label-collection my-0">Name</h3>
                          <input
                            {...register("name", { required: true })}
                            placeholder="Name"
                            type="text"
                            className="form-InputBase-input form-OutlinedInput-input"
                          />
                        </div>
                        <div className="text-end">
                          <Button variant="contained" className="btnCreate" onClick={handleSubmit(onSubmit)}>Create</Button>
                        </div>
                      </form>
                      <CircularProgress hidden={loaderHidden} />
                      <Alert onClose={() => {setAlertHidden(true);}} severity="success" hidden={alertHidden} color="info">{showAlert}</Alert>
                    </Box>
                  </Modal>
                </div>
                <EveryUser theme="filled" size="58" fill="#fff"/>
              </div>
            </CardContent>
          </Card>
          <div className="d-flex flex-column gap-4">
            {/* <Card className="fangroup" variant="outlined">
              <CardMedia
                className="fangroupBanner"
                component="img"
                alt={concertImage}
                height="150"
                image={concertImage}
              />
              <div className="avatarHost">
                <div className="d-flex flex-row align-items-center gap-1">
                  <img className="avatarHostImg" src={avatarHost} alt="Adam Smith" />
                  <div className="d-flex flex-column gap-1">
                    <h4 className="my-0">Adam Smith</h4>
                    <p className="my-0">Hosted</p>
                  </div>
                </div>
              </div>
              <CardContent className="fangroup-content">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-row justify-content-between align-items-center gap-1">
                    <div className="d-flex flex-row align-items-center gap-1">
                      <Typography variant="h5" component="div">
                        Alif Satar Community Fans
                      </Typography>
                      <Pin theme="filled" size="16" fill="#C4C4C4"/>
                    </div>
                    <Typography variant="h2" component="div">
                      11:36
                    </Typography>
                  </div>
                  <div className="d-flex flex-row gap-2">
                    <div className="d-flex flex-row gap-1">
                      <Typography className="fan-user" variant="p" component="div">
                        NwHowarf:
                      </Typography>
                      <Typography className="fan-user-comment" variant="p" component="div">
                        I have posted a video in youtube for testing
                      </Typography>
                    </div>
                    <span className="badge bg-purple">10</span>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <div className="d-flex flex-row align-items-center justify-content-between w-100">
                  <AvatarGroup className="avatargroup" total={50}>
                    <Avatar className="avataruser" alt="Remy Sharp" src={user1Image} />
                    <Avatar className="avataruser" alt="Travis Howard" src={user2Image} />
                    <Avatar className="avataruser" alt="Agnes Walker" src={user3Image} />
                    <Avatar className="avataruser" alt="Trevor Henderson" src={user4Image} />
                  </AvatarGroup>
                  <Link className="btn-joined" to='./fanclubdescription'>Join</Link>
                </div>
              </CardActions>
            </Card> */}
            {/* <Card className="fangroup" variant="outlined">
              <CardMedia
                className="fangroupBanner"
                component="img"
                alt={concertImage}
                height="150"
                image={concertImage}
              />
              <div className="avatarHost">
                <div className="d-flex flex-row align-items-center gap-1">
                  <img className="avatarHostImg" src={avatarHost} alt="Adam Smith" />
                  <div className="d-flex flex-column gap-1">
                    <h4 className="my-0">Adam Smith</h4>
                    <p className="my-0">Hosted</p>
                  </div>
                </div>
              </div>
              <CardContent className="fangroup-content">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-row justify-content-between align-items-center gap-1">
                    <div className="d-flex flex-row align-items-center gap-1">
                      <Typography variant="h5" component="div">
                        Alif Satar Community Fans
                      </Typography>
                    </div>
                    <Typography variant="h2" component="div">
                      11:36
                    </Typography>
                  </div>
                  <div className="d-flex flex-row gap-2">
                    <div className="d-flex flex-row gap-1">
                      <Typography className="fan-user" variant="p" component="div">
                        NwHowarf:
                      </Typography>
                      <Typography className="fan-user-comment" variant="p" component="div">
                        I have posted a video in youtube for testing
                      </Typography>
                    </div>
                    <span className="badge bg-purple">10</span>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <div className="d-flex flex-row align-items-center justify-content-between w-100">
                  <AvatarGroup className="avatargroup" total={50}>
                    <Avatar className="avataruser" alt="Remy Sharp" src={user1Image} />
                    <Avatar className="avataruser" alt="Travis Howard" src={user2Image} />
                    <Avatar className="avataruser" alt="Agnes Walker" src={user3Image} />
                    <Avatar className="avataruser" alt="Trevor Henderson" src={user4Image} />
                  </AvatarGroup>
                  <Link className="btn-join" to='./fanclubdescription'>Join Now</Link>
                </div>
              </CardActions>
            </Card> */}
            { currentOwnedClub.length > 0 ? currentOwnedClub.map((key,value)=>(
              <FanClubList id={value} img={key.clubImg} name={key.name} owner={key.owner} isPublic={key.isPublic} key={value} ownerDetails={ownerList} clubmember={clubMember} comments={commentMember} arrayIs={arrayIs} isJoined={isJoined} isBought={isBought} isOwned={isOwned}/>
            )) : listClub.map((key,value)=>(
              <FanClubList id={value} img={key.clubImg} name={key.name} owner={key.owner} isPublic={key.isPublic} key={value} ownerDetails={notOwnerList} clubmember={notClubMember} comments={notCommentMember} arrayIs={arrayIs} isJoined={isJoined} isBought={isBought} isOwned={isOwned}/>
            ))}
            <CircularProgress hidden={loaderHidden} />
          </div>
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

export default FanClub;
