import React, { useState, useEffect, useRef } from 'react';

interface College {
  SNO: number;
  Name: string;
  State: string;
  District: string;
}

interface CollegeSelectProps {
  onChange: (value: string) => void;
  required?: boolean;
  selectedState?: string;
  selectedDistrict?: string;
}

const CollegeSelect: React.FC<CollegeSelectProps> = ({
  onChange,
  required = false,
  selectedState = '',
  selectedDistrict = ''
}) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherCollegeName, setOtherCollegeName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load colleges from JSON file
  useEffect(() => {
    const loadColleges = async () => {
      try {
        console.log('📚 Loading colleges...');
        const response = await fetch('/college.json');
        console.log('📚 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: College[] = await response.json();
        console.log('📚 Loaded colleges count:', data.length);
        
        // Filter out invalid entries
        const validColleges = data.filter(c => c && c.Name && typeof c.Name === 'string');
        
        // Remove duplicates (case-insensitive) and keep first occurrence
        const seen = new Set<string>();
        const uniqueColleges = validColleges.filter(college => {
          const lowerName = college.Name.toLowerCase().trim();
          if (seen.has(lowerName)) {
            return false;
          }
          seen.add(lowerName);
          return true;
        });
        
        // Sort alphabetically by name
        const sortedColleges = uniqueColleges.sort((a, b) => 
          a.Name.localeCompare(b.Name)
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

  // Filter colleges based on selected state and district
  useEffect(() => {
    if (!selectedState) {
      setFilteredColleges([]);
      return;
    }

    let filtered = colleges.filter(c => 
      c.State.toLowerCase() === selectedState.toLowerCase()
    );

    if (selectedDistrict) {
      filtered = filtered.filter(c => 
        c.District.toLowerCase() === selectedDistrict.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredColleges(filtered);
  }, [selectedState, selectedDistrict, colleges, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowDropdown(true);
    if (!term) {
      onChange('');
    }
  };

  const handleSelectCollege = (collegeName: string) => {
    onChange(collegeName);
    setSearchTerm(collegeName);
    setShowDropdown(false);
  };

  const handleOtherCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setOtherCollegeName(name);
    onChange(name);
  };

  const handleConfirmOther = () => {
    if (otherCollegeName.trim()) {
      const exists = filteredColleges.some(
        c => c.Name.toLowerCase() === otherCollegeName.trim().toLowerCase()
      );
      
      if (!exists && selectedState) {
        const newCollege: College = {
          SNO: colleges.length + 1,
          Name: otherCollegeName.trim(),
          State: selectedState,
          District: selectedDistrict || ''
        };
        const updatedColleges = [...colleges, newCollege].sort((a, b) => 
          a.Name.localeCompare(b.Name)
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
        className="w-full p-2.5 sm:p-3 min-h-[44px] rounded-xl border-2 border-white/20 bg-white/10 text-white text-sm sm:text-base cursor-not-allowed opacity-60"
        disabled
      >
        <option>Loading colleges...</option>
      </select>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {!showOtherInput ? (
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            placeholder={!selectedState ? "Select state first" : filteredColleges.length === 0 ? "No colleges found" : "Search college..."}
            disabled={!selectedState}
            className="w-full p-2.5 sm:p-3 min-h-[44px] rounded-xl border-2 border-white/20 bg-white/10 text-white text-sm sm:text-base 
                     cursor-text transition-all duration-300 touch-manipulation
                     focus:outline-none focus:border-orange-500 focus:bg-white/15 focus:ring-2 focus:ring-orange-500/30
                     disabled:opacity-50 disabled:cursor-not-allowed
                     placeholder:text-white/50"
            required={required}
          />
          
          {showDropdown && filteredColleges.length > 0 && selectedState && (
            <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-[#1a1a2e] border-2 border-white/20 rounded-xl shadow-lg">
              {filteredColleges.map((college, index) => (
                <div
                  key={`${college.SNO}-${index}`}
                  onClick={() => handleSelectCollege(college.Name)}
                  className="p-3 hover:bg-white/10 cursor-pointer text-white text-sm transition-colors duration-200 border-b border-white/10 last:border-b-0"
                >
                  {college.Name}
                </div>
              ))}
              <div
                onClick={() => {
                  setShowOtherInput(true);
                  setShowDropdown(false);
                  setSearchTerm('');
                }}
                className="p-3 hover:bg-white/10 cursor-pointer text-orange-400 text-sm transition-colors duration-200 font-semibold sticky bottom-0 bg-[#1a1a2e] border-t-2 border-white/20"
              >
                ➕ Other (Not in list)
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
          <input
            type="text"
            value={otherCollegeName}
            onChange={handleOtherCollegeChange}
            placeholder="Enter your college name"
            className="flex-1 min-w-0 p-2.5 sm:p-3 min-h-[44px] rounded-xl border-2 border-white/20 bg-white/10 text-white text-sm sm:text-base
                       transition-all duration-300 placeholder:text-white/50 touch-manipulation
                       focus:outline-none focus:border-orange-500 focus:bg-white/15 focus:ring-2 focus:ring-orange-500/30"
            required={required}
            autoFocus
          />
          <div className="flex gap-1 shrink-0">
            <button 
              type="button" 
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white
                         flex items-center justify-center cursor-pointer transition-all duration-200 touch-manipulation
                         hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={handleConfirmOther}
              disabled={!otherCollegeName.trim()}
            >
              ✓
            </button>
            <button 
              type="button" 
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-400 text-white
                         flex items-center justify-center cursor-pointer transition-all duration-200 touch-manipulation
                         hover:scale-105 hover:shadow-lg hover:shadow-red-500/40 active:scale-95"
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
