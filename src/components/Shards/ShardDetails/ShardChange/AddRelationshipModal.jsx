
import React from 'react';
import styles from './ShardChange.module.css'

const AddRelationshipModal = ({ setIsOpen }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>Add Relationship</h2>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default AddRelationshipModal;
