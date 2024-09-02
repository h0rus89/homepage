"use client";

import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultView, Gemeinsam, Aktiv, Stark } from "@/components/drawer/helper";
import { CloseIcon } from "@/components/drawer/icons";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Funktion zum Schließen des Drawers
  const handleCloseDrawer = () => {
    setIsOpen(false);
    setView("default");
  };

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "stark":
        return <Stark setView={setView} handleCloseDrawer={handleCloseDrawer} />;
      case "aktiv":
        return <Aktiv setView={setView} handleCloseDrawer={handleCloseDrawer} />;
      case "gemeinsam":
        return <Gemeinsam setView={setView} handleCloseDrawer={handleCloseDrawer} />;
    }
  }, [view, handleCloseDrawer]);

  return (
    <>
      <motion.div className="sticky top-0 flex items-center justify-center" layout>
        <AnimatePresence mode="popLayout">
          {!isHomePage && (
            <motion.div
              className="mr-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring"}}
              layout
            >
              <Button
                variant="outline"
                size="icon"
                asChild
                className="h-[44px] w-[44px] rounded-full border border-gray-200 bg-white text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button"
              >
                <Link href="/">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium"
        >
          Menü
        </Button>
      </motion.div>

      <Drawer.Root 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setView("default");
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-10 bg-black/30"
            onClick={handleCloseDrawer}
          />
          <Drawer.Content
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-none md:mx-auto md:w-full"
          >
            <motion.div
              animate={{
                height: bounds.height,
                transition: {
                  duration: 0.27,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
            >
              <Drawer.Close asChild>
                <button
                  data-vaul-no-drag=""
                  className="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
                  onClick={handleCloseDrawer}
                >
                  <CloseIcon />
                </button>
              </Drawer.Close>
              <div ref={elementRef} className="px-6 pb-6 pt-2.5 antialiased">
                <AnimatePresence initial={false} mode="popLayout" custom={view}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    key={view}
                    transition={{
                      duration: 0.27,
                      ease: [0.26, 0.08, 0.25, 1],
                    }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}