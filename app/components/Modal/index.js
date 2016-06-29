import React from 'react';
import styles from './styles.css'

const Modal = (props) => {
  let modalClass = `${styles.modal}`;
  let backDropClass = `${styles.modal_backdrop}`;
  if (props.show) modalClass = `${modalClass} ${styles.modal__active}`;
  if (props.show) backDropClass = `${backDropClass} ${styles.modal_backdrop__active}`;
  return (
    <div className={styles.modal_wrap} style={{position: 'fixed', width: 0, height: 0}}>
      <div className={backDropClass} onClick={props.onBackDropClick}></div>
      <div className={modalClass}>
        {props.children}
      </div>
    </div>
  );
}

module.exports = Modal;