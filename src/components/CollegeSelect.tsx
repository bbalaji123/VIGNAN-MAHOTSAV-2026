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
  onOtherSelected?: (isOther: boolean) => void;
}

const CollegeSelect: React.FC<CollegeSelectProps> = ({
  onChange,
  required = false,
  selectedState = '',
  selectedDistrict = '',
  onOtherSelected
}) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherCollegeName, setOtherCollegeName] = useState('');
  const [isValidSelection, setIsValidSelection] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Load colleges from backend API
  useEffect(() => {
    const loadColleges = async () => {
      try {
        console.log('📚 Loading colleges from API...');
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/location/colleges`;
        const response = await fetch(apiUrl);
        console.log('📚 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          console.log('📚 Loaded colleges count:', result.data.length);
          // Data is already filtered, sorted, and deduplicated by backend
          setColleges(result.data);
        }
        
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
    // Reset if state or district is not selected
    if (!selectedState || !selectedDistrict) {
      setFilteredColleges([]);
      setSearchTerm('');
      setIsValidSelection(false);
      onChange('');
      return;
    }

    // Filter by both state and district
    let filtered = colleges.filter(c => 
      c.State.toLowerCase() === selectedState.toLowerCase() &&
      c.District.toLowerCase() === selectedDistrict.toLowerCase()
    );

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
    // Clear validation when user types (forces selection from dropdown)
    setIsValidSelection(false);
    onChange(''); // Clear the value until they select from dropdown
    if (onOtherSelected) {
      onOtherSelected(false);
    }
    
    // Set custom validity message
    if (inputRef.current) {
      inputRef.current.setCustomValidity('Please select a college from the dropdown or click "Other"');
    }
  };

  const handleSelectCollege = (collegeName: string) => {
    onChange(collegeName);
    setSearchTerm(collegeName);
    setShowDropdown(false);
    setIsValidSelection(true);
    if (onOtherSelected) {
      onOtherSelected(false);
    }
    
    // Clear custom validity message
    if (inputRef.current) {
      inputRef.current.setCustomValidity('');
    }
  };

  const handleOtherCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setOtherCollegeName(name);
    onChange(name);
    if (onOtherSelected) {
      onOtherSelected(true);
    }
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
      setSearchTerm(otherCollegeName.trim());
      setShowOtherInput(false);
      setIsValidSelection(true);
      
      // Clear custom validity message
      if (inputRef.current) {
        inputRef.current.setCustomValidity('');
      }
    }
  };

  const handleCancelOther = () => {
    setShowOtherInput(false);
    setOtherCollegeName('');
    setSearchTerm('');
    onChange('');
    setIsValidSelection(false);
    if (onOtherSelected) {
      onOtherSelected(false);
    }
    
    // Set custom validity message
    if (inputRef.current) {
      inputRef.current.setCustomValidity('Please select a college from the dropdown or click "Other"');
    }
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
        <>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={(e) => {
              // Validate on blur
              if (!isValidSelection && searchTerm && required) {
                e.target.setCustomValidity('Please select a college from the dropdown or click "Other"');
              }
            }}
            disabled={!selectedState || !selectedDistrict}
            placeholder={
              !selectedState 
                ? "Select state first" 
                : !selectedDistrict 
                  ? "Select district first" 
                  : "Search and select your college..."
            }
            className="w-full p-2.5 sm:p-3 min-h-[44px] rounded-xl border-2 border-white/20 bg-white/10 text-white text-sm sm:text-base 
                     cursor-text transition-all duration-300 touch-manipulation placeholder:text-white/50
                     focus:outline-none focus:border-orange-500 focus:bg-white/15 focus:ring-2 focus:ring-orange-500/30
                     disabled:opacity-50 disabled:cursor-not-allowed"
            required={required}
            autoComplete="off"
          />
          {!isValidSelection && searchTerm && (
            <div className="text-orange-400 text-xs mt-1 px-1">
              ⚠️ Please select from dropdown or click "Other" button
            </div>
          )}
          
          {showDropdown && selectedState && selectedDistrict && (
            <div className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-gray-900 border-2 border-white/20 rounded-xl shadow-2xl">
              {filteredColleges.length > 0 ? (
                <>
                  {filteredColleges.map((college, index) => (
                    <div
                      key={`${college.SNO}-${index}`}
                      onClick={() => handleSelectCollege(college.Name)}
                      className="px-4 py-3 text-white hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-0"
                    >
                      {college.Name}
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setShowOtherInput(true);
                      setShowDropdown(false);
                      setSearchTerm('');
                      onChange('');
                      setIsValidSelection(false);
                      if (onOtherSelected) {
                        onOtherSelected(true);
                      }
                    }}
                    className="px-4 py-3 text-orange-400 font-bold hover:bg-white/10 cursor-pointer transition-colors border-t-2 border-orange-500/30"
                  >
                    ➕ Other (Not in list)
                  </div>
                </>
              ) : searchTerm ? (
                <div
                  onClick={() => {
                    setShowOtherInput(true);
                    setShowDropdown(false);
                    setOtherCollegeName(searchTerm);
                    setIsValidSelection(false);
                    if (onOtherSelected) {
                      onOtherSelected(true);
                    }
                  }}
                  className="px-4 py-3 text-center text-orange-400 font-bold hover:bg-white/10 cursor-pointer transition-colors"
                >
                  ➕ College not found? Click here to enter manually
                </div>
              ) : (
                <div className="px-4 py-3 text-white/50 text-center">
                  Start typing to search...
                </div>
              )}
            </div>
          )}
        </>
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
