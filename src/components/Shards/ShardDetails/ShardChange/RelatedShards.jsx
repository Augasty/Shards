/* eslint-disable react/prop-types */

import React from 'react';
import ShardSummary from '../../ShardSummary/ShardSummary';
import styles from './ShardChange.module.css';



// eslint-disable-next-line no-unused-vars, react/display-name
const RelatedShards =  React.memo(({ ShardsMapObject, title }) => {


  console.log(title,ShardsMapObject)

  return (

    <div className={styles.ShardList}>
      <h2 className={styles.columnHeader}>{title}</h2>

      <div className={styles.ShardArea}>
      {Object.entries(ShardsMapObject || {}).map(([id, shard]) => (
  <ShardSummary ShardId={id} ShardTitle={shard[0]} ShardUpdatedAt={shard[1]} key={id} />
))}
      </div>
    </div>

  );
});

export default RelatedShards;
