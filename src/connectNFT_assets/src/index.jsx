import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Principal } from "@dfinity/principal";
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import 'react-notifications/lib/notifications.css';
import { AuthClient } from "@dfinity/auth-client";

// const CURRENT_USER_ID = Principal.fromText("zr7fa-gnm7z-wcno5-cl2jv-y3xs4-ehyen-4t5sz-xcdvc-zo4gb-6vu5b-4qe");
// const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
// function inText(){
//   const [wallet] = useWallet();
//   console.log(wallet);
//   return wallet;
// }


const init = async () => {
  // const authClient = await AuthClient.create();

  ReactDOM.render(<App />, document.getElementById("root"));
  // if (await authClient.isAuthenticated()) {
  //   handleAuthenticated(authClient);
  // } else {
  //   await authClient.login({
  //     identityProvider: "https://identity.ic0.app/#authorize",
  //     onSuccess: () => {
  //       handleAuthenticated(authClient);
  //     },
  //   });
  // }
  // inText();
};

// async function handleAuthenticated(authClient) {
//   const identity = await authClient.getIdentity();
//   const CURRENT_USER_ID = identity._principal.toString();
//   console.log(CURRENT_USER_ID);
//   ReactDOM.render(
//     <App loggedInPrincipal={CURRENT_USER_ID} />,
//     document.getElementById("root")
//     // ReactDOM.render(<App />, document.getElementById("root"));
//   );
// }
// export default CURRENT_USER_ID;

init();
