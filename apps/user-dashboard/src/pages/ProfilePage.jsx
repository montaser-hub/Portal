// import React, { useState } from "react";
// import { User, Mail, Phone, Calendar, Clock, AlertTriangle, Award } from "lucide-react";
// import Text from "../components/common/Text";
// import { Card } from "../components/common/Card";
// import { Button } from "../components/common/Button";
// import { Input } from "../components/common/Input";
// import { Badge } from "../components/common/Badge";
// import { COLORS } from "../components/common/colors";
// import { currentUser } from "../components/common/mockData";
// import * as Tabs from "@radix-ui/react-tabs";

// // ----------------------
// // Helpers
// // ----------------------
// const getDaysOfWeek = () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const getAvailabilityForDay = (dayOfWeek) =>
//   currentUser.availabilityPreferences?.find((pref) => pref.dayOfWeek === dayOfWeek);

// const getCredentialStatus = (credential) => {
//   const expiryDate = new Date(credential.expiryDate);
//   const now = new Date();
//   const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

//   if (daysUntilExpiry < 0)
//     return { color: "destructive", icon: AlertTriangle, text: "Expired" };
//   if (daysUntilExpiry < 30)
//     return { color: "warning", icon: AlertTriangle, text: "Expiring Soon" };
//   return { color: "success", icon: Award, text: "Valid" };
// };

// // ----------------------
// // Main Profile Component
// // ----------------------
// export default function Profile() {
//   const [activeTab, setActiveTab] = useState("Person Info"); // <-- تم إضافة state للتاب

//   return (
//     <div className={`bg-[${COLORS.bgLight}] min-h-screen py-12`}>
//       {/* Header */}
//       <div className="max-w-5xl mx-40 mb-8">
//         <Text as="h1" content="Your Profile" MyClass={`text-3xl font-semibold text-[${COLORS.primary}] mb-2`} />
//         <Text as="p" content="Manage your Profile Info." MyClass="text-gray-600" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* Profile Card */}
//           <Card className="p-6 space-y-4">
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className={`w-24 h-24 rounded-full bg-[${COLORS.primary}]/10 flex items-center justify-center`}>
//                 <User className={`h-12 w-12 text-[${COLORS.primary}]`} />
//               </div>
//               <Text as="h3" content={currentUser.name} MyClass="text-lg font-medium" />
//               <Text as="p" content={currentUser.role} MyClass="text-gray-500" />
//               <div className="flex gap-2">
//                 <Badge variant="outline">{currentUser.level}</Badge>
//                 <Badge variant="secondary">{currentUser.departmentId}</Badge>
//               </div>
//             </div>

//             <div className="space-y-3 mt-4">
//               <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-gray-400" />
//                 <Text as="span" content={currentUser.email} MyClass="text-gray-700" />
//               </div>
//               <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-gray-400" />
//                 <Text as="span" content={currentUser.phone} MyClass="text-gray-700" />
//               </div>
//               <div className="flex items-center gap-3 text-sm"><Calendar className="h-4 w-4 text-gray-400" />
//                 <Text as="span" content={`DOB: ${new Date(currentUser.dateOfBirth).toLocaleDateString()}`} MyClass="text-gray-700" />
//               </div>
//             </div>

//             <Button className="w-full mt-4" variant="secondary">Edit Profile</Button>
//           </Card>

//           {/* Profile Details with Tabs */}
//           <div className="lg:col-span-2 space-y-6">
//             <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
//               {/* Tabs Header */}
//               <Tabs.List className="flex space-x-6 border-b border-gray-200 mb-4">
//                 {["Person Info", "Availability", "Credentials"].map((tab) => (
//                   <Tabs.Trigger
//                     key={tab}
//                     value={tab}
//                     className={`pb-2 text-sm font-medium ${
//                       activeTab === tab
//                         ? `border-b-2 border-[${COLORS.primary}] text-[${COLORS.primary}]`
//                         : "text-gray-500 hover:text-[#0F7B8A]"
//                     }`}
//                   >
//                     {tab === "Person Info"
//                       ? "Personal Information"
//                       : tab === "Availability"
//                       ? "Availability"
//                       : "Credentials"}
//                   </Tabs.Trigger>
//                 ))}
//               </Tabs.List>

//               {/* Tab Panels */}
//               <Tabs.Content value="Person Info">
//                 <Card className="p-6 space-y-4">
//                   <Text as="h3" content="Contact Information" MyClass="text-lg font-medium" />
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Input label="Full Name" value={currentUser.name} />
//                     <Input label="Email" type="email" value={currentUser.email} />
//                     <Input label="Phone" type="tel" value={currentUser.phone} />
//                     <Input label="Date of Birth" type="date" value={currentUser.dateOfBirth} />
//                   </div>

