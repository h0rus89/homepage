import React from "react";
import clsx from "clsx";

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
      <h2 className="mt-2.5 text-[22px] font-semibold text-[#222222] md:font-medium">
        {title}
      </h2>
    </header>
  );
}

export function Gemeinsam({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header
          title="Gemeinsam"
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6 max-h-[70vh] overflow-y-auto">
          {menuItems.gemeinsam.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
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
        <Header
          title="Aktiv"
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6 max-h-[70vh] overflow-y-auto">
          {menuItems.aktiv.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
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
        <Header
          title="Stark"
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6 max-h-[70vh] overflow-y-auto">
          {menuItems.stark.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
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