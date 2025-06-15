"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const AppRootWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default AppRootWrapper;