//                   <Text as="h4" content="Employment Details" MyClass="mt-4 text-md font-medium" />
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Input label="Department" value={currentUser.departmentName} disabled />
//                     <Input label="Department ID" value={currentUser.departmentId} disabled />
//                     <Input label="Role" value={currentUser.role} disabled />
//                     <Input label="Staff Level" value={currentUser.level} disabled />
//                   </div>

//                   <div className="flex justify-end mt-4 gap-2">
//                     <Button variant="secondary">Cancel</Button>
//                     <Button>Save Changes</Button>
//                   </div>
//                 </Card>
//               </Tabs.Content>

//               <Tabs.Content value="Availability">
//                 <Card className="p-6 space-y-4">
//                   <Text as="h3" content="Availability" MyClass="text-lg font-medium" />
//                   <div className="space-y-3">
//                     {getDaysOfWeek().map((day, idx) => {
//                       const avail = getAvailabilityForDay(idx);
//                       return (
//                         <div key={day} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-gray-200">
//                           <div className="flex items-center gap-3">
//                             <Clock className="h-5 w-5 text-gray-400" />
//                             <Text as="span" content={day} />
//                           </div>
//                           {avail ? (
//                             <div className="flex items-center gap-2">
//                               <Text as="span" content={`${avail.startTime} - ${avail.endTime}`} MyClass="text-sm text-gray-600" />
//                               <Badge variant={avail.preferred ? "outline" : "secondary"}>
//                                 {avail.preferred ? "Preferred" : "Available"}
//                               </Badge>
//                             </div>
//                           ) : (
//                             <Badge variant="secondary">Not Set</Badge>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="flex justify-end mt-2">
//                     <Button>Update Availability</Button>
//                   </div>
//                 </Card>
//               </Tabs.Content>

//               <Tabs.Content value="Credentials">
//                 <Card className="p-6 space-y-4">
//                   <div className="flex justify-between items-center">
//                     <Text as="h3" content="Licenses & Certifications" MyClass="text-lg font-medium" />
//                     <Button size="sm">Add Credential</Button>
//                   </div>
//                   <div className="space-y-3">
//                     {currentUser.credentials?.map((cred) => {
//                       const status = getCredentialStatus(cred);
//                       const StatusIcon = status.icon;
//                       return (
//                         <div key={cred.id} className={`p-4 rounded-lg border ${cred.status !== "Valid" ? `bg-[${COLORS.alert}]/10 border-[${COLORS.alert}]/20` : "bg-white border-gray-200"}`}>
//                           <div className="flex justify-between items-start">
//                             <div className="flex gap-3 items-start">
//                               <div className={`p-2 rounded-lg`}>
//                                 <StatusIcon className="h-5 w-5" />
//                               </div>
//                               <div>
//                                 <Text as="h4" content={cred.name} MyClass="text-md font-medium" />
//                                 <Text as="p" content={`Expires: ${new Date(cred.expiryDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`} MyClass="text-sm text-gray-600 mt-1" />
//                               </div>
//                             </div>
//                             <Badge variant={status.color}>{status.text}</Badge>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </Card>
//               </Tabs.Content>
//             </Tabs.Root>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { COLORS } from "../components/common/colors";
import { currentUser } from "../components/common/mockData";
import ProfileOverviewCard from "../components/pageComponents/ProfilePage/ProfileOverviewCard";
import PersonalInfoCard from "../components/pageComponents/ProfilePage/PersonalCard";
import AvailabilityCard from "../components/pageComponents/ProfilePage/AvailabilityCard";
import CredentialCard from "../components/pageComponents/ProfilePage/CredentialCard";

// ----------------------
// Helpers
// ----------------------
const getDaysOfWeek = () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getAvailabilityForDay = (dayOfWeek) =>
  currentUser.availabilityPreferences?.find((pref) => pref.dayOfWeek === dayOfWeek);

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Person Info");

  return (
    <div className={`bg-[${COLORS.bgLight}] min-h-screen py-12`}>
      {/* Header */}
      <div className="max-w-5xl mx-40 mb-8">
        <h1 className={`text-3xl font-semibold text-[${COLORS.primary}] mb-2`}>Your Profile</h1>
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
                        ? `border-b-2 border-[${COLORS.primary}] text-[${COLORS.primary}]`
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
