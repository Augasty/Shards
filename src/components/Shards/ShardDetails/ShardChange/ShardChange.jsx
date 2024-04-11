/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import {  doc,  updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from '../ShardView/ShardView.module.css';

import btn from '../../../../sharedStyles/MultipleButtonStyle.module.css';
import { SmartTime } from '../../ShardSummary/SmartTime';

const ShardChange = ({ currentShard }) => {
  
  const currentShardRef = doc(db, 'boards', currentShard?.id);
  const curuser = auth.currentUser;
  const [updatedCurrentShard, setupdatedCurrentShard] = useState({
    ...currentShard,
  });
  const deadlinedate = formatDate(updatedCurrentShard.deadline);
  const history = useNavigate();

  const updateLockedTill = async () => {
    await updateDoc(currentShardRef, {
      ...updatedCurrentShard,
      lockedTill: new Date(new Date().getTime() + 30000).toISOString(),
      lockedBy: curuser?.email,
    });
  };

  useEffect(() => {
    if (currentboard.lenght !== 0) {
      try {
        updateLockedTill();

        const intervalId = setInterval(updateLockedTill, 20000); // Log every 20sec

        return () => clearInterval(intervalId); // Clean up interval on component unmount
      } catch (error) {
        console.warn('error in Shardchange', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
    console.log(updatedCurrentShard);
    await updateDoc(currentShardRef, {
      ...updatedCurrentShard,
      updatedAt: new Date().toISOString(),
      lockedBy: null,
      lockedTill: new Date().toISOString(),
    });




    history(-1); //back to the previous screen
  };

  const [seeMore, setseeMore] = useState(true);

  const smartCreatedAt = SmartTime(currentShard.createdAt);
  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.ShardDetails} ${styles[currentShard.ShardStatus]}`}
      >
        <h2 className={styles.ShardDetailsTitle}>
          <strong>Change: </strong> {updatedCurrentShard.title}
        </h2>
        <textarea
          id="content"
          value={updatedCurrentShard.content}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${styles.ShardContentTextarea}`}
        />

        {seeMore && (
          <>
            <div className={styles.ShardDetailsTop}>
              <span>
                <span>Author: </span>
                {currentShard?.authorDetails}
              </span>
              <span>
                <span>Created at: </span>
                {smartCreatedAt}
              </span>
            </div>
            <div className={styles.ShardDetailsTop}>
              <span>
                <span>Assigned to: </span>
                {currentShard.assignedTo}
              </span>
              <span>
                <span>Deadline: </span>
                <input
                  type="date"
                  id="deadline"
                  className={styles.inputField}
                  onChange={handleChange}
                  value={deadlinedate != '31-12-9999' && updatedCurrentShard.deadline}
                  max="2999-12-31"
                />
              </span>
            </div>

            <div className={styles.ShardDetailsTop}>
              <span>
                <span>Priority: </span>

                <select
                  id="priority"
                  className={`${styles.inputField}`}
                  value={updatedCurrentShard.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </span>
              <span>
                <span>Status: </span>
                <select
                  id="ShardStatus"
                  className={`${styles.inputField}`}
                  value={updatedCurrentShard.ShardStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Finished">Finished</option>
                </select>
              </span>
            </div>
            <br />
          </>
        )}

        <div className={btn.MultipleButtonStyle}>
          <span>
            <button type="button" onClick={() => setseeMore(!seeMore)}>
              {seeMore ? 'Collapse' : 'Expand'}
            </button>
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
