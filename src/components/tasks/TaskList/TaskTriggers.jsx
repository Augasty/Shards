/* eslint-disable react/prop-types */
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setTasksFromFireBase } from '../taskSlice';
import { auth, db } from '../../../firebase';

const CloudTaskTriggers = () => {
  const dispatch = useDispatch();

 
  const curuser = auth.currentUser;
  const fetchTasks = useMemo(
    () => async () => {

      try {
        const TaskSnapShot = await getDocs(collection(db, 'users', curuser.email, 'taskList'));

        if (!TaskSnapShot.empty) {
          const tasksData = TaskSnapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });


          try {
            dispatch(setTasksFromFireBase([...tasksData]));
          } catch (e) {
            console.warn('error uploading tasks in redux', e);
          }
        }
      } catch (error) {
        console.error('Error fetching tasks from Firebase:', error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const unsub = onSnapshot(() =>fetchTasks());

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );

  return <div style={{display:'none'}}>Cloud Triggers</div>;
};

export default CloudTaskTriggers;