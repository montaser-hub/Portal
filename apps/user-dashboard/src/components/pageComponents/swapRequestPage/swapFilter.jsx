import Input from "../../common/Input";
export default function SwapFilter({
  filterStatus,
  setFilterStatus,
  setCurrentPage,
  options = ['all', 'pending', 'approved', 'rejected'],
}) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      {options.map((status) => (
        <Input
          key={status}
          type="radio"
          name="swapFilter"
          label={status}
          value={status}
          checked={filterStatus === status}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        />
      ))}
    </div>
  );
}
