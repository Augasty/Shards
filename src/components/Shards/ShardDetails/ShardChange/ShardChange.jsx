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
import { TextEditor } from '../../InputForm/TextEditor';
import { extractHeader } from '../../InputForm/ExtractHeader';

const ShardChange = ({ currentShard }) => {
  console.log(currentShard)
  const curuser = auth.currentUser

  const dispatch = useDispatch();
  
  const currentShardRef = doc(db, 'users', curuser?.email, 'ShardList', currentShard?.id);
  const [updatedCurrentShard, setupdatedCurrentShard] = useState({
    ...currentShard,
  });
  const history = useNavigate();



  const handleChange = (id,value) => {
    // console.log('change triggered')
    // console.log([id],value)
    setupdatedCurrentShard((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submission triggered');
    const ChangedShard = {
      ...updatedCurrentShard,
      title: extractHeader(updatedCurrentShard.content),
      updatedAt: new Date().toISOString(),
    }
    await updateDoc(currentShardRef, ChangedShard);
    console.log(updatedCurrentShard,extractHeader(updatedCurrentShard.content))



    // update in redux
    dispatch(updateShardProperties({
      id: currentShard.id, 
      updatedProperties: {...ChangedShard}
  }))


    history(-1); //back to the previous screen
  };


  const smartCreatedAt = SmartTime(currentShard.createdAt);
  return (
    <div className={styles.container}>

<>
        <TextEditor 
        content={updatedCurrentShard.content}
        handleChange={handleChange}/>
          <div className={styles.ShardDetailsTop}>

            <span>
              <span>Created at: </span>
              {smartCreatedAt}
            </span>
          </div>



        <div className={btn.MultipleButtonStyle}>


          <span>
            <button >
              <Link to={`/Shard/${currentShard.id}/create-shard`} style={{textDecoration:'none'}}>
                New Shard
              </Link></button>
          </span>

          <span>
            <button onClick={handleSubmit}>Submit</button>
          </span>
        </div>
        </>

        

    </div>
  );
};

export default ShardChange;
