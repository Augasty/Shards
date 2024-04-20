/* eslint-disable react/prop-types */
import { useState } from 'react';
import { auth, db } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ShardChange.module.css';

import btn from '../../../../sharedStyles/MultipleButtonStyle.module.css';
import { SmartTime } from '../../ShardSummary/SmartTime';
import { updateShardProperties } from '../../ShardSlice';
import { useDispatch } from 'react-redux';
import { CustomInput } from '../../InputForm/CustomInput';

const ShardChange = ({ currentShard }) => {

  const curuser = auth.currentUser

  const dispatch = useDispatch();
  
  const currentShardRef = doc(db, 'users', curuser?.email, 'ShardList', currentShard?.id);
  const [updatedCurrentShard, setupdatedCurrentShard] = useState({
    ...currentShard,
  });
  const history = useNavigate();



  const handleChange = (id,value) => {
    // console.log('change triggered')
    setupdatedCurrentShard((prevData) => ({
      ...prevData,
      [id]: value.outerHTML,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submission triggered');
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
       
        <CustomInput 
        title={updatedCurrentShard.title} 
        content={updatedCurrentShard.content} handleChange={handleChange}/>
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
