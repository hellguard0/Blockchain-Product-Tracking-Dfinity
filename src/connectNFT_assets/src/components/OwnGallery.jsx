import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Principal } from "@dfinity/principal";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import concertImage from "../../assets/concert.png";
import { BiSearch } from "react-icons/bi";
import Card from 'react-bootstrap/Card'

function OwnGallery(props) {
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
      <div className="featured mt-1">
        <div className="d-flex flex-column gap-3">
          <h3 className="my-0 text-start">NFT List</h3>
          <div className="d-flex flex-row flex-wrap gap-3 justify-content-between">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnGallery;
