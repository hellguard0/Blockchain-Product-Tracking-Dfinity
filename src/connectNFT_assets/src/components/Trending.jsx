import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';

import concertImage from "../../assets/concert.png";
import icpLogo from "../../assets/icp.png";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import PriceLabel from "./PriceLabel";
import DateLabel from "./DateLabel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Trending() {
  const theme = useTheme();
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [dateLabel, setDateLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="body-content">
      <div className="featured mt-1">
        <div className="d-flex flex-column gap-3">
          <h3 className="my-0 text-start">Trending</h3>
          <div className="d-flex flex-column gap-3">  
            <Card className="borderRadius" sx={{ display: 'flex' }} variant="outlined" onClick={handleClickOpen}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={concertImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent className="trending p-3" sx={{ flex: '1 0 auto' }}>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column gap-2">
                      <h3 className="my-0 text-start lh-base">Alif Satar Concert In Malaysia 2022</h3>
                      <div className="d-flex flex-row gap-1">
                        <h5 className="my-0 fw-normal">Start Date:</h5>
                        <h5 className="my-0 fw-normal">17 July 2022</h5>
                      </div>
                      <Chip className="chip-category" label="Ticket" variant="outlined" />
                      <div className="d-flex flex-row gap-1">
                        <h6 className="my-0">Total</h6>
                        <h6 className="my-0">20,000 Mint</h6>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-1 align-items-center">
                      <h2 className="my-0 fw-bold">100.50</h2>
                      <img src={icpLogo} width="30px"/>
                    </div>
                  </div>
                </CardContent>
              </Box>
            </Card>
            <Card className="borderRadius" sx={{ display: 'flex' }} variant="outlined" onClick={handleClickOpen}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={concertImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent className="trending p-3" sx={{ flex: '1 0 auto' }}>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column gap-2">
                      <h3 className="my-0 text-start lh-base">Alif Satar Concert In Malaysia 2022</h3>
                      <div className="d-flex flex-row gap-1">
                        <h5 className="my-0 fw-normal">Start Date:</h5>
                        <h5 className="my-0 fw-normal">17 July 2022</h5>
                      </div>
                      <Chip className="chip-category" label="Ticket" variant="outlined" />
                      <div className="d-flex flex-row gap-1">
                        <h6 className="my-0">Total</h6>
                        <h6 className="my-0">20,000 Mint</h6>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-1 align-items-center">
                      <h2 className="my-0 fw-bold">100.50</h2>
                      <img src={icpLogo} width="30px"/>
                    </div>
                  </div>
                </CardContent>
              </Box>
            </Card>
            <Card className="borderRadius" sx={{ display: 'flex' }} variant="outlined" onClick={handleClickOpen}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={concertImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent className="trending p-3" sx={{ flex: '1 0 auto' }}>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column gap-2">
                      <h3 className="my-0 text-start lh-base">Alif Satar Concert In Malaysia 2022</h3>
                      <div className="d-flex flex-row gap-1">
                        <h5 className="my-0 fw-normal">Start Date:</h5>
                        <h5 className="my-0 fw-normal">17 July 2022</h5>
                      </div>
                      <Chip className="chip-category" label="Ticket" variant="outlined" />
                      <div className="d-flex flex-row gap-1">
                        <h6 className="my-0">Total</h6>
                        <h6 className="my-0">20,000 Mint</h6>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-1 align-items-center">
                      <h2 className="my-0 fw-bold">100.50</h2>
                      <img src={icpLogo} width="30px"/>
                    </div>
                  </div>
                </CardContent>
              </Box>
            </Card>
            <Card className="borderRadius" sx={{ display: 'flex' }} variant="outlined" onClick={handleClickOpen}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={concertImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent className="trending p-3" sx={{ flex: '1 0 auto' }}>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column gap-2">
                      <h3 className="my-0 text-start lh-base">Alif Satar Concert In Malaysia 2022</h3>
                      <div className="d-flex flex-row gap-1">
                        <h5 className="my-0 fw-normal">Start Date:</h5>
                        <h5 className="my-0 fw-normal">17 July 2022</h5>
                      </div>
                      <Chip className="chip-category" label="Ticket" variant="outlined" />
                      <div className="d-flex flex-row gap-1">
                        <h6 className="my-0">Total</h6>
                        <h6 className="my-0">20,000 Mint</h6>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-1 align-items-center">
                      <h2 className="my-0 fw-bold">100.50</h2>
                      <img src={icpLogo} width="30px"/>
                    </div>
                  </div>
                </CardContent>
              </Box>
            </Card>
          </div>
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
                  image={concertImage}
                  alt={concertImage}
                  style={blur}
                />
                <div className="price">
                  <div className="disButtonBase-root disChip-root makeStyles-price-24">
                    <span className="disChip-label">28 Oct</span>
                  </div>
                  {sellStatus}
                </div>
                <CardContent className="cardbody">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <Typography className="card-h2" variant="h5" component="div">
                        {/* {name} */}
                        Alif Satar Concert In Malaysia 2022
                      </Typography>
                      <div className="d-flex flex-row align-items-center justify-content-between w-100">
                        <Chip className="chip-category" label="Art" />
                        {priceLabel}
                      </div>
                      <Typography className="card-desc" variant="p" component="div">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos nostrum quisquam saepe dolorum suscipit doloremque, eius repudiandae illum maxime eveniet rerum et maiores sint totam nesciunt reprehenderit incidunt, dicta exercitationem?
                      </Typography>
                      <Typography className="card-desc" variant="p" component="div">
                        <div className="d-flex flex-row gap-1">
                          <h6 className="my-0">Total</h6>
                          <h6 className="my-0">20,000 Mint</h6>
                        </div>
                      </Typography>
                      <Typography className="card-p" variant="p" component="div">
                        {owner}
                      </Typography>
                    </div>
                    <Typography className="card-desc" variant="h3" component="div">
                      <div className="d-flex flex-row gap-1 align-items-center">
                        <h2 className="my-0 fw-bold">100.50</h2>
                        <img src={icpLogo} width="30px"/>
                      </div>
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              {priceInput}
              {button}
            </DialogContent>
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
}

export default Trending;
