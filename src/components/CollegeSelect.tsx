import React, { useState, useEffect } from 'react';

interface College {
  no: number;
  dno: number;
  name: string;
}

interface CollegeSelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const CollegeSelect: React.FC<CollegeSelectProps> = ({
  value,
  onChange,
  required = false
}) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherCollegeName, setOtherCollegeName] = useState('');

  // Load colleges from JSON file
  useEffect(() => {
    const loadColleges = async () => {
      try {
        console.log('📚 Loading colleges...');
        const response = await fetch('/collage.json');
        console.log('📚 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: College[] = await response.json();
        console.log('📚 Loaded colleges count:', data.length);
        
        // Filter out invalid entries
        const validColleges = data.filter(c => c && c.name && typeof c.name === 'string');
        
        // Remove duplicates (case-insensitive) and keep first occurrence
        const seen = new Set<string>();
        const uniqueColleges = validColleges.filter(college => {
          const lowerName = college.name.toLowerCase().trim();
          if (seen.has(lowerName)) {
            return false;
          }
          seen.add(lowerName);
          return true;
        });
        
        // Sort alphabetically by name
        const sortedColleges = uniqueColleges.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        
        console.log('📚 Unique colleges count:', sortedColleges.length);
        setColleges(sortedColleges);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Error loading colleges:', error);
        setIsLoading(false);
      }
    };
    loadColleges();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === '__other__') {
      setShowOtherInput(true);
      setOtherCollegeName('');
      onChange('');
    } else {
      setShowOtherInput(false);
      onChange(selectedValue);
    }
  };

  const handleOtherCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setOtherCollegeName(name);
    onChange(name);
  };

  const handleConfirmOther = () => {
    if (otherCollegeName.trim()) {
      const exists = colleges.some(
        c => c.name.toLowerCase() === otherCollegeName.trim().toLowerCase()
      );
      
      if (!exists) {
        const newCollege: College = {
          no: colleges.length + 1,
          dno: 0,
          name: otherCollegeName.trim()
        };
        const updatedColleges = [...colleges, newCollege].sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setColleges(updatedColleges);
      }
      
      onChange(otherCollegeName.trim());
      setShowOtherInput(false);
    }
  };

  const handleCancelOther = () => {
    setShowOtherInput(false);
    setOtherCollegeName('');
    onChange('');
  };

  if (isLoading) {
    return (
      <select 
        className="w-full p-3 rounded-xl border-2 border-white/20 bg-white/10 text-white text-base cursor-not-allowed opacity-60"
        disabled
      >
        <option>Loading colleges...</option>
      </select>
    );
  }

  return (
    <div className="relative w-full">
      {!showOtherInput ? (
        <select
          value={value || ''}
          onChange={handleSelectChange}
          className="w-full p-3 pr-10 rounded-xl border-2 border-white/20 bg-white/10 text-white text-base 
                     cursor-pointer appearance-none transition-all duration-300
                     focus:outline-none focus:border-orange-500 focus:bg-white/15 focus:ring-2 focus:ring-orange-500/30
                     bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%3E%3cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3c%2Fpolyline%3E%3c%2Fsvg%3E')]
                     bg-no-repeat bg-[right_12px_center] bg-[length:16px]
                     [&>option]:bg-[#1a1a2e] [&>option]:text-white [&>option]:p-2"
          required={required}
        >
          <option value="" disabled>-- Select your college --</option>
          {colleges.map((college, index) => (
            <option key={`${college.no}-${index}`} value={college.name}>
              {college.name}
            </option>
          ))}
          <option value="__other__">➕ Other (Not in list)</option>
        </select>
      ) : (
        <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
          <input
            type="text"
            value={otherCollegeName}
            onChange={handleOtherCollegeChange}
            placeholder="Enter your college name"
            className="flex-1 min-w-0 p-3 rounded-xl border-2 border-white/20 bg-white/10 text-white text-base
                       transition-all duration-300 placeholder:text-white/50
                       focus:outline-none focus:border-orange-500 focus:bg-white/15 focus:ring-2 focus:ring-orange-500/30"
            required={required}
            autoFocus
          />
          <div className="flex gap-1 shrink-0">
            <button 
              type="button" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white
                         flex items-center justify-center cursor-pointer transition-all duration-200
                         hover:scale-105 hover:shadow-lg hover:shadow-green-500/40
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={handleConfirmOther}
              disabled={!otherCollegeName.trim()}
            >
              ✓
            </button>
            <button 
              type="button" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-400 text-white
                         flex items-center justify-center cursor-pointer transition-all duration-200
                         hover:scale-105 hover:shadow-lg hover:shadow-red-500/40"
              onClick={handleCancelOther}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeSelect;
