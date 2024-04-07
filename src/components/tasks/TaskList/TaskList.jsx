/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { auth } from '../../../firebase';
import TaskSummary from '../TaskSummary/TaskSummary';

import styles from './TaskList.module.css';

import { useSelector } from 'react-redux';

const TaskList = () => {

  
  const curuser = auth.currentUser;

  useEffect(()=>{})
  let reduxTasks = useSelector((state) => state.tasks) || [];

 console.log(reduxTasks)

  return (
    <div className={styles.mainContainer}>


      <div
        className={`${styles.taskList} `}
        style={{ width: '91.8vw' }}
      >

            <h2 className={styles.columnHeader}>Notes</h2>

            {reduxTasks.map((task) => (
              <TaskSummary task={task} key={task.id} />
            ))}
          </div>

    </div>
  );
};

export default TaskList;
