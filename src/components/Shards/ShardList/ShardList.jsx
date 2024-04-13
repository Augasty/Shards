/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import ShardSummary from '../ShardSummary/ShardSummary';

import styles from './ShardList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import { fetchHeadShards } from '../fetchHeadShards';

const ShardList = () => {


  const curuser = auth.currentUser;
  
  const dispatch = useDispatch();
  useEffect(()=>{
    if(curuser){
      fetchHeadShards(curuser,dispatch)
    }
   },[curuser,dispatch])

  useEffect(() => { })
  let reduxShards = useSelector((state) => state.Shards) || [];

  // filter the shards with no parent for home screen, because we will also add every shard that we visit or create, in redux, to avoid repeatedly querying the same data.

  let filteredReduxShards = reduxShards?.filter(shard=>shard.parentShards.length == 0)

  console.log(filteredReduxShards)

  return (

      <div className={styles.ShardList}>

        <h2 className={styles.columnHeader}>Shards</h2>

        <div className={styles.ShardArea}>
        {filteredReduxShards?.map((Shard) => (
          <ShardSummary Shard={Shard} key={Shard.id}/>
        ))}
        </div>
      </div>

  );
};

export default ShardList;
