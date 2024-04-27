/* eslint-disable react/prop-types */
import { useState } from 'react';
import { auth, db } from '../../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ShardChange.module.css';

import btn from '../../../../sharedStyles/MultipleButtonStyle.module.css';
import { SmartTime } from '../../ShardSummary/SmartTime';
import { updateShardProperties } from '../../ShardSlice';
import { useDispatch } from 'react-redux';
import { TextEditor } from '../../InputForm/TextEditor';
import { extractHeader } from '../../InputForm/ExtractHeader';
import RelatedShards from './RelatedShards';
import { MassUpdateShards } from './MassUpdateShards';

const ShardChange = ({ currentShard }) => {


  // console.log('this data is passed to shardchange',currentShard)

  const initialTitle = extractHeader(currentShard)
  const curuser = auth.currentUser

  const dispatch = useDispatch();

  const currentShardRef = doc(db, 'users', curuser?.email, 'ShardList', currentShard?.id);
  const [updatedCurrentShard, setupdatedCurrentShard] = useState({
    ...currentShard,
  });
  const history = useNavigate();



  const handleChange = (value) => {
    // console.log('change triggered')
    // console.log([id],value)
    setupdatedCurrentShard((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submission triggered');
    const ChangedShard = {
      ...updatedCurrentShard,
      title: extractHeader(updatedCurrentShard),
      updatedAt: new Date().toISOString(),
    }
    await updateDoc(currentShardRef, ChangedShard);



    // update in redux
    dispatch(updateShardProperties({
      id: currentShard.id,
      updatedProperties: { ...ChangedShard }
    }))



    // if title is not changed, further calculation is not needed.
    const updatedHeader = extractHeader(updatedCurrentShard)
    if (initialTitle == updatedHeader) {
      history(-1);
      return
    } else {
      console.log(updatedCurrentShard.parentShards)
    }


    // update data for the dropdown's map
    const userDocRef = doc(db, 'users', curuser?.email);
    try {
      await setDoc(userDocRef, {
        ShardIdName: {
          [currentShard.id]: updatedHeader
        }
      }, { merge: true });
    } catch (error) {
      console.error('Error storing map:', error);
    }

    // if initial title and final title are different:
    MassUpdateShards('parentShards', updatedCurrentShard.childrenShards, curuser.email, currentShard.id, updatedHeader, dispatch)
    MassUpdateShards('childrenShards', updatedCurrentShard.parentShards, curuser.email, currentShard.id, updatedHeader, dispatch)
    // 1. update the heading in the relatedshard of all it's parent and children shards in firestore
    // 2. do the same in redux 

    history(-1); //back to the previous screen
  };


  const smartCreatedAt = SmartTime(currentShard.createdAt);
  return (
    <div className={styles.container}>

      <div className={styles.textContainers}>
        <TextEditor
          content={updatedCurrentShard.content}
          handleChange={handleChange} />

        <span>
          <span>Created at: </span>
          {smartCreatedAt}
        </span>



        <div className={btn.MultipleButtonStyle}>


          <span>
            <button >
              <Link to={`/Shard/${currentShard.id}/create-shard`} style={{ textDecoration: 'none' }}>
                New Shard
              </Link></button>
          </span>

          <span>
            <button onClick={handleSubmit}>Submit</button>
          </span>
        </div>
      </div>
      <div>

        <div className={styles.relatedShardsContainer}>
          <RelatedShards ShardsMapObject={currentShard.parentShards} title={'parents'} />
          <RelatedShards ShardsMapObject={currentShard.childrenShards} title={'children'} />
        </div>
      </div>



    </div>
  );
};

export default ShardChange;
