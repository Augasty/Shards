/* eslint-disable react/prop-types */

import btn from '../../../../sharedStyles/MultipleButtonStyle.module.css';
import styles from './TaskView.module.css';


import { useState } from 'react';
import { SmartTime, formatDate } from '../../TaskSummary/SmartTIme';
const TaskView = ({ currentTask }) => {
  const [seeMore, setseeMore] = useState(false);

  if (!currentTask) {
    return <>loading</>;
  }

  const deadlinedate = formatDate(currentTask.deadline);
  const smartCreatedAt = SmartTime(currentTask.createdAt);
  return (
    <div className={styles.container}>
      <div className={`${styles.taskDetails} ${styles[currentTask.taskStatus]} ${isOverDue && styles.Overdue}`}>
        <h2 className={styles.taskDetailsTitle}>{currentTask.title}</h2>
        <p className={styles.taskDetailsText}>{currentTask.content} </p>

        {seeMore && (
          <>
            <div className={styles.taskDetailsTop}>
              <span>
                <span>Author: </span>
                {currentTask?.authorDetails}
              </span>
              <span>
                <span>Created at: </span>
                {smartCreatedAt}
              </span>
            </div>
            <div className={styles.taskDetailsTop}>
              <span>
                <span>Assigned to: </span>
                {currentTask.assignedTo}
              </span>
              <span>
                <span>Deadline: </span>
                {deadlinedate === "31-12-9999" ? "N/A" : currentTask.deadline}
              </span>
            </div>

            <div className={styles.taskDetailsTop}>
              <span>
                <span>Priority: </span>
                {currentTask.priority}
              </span>
              <span>
                <span>Status: </span>
                {currentTask.taskStatus}
              </span>
            </div>
            <br />
          </>
        )}

        <div className={btn.MultipleButtonStyle}>
          <span>
            <button onClick={() => setseeMore(!seeMore)}>{seeMore ? 'Collapse' : 'Expand'}</button>
          </span>


        </div>
      </div>
    </div>
  );
};

export default TaskView;
