import { useState } from "react";

const columns = [
  { title: "Column One", text: "This is content for column one." },
  { title: "Column Two", text: "This is content for column two." },
  { title: "Column Three", text: "This is content for column three." },
  { title: "Column Four", text: "This is content for column four." },
  { title: "Column Five", text: "This is content for column five." },
  { title: "Column Six", text: "This is content for column six." },
  { title: "Column Seven", text: "This is content for column seven." },
];

export default function RotatingSlider() {
  const [active, setActive] = useState(0); // Start with first column active
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleColumnClick = (index) => {
    setActive(index);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-900 text-white md:flex-row flex-col">
      {columns.map((col, i) => {
        const isActive = active === i;
        const isHovered = hoveredColumn === i;
        const showContent = isActive || isHovered;
        const showRotatedTitle = isActive || isHovered;
        const isLastColumn = i === columns.length - 1;

        return (
          <div
            key={i}
            tabIndex={0}
            onClick={() => handleColumnClick(i)}
            onMouseEnter={() => setHoveredColumn(i)}
            onMouseLeave={() => setHoveredColumn(null)}
            onFocus={() => setHoveredColumn(i)}
            onBlur={() => setHoveredColumn(null)}
            className={`relative cursor-pointer outline-none transition-all duration-500 ease-in-out will-change-[width] md:h-full h-[calc(100vh/7)] ${!isLastColumn ? 'border-r border-neutral-700' : ''}`}
            style={{
              background:
                i === 0 ? "#2b2b2b" :
                i === 1 ? "#333" :
                i === 2 ? "#3b3b3b" : 
                i === 3 ? "#444" :
                i === 4 ? "#4a4a4a" :
                i === 5 ? "#555" :
                "#5a5a5a",
              flexShrink: 0,
              width: window.innerWidth >= 768 ? (
                // If hovering on any column, only that column expands
                hoveredColumn !== null ? (
                  hoveredColumn === i ? `calc(100% - ${(columns.length - 1) * 120}px)` : "120px"
                ) : (
                  // If not hovering, show active column expanded or default to first column
                  isActive ? `calc(100% - ${(columns.length - 1) * 120}px)` : 
                  (i === 0 && active === 0) ? `calc(100% - ${(columns.length - 1) * 120}px)` : "120px"
                )
              ) : "100%"
            }}
          >
            {/* TITLE */}
            <div
              className={`
                absolute font-bold text-lg transition-all duration-500 ease-in-out
                md:left-3 left-3
                ${showRotatedTitle 
                  ? "md:top-20 md:[writing-mode:vertical-rl] md:origin-top-left md:-rotate-90 top-3" 
                  : "md:top-3 md:[writing-mode:vertical-rl] md:origin-top-left md:rotate-0 top-3"
                }
              `}
              style={{
                writingMode: window.innerWidth >= 768 ? "vertical-rl" : "horizontal-tb",
                transform: window.innerWidth >= 768 && showRotatedTitle ? "rotate(-90deg)" : "none",
                transformOrigin: "left top"
              }}
            >
              {col.title}
            </div>

            {/* CONTENT */}
            <div
              className={`
                max-w-xs p-5 transition-all duration-700
                md:absolute md:right-5 relative
                ${showContent 
                  ? "md:opacity-100 md:bottom-10 opacity-100" 
                  : "md:opacity-0 md:-bottom-52 opacity-100"
                }
              `}
              style={{
                transitionDelay: showContent ? "0.4s" : "0s"
              }}
            >
              <p className="mb-3">{col.text}</p>

              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm text-black hover:bg-gray-100 transition-colors"
              >
                Learn more
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/70">
                  <span className="absolute inset-0 rounded-full bg-white/70 animate-ping"></span>
                </span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
