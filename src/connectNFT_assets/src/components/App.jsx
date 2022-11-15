import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./Item";
import Minter from "./Minter";
import * as NFTSale from "../../../../.dfx/ic/canisters/NFTSale";
import * as fanclub from "../../../../.dfx/ic/canisters/fanclub";
import * as connecttoken from "../../../../.dfx/ic/canisters/connecttoken";
import { createClient } from "@connect2ic/core"
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"
import { InfinityWallet } from "@connect2ic/core/providers/infinity-wallet"
import { NFID } from "@connect2ic/core/providers/nfid"
import { defaultProviders } from "@connect2ic/core/providers"
import { Connect2ICProvider } from "@connect2ic/react"
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"
import "@connect2ic/core/style.css"



function App() {
  // const NFTID = "rrkah-fqaaa-aaaaa-aaaaq-cai";

  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: (e) => {
      // console.log(e.principal);

      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    }
  })
  // console.log(activeProvider);

  return (
    <div className="App">
      <Header />
      {/* <Minter /> */}
      {/* <Item id={NFTID}/> */}
      {/* <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog /> */}
      <Footer />
    </div>
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
    <App />
  </Connect2ICProvider>
)
