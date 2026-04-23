"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DashboardContent } from "./content";

export default function Dashboard() {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
}
