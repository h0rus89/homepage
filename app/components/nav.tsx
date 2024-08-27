"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const menuItems = [
  {
    name: 'Gemeinsam',
    submenu: ['Leitbild', 'Unser Miteinander', 'Schulleitung', 'Kollegium', 'Klassen', 'Schulsozialarbeit', 'Verwaltung', 'Nachmittagsbetreuung', 'Eltern- und Schülervertretung', 'Förderverein', 'Schulhund', 'unser Schulkonzept', 'Anmeldung'],
    activeClass: 'bg-pink-500 text-white',
    hoverClass: 'hover:bg-pink-600 hover:text-white',
    darkActiveClass: 'dark:bg-pink-600 dark:text-white',
    darkHoverClass: 'dark:hover:bg-pink-700 dark:hover:text-white',
    submenuHoverClass: 'hover:text-pink-500 dark:hover:text-pink-400'
  },
  {
    name: 'Aktiv',
    submenu: ['Schultag', 'News', 'AGs', 'Projekte', 'EinBlicke', 'Kooperationen', 'Graf-Anton-Tag', 'Schulbuchausleihe', 'Downloads/Formulare'],
    activeClass: 'bg-yellow-500 text-white',
    hoverClass: 'hover:bg-yellow-600 hover:text-white',
    darkActiveClass: 'dark:bg-yellow-600 dark:text-white',
    darkHoverClass: 'dark:hover:bg-yellow-700 dark:hover:text-white',
    submenuHoverClass: 'hover:text-yellow-500 dark:hover:text-yellow-400'
  },
  {
    name: 'Stark',
    submenu: ['Berufsorientierung', 'Schule ohne Rassismus-\nSchule mit Courage', 'MINT', 'Tag der offenen Tür', 'Digital? Na klar!', 'Abschlüsse', 'Links'],
    activeClass: 'bg-lime-500 text-white',
    hoverClass: 'hover:bg-lime-600 hover:text-white',
    darkActiveClass: 'dark:bg-lime-600 dark:text-white',
    darkHoverClass: 'dark:hover:bg-lime-700 dark:hover:text-white',
    submenuHoverClass: 'hover:text-lime-500 dark:hover:text-lime-400'
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-50 pt-4">
        <div className="flex justify-center">
          <nav ref={menuRef} className="inline-flex flex-col items-center backdrop-blur-md shadow-lg rounded-lg bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center justify-between p-4">
              <ul className="flex items-center space-x-4">
                {menuItems.map((item) => (
                  <li key={item.name} className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                      className={`px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        activeMenu === item.name
                          ? `${item.activeClass} ${item.darkActiveClass}`
                          : `text-gray-800 dark:text-gray-200 ${item.hoverClass} ${item.darkHoverClass}`
                      }`}
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
                  className="w-full overflow-hidden relative"
                >
                  <div className="h-px mx-4 bg-gray-200 dark:bg-gray-700 transition-colors duration-300" aria-hidden="true"></div>
                  <ul 
                    ref={submenuRef}
                    id={`submenu-${activeMenu}`} 
                    className="flex flex-col gap-2 px-4 py-4 rounded-b-lg max-h-[calc(100svh-7rem)] overflow-y-auto bg-white/90 dark:bg-gray-800/90 transition-colors duration-300"
                  >
                    {menuItems.find(item => item.name === activeMenu)?.submenu.map((subItem) => (
                      <li key={subItem}>
                        <a
                          href="#"
                          className={`block w-full px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-500 text-sm leading-tight ${menuItems.find(item => item.name === activeMenu)?.submenuHoverClass} whitespace-pre-line`}
                        >
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {showScrollIndicator && (
                    <div
                      className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-8 bg-gradient-to-t from-gray-200 dark:from-gray-800 to-transparent pointer-events-none"
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-6 h-6 animate-bounce text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
      <main className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Willkommen an unserer Schule</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Unsere Schule ist ein Ort des Lernens, der Entdeckung und des persönlichen Wachstums. Hier fördern wir nicht nur akademische Exzellenz, sondern auch Kreativität, kritisches Denken und soziale Verantwortung.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Unsere Gemeinschaft</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Wir legen großen Wert auf eine inklusive und unterstützende Gemeinschaft, in der jeder Schüler sein volles Potenzial entfalten kann.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Innovative Lernmethoden</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Unsere Lehrkräfte setzen modernste pädagogische Konzepte ein, um ein inspirierendes und effektives Lernumfeld zu schaffen.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Außerschulische Aktivitäten</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Von Sportteams bis zu Kunstclubs - wir bieten eine Vielzahl von Möglichkeiten zur persönlichen Entfaltung außerhalb des Klassenzimmers.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Zukunftsorientierte Bildung</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Wir bereiten unsere Schüler auf die Herausforderungen der Zukunft vor, indem wir digitale Kompetenzen und globales Denken fördern.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}