export default function SwapFilter({
  filterStatus,
  setFilterStatus,
  setCurrentPage,
  options = ['all', 'pending', 'approved', 'rejected'],
}) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      {options.map((status) => (
        <label
          key={status}
          className="flex items-center space-x-1 text-gray-700"
        >
          <input
            type="radio"
            name="swapFilter"
            value={status}
            checked={filterStatus === status}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="accent-[#0F7B8A]"
            aria-label={status}
          />
          <span className="capitalize">{status}</span>
        </label>
      ))}
    </div>
  );
}
