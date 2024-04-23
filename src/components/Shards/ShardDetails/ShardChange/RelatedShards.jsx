/* eslint-disable react/prop-types */

import ShardSummary from '../../ShardSummary/ShardSummary';
import styles from './ShardChange.module.css';



// eslint-disable-next-line no-unused-vars
const RelatedShards = ({ShardsMapObject,title}) => {


  console.log(ShardsMapObject)

  return (

    <div className={styles.ShardList}>
      <h2 className={styles.columnHeader}>{title}</h2>

      <div className={styles.ShardArea}>
        {ShardsMapObject?.map((Shard) => (
          <ShardSummary Shard={Shard} key={Shard.id} />
        ))}
      </div>
    </div>

  );
};

export default RelatedShards;
