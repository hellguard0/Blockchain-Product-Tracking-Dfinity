import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Switch, Route, Link,useHistory } from "react-router-dom";
import Item from "./Item";
import { Principal } from "@dfinity/principal";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import concertImage from "../../assets/concert.png";
import { BiSearch } from "react-icons/bi";
import Card from 'react-bootstrap/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

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

function Gallery(props) {
  const [items, setItems] = useState();
  const [value, setValue] = React.useState(0);
  let history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function fetchNFTs() {

    if (props.ids != undefined) {
          let index = props.ids.length - 1;
            while (index >= 0) {
              if (props.ids[index][1].isListed == false) {
                props.ids.splice(index, 1);
              }
            
              index -= 1;
            }
      setItems(
        props.ids.map((NFTId) => (
          <Item id={NFTId[1]} key={NFTId[1].tokenId} role={props.role} tokenid={NFTId[1].tokenId} />
        ))
      );
       
    }
  }
  async function goToMint(){
    history.push('/collection');
  }
  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="body-content">
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
      <div className="featured">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h3 className="my-0">Featured</h3>
            {/* <Link to='./feature'>see all</Link> */}
          </div>
          <Card className="bg-dark text-white rounded-5">
            <Card.Img src={concertImage} className="rounded-5" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>Blockchain Product Tracking NFT</Card.Title>
              <Card.Text>
                <button className="btn-mint" onClick={goToMint}>Mint Now</button>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </div>
      </div>
      <div className="featured">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h3 className="my-0">Trending</h3>
            {/* <Link to='./trending'>See all</Link> */}
          </div>
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
                <Tab label="All" />
                {/* <Tab label="Art" />
                <Tab label="Ticket" />
                <Tab label="License" />
                <Tab label="Others" /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
                {items}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
                {items}
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
                {items}
              </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
                {items}
              </div>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
                {items}
              </div>
            </TabPanel>
          </div>
          {/* <div className="d-flex flex-row flex-nowrap overflow-scroll gap-2 btn-categpry">
            <button className="btn-all active">All</button>
            <button className="btn-all">Art</button>
            <button className="btn-all">Ticket</button>
            <button className="btn-all">License</button>
            <button className="btn-all">Others</button>
          </div>
          <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
            {items}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
