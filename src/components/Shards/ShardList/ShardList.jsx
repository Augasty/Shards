/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import ShardSummary from '../ShardSummary/ShardSummary';

import styles from './ShardList.module.css';

import { useSelector } from 'react-redux';

const ShardList = () => {


  useEffect(() => { })
  let reduxShards = useSelector((state) => state.Shards) || [];

  console.log(reduxShards)

  return (

      <div className={styles.ShardList}>

        <h2 className={styles.columnHeader}>Shards</h2>

        <div className={styles.ShardArea}>
        {reduxShards.map((Shard) => (
          <ShardSummary Shard={Shard} key={Shard.id}/>
        ))}
        </div>
      </div>

  );
};

export default ShardList;
