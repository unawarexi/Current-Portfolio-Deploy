import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DynamicFieldList = ({
  title,
  items = [],
  onChange,
  placeholder = "Add new item",
}) => {
  const [newValue, setNewValue] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newValue.trim()) return;
    onChange([...items, newValue.trim()]);
    setNewValue("");
  };

  const handleRemove = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleEdit = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {title && (
        <label className="block text-sm font-medium text-gray-300">
          {title}
        </label>
      )}

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0, overflow: "hidden" }}
              className="flex items-center gap-2"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleEdit(idx, e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd(e);
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newValue.trim()}
          className="p-2.5 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 disabled:opacity-50 disabled:hover:bg-purple-500/10 rounded-lg transition-colors flex-shrink-0"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DynamicFieldList;
