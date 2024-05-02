/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import ShardSummary from '../../ShardSummary/ShardSummary';
import styles from './ShardChange.module.css';
import AddRelationshipModal from '../../ShardModal/AddRelationshipModal';



// eslint-disable-next-line no-unused-vars, react/display-name
const RelatedShards = React.memo(({ ShardsMapObject, shardRelationship }) => {

  const [isOpen, setIsOpen] = useState(false)
  // here pass the ShardIdTitle, and render thr dropdown 
  // with the keys that are in the ShardIdTitle but not in the ShardsMapObject

  // console.log(title,ShardsMapObject)

  return (
    <>
    <div className={styles.ShardList}>
      <div className={styles.columnHeader}>
        {shardRelationship}
        <button className={styles.columnHeaderButton} onClick={()=>setIsOpen(true)}>
          Add
        </button>
      </div>

      <div className={styles.ShardArea}>
        {Object.entries(ShardsMapObject || {}).map(([id, shardTitle]) => (
          <ShardSummary ShardId={id} ShardTitle={shardTitle} key={id} />
        ))}
      </div>
    </div>


        {isOpen && <AddRelationshipModal ShardsMapObject={ShardsMapObject}
        shardRelationship={shardRelationship}
        setIsOpen={setIsOpen}/>}
    </>

  );
});

export default RelatedShards;
