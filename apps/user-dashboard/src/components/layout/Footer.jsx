import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Text from "../common/Text";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-b border-[#E5E7EB] py-6 mt-auto bg-white  shadow-sm">
      <div className="px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            <Text as="p" content={`© ${currentYear} SmartShift. All rights reserved.`} MyClass="text-sm text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4">
            <Link to="#" className="text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200">
              <Facebook size={20} />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200">
              <Twitter size={20} />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200">
              <Linkedin size={20} />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200">
              <Instagram size={20} />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-[#0F7B8A] transition-colors duration-200"
            >
              Support
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
