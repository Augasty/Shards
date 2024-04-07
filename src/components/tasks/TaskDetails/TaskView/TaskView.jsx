/* eslint-disable react/prop-types */
import styles from './TaskView.module.css';


import { SmartTime } from '../../TaskSummary/SmartTIme';
const TaskView = ({ currentTask }) => {

  if (!currentTask) {
    return <>loading</>;
  }
  const smartCreatedAt = SmartTime(currentTask.createdAt);
  return (
    <div className={styles.container}>
      <div className={`${styles.taskDetails} ${styles[currentTask.taskStatus]}`}>
        <h2 className={styles.taskDetailsTitle}>{currentTask.title}</h2>
        <p className={styles.taskDetailsText}>{currentTask.content} </p>

              <span>
                <span>Created at: </span>
                {smartCreatedAt}
              </span>

      </div>
    </div>
  );
};

export default TaskView;
