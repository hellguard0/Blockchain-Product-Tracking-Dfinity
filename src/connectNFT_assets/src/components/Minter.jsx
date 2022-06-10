import React, { useState, withRouter } from "react";
import { useForm } from "react-hook-form";
import { connectNFT } from "../../../declarations/connectNFT";
import { Principal } from "@dfinity/principal";
import Item from "./Item";
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

function Minter() {
  const { register, handleSubmit } = useForm();
  const [nftPrincipal, setNFTPrincipal] = useState("");
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [alertHidden, setAlertHidden] = useState(true);
  
  let history = useHistory();
  async function onSubmit(data) {
    setLoaderHidden(false);
    setAlertHidden(false);
    const name = data.name;
    const image = data.image[0];
    const imageArray = await image.arrayBuffer();
    const imageByteData = [...new Uint8Array(imageArray)];
    
    const newNFTID = await connectNFT.mint(imageByteData, name);
    console.log(newNFTID.toText());
    setNFTPrincipal(newNFTID);
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
              <Item id={nftPrincipal.toText()} />
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
