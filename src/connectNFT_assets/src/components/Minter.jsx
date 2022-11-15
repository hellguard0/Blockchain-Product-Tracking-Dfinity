import React, { useEffect, useState, withRouter } from "react";
import { useForm } from "react-hook-form";
// import { NFTSale1 } from "../../../declarations/NFTSale"; 
import { Principal } from "@dfinity/principal";
import Item from "./Item";
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// import { Connect2ICProvider } from "@connect2ic/react"
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect,useWallet,useCanister } from "@connect2ic/react"
// import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"

function Minter() {
  const [wallet] = useWallet();
  const [NFTSale] = useCanister("NFTSale");
  const { register, handleSubmit } = useForm();
  const [nftPrincipal, setNFTPrincipal] = useState("");
  // const [nftPrincipal, setNFTPrincipal] = useState("");
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [alertHidden, setAlertHidden] = useState(true);
  const [walletPrincipal, setWalletPrincipal] = useState("");
  const { isConnected, principal } = useConnect();
  useEffect(()=>{
    if(isConnected){
      setWalletPrincipal(wallet.principal);
    }
  },[isConnected])
  let history = useHistory();
  async function onSubmit(data) {
    setLoaderHidden(false);
    setAlertHidden(false);
    const name = data.name;
    const description = data.description;
    const image = data.image[0];
    const imageArray = await image.arrayBuffer();

    const imageByteData = [...new Uint8Array(imageArray)];
    // const bb = new Blob(imageByteData);
    // console.log(bb);
   
    const Location={
      'InCanister':imageByteData
    };
    const Attribute={
      key:data.category,
      description:description,
      value:name
    };
    const Location1={
      'Web':'test'
    };
   

    // const tokenMetadata= [
    //  'text',  obj,   bb
    // ]
    const tokenMetadata= {
      filetype:'text', attributes: [Attribute], location: Location
    }
      // console.log(Principal.fromText(walletPrincipal));
    const newdatatest='opt record {filetype:text; attributes:vec record {key:text; value:text}; location:variant {Web:text; AssetCanister:record {principal; vec nat8}; IPFS:text; InCanister:vec nat8}}';
console.log('minting principal',principal);
    const newNFTID = await NFTSale.mint(Principal.fromText(principal),[tokenMetadata]);
  
    setNFTPrincipal(newNFTID);
    console.log('new princitpal',newNFTID);
    setLoaderHidden(true);
    setAlertHidden(true);
    
    setTimeout(()=>{
      history.push('/collection');
    },2500)
  }

  if (nftPrincipal == "") {
    return (
      <div className="body-content">
        <div className="featured mt-1">
          <form className="d-flex flex-column gap-5">
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-3">
                <h4 className="label-collection">Add Product</h4>
                <input
                  {...register("image", { required: true })}
                  className="upload"
                  type="file"
                  accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
                />
              </div>
              <div className="d-flex flex-column gap-3">
                <h4 className="label-collection">Product Series Name</h4>
                <input
                  {...register("name", { required: true })}
                  placeholder="Series Name"
                  type="text"
                  className="form-InputBase-input form-OutlinedInput-input"
                />
              </div>
              <div className="d-flex flex-column gap-3">
                <h4 className="label-collection">Category</h4>
                <select
                  {...register("category", { required: true })}
                  placeholder="Cateogry"
                  type="text"
                  className="form-InputBase-input form-OutlinedInput-input"
                >
                  <option value="Art">Art</option>
                  <option value="Ticket">Ticket</option>
                  <option value="License">License</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="d-flex flex-column gap-3">
                <h4 className="label-collection">Description</h4>
                <textarea
                  {...register("description", { required: true })}
                  rows={5}
                  placeholder="Description"
                  className="form-InputBase-textarea form-OutlinedInput-input"
                />
              </div>
              {/* <div className="d-flex flex-column gap-3">
                <h4 className="label-collection">Amount</h4>
                <input
                  placeholder="Amount"
                  type="number"
                  min={1}
                  max={500}
                  className="form-InputBase-input form-OutlinedInput-input"
                />
              </div> */}
            </div>
            <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
            <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">
              Create NFT
              </span>
            </div>
          </form>
          {/* <div hidden={loaderHidden} className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
          <CircularProgress hidden={loaderHidden} />
          <Alert hidden={alertHidden} onClose={() => {}} severity="warning">Processing ICP On-Chain Transaction. Please do not refresh</Alert>
        </div>
        {/* <div className=" bg-dark">
          <div hidden={loaderHidden} className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
            Create NFT
          </h3>
          <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
            Upload Image
          </h6>
          <form className="makeStyles-form-109" noValidate="" autoComplete="off">
            <div className="upload-container">
              <input
                {...register("image", { required: true })}
                className="upload"
                type="file"
                accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
              />
            </div>
            <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
              Collection Name
            </h6>
            <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
              <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
                <input
                  {...register("name", { required: true })}
                  placeholder="e.g. CryptoDunks"
                  type="text"
                  className="form-InputBase-input form-OutlinedInput-input"
                />
                <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
              </div>
            </div>
            <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
              <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">
                Mint NFT
              </span>
            </div>
          </form>
        </div> */}
      </div>
    );
  } else {
    return (
      <div className="body-content">
        <div className="featured mt-1">
          <div className="d-flex flex-column gap-3">
            <h3 className="my-0 text-start">Product Mint</h3>
            <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
              <Item id={walletPrincipal} role="collection" />
            </div>
          </div>
        </div>
        <Alert onClose={() => {}} severity="success" color="info">Your Product NFT had minted. Redirecting to collections page</Alert>
      </div>
      // <div className="minter-container">
      //   <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
      //     Product Mint
      //   </h3>
      //   <div className="horizontal-center">
      //     <Item id={nftPrincipal.toText()} />
      //   </div>
      // </div>
    );
  }
}

export default Minter;
