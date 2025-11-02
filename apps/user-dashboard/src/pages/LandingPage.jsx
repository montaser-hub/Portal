import React from "react";
import { Calendar, CheckCircle, Users, Clock } from "lucide-react";
import Text from "../components/common/Text";
import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { COLORS } from "../components/common/colors";

export default function LandingPage({ onNavigate }) {
  return (
  <div className="min-h-screen" style={{ backgroundColor: COLORS.bgLight }}>
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Calendar className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <Text
              as="h1"
              content="SmartShift"
              MyClass="text-4xl font-semibold text-[#0F7B8A]"
            />
            <Text
              as="h2"
              content="Healthcare Scheduling Made Simple"
              MyClass="text-2xl font-normal text-gray-600"
            />
            <Text
              as="p"
              content="A comprehensive scheduling platform designed for healthcare professionals. Manage shifts, coordinate swap requests, and maintain compliance—all in one place."
              MyClass="text-gray-600 max-w-2xl mx-auto"
            />
          </div>
          <div className="pt-4">
            <Link
            to="/login"
            className="inline-block bg-[#0F7B8A] hover:bg-[#149daf] text-white px-8 py-3 text-lg rounded-lg shadow-md transition"
            >
            Go to Login
            </Link>
          </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <CheckCircle className="h-6 w-6" style={{ color: COLORS.primary }} />
            </div>
            <div className="space-y-2">
              <Text
                as="h3"
                content="Easy Scheduling"
                MyClass="text-lg font-normal text-gray-600"
              />
              <Text
                as="p"
                content="Intuitive calendar interface with drag-and-drop functionality for effortless shift management."
                MyClass="text-sm text-gray-600"
              />
            </div>
          </Card>
          <Card className="p-6 space-y-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Users className="h-6 w-6" style={{ color: COLORS.primary }} />
            </div>
            <div className="space-y-2">
              <Text
                as="h3"
                content="Team Coordination"
                MyClass="text-lg font-normal text-gray-600"
              />
              <Text
                as="p"
                content="Streamlined swap requests with approval workflows to maintain proper staffing levels."
                MyClass="text-sm text-gray-600"
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Clock className="h-6 w-6" style={{ color: COLORS.primary }} />
            </div>
            <div className="space-y-2">
              <Text
                as="h3"
                content="Compliance Tracking"
                MyClass="text-lg font-normal text-gray-600"
              />
              <Text
                as="p"
                content="Automated alerts for shift limits and compliance requirements to prevent scheduling conflicts."
                MyClass="text-sm text-gray-600"
              />
            </div>
          </Card>
        </div>
        <div>
        <Card className="p-8 bg-[#0F7B8A]/5 border-[#0F7B8A]/20 shadow-sm">
          <div className="space-y-4 text-center">
            <Text
                as="h3"
                MyClass="text-[#0F7B8A] font-semibold text-xl"
                content="Designed for Healthcare Professionals"
                />
            <Text
                as="p"
                MyClass="text-[#6B7280] max-w-3xl mx-auto"
                content="SmartShift reduces administrative burden and minimizes visual fatigue during long shifts.
                Our premium clinical aesthetic ensures a professional, reliable central source of truth for all scheduling needs."
                />
          </div>
        </Card>
        </div>
    </div>
  </div>
  );
}
