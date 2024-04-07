import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { setTasksFromFireBase } from "./taskSlice";


export const fetchTasks = async(curuser,dispatch) =>{
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
  }
  