import { motion, AnimatePresence } from "framer-motion";
import Text from "../components/common/Text";
import Button from "../components/common/Button";

export default function DeleteConfirm({ isOpen, onCancel, onDelete }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center"
          >
            <Text as='h2' MyClass="text-xl font-semibold mb-4 text-gray-600" content="Confirm Deletion" />
            <Text as='p' MyClass="text-gray-600 mb-6" content="Are you sure you want to delete this schedule?" />
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={onCancel}
                >
                  Cancel
              </Button>
              <Button
                variant="alert"
                onClick={onDelete}
                >Delete
              </Button>
            </div>
          </motion.div>
          </div>
      )}
    </AnimatePresence>
  );
}
