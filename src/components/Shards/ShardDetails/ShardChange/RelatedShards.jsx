/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import ShardSummary from '../../ShardSummary/ShardSummary';
import styles from './ShardChange.module.css';
import AddRelationshipModal from './AddRelationshipModal';



// eslint-disable-next-line no-unused-vars, react/display-name
const RelatedShards = React.memo(({ ShardsMapObject, title }) => {

  const [isOpen, setIsOpen] = useState(false)
  // here pass the ShardIdName, and render thr dropdown 
  // with the keys that are in the ShardIdName but not in the ShardsMapObject

  // console.log(title,ShardsMapObject)

  return (
    <>
    <div className={styles.ShardList}>
      <div className={styles.columnHeader}>
        {title}
        <button className={styles.columnHeaderButton} onClick={()=>setIsOpen(true)}>
          Add
        </button>
      </div>

      <div className={styles.ShardArea}>
        {Object.entries(ShardsMapObject || {}).map(([id, shard]) => (
          <ShardSummary ShardId={id} ShardTitle={shard[0]} ShardUpdatedAt={shard[1]} key={id} />
        ))}
      </div>
    </div>


        {isOpen && <AddRelationshipModal setIsOpen={setIsOpen}/>}
    </>

  );
});

export default RelatedShards;
