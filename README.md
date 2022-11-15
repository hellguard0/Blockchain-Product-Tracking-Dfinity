Copyright 2022 London App Brewery LTD (www.appbrewery.com)

The code in this tutorial project is licended under the Apache License, Version 2.0 (the "License");
you may not use this project except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Here is the TL;DR version of the above licence:
https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)

# To Install and Run the Project

1. start local dfx

```
dfx start --clean
```

2. Run NPM server

```
npm start
```

3. Deploy canisters

```
dfx deploy nft --argument='("Blockchain Product Tracking", principal "cpcf2-xthug-4bxwv-xrueb-u27i7-t6ycb-474yb-l2n3l-mvk4w-6rqdr-eae", (vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}))'



dfx deploy  --argument='("Blockchain Product Tracking","Connect","Connect","Connect", principal "cpcf2-xthug-4bxwv-xrueb-u27i7-t6ycb-474yb-l2n3l-mvk4w-6rqdr-eae")'
```
 _logo: Text,
    _name: Text, 
    _symbol: Text,
    _decimals: Nat8, 
    _totalSupply: Nat, 
    _owner: Principal,
    _fee: Nat

dfx deploy fanclub --argument='(principal "cpcf2-xthug-4bxwv-xrueb-u27i7-t6ycb-474yb-l2n3l-mvk4w-6rqdr-eae")'

dfx canister call 7sbzkb-zqaaa-aaaaa-aaaiq-cai transfer '(principal "x6c3l-a7c4y-7usig-hg5mc-rji2f-kg4tp-spbbc-lq4ik-lnllx-27eds-bae", 42)'

dfx deploy fanclub --argument='( principal "ppnvx-azqpw-oeqvk-de7t2-lg7ml-esi4r-gvxk5-m64he-5vydr-ss7hf-iqe")' --network ic

dfx deploy connecttoken --argument='("https://raw.githubusercontent.com/hellguard0/Blockchain-Product-Tracking-Dfinity/main/src/connectNFT_assets/assets/favicon.ico","CONNECT","CNT",8,1000000000000000,principal "ppnvx-azqpw-oeqvk-de7t2-lg7ml-esi4r-gvxk5-m64he-5vydr-ss7hf-iqe",0)' --network ic

dfx deploy NFTSale --argument='("https://raw.githubusercontent.com/hellguard0/Blockchain-Product-Tracking-Dfinity/main/src/connectNFT_assets/assets/favicon.ico","CONNECT","https://raw.githubusercontent.com/hellguard0/Blockchain-Product-Tracking-Dfinity/main/logo.png","Our project is Blockchain Product Tracking. The main objective of launching this project is to expand the possibilities of real life fungible products to be registered,stored and implement tracking features within Blockchain network. From raw material harvesting, raw material processing, processed material rebranding, products packaging and finally products distributing,exporting or reselling, all processes shall be recorded and for consumers tracking purposes and products quality monitoring. With the creation of this project, consumers playing an important roles on reporting the possible issues on product quality or product camouflage happening in the industry. This project will be use by different industry manufacturers, merchants as well as registered consumers with great efforts to maintain the ecosystem. We do face some negatives feedback when developing the projects as manufacturers or merchants may not be disclosing their production information or product trade information. With this feedback, we had minimized the possible and necessary information to be displayed on both consumers and other parties. Consumers will act as the important roles in creating an ecosystem to which helps merchants to know the product sources and consumers to enjoy the more reliable and high quality products.", principal "ppnvx-azqpw-oeqvk-de7t2-lg7ml-esi4r-gvxk5-m64he-5vydr-ss7hf-iqe",1667876031,1999999999,1,1000,100,1000000,principal "ppnvx-azqpw-oeqvk-de7t2-lg7ml-esi4r-gvxk5-m64he-5vydr-ss7hf-iqe",0,principal "shfsm-vaaaa-aaaap-aaofq-cai",opt principal "ppnvx-azqpw-oeqvk-de7t2-lg7ml-esi4r-gvxk5-m64he-5vydr-ss7hf-iqe")' --network ic

dfx deploy connectNFT_assets --network ic

dfx ledger --network ic create-canister principal "cpcf2-xthug-4bxwv-xrueb-u27i7-t6ycb-474yb-l2n3l-mvk4w-6rqdr-eae" --amount 0.001


dfx ledger --network=ic top-up --amount 5 pbxkj-iqaaa-aaaag-qaz5a-cai

pbxkj-iqaaa-aaaag-qaz5a-cai
cpcf2-xthug-4bxwv-xrueb-u27i7-t6ycb-474yb-l2n3l-mvk4w-6rqdr-eae

dfx identity --network ic deploy-wallet pbxkj-iqaaa-aaaag-qaz5a-cai
https://pbxkj-iqaaa-aaaag-qaz5a-cai.raw.ic0.app

Claim faucet 20T
dfx canister --network=ic status "apqgi-6qaaa-aaaap-aaneq-cai"

dfx identity --network=ic set-wallet "apqgi-6qaaa-aaaap-aaneq-cai"

dfx canister --network ic call "apqgi-6qaaa-aaaap-aaneq-cai" authorize '(principal "ppnvx-azqpw-oeqvk-de7t2-lg7ml-esi4r-gvxk5-m64he-5vydr-ss7hf-iqe")'

P@ssw0rdICP123
_logo: Text,
    _name: Text, 
    _symbol: Text,
    _desc: Text,
    _owner: Principal,
    _startTime: Int,
    _endTime: Int,
    _minPerUser: Nat,
    _maxPerUser: Nat,
    _amount: Nat,
    _devFee: Nat, // /1e6
    _devAddr: Principal,
    _price: Nat,
    _paymentToken: Principal,
    _whitelist: ?Principal


4. Head to localhost

http://localhost:8080/

# Minter Else HTML

```
 <div className="minter-container">
        <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
          Minted!
        </h3>
        <div className="horizontal-center">
        </div>
      </div>

```

# Loader HTML

```
<div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
```

# Button HTML

```
<div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
            <span
              onClick={}
              className="form-Chip-label"
            >
              Sell
            </span>
            </div>
```

# Price Input HTML

```
<input
        placeholder="Price in DANG"
        type="number"
        className="price-input"
        value={}
        onChange={}
      />
```

# Price Label HTML

```
<div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
          <span className="disChip-label">23 DANG</span>
        </div>
```

# Creating NFT for Testing

1. Mint an NFT on the command line to get NFT into mapOfNFTs:

```
dfx canister call connectNFT mint '(vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}, "CryptoDunks #123")'
```

2. List the item into mapOfListings:

```
dfx canister call connectNFT listItem '(principal "su63m-yyaaa-aaaaa-aaala-cai", 2)'
```

3. Get OpenD canister ID:

```
dfx canister id connectNFT
```

4. Transfer NFT to OpenD:

```
dfx canister call s24we-diaaa-aaaaa-aaaka-cai transferOwnership '(principal "ryjl3-tyaaa-aaaaa-aaaba-cai", true)'
```

# Conneting to the Token Canister

1. Copy over the token declarations folder

2. Set the token canister id into the <REPLACE WITH TOKEN CANISTER ID>

```
const dangPrincipal = Principal.fromText("<REPLACE WITH TOKEN CANISTER ID>");
```
