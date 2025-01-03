"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUserData } from "../store/userSlice";
import UserOverview from "../components/UserOverview";
import DashboardSkeleton from "../components/DashboardSkeleton";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData());
    }
  }, [status, dispatch]);

  if (status === "loading" || status === "idle") {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <UserOverview />
    </div>
  );
}
