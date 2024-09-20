import { atom, selector } from 'recoil';
import axios from 'axios';

// Atom to store notifications, with data fetched asynchronously
export const notifications = atom({
    key: 'notifications',
    default: selector({
        key: 'notificationsAtom',
        get: async () => {
            try {
                const res = await axios.get('http://localhost:3031/notifications');
                return res.data.notifications;
            } catch (error) {
                console.error('Error fetching notifications:', error);
                return { network: 0, jobs: 0, messaging: 0, notifications: 0 }; 
            }
        },
    }),
});


export const totalNotificationsSum = selector({
    key: 'totalNotificationsSum',
    get: ({ get }) => {
        const all_notifications = get(notifications);
        return (
            all_notifications.network +
            all_notifications.jobs +
            all_notifications.messaging +
            all_notifications.notifications
        );
    },
});
