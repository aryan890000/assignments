import React from 'react'
import{RecoilRoot} from 'recoil'
import LinkedlnNotificationBar from './components/LinkedlnNotificationBar'

function App() {
  return (
    <div>
      <RecoilRoot>
        <LinkedlnNotificationBar />
      </RecoilRoot>
    </div>
  )
}

export default App