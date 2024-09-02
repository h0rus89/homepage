import clsx from "clsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


const menuItems = {
  gemeinsam: [
    'Leitbild',
    'Unser Miteinander',
    'Schulleitung',
    'Kollegium',
    'Klassen',
    'Schulsozialarbeit',
    'Verwaltung',
    'Nachmittagsbetreuung',
    'Eltern- und Schülervertretung',
    'Förderverein',
    'Schulhund',
    'unser Schulkonzept',
    'Anmeldung'
  ],
  aktiv: [
    'Schultag',
    'News',
    'AGs',
    'Projekte',
    'EinBlicke',
    'Kooperationen',
    'Graf-Anton-Tag',
    'Schulbuchausleihe',
    'Downloads/Formulare'
  ],
  stark: [
    'Berufsorientierung',
    'Schule ohne Rassismus-\nSchule mit Courage',
    'MINT',
    'Tag der offenen Tür',
    'Digital? Na klar!',
    'Abschlüsse',
    'Links'
  ]
};

export function Button({ children, onClick }) {
  return (
    <button
      data-vaul-no-drag=""
      className=" flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
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
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Header({ title }) {
  return (
    <header className="mt-[21px]">
      <h2 className="mt-2.5 text-[22px] font-semibold text-[#222222] md:font-medium pb-6 border-b border-[#F5F5F5]">
        {title}
      </h2>
    </header>
  );
}

function ScrollableList({ children }: { children: React.ReactNode }) {
  
  return (
    <ScrollArea className="relative">
      <ul className="pb-8 space-y-4  pt-6 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
        {children}
      </ul>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 flex justify-center h-8 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
    
    </ScrollArea>
  );
}

export function Gemeinsam({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header title="Gemeinsam" />
        <ScrollableList>
          {menuItems.gemeinsam.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
              {item}
            </li>
          ))}
        </ScrollableList>
      </div>
      <div className="mt-4 flex gap-4">
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
    </div>
  );
}

export function Aktiv({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header title="Aktiv" />
        <ScrollableList>
          {menuItems.aktiv.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
              {item}
            </li>
          ))}
        </ScrollableList>
      </div>
      <div className="mt-4 flex gap-4">
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
    </div>
  );
}

export function Stark({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header title="Stark" />
        <ScrollableList>
          {menuItems.stark.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
              {item}
            </li>
          ))}
        </ScrollableList>
      </div>
      <div className="mt-4 flex gap-4">
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
        <Button
          onClick={() => {
            setView("gemeinsam");
          }}
        >
          Gemeinsam
        </Button>
        <Button
          onClick={() => {
            setView("aktiv");
          }}
        >
          Aktiv
        </Button>
        <Button
          onClick={() => {
            setView("stark");
          }}
        >
          Stark
        </Button>
      </div>
    </>
  );
}
