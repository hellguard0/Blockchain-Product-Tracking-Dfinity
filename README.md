Blockchain Product Tracking V0.3
=======================
Blockchain Product Tracking Prototype v0.1 on the [Internet Computer](https://dfinity.org/)
# To Install and Run the NFT.mo
1. Start local dfx
```
dfx start --clean
```
2. Deploying to local canister for testing
```
dfx deploy --argument='("<NFT Name to be created>",principal "<INPUT NFT Canister Owner Account ID>",(vec {<INPUT Your First Vector Graphics Image Code>}))'
```
3. RUN Local NPM Server
```
npm start
```

# To install and Run the CONNECT Website
1. Head to localhost
```
http://localhost:8080/
```
Overview
-----

Official Repo for Blockchain Product Tracking on Internet Computer(Dfinity). In this current prototype v0.1, minting of NFT are acceptable with images only. Listing their NFT for sales are set to using ICP for charges and local DIP20 token faucet was created to perform testing phase for buying listed NFT.

More features including Bookmark, Event Calendar, Notifications and Ticketing-based NFT are in the midst of preparation in prototype v0.2. NFT metadata and bulk minting are to be added in prototype v0.2. 

