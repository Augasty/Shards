/* eslint-disable react/prop-types */
import {  useState } from 'react';
import styles from './styles.module.css';

import btn from '../../../sharedStyles/BigButtonStyle.module.css';
import { addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../fetchTasks';



const CreateTask = () => {
  const initialTaskObject = { openToAll: false, deadline: "9999-12-31", };
  const [task, setTask] = useState({ ...initialTaskObject });


  const dispatch = useDispatch();
  const curuser = auth.currentUser;
  console.log(curuser)
  const history = useNavigate();



  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.id]: e.target.value,
      [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users', curuser.email, 'taskList'), {
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // console.log("task created", task);




      // also fetch all data
      fetchTasks(curuser,dispatch)

    } catch (e) {
      console.error(e);
    }

    history('/');
  };

  return (
    <div className={styles.container}>
      <form className={styles.createTaskForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>
          Create A New Task
        </h5>

        <input
          type="text"
          id="title"
          className={styles.taskTitleInput}
          onChange={handleChange}
          required
          placeholder="Provide task title"
        />
        <textarea
          id="content"
          className={`${styles.customTextarea} ${styles.taskContentTextarea}`}
          onChange={handleChange}
          required
          placeholder="Task Content"
        ></textarea>


        <div className={` `}>
          <select id="taskStatus" className={`${styles.taskStatusSelect}`} onChange={handleChange} required>
            <option value="">Task Status</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <div className={styles.taskDetailsTop}>
          <button className={btn.BigButton} onClick={() => history(-1)}>
            Back
          </button>
          <button className={btn.BigButton} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
