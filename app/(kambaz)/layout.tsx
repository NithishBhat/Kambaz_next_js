"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import SessionProvider from "./SessionProvider";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <div id="wd-kambaz">
          <div className="d-flex">
            <div>
              <KambazNavigation />
            </div>
            <div className="wd-main-content-offset p-3 flex-fill">
              {children}
            </div>
          </div>
        </div>
      </SessionProvider>
    </Provider>
  );
}