import React from "react";
import LinkedlnNotificationBar from "./components/LinkedlnNotificationBar";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
        <LinkedlnNotificationBar />
      </RecoilRoot>
    </div>
  );
}

export default App;
