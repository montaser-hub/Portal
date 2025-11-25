import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Text from "../components/common/Text";
import Button from "../components/common/Button";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
          >
            <Button
              onClick={onClose}
              className="absolute top-2 right-[1em] p-3 -mr-2 bg-gray-50 border rounded-full text-teal-300 hover:bg-gray-200 hover:text-teal-400"
            >
              <X size={20} />
            </Button>

            {title && (
              <Text as="h2" content={title} MyClass="text-lg font-semibold mb-4 text-gray-600" />

            )}
            <div className="text-gray-700">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
