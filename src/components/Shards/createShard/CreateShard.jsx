/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './styles.module.css';

import btn from '../../../sharedStyles/BigButtonStyle.module.css';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSingleShard, updateShardProperties } from '../ShardSlice';
import { CustomInput } from '../InputForm/CustomInput';




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

  let parentShards = [];
  if (parentId) {
    parentShards = [{
      [parentId]: [parentData.title,parentData.updatedAt]
    }]
  }
  const handleChange = (id, value) => {
    console.log([id],value.outerHTML)
    setShard(prevShard => ({
      ...prevShard,
      [id]: value.outerHTML, // Use 'id' as a dynamic property key
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ShardData = {
        ...Shard,
        updatedAt: new Date().toISOString(),
        parentShards: parentShards,
        childrenShards: [],
        showInHome: parentShards.length == 0 

      }

      // adding the created doc in firestore
      let createdShardRef
      try{
        console.log(ShardData)
        createdShardRef = await addDoc(collection(db, 'users', curuser.email, 'ShardList'), ShardData);
      }
      catch(e){
        console.log('error while uploading',ShardData)
      }
   // adding it in redux
      dispatch(addSingleShard({
        id: createdShardRef.id,
        ...ShardData
      }));



      const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
      };


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
        const existingChildrenShards = parentData.childrenShards || [];
        const updatedChildrenShards = existingChildrenShards.concat({ [createdShardRef.id]: [ShardData.title, ShardData.updatedAt] });
        await updateDoc(ParentDocRef, {
          childrenShards: updatedChildrenShards
        });

        dispatch(updateShardProperties({
          id: parentId, // Assuming parentId is the ID of the parent shard
          updatedProperties: { childrenShards: updatedChildrenShards }
      }));
      } catch (error) {
        console.error("Error updating parent document's children property: ", error);
      }



    } catch (e) {
      console.error(Shard,e);
    }

    history('/');
  };

  return (
    <div className={styles.container}>
      <form className={styles.createShardForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>
          Create A New Shard
        </h5>


        <CustomInput handleChange={handleChange}/>
        



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
