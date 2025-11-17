import React, { useRef, useState } from "react";
import { User, Mail, Phone, Calendar, Camera, Trash2 } from "lucide-react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Badge from "../../common/Badge";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPhoto } from "../../../features/user/userThunks";

export default function ProfileCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};
  const profileImage = user.photo;
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleEditImageClick = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await dispatch(updateUserPhoto(file)).unwrap();
      toast.success('Profile image updated successfully!');
    } catch (err) {
      const msg = err.response.data.message;
      toast.error(msg);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await dispatch(updateUserPhoto(null)).unwrap();
      toast.success("Profile image deleted successfully!");
      setIsHovered(false);
    } catch (err) {
      const msg = err.response.data.message;
      toast.error(msg);
    }
  };

    const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

  return (
    <Card className="p-6 space-y-4 bg-white border-gray-200">
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          {profileImage ? (
            <>
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover transition-opacity duration-200"
              />
              {isHovered && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center transition-opacity duration-200">
                  <button
                    onClick={handleDeleteImage}
                    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition mr-2"
                    title="Delete Image"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleEditImageClick}
                    className="p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition"
                    title="Change Profile Image"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full rounded-full bg-[#0F7B8A]/10 flex items-center justify-center">
              <User className="h-12 w-12 text-[#0F7B8A]" />
              <button
                onClick={handleEditImageClick}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#0F7B8A] text-white hover:bg-[#0F7B8A]/90 transition"
                title="Edit Profile Picture"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <Text as="h3" content={`${user.firstName} ${user.lastName}`} MyClass="text-lg font-medium text-teal-700" />
        <Badge variant="outline">{user.role || "N/A"}</Badge>

        <div className="flex gap-2">
          <Badge variant="outline">{user.level?.name || "N/A"}</Badge>
          <Badge variant="secondary">{user.department?.name || "N/A"}</Badge>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <Text as="span" content={user.email} MyClass="text-gray-700" />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <Text as="span" content={user.contactNumber || "N/A"} MyClass="text-gray-700" />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <Text
              as="span"
              content={`Start Date: ${user.createdAt ?  formatDate(user.createdAt) : "N/A"}`}
              MyClass="text-gray-700"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
