import { useRecoilValue } from "recoil";
import {
  notifications,
  totalNotificationsSum,
} from "../store/NotificationAtom";
function LinkedlnNotification() {
  const All_notifications = useRecoilValue(notifications);
  const sum_notification = useRecoilValue(totalNotificationsSum);
  return (
    <div>
      <button>Home </button>

      <button>My-Network ({All_notifications.network})</button>
      <button>jobs ({All_notifications.jobs})</button>
      <button>Messaging ({All_notifications.messaging})</button>
      <button>Notificaions ({All_notifications.notifications})</button>

      <button>Me✔ ({sum_notification})</button>
    </div>
  );
}

export default LinkedlnNotification;
