import React, { useEffect, useState,useRef,memo } from "react";
import { BrowserRouter, Link, Switch, Route,useLocation } from "react-router-dom";
import avatarHost from "../../assets/avataruser.png";
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Send } from '@icon-park/react';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// import { fanclub } from "../../../declarations/fanclub";
import { useForm } from "react-hook-form";
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

function FanClub() {
  const{search} = useLocation();
  let propsid = new URLSearchParams(search).get('id');
  const [wallet] = useWallet();
  const [fanclub] = useCanister("fanclub");
  const [NFTSale] = useCanister("NFTSale");
  const [walletPrincipal,setWalletPrincipal] = useState('');
  const { isConnected,principal } = useConnect();
  const [alertHidden, setAlertHidden] = useState(true);
  const [loaderHidden, setLoaderHidden] = useState(true);
  const { register, handleSubmit, resetField } = useForm();
  const [showAlert,setShowAlert] = useState('');
  const wasConnectedRef = useRef(false);
  const initialListClub = new Array();
  const [author,setAuthor] = useState(initialListClub);
  const [authorInfo,setAuthorInfo] = useState(initialListClub);
  const [comments,setComments] = useState(initialListClub);
  const [timeCreated,setTimeCreated] = useState(initialListClub);
  const [currentOwnedClub,setOwnedClub] = useState(initialListClub);
  async function retrieveComment(id){
    const getCommentById = await fanclub.getCommentById(id);
    console.log(getCommentById);
    if(getCommentById.length > 0){
      return getCommentById;
    }
  }

  async function getClubData(id){
    const findClubByID = await fanclub.findClubByID(id);
    if(findClubByID.length > 0){
      return findClubByID;
    }
  };

  async function getClubOwnerName(id){
    const findConnectOwnedById = await fanclub.findConnectOwnedById(id);
    return findConnectOwnedById;
  };

  async function submitComment(comment,event){
    event.preventDefault();
    setLoaderHidden(false);
    setAlertHidden(false);
    setShowAlert("Submitting");
    let commentStruct = {
      comments: [comment.msg],
      author: [Principal.fromText(wallet.principal)],
      time_created: [new Date().getTime()],
    }
    console.log(commentStruct);
   const submitCommentTx = await fanclub.addComment(Number(propsid),commentStruct);
    if(submitCommentTx){
      if(submitCommentTx.err){
        console.log(submitCommentTx.err);
        setLoaderHidden(true);
        setAlertHidden(true);
        setShowAlert("");
      }else{
        setLoaderHidden(true);
        setAlertHidden(true);
        setShowAlert("");
        resetField('msg');
        let empty = new Array();
        setAuthor(empty);
        setComments(empty);
        setTimeCreated(empty);
        setAuthorInfo(empty);
        await getChatData();
      }
    }
  }

  const AuthorInfoImg = memo(({which,next})=>{
    // console.log(which,next);
    return (
      <img className="avatarOwnerImg" src={avatarHost} alt="Owner" key={which}/>
      // <img className="avatarOwnerImg" src={next[which] ? convertToImage(next[which].profile) : avatarHost} alt="Owner" key={which}/>
    );
  })
  const AuthorInfoName = memo(({which,next})=>{
    return (
      <h3 className="my-0" key={which}>{next[which] ? next[which][0].name : ''}</h3>
    );
  })

  useEffect(() => {
    if (isConnected && !wasConnectedRef.current) {
      setWalletPrincipal(wallet.principal);
      getChatData();
      wasConnectedRef.current = true;
    }
  }, [isConnected]);

  async function getChatData(){
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let arr5 = [];
    let clubData = await getClubData(Number(propsid));
    arr4.push(clubData);
    setOwnedClub(clubData);
    const resultComment = await retrieveComment(Number(propsid));
    if(resultComment){
      if(resultComment.length > 0){
       if(resultComment[0].author.length > 0){
          for(let i = 0; i < resultComment[0].author.length;i++){
            let data = await getClubOwnerName(resultComment[0].author[i]);
            arr5.push(data);
          }
        }
      }
    }
    arr.push(resultComment ? resultComment[0].author : []);
    arr2.push(resultComment ? resultComment[0].comments : []);
    arr3.push(resultComment ? resultComment[0].time_created : []);
    setAuthor(arr);
    setComments(arr2[0]);
    setTimeCreated(arr3);
    setAuthorInfo(arr5);
  }

  return (
    <div className="body-content pb-10 pt-0">
      {currentOwnedClub.map((key,value)=>(
        <div className="d-flex flex-row align-items-center justify-content-between fanOwner p-3" key={value}>
          <h3 className="my-0 text-start">{key.name}</h3>
          <img className="avatarOwner" src={convertToImage(key.clubImg)} alt="Owner" />
        </div>
      ))}
      <div className="featured mt-0 pt-10">
        <div className="d-flex flex-column gap-3">
          {comments.map((newComment,value)=>(
            <div className="d-flex flex-row gap-2 align-items-end" key={value}>
              {/* {authorInfo.map((authorkey,authorvalue)=>(
                <img className="avatarOwnerImg" src={authorkey ? convertToImage(authorkey[0].profile) : avatarHost} alt="Owner" key={authorvalue}/>
              ))} */}
              <AuthorInfoImg which={value} next={authorInfo}/>
              <div className="chatOthers">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column gap-1">
                      {/* {authorInfo.map((authorInfokey,authorInfovalue)=>(
                        <h3 className="my-0" key={authorInfovalue}>{authorInfokey[0] ? authorInfokey[0].name : ''}</h3>
                      ))} */}
                      <AuthorInfoName which={value} next={authorInfo}/>
                      <p className="my-0">{newComment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="d-flex flex-row gap-2 align-items-end justify-content-end w-100">
            <div className="chatReply">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column gap-1">
                    <h3 className="my-0">Jenny Wilson</h3>
                    <p className="my-0">I want to share with you a photo of my plant that I took today. I hope you will like it.</p>
                  </div>
                </div>
              </div>
            </div>
            <img className="avatarOwnerImg" src={avatarHost} alt="Owner" />
          </div> */}

        </div>
      </div>
      <footer className="footer">
        <FormControl variant="outlined">
          <FilledInput
            {...register("msg", { required: true })}
            id="outlined-adornment-password"
            type="text"
            endAdornment={
              <InputAdornment 
                position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleSubmit(submitComment)}
                >
                  <Send theme="filled" size="20" fill="#C4C4C4"/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <CircularProgress hidden={loaderHidden} />
        <Alert onClose={() => {setAlertHidden(true);}} severity="success" hidden={alertHidden} color="info">{showAlert}</Alert>
      </footer>
    </div>
  );
}

export default FanClub;
