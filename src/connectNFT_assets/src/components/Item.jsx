import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import icpLogo from "../../assets/icp.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { connectNFT } from "../../../declarations/connectNFT";
import Button from "./Button";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";
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

function Item(props) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);
  let history = useHistory();
  console.log(history);
  const id = props.id;

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });

  //TODO: When deploy live, remove the following line.
  agent.fetchRootKey();
  let NFTActor;

  async function loadNFT() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );

    setName(name);
    setOwner(owner.toText());
    setImage(image);

    if (props.role == "collection") {
      const nftIsListed = await connectNFT.isListed(props.id);

      if (nftIsListed) {
        setOwner("TheMini");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");
      } else {
        setButton(<Button handleClick={handleSell} text={"Sell"} />);
      }
    } else if (props.role == "discover") {
      const originalOwner = await connectNFT.getOriginalOwner(props.id);
      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }

      const price = await connectNFT.getListedNFTPrice(props.id);
      setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
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
        className="price-input"
        value={price}
        InputProps={{
          startAdornment: <InputAdornment position="start"><img src={icpLogo}/></InputAdornment>,
        }}
        onChange={(e) => (price = e.target.value)}
      />
    );
    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  }

  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    console.log("set price = " + price);
    const listingResult = await connectNFT.listItem(props.id, Number(price));
    console.log("listing: " + listingResult);
    if (listingResult == "Success") {
      const openDId = await connectNFT.getOpenDCanisterID();
      const transferResult = await NFTActor.transferOwnership(openDId);
      console.log("transfer: " + transferResult);
      if (transferResult == "Success") {
        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("TheMini");
        setSellStatus("Listed");
      }
    }
    setTimeout(()=>{
      history.push('/discover');
    },2500)
  }

  async function handleBuy() {
    console.log("Buy was triggered");
    setLoaderHidden(false);
    const tokenActor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai"),
    });

    const sellerId = await connectNFT.getOriginalOwner(props.id);
    const itemPrice = await connectNFT.getListedNFTPrice(props.id);

    const result = await tokenActor.transfer(sellerId, itemPrice);
    console.log(result)
    if (result == "Success") {
      const transferResult = await connectNFT.completePurchase(
        props.id,
        sellerId,
        CURRENT_USER_ID
      );
      console.log("purchase: " + transferResult);
      setLoaderHidden(true);
      setDisplay(false);
      setTimeout(()=>{
        history.push('/collection');
      },500)
    }else{
      
    }
  }

  return (
    // <div
    //   style={{ display: shouldDisplay ? "inline" : "none" }}
    //   className="disGrid-item"
    // >
      <Card className="position-relative" variant="outlined" sx={{ maxWidth: 162, border: "1px solid #e5e5e5", borderRadius: "10px" }}>
      <CardMedia
          component="img"
          height="120"
          image={image}
          alt={image}
          style={blur}
        />
        <div className="price">
          {priceLabel}
          {sellStatus}
        </div>
        <CardContent className="cardbody">
          <div className="d-flex flex-column gap-1">
            <Typography className="card-h5" variant="h5" component="div">
              {name}
            </Typography>
            <div className="d-flex flex-row align-items-center">
              <Chip className="chip-category" label="Art" />
            </div>
            <Typography className="card-p" variant="p" component="div">
              {owner}
            </Typography>
          </div>
          {priceInput}
          {button}
        </CardContent>
      </Card>
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
