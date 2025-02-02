import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import './App.css';

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const searchStudents = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/students/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data);
      setDropdownVisible(true);
    } catch (error) {
      console.error('Error searching students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the search function
  const debouncedSearch = useCallback(
    debounce((query) => searchStudents(query), 300),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchQuery(student.name);
    setDropdownVisible(false);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Student Search
        </h1>
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search students (minimum 3 characters)"
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          {isLoading && (
            <div className="absolute right-4 top-4">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}

          {dropdownVisible && searchResults.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {searchResults.map((student) => (
                <div
                  key={student.rollNumber}
                  onClick={() => handleSelectStudent(student)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <div className="font-medium">
                    {highlightMatch(student.name, searchQuery)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Roll Number: {student.rollNumber}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedStudent && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Selected Student Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {selectedStudent.name}</p>
              <p><span className="font-medium">Class:</span> {selectedStudent.class}</p>
              <p><span className="font-medium">Roll Number:</span> {selectedStudent.rollNumber}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;