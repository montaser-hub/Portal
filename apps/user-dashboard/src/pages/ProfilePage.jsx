import React, { useState } from "react";
import { currentUser } from "../components/common/mockData";
import * as Tabs from "@radix-ui/react-tabs";
import ProfileOverviewCard from "../components/pageComponents/ProfilePage/ProfileOverviewCard";
import PersonalInfoCard from "../components/pageComponents/ProfilePage/PersonalCard";
import AvailabilityCard from "../components/pageComponents/ProfilePage/AvailabilityCard";
import CredentialCard from "../components/pageComponents/ProfilePage/CredentialCard";


const getDaysOfWeek = () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getAvailabilityForDay = (dayOfWeek) =>
  currentUser.availabilityPreferences?.find((pref) => pref.dayOfWeek === dayOfWeek);

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Person Info");

  return (
    <div className={`bg-[#F8F9FA] min-h-screen py-12`}>
      {/* Header */}
      <div className="max-w-5xl mx-40 mb-8">
        <h1 className={`text-3xl font-semibold text-[#0F7B8A] mb-2`}>Your Profile</h1>
        <p className="text-gray-600">Manage your Profile Info.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Info */}
          <PersonalInfoCard user={currentUser} />

          {/* Tabs */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              {/* Tabs Header */}
              <Tabs.List className="flex space-x-6 border-b border-gray-200 mb-4">
                {["Person Info", "Availability", "Credentials"].map((tab) => (
                  <Tabs.Trigger
                    key={tab}
                    value={tab}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === tab
                        ? `border-b-2 border-[#0F7B8A] text-[#0F7B8A]`
                        : "text-gray-500 hover:text-[#0F7B8A]"
                    }`}
                  >
                    {tab === "Person Info"
                      ? "Personal Information"
                      : tab === "Availability"
                      ? "Availability"
                      : "Credentials"}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {/* Tab Panels */}
              <Tabs.Content value="Person Info">
                <ProfileOverviewCard user={currentUser} />
              </Tabs.Content>

              <Tabs.Content value="Availability">
                <AvailabilityCard daysOfWeek={getDaysOfWeek()} getAvailabilityForDay={getAvailabilityForDay} />
              </Tabs.Content>

              <Tabs.Content value="Credentials">
                <CredentialCard credentials={currentUser.credentials} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
