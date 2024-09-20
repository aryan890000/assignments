import {atom, selector} from 'recoil'

export const networkAtom =  atom({
    key: "networkAtom",
    default : 105
});

export const jobsAtom = atom({
    key: "jobsAtom",
    default : 0
});

export const messagingAtom  =  atom({
    key : "messagingAtom",
    default : 0
});

export const notificationAtom =  atom({
    key :  "notificationAtom",
    default : 43
});

export const meAtom = atom({
    key : "meAtom",
    default : 1
})

export const drivedNotificationSumSelector = selector({
    key : "drivedNotificationSumSelector",
    get : ({get}) =>{
        
        const currentValueOfjobsAtom =  get(jobsAtom);
        const currentValueOfMynetworkAtom =  get(networkAtom);
        const currentValueOfmessagingAtom =  get(messagingAtom);
        const currentValueOfnotification =  get(notificationAtom);
        
        return (currentValueOfjobsAtom + currentValueOfMynetworkAtom + currentValueOfmessagingAtom + currentValueOfnotification);
    }
})
