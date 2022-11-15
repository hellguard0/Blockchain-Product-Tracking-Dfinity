import React, { useEffect, useState } from "react";
import OwnItem from "./OwnItem";
import { Principal } from "@dfinity/principal";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import concertImage from "../../assets/concert.png";
import { BiSearch } from "react-icons/bi";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect,useWallet,useCanister } from "@connect2ic/react"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function OwnGallery(props) {
  const [wallet] = useWallet();
  const [NFTSale] = useCanister("NFTSale");
  const [items, setItems] = useState();
  const [expired, setExpired] = useState();
  const [active, setActive] = useState();
  const [value, setValue] = React.useState(0);
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    }
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function fetchNFTs() {
    console.log('original',props.ids);
    if (props.ids != undefined) {
      console.log(props.ids);
      console.log(props.sale);
      console.log('owner',props.ids[0].owner);
      let index = props.ids.length - 1;
      while (index >= 0) {
        if (props.ids[index].owner.toText() != principal) {
          props.ids.splice(index, 1);
        }
      
        index -= 1;
      }

      setItems(
        props.ids.map((NFTId) => (
        
          <OwnItem id={NFTId.index} key={NFTId.index} name={NFTId.metadata[0]} role={props.role} detail={NFTId}/>
        ))
      );
   
    }
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="body-content">
      <div className="featured mt-1">
        <div className="d-flex flex-column gap-3">
          <h3 className="my-0 text-start">NFT List</h3>
          {/* <FormControl variant="standard" className="search-form">
            <Input
              className="search-input"
              id="input-with-icon-adornment"
              placeholder="Search Related"
              endAdornment={
                <InputAdornment position="end">
                  <BiSearch className="search-icons" />
                </InputAdornment>
              }
            />
          </FormControl> */}
          <div className="d-flex flex-column gap-4">
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                className="btn-category"
              >
                <Tab label="My Active NFT" />
                {/* <Tab label="Expired NFT" /> */}
                {/* <Tab label="NFT Create" /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="d-flex flex-column gap-3">
                {items}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="d-flex flex-column gap-3">
                {expired}
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="d-flex flex-column gap-3">
                {active}
              </div>
            </TabPanel>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default OwnGallery;
