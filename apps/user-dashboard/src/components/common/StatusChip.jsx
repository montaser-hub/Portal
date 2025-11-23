export default function StatusChip({ status }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    approved: 'bg-green-100 text-green-700 border-green-300',
    rejected: 'bg-red-100 text-red-700 border-red-300',
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${colors[status]}`}
    >
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
}
