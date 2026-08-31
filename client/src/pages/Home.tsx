/*
 * Obsidian Signal direction: a private, cinematic sci-fi systems interface.
 * This page uses slow staged reveals, asymmetric telemetry, signal cyan, and
 * motion that communicates detection and authorization rather than decoration.
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import DualMode from "@/components/DualMode";
import PlayerScan from "@/components/PlayerScan";
import PrivateServer from "@/components/PrivateServer";
import Advisor from "@/components/Advisor";
import MemoryArchive from "@/components/MemoryArchive";
import Achievements from "@/components/Achievements";
import UnknownLevel from "@/components/UnknownLevel";
import FinalLevel from "@/components/FinalLevel";

const CLASSIFICATIONS = [
  "GAMER",
  "STUDENT",
  "STRATEGIST",
  "TOPPER",
  "PRIVATE",
  "UNKNOWN",
];

const PARTICLE_COUNT = 64;

const TIMELINE = [
  { at: 0, stage: "boot" },
  { at: 3100, stage: "search" },
  { at: 6500, stage: "classify" },
  { at: 9700, stage: "detected" },
  { at: 12300, stage: "him" },
  { at: 15700, stage: "quote" },
  { at: 21100, stage: "access" },
] as const;

type Stage = (typeof TIMELINE)[number]["stage"];

type ParticleStyle = CSSProperties & {
  "--drift-x": string;
  "--drift-y": string;
  "--particle-scale": string;
};

function TypeLine({ value, speed = 88 }: { value: string; speed?: number }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= value.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, value]);

  return (
    <span aria-label={value} className="type-line">
      {value.slice(0, visibleCount)}
      <span className="type-cursor" aria-hidden="true" />
    </span>
  );
}

function ScanMarker({ label }: { label: string }) {
  return (
    <div className="scan-marker" aria-hidden="true">
      <span className="scan-marker-line" />
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("boot");
  const [classification, setClassification] = useState(CLASSIFICATIONS[0]);
  const [isExiting, setIsExiting] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [dualModeUnlocked, setDualModeUnlocked] = useState(false);
  const [privateServerUnlocked, setPrivateServerUnlocked] = useState(false);
  const [advisorUnlocked, setAdvisorUnlocked] = useState(false);
  const [memoryArchiveUnlocked, setMemoryArchiveUnlocked] = useState(false);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState(false);
  const [unknownLevelUnlocked, setUnknownLevelUnlocked] = useState(false);
  const [finalLevelUnlocked, setFinalLevelUnlocked] = useState(false);
  const [openingRun, setOpeningRun] = useState(0);
  const [continuityTransition, setContinuityTransition] = useState<string | null>(null);
  const transitionLock = useRef(false);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        const angle = (index * 47) % 360;
        const radius = 6 + ((index * 17) % 48);
        const left = 50 + Math.cos((angle * Math.PI) / 180) * radius;
        const top = 50 + Math.sin((angle * Math.PI) / 180) * radius;
        return {
          id: index,
          left: `${Math.max(2, Math.min(98, left))}%`,
          top: `${Math.max(4, Math.min(96, top))}%`,
          delay: `${(index % 16) * 0.24}s`,
          duration: `${5.5 + (index % 7) * 1.1}s`,
          driftX: `${((index % 5) - 2) * 5}px`,
          driftY: `${((index % 7) - 3) * 6}px`,
          scale: `${0.55 + (index % 5) * 0.17}`,
        };
      }),
    [],
  );

  useEffect(() => {
    const timers = TIMELINE.slice(1).map(({ at, stage: nextStage }) =>
      window.setTimeout(() => setStage(nextStage), at),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [openingRun]);

  useEffect(() => {
    if (stage !== "classify") {
      setClassification(CLASSIFICATIONS[0]);
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % CLASSIFICATIONS.length;
      setClassification(CLASSIFICATIONS[index]);
    }, 260);

    return () => window.clearInterval(interval);
  }, [stage]);

  const handleEnter = () => {
    if (isExiting || continuityTransition) return;
    setIsExiting(true);
    window.setTimeout(() => setHasEntered(true), 850);
    window.setTimeout(() => setIsExiting(false), 1180);
  };

  const moveToChapter = (label: string, activate: () => void) => {
    if (transitionLock.current) return;
    transitionLock.current = true;
    setContinuityTransition(label);
    window.setTimeout(activate, 520);
    window.setTimeout(() => {
      setContinuityTransition(null);
      transitionLock.current = false;
    }, 1120);
  };

  const sequenceNumber = TIMELINE.findIndex(({ stage: item }) => item === stage) + 1;

  return (
      <div className={`opening-shell ${memoryArchiveUnlocked || achievementsUnlocked || unknownLevelUnlocked || finalLevelUnlocked ? "opening-shell-archive" : ""} ${unknownLevelUnlocked ? "opening-shell-unknown" : ""} ${finalLevelUnlocked ? "opening-shell-final" : ""} ${isExiting ? "is-exiting" : ""} ${hasEntered ? "has-entered" : ""}`} data-stage={stage}>
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="grid-field" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />

      <div className="particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                "--drift-x": particle.driftX,
                "--drift-y": particle.driftY,
                "--particle-scale": particle.scale,
              } as ParticleStyle
            }
          />
        ))}
      </div>

      <div className="signal-rings" aria-hidden="true">
        <img src="/manus-storage/obsidian-signal-rings_5ea22319.png" alt="" />
      </div>

      <header className="hud-header">
        <div className="brand-lockup">
          <img
            className="brand-mark"
            src="/manus-storage/player-one-mark_5372262b.png"
            alt=""
          />
          <span className="brand-name">PLAYER 1: HIM</span>
        </div>
        <div className="transmission-status">
          <span className="status-dot" />
          <span>PRIVATE TRANSMISSION</span>
        </div>
      </header>

      <aside className="hud-rail" aria-hidden="true">
        <div className="rail-caption">P / 01</div>
        <div className="rail-track">
          <span className="rail-progress" style={{ height: `${(sequenceNumber / 7) * 100}%` }} />
        </div>
        <div className="rail-caption rail-caption-bottom">SIGNAL</div>
      </aside>

      <div className="hud-corner hud-corner-left" aria-hidden="true">
        <span>SYS // 042</span>
        <span>SECURE CHANNEL</span>
      </div>
      <div className="hud-corner hud-corner-right" aria-hidden="true">
        <span>LAT 07° 01′</span>
        <span>NODE ONLINE</span>
      </div>

      <div className="scan-beam" aria-hidden="true" />
      <ScanMarker label={stage === "search" ? "SEARCH VECTOR" : "SIGNAL LOCK"} />

      {finalLevelUnlocked ? (
        <FinalLevel
          onReplay={() => {
            setFinalLevelUnlocked(false);
            setUnknownLevelUnlocked(false);
            setContinuityTransition(null);
            transitionLock.current = false;
            setAchievementsUnlocked(false);
            setMemoryArchiveUnlocked(false);
            setAdvisorUnlocked(false);
            setPrivateServerUnlocked(false);
            setDualModeUnlocked(false);
            setHasEntered(false);
            setIsExiting(false);
            setStage("boot");
            setClassification(CLASSIFICATIONS[0]);
            setOpeningRun((run) => run + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : unknownLevelUnlocked ? (
        <UnknownLevel onComplete={() => moveToChapter("FINAL LEVEL / DEEPAK", () => setFinalLevelUnlocked(true))} />
      ) : achievementsUnlocked ? (
        <Achievements onComplete={() => moveToChapter("HIDDEN LEVEL / UNKNOWN", () => setUnknownLevelUnlocked(true))} />
      ) : memoryArchiveUnlocked ? (
        <MemoryArchive onComplete={() => moveToChapter("LEVEL 06 / ACHIEVEMENTS", () => setAchievementsUnlocked(true))} />
      ) : advisorUnlocked ? (
        <Advisor onComplete={() => moveToChapter("LEVEL 05 / MEMORY ARCHIVE", () => setMemoryArchiveUnlocked(true))} />
      ) : privateServerUnlocked ? (
        <PrivateServer onComplete={() => moveToChapter("LEVEL 04 / THE ADVISOR", () => setAdvisorUnlocked(true))} />
      ) : dualModeUnlocked ? (
        <DualMode onComplete={() => moveToChapter("LEVEL 03 / PRIVATE SERVER", () => setPrivateServerUnlocked(true))} />
      ) : hasEntered ? (
        <PlayerScan onComplete={() => moveToChapter("LEVEL 02 / DUAL MODE", () => setDualModeUnlocked(true))} />
      ) : (
      <section className="reveal-stage" aria-live="polite">
        <div className="stage-orbit orbit-one" aria-hidden="true" />
        <div className="stage-orbit orbit-two" aria-hidden="true" />
        <div className="reveal-content">
          {stage === "boot" && (
            <div className="beat beat-boot" key="boot">
              <span className="eyebrow">BOOT SEQUENCE / 01</span>
              <div className="loading-glyph" aria-hidden="true">
                <span className="loading-ring" />
                <span className="loading-core" />
              </div>
              <h1 className="system-line system-line-small">
                <TypeLine value="INITIALIZING..." speed={108} />
              </h1>
              <p className="microcopy">Establishing a private channel</p>
            </div>
          )}

          {stage === "search" && (
            <div className="beat beat-search" key="search">
              <span className="eyebrow">SEARCH PROTOCOL / 02</span>
              <div className="search-pulse" aria-hidden="true" />
              <h1 className="system-line system-line-small">
                <TypeLine value="SEARCHING FOR PLAYER..." speed={92} />
              </h1>
              <p className="microcopy">Scanning nearby signals</p>
            </div>
          )}

          {stage === "classify" && (
            <div className="beat beat-classify" key="classify">
              <span className="eyebrow">IDENTITY CLASSIFICATION / 03</span>
              <div className="classification-box">
                <span className="classification-prefix">[</span>
                <span className="classification-word" key={classification}>
                  {classification}
                </span>
                <span className="classification-prefix">]</span>
              </div>
              <div className="classification-meter" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => (
                  <span key={index} className={index < 9 ? "meter-on" : ""} />
                ))}
              </div>
              <p className="microcopy">Parsing player signature</p>
            </div>
          )}

          {stage === "detected" && (
            <div className="beat beat-detected" key="detected">
              <span className="eyebrow">SIGNAL ACQUIRED / 04</span>
              <div className="detected-seal" aria-hidden="true">
                <span className="seal-crosshair" />
                <span className="seal-ring" />
              </div>
              <h1 className="system-line system-line-major">PLAYER DETECTED<span className="ellipsis">…</span></h1>
              <p className="microcopy">Signal integrity: 100%</p>
            </div>
          )}

          {stage === "him" && (
            <div className="beat beat-him" key="him">
              <span className="eyebrow">IDENTITY CONFIRMED / 05</span>
              <h1 className="identity-line">HIM<span className="identity-period">.</span></h1>
              <div className="identity-underline" aria-hidden="true" />
              <p className="microcopy">No further classification required</p>
            </div>
          )}

          {stage === "quote" && (
            <div className="beat beat-quote" key="quote">
              <span className="eyebrow">OBSERVATION LOG / 06</span>
              <blockquote className="curiosity-copy">
                <span className="quote-line quote-line-one">Some players are easy to understand.</span>
                <span className="quote-line quote-line-two">This one isn&apos;t.</span>
              </blockquote>
              <div className="quote-rule" aria-hidden="true" />
              <p className="microcopy">Profile depth exceeds available data</p>
            </div>
          )}

          {stage === "access" && !hasEntered && (
            <div className="beat beat-access" key="access">
              <span className="eyebrow">PRIVATE SERVER / 07</span>
              <p className="access-kicker">The next move is yours.</p>
              <button className="enter-button" type="button" onClick={handleEnter}>
                <span className="button-bracket">[</span>
                <span>ENTER THE SERVER</span>
                <span className="button-bracket">]</span>
                <span className="button-sweep" aria-hidden="true" />
              </button>
              <p className="access-hint">Click to authorize connection</p>
            </div>
          )}

          {hasEntered && (
            <div className="beat beat-connected" key="connected">
              <span className="eyebrow">CONNECTION ESTABLISHED</span>
              <h1 className="system-line system-line-major">CHANNEL OPEN</h1>
              <p className="microcopy">Preparing the next sector</p>
            </div>
          )}
        </div>
      </section>
      )}

      <footer className="hud-footer">
        <span>PLAYER DOSSIER / CLASSIFIED</span>
        <span>DO NOT CLOSE THIS WINDOW</span>
      </footer>

      <div className="transition-flash" aria-hidden="true" />
      <div className="transition-curtain" aria-hidden="true" />

      {continuityTransition && (
        <div className="continuity-transition" role="status" aria-live="polite">
          <span className="continuity-transition-line" aria-hidden="true" />
          <span className="continuity-transition-kicker">CONNECTION HANDOFF / AUTHORIZED</span>
          <strong>{continuityTransition}</strong>
          <span className="continuity-transition-progress" aria-hidden="true"><i /></span>
        </div>
      )}
    </div>
  );
}
