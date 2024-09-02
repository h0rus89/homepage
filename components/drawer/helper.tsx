import clsx from "clsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
}

interface ContentProps {
  items: string[];
}

interface FooterProps {
  setView: (view: string) => void;
}

export function Button({ children, onClick }) {
  return (
    <button
      data-vaul-no-drag=""
      className="flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
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
        "flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="mt-[21px] flex-shrink-0">
      <h2 className="mt-2.5 border-b border-[#F5F5F5] pb-6 text-[22px] font-semibold text-[#222222] md:font-medium">
        {title}
      </h2>
    </header>
  );
}

function Content({ items }: ContentProps) {
  return (
    <ScrollArea className="relative flex-grow-1">
      <ul className="max-h-[70vh] space-y-4 overflow-y-auto pb-6 pr-2 pt-6">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
      <ScrollBar />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-8 justify-center bg-gradient-to-t from-white to-transparent"></div>
      <div className="pointer-events-none absolute top-0 left-0 right-0 flex h-8 justify-center bg-gradient-to-b from-white to-transparent"></div>
    </ScrollArea>
  );
}

function Footer({ setView }: FooterProps) {
  return (
    <div className="mt-4 flex flex-shrink-0 gap-4">
      <SecondaryButton
        onClick={() => setView("default")}
        className="bg-[#F0F2F4] text-[#222222]"
      >
        Zurück
      </SecondaryButton>
      <SecondaryButton
        onClick={() => setView("default")}
        className="bg-[#4DAFFF] text-[#FFFFFF]"
      >
        Schließen
      </SecondaryButton>
    </div>
  );
}

export function Gemeinsam({ setView }) {
  return (
    <div className="flex max-h-[80vh] flex-col px-2">
      <Header title="Gemeinsam" />
      <Content items={menuItems.gemeinsam} />
      <Footer setView={setView} />
    </div>
  );
}

export function Aktiv({ setView }) {
  return (
    <div className="flex max-h-[80vh] flex-col px-2">
      <Header title="Aktiv" />
      <Content items={menuItems.aktiv} />
      <Footer setView={setView} />
    </div>
  );
}

export function Stark({ setView }) {
  return (
    <div className="flex max-h-[80vh] flex-col px-2">
      <Header title="Stark" />
      <Content items={menuItems.stark} />
      <Footer setView={setView} />
    </div>
  );
}

export function DefaultView({ setView }) {
  return (
    <>
      <header className="mb-4 flex h-[72px] items-center border-b border-[#F7F7F7] pl-2">
        <h2 className="text-[19px] font-semibold text-[#222222] md:font-medium">
          Menü
        </h2>
      </header>
      <div className="space-y-3">
        <Button onClick={() => setView("gemeinsam")}>Gemeinsam</Button>
        <Button onClick={() => setView("aktiv")}>Aktiv</Button>
        <Button onClick={() => setView("stark")}>Stark</Button>
      </div>
    </>
  );
}
