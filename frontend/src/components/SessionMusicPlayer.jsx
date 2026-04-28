import { useState, useEffect } from "react";

export default function SessionMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFirstInteraction = () => {
      if (!hasStarted) {
        setHasStarted(true);
        setIsPlaying(true);
      }
      
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };
  }, [hasStarted]);

  const togglePlay = () => {
    setHasStarted(true);
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <div style={{ position: "absolute", top: "-500px", left: "-500px", width: "200px", height: "200px", overflow: "hidden" }}>
        {hasStarted && isPlaying && (
          <iframe
            width="200"
            height="200"
            src="https://www.youtube-nocookie.com/embed/nUt-QFikCrQ?autoplay=1&start=99&controls=0&rel=0"
            allow="autoplay; encrypted-media; picture-in-picture"
            frameBorder="0"
          />
        )}
      </div>

      <button
        onClick={togglePlay}
        title={isPlaying ? "Pause Portals" : "Play Portals"}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 9999,
          background: "#121212",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
          transition: "transform 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.background = "#1f1f1f";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#121212";
        }}
      >
        {isPlaying ? (
          // Pause Icon
          <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          // Play Icon
          <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </>
  );
}
