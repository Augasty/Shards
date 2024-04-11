/* eslint-disable react/prop-types */
import {  useState } from 'react';
import styles from './styles.module.css';

import btn from '../../../sharedStyles/BigButtonStyle.module.css';
import { addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSingleShard } from '../ShardSlice';



const CreateShard = () => {
  const initialShardObject = { openToAll: false, deadline: "9999-12-31", };
  const [Shard, setShard] = useState({ ...initialShardObject });


  const dispatch = useDispatch();
  const curuser = auth.currentUser;
  console.log(curuser)
  const history = useNavigate();



  const handleChange = (e) => {
    setShard({
      ...Shard,
      [e.target.id]: e.target.value,
      [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ShardData = {
        ...Shard,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await addDoc(collection(db, 'users', curuser.email, 'ShardList'), ShardData );

      // console.log("Shard created", Shard);


      // add it to the existing redux store
      dispatch(addSingleShard(ShardData)); 


    } catch (e) {
      console.error(e);
    }

    history('/');
  };

  return (
    <div className={styles.container}>
      <form className={styles.createShardForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>
          Create A New Shard
        </h5>

        <input
          type="text"
          id="title"
          className={styles.ShardTitleInput}
          onChange={handleChange}
          required
          placeholder="Provide Shard title"
        />
        <textarea
          id="content"
          className={`${styles.customTextarea} ${styles.ShardContentTextarea}`}
          onChange={handleChange}
          required
          placeholder="Shard Content"
        ></textarea>




        <div className={styles.ShardDetailsTop}>
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

export default CreateShard;
