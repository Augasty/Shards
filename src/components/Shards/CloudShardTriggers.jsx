import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, db } from '../firebase';

import { fetchShards } from './fetchShards';


const CloudShardTriggers = () => {
  const curuser = auth.currentUser;


  useEffect(() => {
    const ShardRef = collection(db, 'users', curuser.email, 'ShardList');
    const unsub = onSnapshot(ShardRef, () => {
      // console.log('trig shards');
      fetchShards();
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{display:'none'}}>Cloud Triggers</div>;
};

export default CloudShardTriggers