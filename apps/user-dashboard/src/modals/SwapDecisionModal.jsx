import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../components/common/Button';
import Text from '../components/common/Text';

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
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 bg-gray-50 border rounded-full text-teal-300 hover:bg-gray-200 hover:text-teal-400"
        >
          <X size={20} />
        </Button>
        <Text as='h2' MyClass="text-xl text-gray-600 font-semibold mb-4 capitalize"
        content={action === 'approved' ? 'Approve Request' : 'Reject Request'} />
        <Text as='p' MyClass="text-gray-600 mb-3" content= "Provide an optional message:" />
        <textarea
          className="w-full border rounded-lg p-3 text-sm"
          rows="3"
          placeholder="Add a note (optional)..."
          value={message || ''}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="secondary"
            className="px-4 py-2 rounded-lg text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={() => { onSubmit( request, action, message )
              setMessage('')
              onClose()
            }}
            variant={action === 'approved' ? 'primary' : 'alert'}
            className="px-4 py-2 rounded-lg text-sm"
          >
            Confirm {action}
          </Button>
        </div>
      </div>
    </div>
  );
}
