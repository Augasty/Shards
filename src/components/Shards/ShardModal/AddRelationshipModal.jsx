/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useParams } from 'react-router';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';

const AddRelationshipModal = ({ ShardsMapObject, title, setIsOpen }) => {
  // Access the shardIdTitleMap from Redux state
  const reduxShardIdTitle = useSelector((state) => state.ShardIdTitle) || {};
  
  const curShardId = useParams();

  
  console.log(reduxShardIdTitle)

  const IdsToFilter = [curShardId.id]

  Object.entries(ShardsMapObject).map(([id, titledatearr]) => {
    IdsToFilter.push(id)
  })
  console.log(IdsToFilter)

  // filter reduxShardIdTitle such that all the objects who's id is in the array IdsToFilter

  const filteredShardIdTitle = Object.fromEntries(
    Object.entries(reduxShardIdTitle)
      .filter(([id]) => !IdsToFilter.includes(id))
  );

  console.log('filtered',filteredShardIdTitle)
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>Add {title}</h2>
        {/* Render a scrollable list of items */}
        <ul className={styles.modalList}>
          {Object.entries(filteredShardIdTitle).map(([id, title]) => (
            <li key={id} className={styles.listItem} onClick={()=>console.log('ff')}>
              <div className={styles.title} >{title}</div> {/* Render title in a styled div */}
            </li>
          ))}
        </ul>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default AddRelationshipModal;
