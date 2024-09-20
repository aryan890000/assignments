import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {counterAtom,evenNum} from '../store/atoms/CountAtom'

export default function  App(){
  return(
    <div>
        <RecoilRoot>
          <Count/>
        </RecoilRoot>
    </div>
  )
}
function Count(){
  return(
      <div>
          <CountRender/>
          <Buttons />
          <IsEven />
      </div>
  )
}
function CountRender(){
  const count = useRecoilValue(counterAtom)
  return(
    <div>
        {count}
    </div>
  )
}
function Buttons(){
  const setRecoilCount = useSetRecoilState(counterAtom);
  return(
  <div>
        {/* First Button */}
      <div>
        <button onClick={()=>{setRecoilCount(count => count + 1)}} > Increase + 1 </button>
     </div>

        {/* Second Button */}
        <div>
        <button onClick={()=>{setRecoilCount(count => count - 1)}} > Derease - 1 </button>
      </div>
  </div>
    
  )
}
function IsEven(){
  const isEven = useRecoilValue(evenNum);
  return(
    <div>
      {isEven && "Above Number is Even"}
    </div>
  )
}