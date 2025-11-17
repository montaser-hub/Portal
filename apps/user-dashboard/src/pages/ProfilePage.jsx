/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ProfileOverviewCard from "../components/pageComponents/ProfilePage/ProfileOverviewCard";
import ProfileCard from "../components/pageComponents/ProfilePage/ProfileCard";
import { toast } from "react-hot-toast";
import HeartbeatSpinner from "../components/common/Spinner2";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../features/user/userThunks";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const [activeTab, setActiveTab] = useState("Profile Info");
  useEffect(() => {
  if (userStatus === "idle") {
    dispatch(fetchMe()).unwrap().catch(() => {
      toast.error("Failed to load profile data");
    });
  }
}, [userStatus]);

  const isLoading = userStatus === 'loading';

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12">
      <div className="max-w-5xl mx-40 mb-8">
        <h1 className="text-3xl font-semibold text-[#0F7B8A] mb-2">
          Your Profile
        </h1>
        <p className="text-gray-600">Manage your Profile Info.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isLoading ? <HeartbeatSpinner /> : user && (
          <>
            <ProfileCard />
            <div className="lg:col-span-2 space-y-6">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex space-x-6 border-b border-gray-200 mb-4">
                <Tabs.Trigger
                  value="Profile Info"
                  className={`pb-2 text-sm font-medium ${
                    activeTab === "Profile Info"
                      ? "border-b-2 border-[#0F7B8A] text-[#0F7B8A]"
                      : "text-gray-500 hover:text-[#0F7B8A]"
                  }`}
                >
                  Profile Information
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="Profile Info">
                <ProfileOverviewCard />
              </Tabs.Content>
            </Tabs.Root>
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
