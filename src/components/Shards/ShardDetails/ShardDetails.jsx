/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ShardView from './ShardView/ShardView';
import ShardChange from './ShardChange/ShardChange';
import { auth } from '../../../firebase';

const ShardDetails = () => {

  const curShardId = useParams();
  console.log(curShardId)
  const reduxShards = useSelector((state) => state.Shards);
  const [currentShard, setcurrentShard] = useState({})

  const curuser = auth.currentUser;

  const [changePossible, setchangePossible] = useState(false)

  useEffect(() => {
    if (curuser?.email){

      const foundCurrentObj = reduxShards.find(obj=>obj.id==curShardId.id)
      setcurrentShard(foundCurrentObj)
  
      const changePossibleLogic = (( foundCurrentObj?.assignedTo == curuser.email || foundCurrentObj?.authorDetails == curuser.email  || foundCurrentObj?.openToAll ) && (  foundCurrentObj.lockedTill < new Date().toISOString() || foundCurrentObj?.lockedBy == curuser.email))
      setchangePossible(changePossibleLogic)
      
    }

  }, [changePossible, curShardId, currentShard, curuser?.email, reduxShards])
  

  if(!currentShard){
    return <>loading</>
  }

    return (auth ?
(changePossible ? <ShardChange currentShard={currentShard}/>:<ShardView currentShard={currentShard}/>):<></>
  )}

export default ShardDetails
