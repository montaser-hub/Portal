import { useState, useRef, useEffect } from 'react';
import Text from '../../common/Text';
import Button from '../../common/Button';
import { Calendar, Clock, User, ChevronDown } from 'lucide-react';

// Custom Select Component with Lucide Icons
export function CustomSelect({ name, value, onChange, options, placeholder, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        className="w-full text-left flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2"
      >
        <div className="flex-1 overflow-hidden">
          {selectedOption ? selectedOption.label : <Text as="span" content={placeholder} MyClass="text-gray-500" />}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <Text as="div" content="Loading schedules..." MyClass="px-3 py-2 text-gray-500" />
          ) : options.length === 0 ? (
            <Text as="div" content="No options available" MyClass="px-3 py-2 text-gray-500" />
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2 cursor-pointer hover:bg-[#E0F4F6] ${
                  value === option.value ? 'bg-blue-50' : ''
                }`}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Format schedule option with icons
export function ScheduleOption({ sched }) {
  const shift = sched.shift || {};
  const user = sched.user || {};
  const subDep = sched.subDepartment || {};
  const date = new Date(sched.date).toLocaleDateString();
  const userLevel = scheduler?.user?.level?.name || '';

  return (
    <div className="flex items-center gap-2 text-sm flex-wrap">
      <Text as="span" content={subDep.name || '-'} MyClass="font-medium" />
      <Text as="span" content="—" MyClass="text-gray-400" />
      <span className="flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-[#0F7B8A]" />
        <Text as="span" content={date} MyClass="" />
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5 text-[#0F7B8A]" />
        <Text as="span" content={`${shift?.startTimeFormatted || '-'} - ${shift?.endTimeFormatted || '-'}`} MyClass="" />
      </span>
      <span className="flex items-center gap-1">
        <User className="w-3.5 h-3.5 text-[#0F7B8A]" />
        <Text as="span" content={user.fullName || '-'} MyClass="" />
      </span>
    </div>
  );
}
