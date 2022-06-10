import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import OwnGallery from "./OwnGallery";
import { connectNFT } from "../../../declarations/connectNFT";
import CURRENT_USER_ID from "../index";
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
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BiHomeSmile, BiFile, BiWallet, BiCalendar, BiUserCircle, BiBell, BiReceipt } from "react-icons/bi";

const drawerWidth = 240;

function Header(props) {
  const [userOwnedGallery, setOwnedGallery] = useState();
  const [listingGallery, setListingGallery] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
            <ListItemIcon className="icons-container"><BiHomeSmile className="icons" /></ListItemIcon>
            <ListItemText className="icons-text">Home Page</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
          <ListItemButton to="/collection" className="button-items">
            <ListItemIcon className="icons-container"><BiFile className="icons" /></ListItemIcon>
            <ListItemText className="icons-text">NFT List</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
          <ListItemButton to="/minter" className="button-items">
            <ListItemIcon className="icons-container"><BiWallet className="icons" /></ListItemIcon>
            <ListItemText className="icons-text">My Wallet</ListItemText>
          </ListItemButton>
        </ListItem>
        {/* <ListItem className="list-items">
          <ListItemButton className="button-items">
            <ListItemIcon className="icons-container"><BiCalendar className="icons" /></ListItemIcon>
            <ListItemText className="icons-text">My Event Calendar</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="list-items">
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

  async function getNFTs() {
    const userNFTIds = await connectNFT.getOwnedNFTs(CURRENT_USER_ID);
    console.log(userNFTIds);
    setOwnedGallery(
      <OwnGallery title="My NFTs" ids={userNFTIds} role="collection" />
    );

    const listedNFTIds = await connectNFT.getListedNFTs();
    console.log(listedNFTIds);
    setListingGallery(
      <Gallery title="Discover" ids={listedNFTIds} role="discover" />
    );
  }

  useEffect(() => {
    getNFTs();
  }, []);

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
          <Stack spacing={1} direction="row" className="margin-auto">
            <IconButton className="badgebutton">
              <Badge badgeContent={4} className="badgetop">
                <BiBell className="badgeicons" />
              </Badge>
            </IconButton>
            <IconButton className="badgetop">
              <BiReceipt className="badgeicons" />
            </IconButton>
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
      </Switch> 
    </BrowserRouter>
  );
}

export default Header;
