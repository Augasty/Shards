import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { setShardsFromFireBase } from "./ShardSlice";


export const fetchShards = async(curuser,dispatch) =>{
    try {
      const ShardSnapShot = await getDocs(collection(db, 'users', curuser.email, 'ShardList'));
  
      if (!ShardSnapShot.empty) {
        const ShardsData = ShardSnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
  
        try {
          dispatch(setShardsFromFireBase([...ShardsData]));
        } catch (e) {
          console.warn('error uploading Shards in redux', e);
        }
      }
    } catch (error) {
      console.error('Error fetching Shards from Firebase:', curuser,error);
    }
  }
  