import Text from '../../common/Text';
import { Inbox } from 'lucide-react';
import { Clock, Repeat2, ArrowRight, MessageSquare } from 'lucide-react';
import StatusChip from '../../common/StatusChip';
import ShiftCard from './swapShiftCard';
import { useSelector } from "react-redux";
import HeartbeatSpinner from "../../common/Spinner2";
import Button from '../../common/Button';
export default function ReceivedSwapRequests({ requests = [], onAction }) {

  const receivedRequests = useSelector((state) => state.swap.receivedRequests);
  const receivedStatus = useSelector((state) => state.swap.receivedStatus);
  const isLoading = receivedStatus === 'loading';

  if (!requests.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center mt-32">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Inbox size={48} className="text-gray-400" />
        </div>
        <Text
          as="p"
          MyClass="text-gray-500 text-lg"
          content="No received swap requests yet."
        />
      </div>
    );
  }

  return (
      <>
        {isLoading ? (
          <HeartbeatSpinner />
        ) : receivedRequests.length > 0 ? (
        <div
          className="space-y-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-100"
        >
          {requests.map((req) => (
            <ReceivedHistoryCard key={req._id} req={req} onAction={onAction} />
          ))}
        </div>
                ) : null}
        <div></div>
    </>
);
}

//TODO: Received History Card to be reusable with history card

function ReceivedHistoryCard({ req, onAction }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-teal-300">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-teal-50 p-2 rounded-lg">
            <Repeat2 size={20} className="text-teal-600" />
          </div>
          <div>
            <Text as="p" MyClass="text-xs text-gray-500 font-medium" content="Request ID" />
            <Text as="p" MyClass="font-semibold text-gray-700" content={`#${req.id.slice(-8)}`} />
          </div>
        </div>
        <StatusChip status={req.status} />
      </div>

      {/* Swap Details */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
        <ShiftCard
          schedule={req.fromSchedule}
          userFullName={req?.fromUser?.fullName}
          title="From Shift"
        />

        <div className="flex justify-center">
          <div className="bg-teal-50 p-2 rounded-full">
            <ArrowRight size={24} className="text-teal-600" />
          </div>
        </div>

        <ShiftCard
          schedule={req.toSchedule}
          userFullName={req?.toUser?.fullName}
          title="Your Shift"
        />
      </div>

      {/* Message */}
      {req.message && (
        <div className="bg-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <MessageSquare size={16} className="text-gray-400 mt-0.5" />
            <div>
              <Text as="p" MyClass="text-xs text-gray-500 font-medium mb-1" content="Message" />
              <Text as="p" MyClass="text-sm text-gray-600 italic font-semibold" content={`"${req?.message}"`} />
            </div>
          </div>
        </div>
      )}


      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className='text-teal-500' size={16} />
          <span>{new Date(req?.createdAt).toLocaleString()}</span>
        </div>

        {req.status === 'pending' && (
          <div className="flex gap-2">
            <Button variant="alert" onClick={() => onAction(req, 'rejected')}>
                Reject
            </Button>
            <Button variant="primary" onClick={() => onAction(req, 'approved')}>
                Approve
            </Button>

          </div>
        )}

      </div>
    </div>
  );
}

