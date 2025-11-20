import { motion, AnimatePresence } from "framer-motion";

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
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this schedule?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
