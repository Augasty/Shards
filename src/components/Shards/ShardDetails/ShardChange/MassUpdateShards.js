import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../firebase";
import { updateShardsRelatedShards } from "../../ShardSlice";


export const MassUpdateShards = async (relationship,ShardList,curuseremail,changedShardId, changedShardTitle,dispatch) => {
    const batch = writeBatch(db);

    // eslint-disable-next-line no-unused-vars
    {Object.entries(ShardList || {}).map(async([id, sh]) => {
    
        const shardRef = doc(db, 'users', curuseremail, 'ShardList', id);


      // updating in the firestore using batch.update 
        batch.update(shardRef, {
          [`${relationship}.${changedShardId}`]: [changedShardTitle, new Date().toISOString()]
      });
    
      //update in redux
      dispatch(updateShardsRelatedShards({
        id:id,
        relationship:relationship,
        updateShardsRelatedShards:{
          changedShardId: [changedShardTitle, new Date().toISOString()]
        }
      }))
    
    })}

    await batch.commit();
  };