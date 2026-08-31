/*
 * Obsidian Signal direction: Level 05 is a quiet discovery chamber.
 * Exactly two user-provided memories float at different depths; the system
 * reveals only what the visitor actively chooses to unlock.
 */
import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from "react";
import { MEMORY_ASSETS, type MemoryId } from "@/lib/memoryAssets";

type ArchivePhase = "archive" | "found" | "complete" | "encrypted" | "level06";

type MemoryCardProps = {
  id: MemoryId;
  label: string;
  fileName: string;
  src: string;
  isFocused: boolean;
  isViewed: boolean;
  isInteractive: boolean;
  onOpen: (id: MemoryId) => void;
  onClose: () => void;
};

function useArchiveParticles() {
  return useMemo(
    () =>
      Array.from({ length: 54 }, (_, index) => ({
        id: index,
        left: `${4 + ((index * 43) % 91)}%`,
        top: `${5 + ((index * 61) % 88)}%`,
        delay: `${(index % 17) * 0.22}s`,
        duration: `${5.2 + (index % 9) * 0.62}s`,
        driftX: `${((index % 5) - 2) * 8}px`,
        driftY: `${((index % 7) - 3) * 11}px`,
        size: `${1 + (index % 3)}px`,
      })),
    [],
  );
}

function MemoryCard({
  id,
  label,
  fileName,
  src,
  isFocused,
  isViewed,
  isInteractive,
  onOpen,
  onClose,
}: MemoryCardProps) {
  const [imageReady, setImageReady] = useState(true);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isInteractive || isFocused) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(id);
    }
  };

  return (
    <article
      className={`memory-card memory-card-${id} ${isFocused ? "is-focused" : ""} ${isViewed ? "is-viewed" : ""} ${!isInteractive ? "is-locked" : ""}`}
      role="button"
      tabIndex={isInteractive && !isFocused ? 0 : -1}
      aria-label={`${label}${isViewed ? " — viewed" : " — classified"}`}
      aria-disabled={!isInteractive}
      onClick={() => {
        if (isInteractive && !isFocused) onOpen(id);
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="memory-card-shell">
        <div className="memory-card-topline">
          <span className="memory-card-label">{label}</span>
          <span className="memory-card-status">{isViewed ? "VIEWED" : "CLASSIFIED"}</span>
        </div>

        <div className="memory-image-wrap">
          {imageReady ? (
            <img
              className="memory-image"
              src={src}
              alt={`User-provided photo for ${label}`}
              onError={() => setImageReady(false)}
            />
          ) : (
            <div className="memory-image-placeholder" aria-label={`Place ${fileName} here`}>
              <span>PHOTO SLOT / {label}</span>
              <small>{fileName}</small>
            </div>
          )}
          <div className="memory-image-grain" aria-hidden="true" />
          {!isViewed && (
            <div className="classified-overlay" aria-hidden="true">
              <span className="classified-bracket">[</span>
              <strong>CLASSIFIED</strong>
              <span className="classified-bracket">]</span>
              <small>CLICK TO DECRYPT</small>
            </div>
          )}
          {isViewed && <div className="unlock-scan" aria-hidden="true" />}
        </div>

        {isFocused && (
          <div className="memory-caption" onClick={(event) => event.stopPropagation()}>
            <div>
              <span className="memory-caption-kicker">{label} / UNLOCKED</span>
              <p>Add a caption here...</p>
            </div>
            <div className="memory-caption-actions">
              <div className="memory-switcher" aria-label="Switch between memories">
                {MEMORY_ASSETS.map((memory) => (
                  <button
                    className={`memory-switch-button ${memory.id === id ? "is-current" : ""}`}
                    key={memory.id}
                    type="button"
                    onClick={() => onOpen(memory.id)}
                  >
                    {memory.label}
                  </button>
                ))}
              </div>
              <button className="memory-close" type="button" onClick={onClose}>
                <span>[</span>
                <strong>CLOSE MEMORY</strong>
                <span>]</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <span className="memory-card-depth" aria-hidden="true">DEPTH / {id === "memory-01" ? "01" : "02"}</span>
    </article>
  );
}

function ArchiveEvent({ phase }: { phase: ArchivePhase }) {
  return (
    <div className={`archive-event archive-event-${phase}`} aria-live="polite">
      {phase === "found" && (
        <div className="archive-event-beat" key="found">
          <span className="archive-kicker">MEMORY INDEX / RESOLVED</span>
          <h1>MEMORIES FOUND: 2</h1>
          <div className="archive-event-rule" aria-hidden="true" />
        </div>
      )}

      {phase === "complete" && (
        <div className="archive-event-beat" key="complete">
          <span className="archive-kicker">ARCHIVE STATUS / COMPLETE</span>
          <h1>ARCHIVE COMPLETE.</h1>
          <p>Two memories unlocked by trust.</p>
        </div>
      )}

      {phase === "encrypted" && (
        <div className="archive-event-beat archive-event-encrypted-beat" key="encrypted">
          <span className="archive-kicker">FINAL FILE / ENCRYPTED</span>
          <p>But one file remains encrypted.</p>
          <div className="unknown-file" aria-label="Unknown file, locked and unavailable">
            <span className="unknown-file-corner unknown-file-corner-one" />
            <span className="unknown-file-corner unknown-file-corner-two" />
            <span className="unknown-file-icon" aria-hidden="true">?</span>
            <strong>UNKNOWN</strong>
            <small>ACCESS DENIED</small>
          </div>
        </div>
      )}

      {phase === "level06" && (
        <div className="archive-event-beat archive-event-level06" key="level06">
          <span className="archive-kicker">NEXT SECTOR / REQUIRED</span>
          <h1>LEVEL 06 REQUIRED.</h1>
          <div className="level06-transition-rule" aria-hidden="true"><span /></div>
          <p>Something remains beyond the archive.</p>
        </div>
      )}
    </div>
  );
}

type MemoryArchiveProps = {
  onComplete?: () => void;
};

export default function MemoryArchive({ onComplete }: MemoryArchiveProps) {
  const [focusedId, setFocusedId] = useState<MemoryId | null>(null);
  const [viewedIds, setViewedIds] = useState<MemoryId[]>([]);
  const [phase, setPhase] = useState<ArchivePhase>("archive");
  const particles = useArchiveParticles();

  const handleOpen = (id: MemoryId) => {
    if (phase !== "archive") return;
    setFocusedId(id);
    setViewedIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const handleClose = () => {
    setFocusedId(null);
    if (viewedIds.length === MEMORY_ASSETS.length) setPhase("found");
  };

  useEffect(() => {
    if (phase !== "level06" || !onComplete) return;
    const timer = window.setTimeout(onComplete, 2200);
    return () => window.clearTimeout(timer);
  }, [onComplete, phase]);

  useEffect(() => {
    const phaseDelays: Partial<Record<ArchivePhase, { next: ArchivePhase; delay: number }>> = {
      found: { next: "complete", delay: 3000 },
      complete: { next: "encrypted", delay: 4100 },
      encrypted: { next: "level06", delay: 4300 },
    };
    const followup = phaseDelays[phase];
    if (!followup) return;
    const timer = window.setTimeout(() => setPhase(followup.next), followup.delay);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const sceneStyle = {
    "--memory-count": `${viewedIds.length}`,
  } as CSSProperties;

  return (
    <section className={`memory-archive archive-phase-${phase} ${focusedId ? "has-focus" : ""}`} style={sceneStyle} aria-live="polite">
      <div className="archive-ambient" aria-hidden="true" />
      <div className="archive-grid" aria-hidden="true" />
      <div className="archive-scanline archive-scanline-one" aria-hidden="true" />
      <div className="archive-scanline archive-scanline-two" aria-hidden="true" />
      <div className="archive-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="archive-particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
                "--memory-drift-x": particle.driftX,
                "--memory-drift-y": particle.driftY,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="archive-topline">
        <span>LEVEL 05</span>
        <span className="archive-topline-rule" />
        <span>MEMORY ARCHIVE</span>
      </div>

      <div className="archive-side-label archive-side-label-left" aria-hidden="true">
        <span>ARCHIVE / PRIVATE</span>
        <span>DEPTH: VARIABLE</span>
      </div>
      <div className="archive-side-label archive-side-label-right" aria-hidden="true">
        <span>FILES / 02</span>
        <span>ACCESS: TRUSTED</span>
      </div>

      <div className="archive-intro">
        <span className="archive-kicker">PRIVATE MEMORY ARCHIVE / 05</span>
        <h1>Some things are only visible<br />when you look closer.</h1>
        <p>Two files detected. Choose what to unlock.</p>
      </div>

      <div className="archive-stage">
        <div className="archive-stage-orbit archive-stage-orbit-one" aria-hidden="true" />
        <div className="archive-stage-orbit archive-stage-orbit-two" aria-hidden="true" />
        {MEMORY_ASSETS.map((memory) => (
          <MemoryCard
            key={memory.id}
            id={memory.id}
            label={memory.label}
            fileName={memory.fileName}
            src={memory.src}
            isFocused={focusedId === memory.id}
            isViewed={viewedIds.includes(memory.id)}
            isInteractive={phase === "archive"}
            onOpen={handleOpen}
            onClose={handleClose}
          />
        ))}
      </div>

      <div className="archive-index">
        <span>MEMORIES VIEWED</span>
        <strong>{viewedIds.length} / 2</strong>
        <div className="archive-index-bars" aria-hidden="true">
          <i className={viewedIds.includes("memory-01") ? "is-on" : ""} />
          <i className={viewedIds.includes("memory-02") ? "is-on" : ""} />
        </div>
      </div>

      {phase !== "archive" && <ArchiveEvent phase={phase} />}

      <div className="archive-bottomline">
        <span>{phase === "level06" ? "ARCHIVE HELD" : "DO NOT OPEN WHAT YOU ARE NOT READY TO SEE"}</span>
        <span className="archive-progress"><i className="is-on" /><i className={viewedIds.length > 0 ? "is-on" : ""} /><i className={viewedIds.length > 1 ? "is-on" : ""} /><i /><i /><i /><i /></span>
        <span>MEMORY CHANNEL / {phase === "archive" ? "LISTENING" : "RESOLVED"}</span>
      </div>

      <div className="archive-transition-flash" aria-hidden="true" />
    </section>
  );
}
