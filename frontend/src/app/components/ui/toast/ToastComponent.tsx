import React from "react";
import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = (props: { position: ToastPosition }) => {
  return (
    <ToastContainer
      position={props.position}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastComponent;
