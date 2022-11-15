import React, { useEffect, useState } from "react";
import icpLogo from "../../assets/icp.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/NFTSale";
import { idlFactory as tokenIdlFactory } from "../../../declarations/connecttoken";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import PriceLabel from "./PriceLabel";
import DateLabel from "./DateLabel";
import ListedLabel from "./ListedLabel";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import { BrowserRouter, Link, Switch, Route, useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
// import { NFTSale } from "../../../declarations/NFTSale"; 
// import { connecttoken } from "../../../declarations/connecttoken";
import { useWallet,useCanister } from "@connect2ic/react"
import { array } from "yargs";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function OwnItem(props) {
  // console.log('actor',Actor);
  const [wallet] = useWallet();
  const [NFTSale] = useCanister("NFTSale");
  const [connecttoken] = useCanister("connecttoken");
  console.log('main props ownItem',props.detail.owner.toText());
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [gift, setGift] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [dateLabel, setDateLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  let history = useHistory();

  const id = props.id;

  // const localHost = "http://localhost:8080/";
  // const agent = new HttpAgent({ host: localHost,username:'test',password:'new' });

  // //TODO: When deploy live, remove the following line.
  // agent.fetchRootKey();
  let NFTActor;

  async function loadNFT() {
    console.log('inside',props);
    console.log('agentnft',id);
   
    // NFTActor = await Actor.createActor(idlFactory, {
    //   agent,
    //   canisterId: 'qhbym-qaaaa-aaaaa-aaafq-cai',
    // });


    // NFTActor =await window.ic.plug.createActor({
    //     canisterId: 'qhbym-qaaaa-aaaaa-aaafq-cai',
    //     interfaceFactory: idlFactory,
    //   });
    //   console.log('ic',NFTActor);
    // const newowner=await NFTActor.testcaller();
    // console.log('owner',newowner.toText());
    // const name = await NFTActor.getName();
    // console.log('test',name);
    // const owner = await NFTActor.getOwner();
    console.log('agentnftnew',NFTActor);
    const imageData = props.name.location.InCanister;
    
    const imageContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );
    console.log(props.id);
    const nftIsListed=await NFTSale.getIsListed(props.id);
    // console.log('true first',listed);
  const newid=parseInt(props.id.toString().replace("n"));
    // const listnft=await NFTSale.listNFT(newid,0);
    // console.log(listnft);
    setCategory(props.name.attributes[0].key);
    setName(props.name.attributes[0].value);
    setDescription(props.name.attributes[0].description);
    
    setImage(image);

    if (props.role == "collection") {
      // const nftIsListed = await connectNFT.isListed(props.id);
      // const nftIsListed=true;
      if (nftIsListed) {
        // setOwner("TheMini");
        setBlur({ filter: "blur(4px)" });
        setSellStatus(<ListedLabel />);
        setButton( <div className="cancel w-100"><Button handleClick={handleCancelSell} text={"Cancel List"} /></div>);
        setGift();
        setOwner("Listed");
      } else {
        setOwner(props.detail.owner.toText());
        // setButton(<Button handleClick={handleSell} text={"Sell"} />);
        setButton( <div className="confirm w-100"><Button handleClick={handleSell} text={"List"} /></div>);
        setGift( <div className="gift w-100"><Button handleClick={handleGift} text={"Gift"} /></div>);

      }
    } else if (props.role == "discover") {
      const originalOwner = await connectNFT.getOriginalOwner(props.id);
      if (originalOwner.toText() != principal.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }

      const price = await connectNFT.getListedNFTPrice(props.id);
      setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
      setDateLabel(<DateLabel />);
    }
  }

  useEffect(() => {
    loadNFT();
  }, []);

  let price;
  let principalid;
  async function handleSell() {
    const symbol1=await connecttoken.symbol();
    console.log(symbol1);
    const placenumber="Price in "+symbol1;
    setPriceInput(
      <TextField
        variant="standard"
        placeholder={placenumber}
        type="number"
        className="price-input mt-3 w-100"
        value={price}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            {/* <img src={icpLogo}/> */}
            </InputAdornment>,
        }}
        onChange={(e) => (price = e.target.value)}
      />
      
    );
    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
    setGift(<div className="cancel w-100"><Button handleClick={handleCancel} text={"Cancel"} /></div>);
  }
  async function handleCancelSell() {
    // const symbol1=await connecttoken.getSymbol();
    // console.log(symbol1);
    // const placenumber="Price in "+symbol1;
    // setPriceInput(
    //   <TextField
    //     variant="standard"
    //     placeholder={placenumber}
    //     type="number"
    //     className="price-input mt-3 w-100"
    //     value={price}
    //     InputProps={{
    //       endAdornment: <InputAdornment position="end">
    //         {/* <img src={icpLogo}/> */}
    //         </InputAdornment>,
    //     }}
    //     onChange={(e) => (price = e.target.value)}
    //   />
      
    // );
    setButton( <div className="confirm w-100"><Button handleClick={cancelsell} text={"Confirm Cancel List"} /></div>);
  }
  async function handleCancel(){
    setLoaderHidden(true);
    const nftIsListed=await NFTSale.getIsListed(props.id);
    if (nftIsListed) {
      setBlur({ filter: "blur(4px)" });
      setSellStatus(<ListedLabel />);
      setButton( <div className="cancel w-100"><Button handleClick={handleCancelSell} text={"Cancel List"} /></div>);
    } else {
      setButton( <div className="confirm w-100"><Button handleClick={handleSell} text={"List"} /></div>);
      setGift( <div className="gift w-100"><Button handleClick={handleGift} text={"Gift"} /></div>);
    }
    setPriceInput();
  }
  async function handleGift() {
   
    setPriceInput(
      <TextField
        variant="standard"
        placeholder="Principal Id"
        type="text"
        className="price-input mt-3 w-100"
        value={principalid}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            {/* <img src={icpLogo}/> */}
            </InputAdornment>,
        }}
        onChange={(e) => (principalid = e.target.value)}
      />
      
    );
    setButton( <div className="confirm w-100"><Button handleClick={giftItem} text={"Confirm Gift"} /></div>);
    setGift(<div className="cancel w-100"><Button handleClick={handleCancel} text={"Cancel"} /></div>);

  }


  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);  
    const listinglistResult = await NFTSale.listNFT(Number(props.id), Number(price));
    if(Object.values(listinglistResult)[0]==true)
    {
   
        setLoaderHidden(true);
        setButton( <div className="cancel w-100"><Button handleClick={handleCancelSell} text={"Cancel List"} /></div>);
        setGift();
        setOwner("Listed");
        setPriceInput();
        setSellStatus(<ListedLabel />);
  
    }
  }
  async function giftItem() {

    setLoaderHidden(false);
    console.log("set principalid = " + principalid);
    console.log("set props.id = " + props.id);
    console.log("set props.owner = " + props.detail.owner);
    const approval = await NFTSale.isApprovedForAll(Principal.fromText(wallet.principal),Principal.fromText(principalid));
    console.log(approval);
    if(approval){
      const GiftResult = await NFTSale.transferFrom(props.detail.owner,Principal.fromText(principalid),props.id);
      console.log(GiftResult);
      
    }else{
      const approveToken = await NFTSale.approve(props.id,Principal.fromText(principalid));
      if(approveToken){
        console.log(approveToken,'approve')
        const GiftResult = await NFTSale.transferFrom(props.detail.owner,Principal.fromText(principalid),props.id);
        console.log(GiftResult,'test');
        if(GiftResult){
          window.location.reload(false);
        }
      }
    }
   
  //  if(GiftResult){
  //   await loadNFT();
  //  }
    
  }
  async function cancelsell() {

    setLoaderHidden(false);
    const listingResult = await NFTSale.delistNFT(Number(props.id));
   if(Object.values(listingResult)[0]==true)
   {
    setLoaderHidden(true);
    setButton( <div className="confirm w-100"><Button handleClick={handleSell} text={"List"} /></div>);
    setGift( <div className="gift w-100"><Button handleClick={handleGift} text={"Gift"} /></div>);
   }
   
    // const caller = await NFTSale.testcaller();
    // console.log('calling',caller.toText());
    // if (listingResult == "true") {
    // //   const openDId = await connectNFT.getOpenDCanisterID();
    // //   const transferResult = await NFTActor.transferOwnership(openDId);
    // //   console.log("transfer: " + transferResult);
    // //   if (transferResult == "Success") {
    //     setLoaderHidden(true);
    //     setButton();
    //     setPriceInput();
    //     setOwner("CONNECT");
    //     setSellStatus("Listed");
    // //   }
    // }
    // setTimeout(()=>{
    //   history.push('/discover');
    // },2500)
  }
  


  async function handleBuy() {
    console.log("OLD Buy was triggered");
    setLoaderHidden(false);
  }

  return (
    <div> 
      <Card className="position-relative" variant="outlined" sx={{ border: "1px solid #e5e5e5", borderRadius: "10px" }}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt={image}
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
            <div className="d-flex flex-row gap-1">
              <Typography className="card-h4" variant="h5" component="div">
                {/* Minted Date: */}
              </Typography>
              <Typography className="card-h4" variant="h5" component="div">
                {/* 17 July 2022 */}
              </Typography>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between w-100">
              <div className="d-flex flex-row gap-2 align-items-center">
                <Chip className="chip-category" label={category} />
                <div className="d-flex flex-row gap-1">
                  <Typography className="card-h6" variant="h5" component="div">
                    {/* Total: */}
                  </Typography>
                  <Typography className="card-h6" variant="h5" component="div">
                    {/* 20,000 Mint */}
                  </Typography>
                </div>
              </div>
              {priceLabel}
            </div>
            <Typography className="card-p" variant="p" component="div">
              {owner}
            </Typography>
          </div>
          {priceInput}
        </CardContent>
        <CardActions disableSpacing className="card-actions">
          <div className="d-flex flex-row gap-3 w-75">
            {/* <div className="confirm w-100"> */}
              {button}
            {/* </div> */}
            {/* <div className="cancel w-100">
              <Button variant="outlined" text={"Cancel Selling"} />
            </div> */}
            {/* <div className="gift w-100"> */}
              {/* <Button variant="outlined" text={"Gift"} /> */}
              {gift}
            {/* </div> */}
          </div>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="cardbody">
            <Typography className="card-desc" variant="p" component="div">
              {description}
            </Typography>
          </CardContent>
        </Collapse>
    </Card>
      {/* <Card className="position-relative" variant="outlined" sx={{ maxWidth: 162, border: "1px solid #e5e5e5", borderRadius: "10px" }} onClick={handleClickOpen}>
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
              <Chip className="chip-category" label="Art" />
              {priceLabel}
            </div>
            <Typography className="card-p" variant="p" component="div">
              {owner}
            </Typography>
          </div>
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos nostrum quisquam saepe dolorum suscipit doloremque, eius repudiandae illum maxime eveniet rerum et maiores sint totam nesciunt reprehenderit incidunt, dicta exercitationem?
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
      </BootstrapDialog> */}
    </div>
  );
}

export default OwnItem;
