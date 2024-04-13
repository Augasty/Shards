/* eslint-disable react/prop-types */
import {  useState } from 'react';
import styles from './styles.module.css';

import btn from '../../../sharedStyles/BigButtonStyle.module.css';
import { addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSingleShard } from '../ShardSlice';




const CreateShard = ({parentShards = []}) => {
  const [Shard, setShard] = useState({  });

  const dispatch = useDispatch();
  const curuser = auth.currentUser;
  // console.log(curuser)
  const history = useNavigate();



  const handleChange = (e) => {
    setShard({
      ...Shard,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ShardData = {
        ...Shard,
        updatedAt: new Date().toISOString(),
        parentShards: parentShards,
        childrenShards: []

      }
      const docRef = await addDoc(collection(db, 'users', curuser.email, 'ShardList'), ShardData);
      const docId = docRef.id;
      console.log("Auto-generated document ID:", docId);
      // console.log("Shard created", Shard);


      // adding the currently created shard to redux
      dispatch(addSingleShard({
        id:docRef.id,
        ...ShardData
      }));

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
