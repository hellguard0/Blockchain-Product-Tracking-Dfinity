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

const CURRENT_USER_ID = Principal.fromText("c5wwr-znaha-v43hx-7ap6f-naumw-kodwv-g3tpp-5ods4-heh27-dfimx-lae");
export default CURRENT_USER_ID;

const init = async () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

init();
