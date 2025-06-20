"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

const AppRootWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <div>{children}</div>
    </Provider>
  );
};

export default AppRootWrapper;
