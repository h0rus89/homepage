"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'

const menuItems = [
  {
    name: 'Gemeinsam',
    submenu: ['Leitbild', 'Unser Miteinander', 'Schulleitung', 'Kollegium', 'Klassen', 'Schulsozialarbeit', 'Verwaltung', 'Nachmittagsbetreuung', 'Eltern- und Schülervertretung', 'Förderverein', 'Schulhund', 'unser Schulkonzept', 'Anmeldung'],
    color: { active: 'bg-pink-500', hover: 'hover:bg-pink-500'}
  },
  {
    name: 'Aktiv',
    submenu: ['Schultag', 'News', 'AGs', 'Projekte', 'EinBlicke', 'Kooperationen', 'Graf-Anton-Tag', 'Schulbuchausleihe', 'Downloads/Formulare'],
    color: { active: 'bg-yellow-500', hover: 'hover:bg-yellow-500' }
  },
  {
    name: 'Stark',
    submenu: ['Berufsorientierung', 'Schule ohne Rassismus-Schule mit Courage', 'MINT', 'Tag der offenen Tür', 'Digital? Na klar!', 'Abschlüsse', 'Links'],
    color: { active: 'bg-lime-500', hover: 'hover:bg-lime-500' }
  }
]

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const getMenuItemClasses = useCallback((itemName: string, activeColor: string, hoverColor: string) => {
    const baseClasses = "px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-800"
    const activeClasses = `${activeColor} text-white`
    const hoverClasses = `${hoverColor} hover:text-white`
    
    return classNames(baseClasses, {
      [activeClasses]: activeMenu === itemName,
      [hoverClasses]: activeMenu !== itemName
    })
  }, [activeMenu])

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 pt-4 pb-12">
      <nav className="relative backdrop-blur-md bg-white/70 rounded-lg shadow-lg border border-gray-200 inline-block overflow-hidden">
        <div className="flex items-center justify-center p-4">
          <ul className="flex items-center space-x-4">
            {menuItems.map((item) => (
              <li key={item.name} className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                  className={getMenuItemClasses(item.name, item.color.active, item.color.hover)}
                  aria-expanded={activeMenu === item.name}
                  aria-controls={`submenu-${item.name}`}
                >
                  <span className="flex items-center">
                    {item.name}
                    
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="h-px bg-gray-200 mx-4" aria-hidden="true"></div>
              <div className="max-h-[80vh] overflow-y-auto">
                <ul id={`submenu-${activeMenu}`} className="grid gap-2 px-4 py-4 bg-white/50 backdrop-blur-md rounded-b-lg">
                  {menuItems.find(item => item.name === activeMenu)?.submenu.map((subItem) => (
                    <li key={subItem}>
                      <a
                        href="#"
                        className={`block px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-700 ${menuItems.find(item => item.name === activeMenu)?.color.hover} hover:text-white`}
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}
