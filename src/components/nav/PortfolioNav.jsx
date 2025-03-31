import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const PortfolioNav = ({ onFilterChange }) => {
  const [activeTab, setActiveTab] = useState('General Overview')
  const categories = [
    'General Overview',
    'fullstack-web',
    'fullstack-mobile',
    'serverless-saas-web',
    'serverless-saas-mobile',
    'scripts',
    'dapps',
    'mern-stack'
  ]

  const handleTabChange = (category) => {
    setActiveTab(category)
    onFilterChange(category)
  }

  return (
    <div className="w-full overflow-x-auto bg-light-blue-100 p-4 rounded-full flex space-x-4 my-10 lg:justify-center">
      {categories.map((category, index) => (
        <motion.button
          key={index}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleTabChange(category)}
          className={`
            px-6 py-2 rounded-full transition-colors duration-200 whitespace-nowrap 
            ${activeTab === category ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}
            lg:px-6 lg:py-2
            md:px-4 md:py-2
            sm:px-4 sm:py-1 sm:text-xs
          `}
        >
          {category.replace(/-/g, ' ')}
        </motion.button>
      ))}
    </div>
  )
}

export default PortfolioNav
