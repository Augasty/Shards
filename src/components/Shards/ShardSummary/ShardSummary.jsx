/* eslint-disable react/prop-types */

import styles from "./ShardSummary.module.css";
import { Link } from "react-router-dom";

const ShardSummary = ({ ShardId,ShardTitle }) => {




  return (
    <div className={styles.ShardSummary}>
      <Link to={"/Shard/" + ShardId} className={styles.LinkStyle}>
        <p className={styles.ShardSummaryTitle}> {ShardTitle}

        </p>
      </Link>
    </div>
  );
};

export default ShardSummary;
