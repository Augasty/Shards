/* eslint-disable react/prop-types */
import styles from './ShardView.module.css';


import { SmartTime } from '../../ShardSummary/SmartTime';
import { doc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase';
import { useState } from 'react';
const ShardView = ({ currentShard }) => {

  console.log(currentShard)
 
  
  if (!currentShard) {
    return <>loading</>;
  }

  
  const smartCreatedAt = SmartTime(currentShard.createdAt);
  return (
    <div className={styles.container}>
      <div className={`${styles.ShardDetails} ${styles[currentShard.ShardStatus]}`}>
        <h2 className={styles.ShardDetailsTitle}>{currentShard.title}</h2>
        <p className={styles.ShardDetailsText}>{currentShard.content} </p>

              <span>
                <span>Created at: </span>
                {smartCreatedAt}
              </span>

      </div>
    </div>
  );
};

export default ShardView;