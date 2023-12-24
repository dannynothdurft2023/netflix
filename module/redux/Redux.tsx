"use client";
import Auth from "@/module/auth/Auth";
import { Provider } from "react-redux";
import { store } from "@/module/redux/store/store";

export function Redux({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Auth>{children}</Auth>
    </Provider>
  );
}
