/* eslint-disable react/prop-types */
import { useState } from 'react';
import { auth, db } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ShardView.module.css';

import btn from '../../../../sharedStyles/MultipleButtonStyle.module.css';
import { SmartTime } from '../../ShardSummary/SmartTime';
import { updateShardProperties } from '../../ShardSlice';
import { useDispatch } from 'react-redux';

const ShardChange = ({ currentShard }) => {

  const curuser = auth.currentUser

  const dispatch = useDispatch();
  
  const currentShardRef = doc(db, 'users', curuser?.email, 'ShardList', currentShard?.id);
  const [updatedCurrentShard, setupdatedCurrentShard] = useState({
    ...currentShard,
  });
  const history = useNavigate();



  const handleChange = (e) => {
    const { id, value } = e.target;
    setupdatedCurrentShard((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(updatedCurrentShard);
    await updateDoc(currentShardRef, {
      ...updatedCurrentShard,
      updatedAt: new Date().toISOString(),
    });



    // update in redux
    dispatch(updateShardProperties({
      id: currentShard.id, 
      updatedProperties: { ...updatedCurrentShard }
  }))


    history(-1); //back to the previous screen
  };


  const smartCreatedAt = SmartTime(currentShard.createdAt);
  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.ShardDetails} ${styles[currentShard.ShardStatus]}`}
      >
                <textarea
          id="title"
          value={updatedCurrentShard.title}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${styles.ShardContentTextarea}`}
        />
        <textarea
          id="content"
          value={updatedCurrentShard.content}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${styles.ShardContentTextarea}`}
        />


        <>
          <div className={styles.ShardDetailsTop}>

            <span>
              <span>Created at: </span>
              {smartCreatedAt}
            </span>
          </div>

          <br />
        </>


        <div className={btn.MultipleButtonStyle}>


          <span>
            <button >
              <Link to={`/Shard/${currentShard.id}/create-shard`} style={{textDecoration:'none'}}>
                New Shard
              </Link></button>
          </span>

          <span>
            <button type="submit">Submit</button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ShardChange;
