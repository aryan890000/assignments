import React, { useEffect, useState } from "react";
import ProfileComponent from "./components/ProfileComponent";
import { profileAtom } from "./atom";
import { RecoilRoot, useRecoilState } from "recoil";

function App() {
  return (
    <div className="w-full h-screen flex flex-wrap">
      <RecoilRoot>
        <ProfileUse />
      </RecoilRoot>
    </div>
  );
}

function ProfileUse() {
  const [allprofiles, updateAllProfiles] = useRecoilState(profileAtom);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!isUpdated) {
      updateAllProfiles((oldProfiles) => [
        ...oldProfiles,
        {
          profileUrl:
            "https://images.unsplash.com/photo-1508252568242-e0f383f753d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww",
          username: "Harry suif",
          age: 32,
          city: "Kashmiri-sufi",
          followers: 87,
          likes: 853,
          posts: 1.1,
        },
      ]);
      setIsUpdated(true);
    }
  }, [isUpdated , updateAllProfiles]);

  return (
    <div className="w-full h-screen flex items-center justify-center gap-6">
      {allprofiles.map((each, index) => (
        <ProfileComponent key={index} profile={each} />
      ))}
    </div>
  );
}

export default App;
