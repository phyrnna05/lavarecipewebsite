import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import { FilterOption } from '../types/api';

interface FilterBarProps {
  title: string;
  filters: {
    [key: string]: FilterOption[];
  };
  activeFilters: {
    [key: string]: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  title, 
  filters, 
  activeFilters, 
  onFilterChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState<number>(0);

  React.useEffect(() => {
    const count = Object.values(activeFilters).filter(value => value !== '').length;
    setActiveFilterCount(count);
  }, [activeFilters]);

  const handleClearFilters = () => {
    Object.keys(activeFilters).forEach(filterType => {
      onFilterChange(filterType, '');
    });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-red-900/30 hover:bg-red-800/40 text-white rounded-lg transition-colors"
        >
          <Filter size={16} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-900 rounded-xl p-5 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Filter Options</h3>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={handleClearFilters}
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <X size={14} />
                    Clear all filters
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(filters).map(([filterType, options]) => (
                  <div key={filterType} className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      {filterType.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <select
                      value={activeFilters[filterType] || ''}
                      onChange={(e) => onFilterChange(filterType, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">All</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;