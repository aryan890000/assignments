
import {atom, selector}  from 'recoil';

export const counterAtom = atom({
    key : "counterAtom",
    default : 0
});

export const evenNum = selector({
    key : "evenNum",
    get : ({get})=>{
        const count = get(counterAtom)
        return count % 2 === 0;
    }
})