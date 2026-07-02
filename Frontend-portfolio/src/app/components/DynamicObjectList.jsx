import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicObjectList = ({ title, items = [], onChange, fields = [], emptyItem = {}, addButtonLabel = "Add Item" }) => {
  const handleAdd = () => {
    onChange([...items, { ...emptyItem }]);
  };

  const handleRemove = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleChange = (index, fieldName, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [fieldName]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {title && <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">{title}</label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {addButtonLabel}
        </button>
      </div>}
      
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95, overflow: 'hidden' }}
              className="bg-[#111] border border-white/5 p-4 rounded-xl relative group"
            >
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Remove Item"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-gray-400 mb-1">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      value={item[field.name] || ''}
                      onChange={(e) => handleChange(idx, field.name, e.target.value)}
                      placeholder={field.placeholder || ''}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {items.length === 0 && (
          <div className="text-center py-8 bg-[#111] border border-white/5 border-dashed rounded-xl">
            <p className="text-sm text-gray-500 mb-2">No items added yet</p>
            <button
              type="button"
              onClick={handleAdd}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Click here to add the first item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicObjectList;
