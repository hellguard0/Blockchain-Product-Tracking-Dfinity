import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import icpLogo from "../../assets/icp.png";
import { Principal } from "@dfinity/principal";

import Button from "./Button";
import PriceLabel from "./PriceLabel";
import DateLabel from "./DateLabel";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { BiPalette } from "react-icons/bi";
import InputAdornment from '@mui/material/InputAdornment';
import { BrowserRouter, Link, Switch, Route, useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Principal } from "@dfinity/principal";
import { useConnect,useWallet,useCanister } from "@connect2ic/react"
import { NFTSale } from "../../../declarations/NFTSale";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Item(props) {
  const [wallet] = useWallet();
  // const {NFTSale} = useCanister("NFTSale");
  console.log(props)
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [dateLabel, setDateLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [walletPrincipal, setWalletPrincipal] = useState("");
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  let history = useHistory();
  console.log(history);
  const id = props.id;
  console.log(id);

  // const localHost = "http://localhost:8080/";
  // const agent = new HttpAgent({ host: localHost });

  // //TODO: When deploy live, remove the following line.
  // agent.fetchRootKey();
  let NFTActor;
  async function loadNFT() {
   
    console.log('minted datacollection',props.role);
    if (props.role == "collection") {
    const lastid=await NFTSale.getUserTokens(Principal.fromText(id));
    console.log('minted data',lastid);
    const data=lastid[lastid.length-1];
    const nameq = lastid[lastid.length-1].metadata[0].attributes[0].value;
    const category = lastid[lastid.length-1].metadata[0].attributes[0].key;
    const imageData = lastid[lastid.length-1].metadata[0].location.InCanister;    ;
    
    const imageContent = new Uint8Array(imageData);new Uint8Array(imageData)
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );

    setName(nameq);
  

    setCategory(category);
    // setOwner(owner.toText());
    setImage(image);
    // const newid=parseInt(props.id.toString().replace("n"));
    //   console.log(newid);
    // const nftIsListed=await NFTSale.getIsListed(props.id);
    // console.log('listednft',nftIsListed);
    //   if (nftIsListed) {
    //     setOwner("Connect");
    //     setBlur({ filter: "blur(4px)" });
    //     setSellStatus("Listed");
    //     setButton(<Button handleClick={handleCancelSell} text={"Cancel Sell"} />);

    //   } else {
    //     setButton(<Button handleClick={handleSell} text={"Sell"} />);
    //   }
    } else if (props.role == "discover") {
      console.log('discover id',props);
      console.log(id);
      if(props.tokenid!=undefined){
        console.log(props.id.tokenId,props.tokenid)
        const tokeninfo=await NFTSale.getTokenInfo(props.tokenid);
        const detailmeta=tokeninfo.metadata[0];
        console.log('details',detailmeta);
        const nameq = detailmeta.attributes[0].value;
        const category = detailmeta.attributes[0].key;
        const imageData = detailmeta.location.InCanister;    
        setDescription(detailmeta.attributes[0].description);
        const imageContent = new Uint8Array(imageData);new Uint8Array(imageData)
        const image = URL.createObjectURL(
          new Blob([imageContent.buffer], { type: "image/png" })
        );
        console.log(nameq);
    
      // console.log('listednft',nftIsListed);
      
        setName(nameq);
        setCategory(category);
        // setOwner(owner.toText());
              setPriceLabel(<PriceLabel sellPrice={id.price.toString()} />);

        setImage(image);
        console.log('button display')
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }
    }
  }

  useEffect(() => {
    loadNFT();
  }, []);

  let price;
  function handleSell() {
    console.log("Sell clicked");
    setPriceInput(
      <TextField
        variant="standard"
        placeholder="Price in ICP"
        type="number"
        className="price-input mt-3 w-100"
        value={price}
        InputProps={{
          endAdornment: <InputAdornment position="end"><img src={icpLogo}/></InputAdornment>,
        }}
        onChange={(e) => (price = e.target.value)}
      />
      
    );
    setButton(<Button handleClick={sellItem} text={"Confirm List"} />);
  }

  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    console.log("set price = " + price);
    if (listingResult == "Success") {
      // const openDId = await connectNFT.getOpenDCanisterID();
      // const transferResult = await NFTActor.transferOwnership(openDId);
      // console.log("transfer: " + transferResult);
      // if (transferResult == "Success") {
      //   setLoaderHidden(true);
      //   setButton();
      //   setPriceInput();
      //   setOwner("TheMini");
      //   setSellStatus("Listed");
      // }
    }
    setTimeout(()=>{
      history.push('/discover');
    },2500)
  }

  async function handleBuy() {
    console.log("Buy was triggered",props.id);
    setLoaderHidden(false);
    // const number =1.toNat();
    const buyResult = await NFTSale.buy(Number("1"),Number(props.id.tokenId));
    if(buyResult.ok!=undefined){
      history.push('/collection'); 
    }
    // const tokenActor = await Actor.createActor(tokenIdlFactory, {
    //   agent,
    //   canisterId: Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai"),
    // });

    // const sellerId = await connectNFT.getOriginalOwner(props.id);
    // const itemPrice = await connectNFT.getListedNFTPrice(props.id);

    // const result = await tokenActor.transfer(sellerId, itemPrice);
    // console.log(result)
    // if (result == "Success") {
    //   const transferResult = await connectNFT.completePurchase(
    //     props.id,
    //     sellerId,
    //   );
    //   console.log("purchase: " + transferResult);
    //   setLoaderHidden(true);
    //   setDisplay(false);
    //   setTimeout(()=>{
    //     history.push('/collection');
    //   },500)
    // }else{
      
    // }
  }

  return (
    // <div
    //   style={{ display: shouldDisplay ? "inline" : "none" }}
    //   className="disGrid-item"
    // >
    <div>
      <Card className="position-relative" variant="outlined" sx={{ maxWidth: 162, border: "1px solid #e5e5e5", borderRadius: "10px" }} onClick={handleClickOpen}>
        <CardMedia
          component="img"
          height="120"
          image={image}
          alt={image}
          style={blur}
        />
        <div className="price">
          {dateLabel}
          {sellStatus}
        </div>
        <CardContent className="cardbody">
          <div className="d-flex flex-column gap-1">
            <Typography className="card-h5" variant="h5" component="div">
              {name}
            </Typography>
            <div className="d-flex flex-row align-items-center justify-content-between w-100">
              <Chip className="chip-category" label={category} />
              {priceLabel}
            </div>
            <Typography className="card-p" variant="p" component="div">
              {owner}
            </Typography>
          </div>
          {priceInput}
          {button}
        </CardContent>
      </Card>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Card className="position-relative" variant="outlined" sx={{ border: "1px solid #e5e5e5", borderRadius: "10px" }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={image}
              style={blur}
            />
            <div className="price">
              {dateLabel}
              {sellStatus}
            </div>
            <CardContent className="cardbody">
              <div className="d-flex flex-column gap-1">
                <Typography className="card-h5" variant="h5" component="div">
                  {name}
                </Typography>
                <div className="d-flex flex-row align-items-center justify-content-between w-100">
                  <Chip className="chip-category" label="Art" />
                  {priceLabel}
                </div>
                <Typography className="card-desc" variant="p" component="div">
                  {description}
                </Typography>
                <Typography className="card-p" variant="p" component="div">
                  {owner}
                </Typography>
              </div>
              {priceInput}
            </CardContent>
          </Card>
          {button}
        </DialogContent>
      </BootstrapDialog>
    </div>
    
    //  <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
    //     <img
    //       className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
    //       src={image}
    //       style={blur}
    //     />
    //     <div className="lds-ellipsis" hidden={loaderHidden}>
    //       <div></div>
    //       <div></div>
    //       <div></div>
    //       <div></div>
    //     </div>
    //     <div className="disCardContent-root">
    //       {priceLabel}
    //       <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
    //         {name}
    //         <span className="purple-text"> {sellStatus}</span>
    //       </h2>
    //       <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
    //         Owner: {owner}
    //       </p>
    //       {priceInput}
    //       {button}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Item;
