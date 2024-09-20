import React from "react";
import {
  All_Notifications,
  SumOfNotifications,
} from "../store/notificationAtom";
import { useRecoilValue } from "recoil";

function LinkedlnNotificationBar() {
  const All_NotificationsCount = useRecoilValue(All_Notifications);
  const SumOfNotificationsCount = useRecoilValue(SumOfNotifications);

  return (
    <div style={{ display: "flex", columnGap: "2vw" }}>
      <button>Home</button>
      <button>
        My Network ({All_NotificationsCount.myNetwork_Notificaion})
      </button>
      <button>Jobs ({All_NotificationsCount.myJobs_Notification})</button>
      <button>
        Messaging ({All_NotificationsCount.myMessaging_Notification})
      </button>
      <button>
        Notification ({All_NotificationsCount.myOther_Notification}){" "}
      </button>
      <button>Me! ({SumOfNotificationsCount})</button>
    </div>
  );
}

export default LinkedlnNotificationBar;
