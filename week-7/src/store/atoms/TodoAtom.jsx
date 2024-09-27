import { atom } from "recoil";


const TodoAtom = atom({
    key: 'TodoAtom',
    default: [{}]
})


export {TodoAtom}