/* eslint-disable react/prop-types */
import { SmartTime } from "./SmartTIme";
import styles from "./TaskSummary.module.css";
import { Link } from "react-router-dom";

const TaskSummary = ({ task }) => {

  const formattedDate = SmartTime(task.createdAt);


  return (
    <Link to={"/task/" + task.id} className={styles.LinkStyle}>
      <div
        className={`${styles.taskSummary} ${styles[task.taskStatus]}`}
      >
        <p className={styles.taskSummaryTitle}> {task.title}

        </p>
        <p className={styles.taskSummaryDate}>{formattedDate}</p>
      </div>
    </Link>
  );
};

export default TaskSummary;
