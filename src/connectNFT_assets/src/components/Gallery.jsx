import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Principal } from "@dfinity/principal";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import concertImage from "../../assets/concert.png";
import { BiSearch } from "react-icons/bi";
import Card from 'react-bootstrap/Card'

function Gallery(props) {
  const [items, setItems] = useState();

  function fetchNFTs() {
    if (props.ids != undefined) {
      setItems(
        props.ids.map((NFTId) => (
          <Item id={NFTId} key={NFTId.toText()} role={props.role} />
        ))
      );
    }
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="body-content">
      <FormControl variant="standard" className="search-form">
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
      </FormControl>
      <div className="featured">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h3 className="my-0">Featured</h3>
            <a>see all</a>
          </div>
          <Card className="bg-dark text-white rounded-5">
            <Card.Img src={concertImage} className="rounded-5" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>Alif Satar Malaysia Concert</Card.Title>
              <Card.Text>
                <button className="btn-mint">Mint Now</button>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </div>
      </div>
      <div className="featured">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h3 className="my-0">Trending</h3>
            <a>see all</a>
          </div>
          <div className="d-flex flex-row flex-nowrap overflow-scroll gap-2 btn-categpry">
            <button className="btn-all active">All</button>
            <button className="btn-all">Art</button>
            <button className="btn-all">Ticket</button>
            <button className="btn-all">License</button>
            <button className="btn-all">Others</button>
          </div>
          <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
