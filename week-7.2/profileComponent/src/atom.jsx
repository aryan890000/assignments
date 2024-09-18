

import { atom } from 'recoil'
export const profileAtom = atom({
  key: "profileAtom",
  default: [{
    profileUrl: 'https://images.unsplash.com/photo-1636678880105-7d853df3bc3b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: "Harry",
    age: 27,
    city: "Kashmir",
    followers: 80,
    likes: 803,
    posts: 1.4
  },
  {
    profileUrl: 'https://images.unsplash.com/photo-1636678880105-7d853df3bc3b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: "Harry",
    age: 27,
    city: "Kashmir",
    followers: 80,
    likes: 803,
    posts: 1.4
  }
]
})