import React from "react";
import {  
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  jobsAtom,
  meAtom,
  drivedNotificationSumSelector,
  networkAtom,
} from "../store/LinkedlnNotificationBarAtom";

function LinkedlnNotificationBar() {
  const myNetworkCount = useRecoilValue(networkAtom);
  const [jobsCount, setjobsCount] = useRecoilState(jobsAtom);
  const [meCount, setMeCount] = useRecoilState(meAtom);
  const NotifcationsSum = useRecoilValue(drivedNotificationSumSelector);

  const increaseJobCount = () => {
    setjobsCount(jobsCount + 1);
  };

  const increaseMeCount = () => {
    setMeCount(meCount + 1);
    console.log(meCount)
  };

  return (
    <div>
      <button>Home</button>
      <button>
        My Networks {myNetworkCount >= 100 ? "99+" : myNetworkCount}
      </button>
      <button onClick={increaseJobCount}>
        jobs {jobsCount === 0 ? "" : jobsCount >= 100 ? "99+" : jobsCount}
      </button>
      <button>Messaging</button>
      <button>Notifcations</button>
      <button onClick={increaseMeCount}> Me! ({NotifcationsSum}) </button>
    </div>
  );
}

export default LinkedlnNotificationBar;
