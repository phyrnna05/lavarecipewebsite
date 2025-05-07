import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { debounce } from '../utils/helpers';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search for recipes...' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="mb-8 w-full max-w-2xl mx-auto">
      <motion.div 
        className={`flex items-center bg-gray-900 rounded-full px-4 py-2 border transition-all duration-300 ${
          isFocused 
            ? 'border-red-500 shadow-lg shadow-red-900/30' 
            : 'border-gray-800 shadow-md'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-transparent text-white outline-none"
        />
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;