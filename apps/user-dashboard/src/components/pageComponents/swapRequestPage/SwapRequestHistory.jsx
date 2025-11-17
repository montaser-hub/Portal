import Text from '../../common/Text';

export default function SwapRequestHistory({ requests = [] }) {

  if (!requests.length) {
    return (
      <div className="text-gray-600">
        <Text as="p" content="No swap request history yet." />
      </div>
    );
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    approved: 'bg-green-100 text-green-700 border-green-300',
    rejected: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <div
          key={req.id}
          className="p-5 bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <Text as="h3" content={`Swap Request #${req.id.slice(-5)}`} MyClass="font-semibold text-gray-800"  />
            <Text as="span" content={req.status.charAt(0).toUpperCase() + req.status.slice(1)}
            MyClass={`px-3 py-1 rounded-lg text-sm font-medium border ${statusColors[req.status] || statusColors['pending']}`}  />
          </div>
          {/* Shift Info */}
          <div className="mb-3 text-gray-700">
            <Text as="p" content={ <> <strong>From Shift:</strong> {req.fromScheduleId}</> } />
            <Text as="p" content={ <> <strong>To Shift:</strong> {req.toScheduleId}</> } />
          </div>

          {/* Message */}
          {req.message && (
            <Text as="p" content={`“${req.message}”`} MyClass="text-gray-600 italic border-l-4 pl-3 border-gray-300 mb-3" />
          )}

          {/* Date */}
          <Text as="p" content={`Created at: ${new Date(req.createdAt).toLocaleString()}`} MyClass="text-sm text-gray-500"  />
        </div>
      ))}
    </div>
  );
}
