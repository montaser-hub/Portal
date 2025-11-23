import { useState } from 'react';
import { X } from 'lucide-react';

export default function SwapDecisionModal({
  isOpen,
  onClose,
  request,
  action, // "approved" | "rejected"
  onSubmit,
}) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 capitalize">
          {action === 'approved' ? 'Approve Request' : 'Reject Request'}
        </h2>

        <p className="text-gray-600 mb-3">Provide an optional message:</p>

        <textarea
          className="w-full border rounded-lg p-3 text-sm"
          rows="3"
          placeholder="Add a note (optional)..."
          value={message || ''}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit( request, action, message )
              setMessage('')
              onClose()
            }}
            className={`px-4 py-2 rounded-lg text-white text-sm ${
              action === 'approved'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-400 hover:bg-red-600'
            }`}
          >
            Confirm {action}
          </button>
        </div>
      </div>
    </div>
  );
}
