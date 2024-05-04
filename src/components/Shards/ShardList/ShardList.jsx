import ShardSummary from "../ShardSummary/ShardSummary";
import styles from "./ShardList.module.css";
import { useSelector } from "react-redux";

const ShardList = () => {
  const reduxShards = useSelector((state) => state.Shards) || {};
  const filteredReduxShards = Object.values(reduxShards)
    .filter((shard) => shard.showInHome === true && !shard.parentId)
    .reduce((acc, shard) => {
      acc[shard.id] = shard;
      return acc;
    }, {});

  console.log("shardList", filteredReduxShards);

  return (
    <div className={styles.ShardList}>
      <h2 className={styles.columnHeader}>Shards</h2>

      <div className={styles.ShardArea}>
        {Object.values(filteredReduxShards).map((Shard) => (
          <ShardSummary
            ShardId={Shard.id}
            ShardTitle={Shard.title}
            key={Shard.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ShardList;
