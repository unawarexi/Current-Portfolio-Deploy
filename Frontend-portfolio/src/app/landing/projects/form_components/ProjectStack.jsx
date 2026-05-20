// ============================================================================
// PROJECT STACK — technology checkbox selector
// Pure UI — reads/writes form.technologies via usecase.setField
// ============================================================================
import React, { useState } from 'react';
import skillSets from '@core/data/skills';
import { Search, ChevronDown, ChevronRight } from '@core/constants/icons';

const ProjectStack = ({ usecase }) => {
  const { form, setField } = usecase;
  const selected = form.technologies;

  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState(null); // open category name

  const toggle = (name) => {
    const next = selected.includes(name)
      ? selected.filter((s) => s !== name)
      : [...selected, name];
    setField('technologies', next);
  };

  const filteredSets = skillSets
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <div className="space-y-4">
      {/* Selected badge strip */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
            >
              {name}
              <button
                type="button"
                onClick={() => toggle(name)}
                className="hover:text-red-500 transition-colors leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search technologies…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:outline-none"
        />
      </div>

      {/* Category accordion */}
      <div className="space-y-2">
        {filteredSets.map((cat) => (
          <div
            key={cat.category}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(open === cat.category ? null : cat.category)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span>{cat.category}</span>
              {open === cat.category ? (
                <ChevronDown size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </button>

            {open === cat.category && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-white dark:bg-gray-900">
                {cat.skills.map((skill) => {
                  const checked = selected.includes(skill.name);
                  return (
                    <label
                      key={skill.name}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-colors text-xs ${
                        checked
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={() => toggle(skill.name)}
                      />
                      {skill.icon && (
                        <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain flex-shrink-0" />
                      )}
                      <span className="truncate">{skill.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSets.length === 0 && (
        <p className="text-sm text-center text-gray-400 dark:text-neutral-500 py-8">
          No technologies match "{query}"
        </p>
      )}
    </div>
  );
};

export default ProjectStack;
