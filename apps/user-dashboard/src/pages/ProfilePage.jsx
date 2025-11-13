import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ProfileOverviewCard from "../components/pageComponents/ProfilePage/ProfileOverviewCard";
import ProfileCard from "../components/pageComponents/ProfilePage/ProfileCard";
import { toast } from "react-hot-toast";
import HeartbeatSpinner from "../components/common/Spinner2";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../features/user/userSlice";
import  Text  from "../components/common/Text";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Profile Info");
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const isLoadingFromStore = useSelector((state) => state.loader.isLoading);
  const isLoading = status === "loading" || isLoadingFromStore;

  useEffect(() => {
    if (status === "idle") dispatch(fetchMe());
  }, [status, dispatch]);

  useEffect(() => {
    if (user) setProfileImage(user.photo || null);
  }, [user]);

  useEffect(() => {
    if (status === "failed") toast.error(error || "Failed to load profile data");
  }, [status, error]);

  const handleUserUpdate = () => {
    console.log("User updated. Redux state is the source of truth.");
  };

  const handleProfileImageUpdate = (newImage) => setProfileImage(newImage);

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12">
      <div className="max-w-5xl mx-40 mb-8">
        <Text as="h1" content="Your Profile" MyClass="text-3xl font-semibold text-[#0F7B8A] mb-2" />
        <Text as="p" content="Manage your Profile Info." MyClass="text-gray-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <HeartbeatSpinner />
          </div>
        ) : user && status === "succeeded" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProfileCard
              user={user}
              profileImage={profileImage}
              onProfileImageChange={handleProfileImageUpdate}
            />
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
                  <ProfileOverviewCard currentUser={user} onSave={handleUserUpdate} />
                </Tabs.Content>
              </Tabs.Root>
            </div>

          </div>
        ) : (
          <div className="text-center col-span-full text-red-500 min-h-[60vh] flex items-center justify-center">
            <Text as="p" content="Failed to load profile data, Please try again..."/>
          </div>
        )}
      </div>
    </div>
  );
}
