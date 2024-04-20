/* eslint-disable react/prop-types */

import styles from "./ShardSummary.module.css";
import { Link } from "react-router-dom";
import { SmartTime } from "./SmartTime";

const ShardSummary = ({ Shard }) => {

  const formattedDate = SmartTime(Shard.createdAt);

  const parser = new DOMParser();
  const doc = parser.parseFromString(Shard.title, 'text/html');
  const strippedTitle = doc.body.textContent;

  return (
    <div
        className={styles.ShardSummary}
      >
    <Link to={"/Shard/" + Shard.id} className={styles.LinkStyle}>
        <p className={styles.ShardSummaryTitle}> {strippedTitle}

        </p>
        <p className={styles.ShardSummaryDate}>{formattedDate}</p>
    </Link>
      </div>
  );
};

export default ShardSummary;
