import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { jobAtom, meAtom, messagingAtom, networkAtom, notificationsAtom } from './atoms'

function App() {
  /**
   * We can use useState like the one in below to store the data for these buttons. But instead of that 
   * we're gonna use recoil and use atoms.
      const [count, setCount] = useState(0)
   * 
   */

  return(
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  )
}

const MainApp = () => {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationsCount = useRecoilValue(jobAtom);
  const messagingNotificationCount = useRecoilValue(messagingAtom);
  const generalNotificationCount = useRecoilValue(notificationsAtom);
  const profileNotificationCount = useRecoilValue(meAtom);
  return (
    <>
        <button>Home</button>
        <button>My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
        <button>Jobs ({jobsNotificationsCount})</button>
        <button>Messaging ({messagingNotificationCount})</button>
        <button>Notifications ({generalNotificationCount})</button>
        <button>Me ({profileNotificationCount})</button>
    </>
  )
}

export default App