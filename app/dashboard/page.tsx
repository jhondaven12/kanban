"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DashboardContent } from "./dashboardContent";
import DashboardSample from "./dashboardSample";

export default function Dashboard() {
  return (
    <Provider store={store}>
      <DashboardContent />
      {/* <DashboardSample /> */}
    </Provider>
  );
}
