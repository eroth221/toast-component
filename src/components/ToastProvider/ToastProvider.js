import React, { useState, useCallback } from "react";
import useKeyDown from "../../hooks/use-key-down";

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const [toastStack, setToastStack] = useState([])
  const handleEscape = useCallback(() => {
    setToastStack([])
  },[])
  
  useKeyDown('Escape', handleEscape)

  const dismissToast = (id) => {
    const newToasts = toastStack.filter((toast) => {
      return toast.id !== id
    })
    setToastStack(newToasts)
  }

  const addToast = (selectedVariant, message) => {
    const newToast = {
      id: crypto.randomUUID(),
      variant: selectedVariant,
      message: message,
    }

    const newStack =  [
      ...toastStack,
      newToast
    ]

    setToastStack(newStack)
  }

  return (
    <ToastContext.Provider
      value={{
        toastStack,
        setToastStack,
        dismissToast,
        addToast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
