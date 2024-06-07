import React from 'react';
import styles from './Modal.module.css';


const index = ({ collapse, setCollapse}) => {
  if (collapse) {
    return null;
  }
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={()=>setCollapse(true)}>X</button>
        <br/>
        Hi! Welcome to shards.
        <br/>
        This tool autosaves every 30 seconds. To manually save, press ctrl + s.
        And to format the texts, just drag and select the texts to open the format toolbar.
        <br/>
        <br/>
        p.s. - While inside any note, on the top right the options opens the menu to expand the options to create subsequent shards, delete the current shard (only permissible if it doesn't have any children), and add or remove (removal is only applicable if it has at least one parent) it from the home screen.
      </div>
    </div>
  );
};

export default index;