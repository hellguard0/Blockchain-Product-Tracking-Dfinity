import React, { useEffect, useState,useRef } from "react";
import logo from "../../assets/logo.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import OwnGallery from "./OwnGallery";
import Feature from "./Feature";
import Trending from "./Trending";
import FanClub from "./FanClub";
import Chat from "./Chat";
import MyProfile from "./MyProfile";
import FanClubDescription from "./FanClubDescription";
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Home, ListView, Wallet, User, EveryUser } from '@icon-park/react';
import { defaultProviders } from "@connect2ic/core/providers"
import { createClient } from "@connect2ic/core"
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"
import { InfinityWallet } from "@connect2ic/core/providers/infinity-wallet"
import { NFID } from "@connect2ic/core/providers/nfid"
import { Connect2ICProvider } from "@connect2ic/react"
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect,useWallet ,useCanister } from "@connect2ic/react"
import "@connect2ic/core/style.css"
import { array, showCompletionScript } from "yargs";
// import { NFTSale } from "../../../declarations/NFTSale"; 
import { Principal } from "@dfinity/principal";
import * as NFTSale from "../../../../.dfx/ic/canisters/NFTSale";
import * as fanclub from "../../../../.dfx/ic/canisters/fanclub";
import * as connecttoken from "../../../../.dfx/ic/canisters/connecttoken";
import MyProfile from "./MyProfile";
// import { canisterId, createActor } from "../../../declarations/NFTSale";
// import { NFTSale } from "../../../declarations/NFTSale"; 

const drawerWidth = 240;

function Header(props) {
  const [wallet] = useWallet();
  const [NFTSale] = useCanister("NFTSale");
  const [userOwnedGallery, setOwnedGallery] = useState();
  const [listingGallery, setListingGallery] = useState();
  const [userFeature, setListingFeature] = useState();
  const [userTrending, setListingTrending] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isConnected, principal, activeProvider } = useConnect();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Button className="button-menu" variant="outlined" startIcon={<ChevronLeftIcon className="right-icons" />} onClick={handleDrawerToggle}>
          Menu
        </Button>
      </Toolbar>
      <List>
        <ListItem className="list-items">
          <ListItemButton to="/discover" className="button-items">
            <ListItemIcon className="icons-container"><Home theme="filled" className="icon" size="24" fill="#5265FF"/></ListItemIcon>
            <ListItemText className="icons-text">Home Page</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
          <ListItemButton to="/collection" className="button-items">
            <ListItemIcon className="icons-container"><ListView theme="filled" className="icon" size="24" fill="#5265FF"/></ListItemIcon>
            <ListItemText className="icons-text">NFT List</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
          <ListItemButton to="/minter" className="button-items">
            <ListItemIcon className="icons-container"><Wallet theme="filled" className="icon" size="24" fill="#5265FF"/></ListItemIcon>
            <ListItemText className="icons-text">Mint NFT</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
          <ListItemButton to="/fanclub" className="button-items">
            <ListItemIcon className="icons-container"><EveryUser theme="filled" size="24" fill="#5265FF"/></ListItemIcon>
            <ListItemText className="icons-text">Fan Club</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
          <ListItemButton to="/myprofile" className="button-items">
            <ListItemIcon className="icons-container"><User theme="filled" size="24" fill="#5265FF"/></ListItemIcon>
            <ListItemText className="icons-text">My Profile</ListItemText>
          </ListItemButton>
        </ListItem>
        {/* <ListItem className="list-items">
          <ListItemButton className="button-items">
            <ListItemIcon className="icons-container"><BiUserCircle className="icons" /></ListItemIcon>
            <ListItemText className="icons-text">My Profile</ListItemText>
          </ListItemButton>
        </ListItem> */}
      </List>
    </div >
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function getNFTs(principal) {
    const userNFTIds = await NFTSale.getUserTokens(Principal.fromText(principal));
    const listedNFTIds = await NFTSale.getListedNFTs();
    if(listedNFTIds!=''){

      setListingGallery(
        <Gallery title="Discover" ids={listedNFTIds} role="discover" />
      );
    }else{
      setListingGallery(
        <Gallery title="Discover" role="discover" />
      );
    }
    if(userNFTIds.length>0){
      setOwnedGallery(
        <OwnGallery title="My NFTs" ids={userNFTIds} role="collection"/>
      );
      
    }else{
      setOwnedGallery(
        <OwnGallery title="My NFTs"  role="collection"/>
      );
    }
    setListingFeature(
      <Feature title="Feature" ids={userNFTIds} role="Feature" />
    );
    setListingTrending(
      <Trending title="Trending" ids={userNFTIds} role="Trending" />
    );
    // setListingTrending(
    //   <Trending title="Trending" ids={userNFTIds} role="Trending" />
    // );
  }

  const wasConnectedRef = useRef(false);

  useEffect(() => {
    if (isConnected && !wasConnectedRef.current) {
      getNFTs(wallet.principal);
      wasConnectedRef.current = true;
    }
  }, [isConnected]);


  // useEffect(() => {
  //   getNFTs(principal);
  // }, []);

  return (
    <BrowserRouter forceRefresh={true}>
      <AppBar position="sticky" className="topbar">
        <Toolbar>
          <IconButton
            className="iconmenu"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="logo-name" variant="h6" component="div">
            <img src={logo} className="logoimg" />
          </Typography>
          <Stack spacing={1} className="margin-auto">
            <ConnectButton />
            <ConnectDialog />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <img className="header-logo-11" src={logo} />
            <Link to="/">
              <h5 className="Typography-root header-logo-text">ICP NFT</h5>
            </Link>
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/discover">Discover</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/minter">Minter</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/collection">My NFTs</Link>
            </button>
          </div>
        </header>
      </div>
      */}
      <Switch>
        <Route exact path="/">
          {listingGallery}
        </Route>
        <Route path="/discover">{listingGallery}</Route>
        <Route path="/minter">
          <Minter />
        </Route>
        <Route path="/collection">{userOwnedGallery}</Route>
        <Route path="/feature">{userFeature}</Route>
        <Route path="/trending">{userTrending}</Route>
        <Route path="/fanclub">
          <FanClub />
        </Route>
        <Route path="/fanclubdescription">
          <FanClubDescription />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/myprofile">
          <MyProfile />
        </Route>
      </Switch> 
    </BrowserRouter>
  );
}

const client = createClient({
  providers: [
    new PlugWallet(),
    new InfinityWallet(),
    new NFID(),
  ],
  // providers:defaultProviders,
  canisters: {
    NFTSale,
    connecttoken,
    fanclub
  },
  // globalProviderConfig: {
  //   dev: import.meta.env,
  // },
})

export default () => (
  <Connect2ICProvider client={client}>
    <Header />
  </Connect2ICProvider>
)