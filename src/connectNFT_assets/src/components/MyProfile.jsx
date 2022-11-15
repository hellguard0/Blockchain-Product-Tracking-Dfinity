import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import avatarHost from "../../assets/avataruser.png";
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Send } from '@icon-park/react';

import { Principal } from "@dfinity/principal";
// import { fanclub } from "../../../declarations/fanclub";
import { Connect2ICProvider, useConnect,useWallet,useCanister } from "@connect2ic/react";

function convertToImage(e){
  const imageData = e;
  const imageContent = new Uint8Array(imageData);
  const image = URL.createObjectURL(
    new Blob([imageContent.buffer], { type: "image/png" })
  );
  return image;
}

function MyProfile() {
  const [walletPrincipal,setWalletPrincipal] = useState('');
  const [wallet] = useWallet();
  const [fanclub] = useCanister("fanclub");
  const profileArray = new Array();
  const [userProfile,setUserProfile] = useState(profileArray);
  const { isConnected,principal } = useConnect();
  const wasConnectedRef = useRef(false);
  async function getClubOwnerName(id){
    const findConnectOwnedById = await fanclub.findConnectOwnedById(id);
    return findConnectOwnedById;
  }
  useEffect(() => {
    if (isConnected && !wasConnectedRef.current) {
      console.log(wallet.principal)
      setWalletPrincipal(wallet.principal);
      getProfile(Principal.fromText(wallet.principal));
      wasConnectedRef.current = true;
    }
  }, [isConnected]);

  async function getProfile(wallet){
    let arr1 = [];
    let profile = await getClubOwnerName(wallet);
    if(profile){
      arr1.push(profile[0]);
      console.log(profile);
    }
  }
  return (
    <div className="body-content">
      <div className="featured mt-1">
        <div className="d-flex flex-column gap-3">
          <h3 className="my-0 text-start">My Profile</h3>
          <div className="d-flex flex-column gap-3 border-bottom pb-4">
            <img src={avatarHost} className="profileimg d-block mx-auto" alt="Owner" />
          </div>
          <div className="d-flex flex-column gap-3 profileinfo pt-3">
            <div className="d-flex flex-column gap-2">
              <h3 className="my-0">Principal ID</h3>
              <div className="card">
                <div className="card-body">
                  <h5 className="my-0">{principal}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
