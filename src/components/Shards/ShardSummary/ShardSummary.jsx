/* eslint-disable react/prop-types */

import styles from "./ShardSummary.module.css";
import { Link } from "react-router-dom";
import { SmartTime } from "./SmartTime";

const ShardSummary = ({ ShardId,ShardTitle,ShardUpdatedAt }) => {

  const formattedDate = SmartTime(ShardUpdatedAt);



  return (
    <div className={styles.ShardSummary}>
      <Link to={"/Shard/" + ShardId} className={styles.LinkStyle}>
        <p className={styles.ShardSummaryTitle}> {ShardTitle}

        </p>
        <p className={styles.ShardSummaryDate}>{formattedDate}</p>
      </Link>
    </div>
  );
};

export default ShardSummary;
