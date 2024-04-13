/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import ShardChange from './ShardChange/ShardChange';

const ShardDetails = () => {

  const curShardId = useParams();

  const reduxShards = useSelector((state) => state.Shards);

  const [currentShard, setcurrentShard] = useState({})

  const curuser = auth.currentUser;

  useEffect(() => {
    if (curuser?.email){

      const foundCurrentObj = reduxShards.find(obj=>obj.id==curShardId.id) || {}
      setcurrentShard(foundCurrentObj)
      

      
    }

  }, [curShardId, setcurrentShard, curuser?.email, reduxShards])


  // to make sure that we don't pass {} in the shardchange
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  if(isEmptyObject(currentShard)){
    return <>loading</>
  }
    return (auth && currentShard && <ShardChange currentShard={currentShard}/>  )}

export default ShardDetails
