/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './styles.module.css';

import btn from '../../../sharedStyles/BigButtonStyle.module.css';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSingleShard, updateShardProperties } from '../ShardSlice';
import { TextEditor } from '../InputForm/TextEditor';
import { extractHeader } from '../InputForm/ExtractHeader';
import { isEmptyObject } from '../ShardDetails/ShardDetails';




const CreateShard = () => {
  const [Shard, setShard] = useState({});

  const dispatch = useDispatch();
  const curuser = auth.currentUser;

  const history = useNavigate();

  // To fetch parentshards from the params
  const parentId = useParams().id

  let parentData = useSelector(state => {
    if (parentId) {
      return state.Shards.find(shard => shard.id === parentId);
    }
    return null;
  });

  let parentShards = {};
  if (parentId) {
    parentShards = {[parentId]: [parentData.title,parentData.updatedAt]}
  }
  const handleChange = (value) => {
    setShard(prevShard => ({
      ...prevShard,
      content: value, // Use 'id' as a dynamic property key
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ShardData = {
        ...Shard,

        title: extractHeader(Shard),
        updatedAt: new Date().toISOString(),
        parentShards: parentShards, //adding the parent's data in the current shard
        childrenShards: {},
        // showInHome: parentShards.length == 0
        showInHome: isEmptyObject(parentShards)
      }

      // adding the created doc in firestore
      let createdShardRef
      try {
        console.log(ShardData)
        createdShardRef = await addDoc(collection(db, 'users', curuser.email, 'ShardList'), ShardData);
      }
      catch (e) {
        console.log('error while uploading', ShardData)
      }
      // adding it in redux
      dispatch(addSingleShard({
        id: createdShardRef.id,
        ...ShardData
      }));




      // if there is no parents data, just return to the home page
      if (!parentData || isEmptyObject(parentData)) {

        history('/');
        return
      }
      // updating the parent docs childrenShard property in firestore 
      try {
        console.log(parentData)
        const ParentDocRef = doc(db, 'users', curuser.email, 'ShardList', parentId);
        const parentDocSnapshot = await getDoc(ParentDocRef);
        parentData = parentDocSnapshot.data();


        // Get the existing childrenShards array or initialize it as an empty array if it doesn't exist
        parentData.childrenShards[createdShardRef.id] = [ShardData.title, ShardData.updatedAt]
        // console.log(parentData.childrenShards)
        await updateDoc(ParentDocRef, {
          childrenShards: parentData.childrenShards
        });

        dispatch(updateShardProperties({
          id: parentId, // Assuming parentId is the ID of the parent shard
          updatedProperties: { childrenShards: parentData.childrenShards }
        }));
      } catch (error) {
        console.error("Error updating parent document's children property: ", error);
      }



    } catch (e) {
      console.error(Shard, e);
    }

    history('/');
  };

  return (
    <div className={styles.container}>
      <form className={styles.createShardForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>
          Create A New Shard
        </h5>


        <TextEditor handleChange={handleChange} />




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
