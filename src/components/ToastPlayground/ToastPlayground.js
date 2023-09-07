import React, { useState, useContext } from 'react';
import ToastShelf from '../ToastShelf/ToastShelf';
import { ToastContext } from '../ToastProvider';
import Button from '../Button';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { addToast } = useContext(ToastContext)
  const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0])
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    addToast(selectedVariant, message)

    setSelectedVariant(VARIANT_OPTIONS[0])
    setMessage('')
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea 
                id="message"
                className={styles.messageInput} 
                value={message}
                onChange={event => setMessage(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {VARIANT_OPTIONS.map((variantType) => (
                <label key={variantType} htmlFor={`variant-${variantType}`}>
                  <input
                    id={`variant-${variantType}`}
                    type="radio"
                    name="variant"
                    value={variantType}
                    checked={variantType === selectedVariant}
                    onChange={event => {
                      setSelectedVariant(event.target.value)
                    }}
                  />
                  {variantType}
                </label>
              ))}

              {/* TODO Other Variant radio buttons here */}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;