import clsx from "clsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";

const menuItems = {
  gemeinsam: [
    "Leitbild",
    "Unser Miteinander",
    "Schulleitung",
    "Kollegium",
    "Klassen",
    "Schulsozialarbeit",
    "Verwaltung",
    "Nachmittagsbetreuung",
    "Eltern- und Schülervertretung",
    "Förderverein",
    "Schulhund",
    "unser Schulkonzept",
    "Anmeldung",
  ],
  aktiv: [
    "Schultag",
    "News",
    "AGs",
    "Projekte",
    "EinBlicke",
    "Kooperationen",
    "Graf-Anton-Tag",
    "Schulbuchausleihe",
    "Downloads/Formulare",
  ],
  stark: [
    "Berufsorientierung",
    "Schule ohne Rassismus - Schule mit Courage",
    "MINT",
    "Tag der offenen Tür",
    "Digital? Na klar!",
    "Abschlüsse",
    "Links",
  ],
};

interface HeaderProps {
  title: string;
  setView: (view: string) => void;
}

interface ContentProps {
  items: string[];
}

interface FooterProps {
  setView: (view: string) => void;
  handleCloseDrawer: () => void;
}

export function PrimaryButton({ children, onClick }) {
  return (
    <button
      data-vaul-no-drag=""
      className="flex h-12 w-full items-center gap-4 rounded-2xl bg-gray-100 px-4 text-lg font-semibold text-gray-900 transition-transform focus:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 md:font-medium"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, className }) {
  return (
    <button
      data-vaul-no-drag=""
      className={clsx(
        "flex h-12 w-full items-center justify-center gap-4 rounded-full text-center text-xl font-semibold transition-transform focus:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 md:font-medium",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Header({ title, setView }: HeaderProps) {
  return (
    <header className="mb-4 flex flex-shrink-0 h-16 items-center border-b border-gray-100">
      <button
        onClick={() => setView("default")}
        className="mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Zurück zum Hauptmenü"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>
      <h2 className="text-lg font-semibold text-gray-900 md:font-medium">
        {title}
      </h2>
    </header>
  );
}

function Content({ items }: ContentProps) {
  return (
    <ScrollArea className="relative flex-grow">
      <ul className="max-h-[70vh] space-y-4 overflow-y-auto">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm font-semibold text-gray-500 md:font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
      <ScrollBar />
    </ScrollArea>
  );
}

function Footer({ setView, handleCloseDrawer }: FooterProps) {
  return (
    <div className="mt-4 flex flex-shrink-0 gap-4">
      <SecondaryButton
        onClick={() => setView("default")}
        className="bg-gray-100 text-gray-900"
      >
        Zurück
      </SecondaryButton>
      <SecondaryButton
        onClick={handleCloseDrawer}
        className="bg-red-500 text-white"
      >
        Schließen
      </SecondaryButton>
    </div>
  );
}

export function Gemeinsam({ setView, handleCloseDrawer }) {
  return (
    <div className="flex max-h-[80vh] flex-col px-2">
      <Header title="Gemeinsam" setView={setView} />
      <Content items={menuItems.gemeinsam} />
      
    </div>
  );
}

export function Aktiv({ setView, handleCloseDrawer }) {
  return (
    <div className="flex max-h-[80vh] flex-col px-2">
      <Header title="Aktiv" setView={setView} />
      <Content items={menuItems.aktiv} />
      
    </div>
  );
}

export function Stark({ setView, handleCloseDrawer }) {
  return (
    <div className="flex max-h-[80vh] flex-col px-2">
      <Header title="Stark" setView={setView} />
      <Content items={menuItems.stark} />
      
    </div>
  );
}

export function DefaultView({ setView }) {
  return (
    <>
      <header className="mb-4 flex h-[72px] items-center border-b border-gray-100 pl-2">
        <h2 className="text-lg font-semibold text-gray-900 md:font-medium">
          Menü
        </h2>
      </header>
      <div className="space-y-3">
        <PrimaryButton onClick={() => setView("gemeinsam")}>Gemeinsam</PrimaryButton>
        <PrimaryButton onClick={() => setView("aktiv")}>Aktiv</PrimaryButton>
        <PrimaryButton onClick={() => setView("stark")}>Stark</PrimaryButton>
      </div>
    </>
  );
}
