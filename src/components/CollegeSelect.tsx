import React, { useState, useEffect } from 'react';
import './CollegeSelect.css';

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
      // Add to local state for current session
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
      <select className="college-select-dropdown" disabled>
        <option>Loading colleges...</option>
      </select>
    );
  }

  return (
    <div className="college-select-container">
      {!showOtherInput ? (
        <select
          value={value || ''}
          onChange={handleSelectChange}
          className="college-select-dropdown"
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
        <div className="college-other-input-container">
          <input
            type="text"
            value={otherCollegeName}
            onChange={handleOtherCollegeChange}
            placeholder="Enter your college name"
            className="college-other-input"
            required={required}
            autoFocus
          />
          <div className="college-other-actions">
            <button 
              type="button" 
              className="college-other-btn college-other-confirm"
              onClick={handleConfirmOther}
              disabled={!otherCollegeName.trim()}
            >
              ✓
            </button>
            <button 
              type="button" 
              className="college-other-btn college-other-cancel"
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
