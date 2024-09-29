import { atom, selector } from 'recoil';

export const All_Notifications = atom({
  key: 'All_Notifications',
  default: {
    myNetwork_Notification: 2,  
    myJobs_Notification: 9,
    myMessaging_Notification: 6,
    myOther_Notification: 8,
  },
});

export const SumOfNotifications = selector({
  key: 'SumOfNotifications',
  get: ({ get }) => {
    const allNotifications = get(All_Notifications); 
    const net_not = allNotifications.myNetwork_Notification;
    const job_not = allNotifications.myJobs_Notification;
    const mess_not = allNotifications.myMessaging_Notification;
    const oth_not = allNotifications.myOther_Notification;

    return net_not + job_not + mess_not + oth_not;   
  },
});
