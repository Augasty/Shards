/* eslint-disable react/prop-types */

import styles from "./ShardSummary.module.css";
import { Link } from "react-router-dom";
import { SmartTime } from "./SmartTime";

const ShardSummary = ({ Shard }) => {

  const formattedDate = SmartTime(Shard.createdAt);


  return (
    <Link to={"/Shard/" + Shard.id} className={styles.LinkStyle}>
      <div
        className={`${styles.ShardSummary} ${styles[Shard.ShardStatus]}`}
      >
        <p className={styles.ShardSummaryTitle}> {Shard.title}

        </p>
        <p className={styles.ShardSummaryDate}>{formattedDate}</p>
      </div>
    </Link>
  );
};

export default ShardSummary;
