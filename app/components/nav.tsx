"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const menuItems = [
  {
    name: 'Gemeinsam',
    submenu: ['Leitbild', 'Unser Miteinander', 'Schulleitung', 'Kollegium', 'Klassen', 'Schulsozialarbeit', 'Verwaltung', 'Nachmittagsbetreuung', 'Eltern- und Schülervertretung', 'Förderverein', 'Schulhund', 'unser Schulkonzept', 'Anmeldung'],
    colorClass: 'bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700'
  },
  {
    name: 'Aktiv',
    submenu: ['Schultag', 'News', 'AGs', 'Projekte', 'EinBlicke', 'Kooperationen', 'Graf-Anton-Tag', 'Schulbuchausleihe', 'Downloads/Formulare'],
    colorClass: 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
  },
  {
    name: 'Stark',
    submenu: ['Berufsorientierung', 'Schule ohne Rassismus-Schule mit Courage', 'MINT', 'Tag der offenen Tür', 'Digital? Na klar!', 'Abschlüsse', 'Links'],
    colorClass: 'bg-lime-500 hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-700'
  }
]

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const checkScroll = () => {
      if (submenuRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = submenuRef.current
        setShowScrollIndicator(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight)
      }
    }

    checkScroll()
    submenuRef.current?.addEventListener('scroll', checkScroll)
    return () => submenuRef.current?.removeEventListener('scroll', checkScroll)
  }, [activeMenu])

  useEffect(() => {
    if (submenuRef.current) {
      submenuRef.current.scrollTop = 0
    }
  }, [activeMenu])

  const getMenuItemClasses = (itemName: string, colorClass: string) => {
    const baseClasses = "px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
    const activeClasses = `${colorClass} text-white`
    const inactiveClasses = "text-gray-800 dark:text-gray-200 hover:text-white"
    
    return `${baseClasses} ${activeMenu === itemName ? activeClasses : `${inactiveClasses} hover:${colorClass}`}`
  }

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.2,
        delay: 0.7 // Delay the appearance of the scroll indicator
      } 
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }

  return (
      <header className="fixed top-0 left-0 right-0 z-50 pt-4">
        <div className="flex justify-center">
          <nav ref={menuRef} className="inline-flex flex-col items-center backdrop-blur-md shadow-lg rounded-lg bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center justify-between p-4">
              <ul className="flex items-center space-x-4">
                {menuItems.map((item) => (
                  <li key={item.name} className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                      className={getMenuItemClasses(item.name, item.colorClass)}
                      aria-expanded={activeMenu === item.name}
                      aria-controls={`submenu-${item.name}`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <AnimatePresence>
              {activeMenu && (
                <motion.div
                  variants={submenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full overflow-hidden"
                >
                  <div className="h-px mx-4 bg-gray-200 dark:bg-gray-700 transition-colors duration-300" aria-hidden="true"></div>
                  <ul 
                    ref={submenuRef}
                    id={`submenu-${activeMenu}`} 
                    className="flex flex-col gap-2 px-4 py-4 rounded-b-lg max-h-80 overflow-y-auto bg-white/90 dark:bg-gray-800/90 transition-colors duration-300"
                  >
                    {menuItems.find(item => item.name === activeMenu)?.submenu.map((subItem) => (
                      <li key={subItem}>
                        <a
                          href="#"
                          className={`block w-full px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-500 hover:text-${activeMenu === 'Gemeinsam' ? 'pink' : activeMenu === 'Aktiv' ? 'yellow' : 'lime'}-500 text-sm leading-tight`}
                        >
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <AnimatePresence>
                    {showScrollIndicator && (
                      <motion.div
                        variants={scrollIndicatorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-8 bg-gradient-to-t from-gray-200 dark:from-gray-800 to-transparent pointer-events-none transition-colors duration-300"
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-6 h-6 animate-bounce text-gray-600 dark:text-gray-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
  )
}