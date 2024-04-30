import styles from './ShardChange.module.css'
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const AddRelationshipModal = ({ setIsOpen }) => {

  
  let reduxShardIdName = useSelector((state) => state.ShardIdName) || {};
  console.log(reduxShardIdName)
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
