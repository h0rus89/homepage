"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultView, Gemeinsam, Aktiv, Stark } from "@/components/drawer/helper";
import { CloseIcon } from "@/components/drawer/icons";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  icon: React.ReactNode;
  label: string;
}

const IconButton = ({ onClick, href, icon, label }: ButtonProps) => (
  <Button
    variant="outline"
    size="icon"
    onClick={onClick}
    className="h-[44px] w-[44px] rounded-full border border-gray-200 bg-white text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button"
  >
    {href ? <Link href={href}>{icon}</Link> : icon}
    <span className="sr-only">{label}</span>
  </Button>
);

const buttonVariants = {
  hidden: { width: 0, opacity: 0, x: -20, scale: 0 },
  visible: { 
    width: 'auto', 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20
    } 
  },
  exit: { 
    width: 0,
    opacity: 0, 
    x: -20, 
    scale: 0, 
    transition: { 
      duration: 0.2 
    } 
  }
};

export default function FamilyDrawer() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleCloseDrawer = () => {
    setIsOpen(false);
    setView("default");
  };

  const checkCanGoBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const previousPage = document.referrer;
      const currentOrigin = window.location.origin;
      setCanGoBack(previousPage.startsWith(currentOrigin));
    }
  }, []);

  useEffect(() => {
    checkCanGoBack();
  }, [pathname, checkCanGoBack]);

  const content = useMemo(() => {
    const views = {
      default: <DefaultView setView={setView} />,
      stark: <Stark setView={setView} handleCloseDrawer={handleCloseDrawer} />,
      aktiv: <Aktiv setView={setView} handleCloseDrawer={handleCloseDrawer} />,
      gemeinsam: <Gemeinsam setView={setView} handleCloseDrawer={handleCloseDrawer} />,
    };
    return views[view as keyof typeof views];
  }, [view, handleCloseDrawer]);


  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-center p-4">
        <div className="flex items-center">
          <AnimatePresence initial={false}>
            {canGoBack && (
              <motion.div
                key="back"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mr-2"
              >
                <IconButton onClick={() => router.back()} icon={<ArrowLeft className="size-5" />} label="Back" />
              </motion.div>
            )}
          </AnimatePresence>
        
          <AnimatePresence initial={false}>
            {!isHomePage && (
              <motion.div
                key="home"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mr-2"
              >
                <IconButton href="/" icon={<Home className="size-5" />} label="Home" />
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
        </div>
      </div>

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