/*
 * Obsidian Signal direction: Level 01 is a sparse player-analysis chamber.
 * The scanner is the visual anchor; each trait arrives as an individual signal,
 * holds long enough to read, then dissolves before the next classification.
 */
import { useEffect, useMemo, useState } from "react";

const TRAITS = [
  { glyph: "🎮", label: "GAMER", code: "INPUT PROFILE", detail: "High pattern recognition" },
  { glyph: "📚", label: "TOPPER", code: "COGNITIVE INDEX", detail: "Consistently above threshold" },
  { glyph: "🧠", label: "STRATEGIST", code: "DECISION MODEL", detail: "Always calculating the next move" },
  { glyph: "🔐", label: "PRIVATE", code: "ACCESS LAYER", detail: "Restricted by choice" },
  { glyph: "🤝", label: "TRUSTED", code: "CONNECTION STATUS", detail: "Open channel detected" },
] as const;

const PARTICLE_COUNT = 44;

const SCAN_TIMELINE = [
  { at: 850, phase: "analyzing" },
  { at: 3100, phase: "characteristic", traitIndex: 0 },
  { at: 5850, phase: "characteristic", traitIndex: 1 },
  { at: 8600, phase: "characteristic", traitIndex: 2 },
  { at: 11350, phase: "characteristic", traitIndex: 3 },
  { at: 14100, phase: "characteristic", traitIndex: 4 },
  { at: 17100, phase: "complete" },
  { at: 20200, phase: "anomaly" },
  { at: 23300, phase: "question" },
  { at: 27300, phase: "accessing" },
  { at: 31100, phase: "level02" },
] as const;

type ScanPhase = (typeof SCAN_TIMELINE)[number]["phase"] | "boot";

type Particle = {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  driftX: string;
  driftY: string;
};

function useScanParticles(): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        id: index,
        left: `${4 + ((index * 37) % 92)}%`,
        top: `${8 + ((index * 53) % 80)}%`,
        delay: `${(index % 12) * 0.35}s`,
        duration: `${5.5 + (index % 6) * 0.85}s`,
        driftX: `${((index % 5) - 2) * 10}px`,
        driftY: `${((index % 7) - 3) * 9}px`,
      })),
    [],
  );
}

export default function PlayerScan({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<ScanPhase>("boot");
  const [traitIndex, setTraitIndex] = useState(-1);
  const [traitVisible, setTraitVisible] = useState(false);
  const particles = useScanParticles();
  const activeTrait = traitIndex >= 0 ? TRAITS[traitIndex] : null;

  useEffect(() => {
    const timers = SCAN_TIMELINE.map((event) => {
      const { at, phase: nextPhase } = event;
      const nextTrait = "traitIndex" in event ? event.traitIndex : undefined;

      return window.setTimeout(() => {
        setPhase(nextPhase);
        if (nextTrait !== undefined) {
          setTraitVisible(false);
          window.setTimeout(() => {
            setTraitIndex(nextTrait);
            setTraitVisible(true);
          }, 340);
        } else {
          setTraitVisible(false);
        }
      }, at);
    });

    const completeTimer = window.setTimeout(onComplete, 32900);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const phaseNumber =
    phase === "boot" || phase === "analyzing"
      ? "01"
      : phase === "characteristic"
        ? "02"
        : phase === "complete"
          ? "03"
          : phase === "anomaly"
            ? "04"
            : phase === "question"
              ? "05"
              : phase === "accessing"
                ? "06"
                : "07";

  return (
    <section className={`player-scan scan-phase-${phase}`} aria-live="polite">
      <div className="scan-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="scan-particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                "--scan-drift-x": particle.driftX,
                "--scan-drift-y": particle.driftY,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="scan-lines" aria-hidden="true" />
      <div className="scan-sweep scan-sweep-one" aria-hidden="true" />
      <div className="scan-sweep scan-sweep-two" aria-hidden="true" />

      <div className="scan-topline">
        <span>LEVEL 01</span>
        <span className="scan-topline-rule" />
        <span>PLAYER SCAN</span>
      </div>

      <div className="scan-side-label scan-side-left" aria-hidden="true">
        <span>SCAN / {phaseNumber}</span>
        <span>LIVE ANALYSIS</span>
      </div>
      <div className="scan-side-label scan-side-right" aria-hidden="true">
        <span>PRIVATE NODE</span>
        <span>MEMORY: LOCKED</span>
      </div>

      <div className="scan-panel scan-panel-left" aria-hidden="true">
        <span className="panel-title">BIOMETRIC TRACE</span>
        <span className="panel-value">STABLE</span>
        <span className="panel-bars"><i /><i /><i /><i /><i /></span>
      </div>
      <div className="scan-panel scan-panel-right" aria-hidden="true">
        <span className="panel-title">SIGNAL STRENGTH</span>
        <span className="panel-value">98.7%</span>
        <span className="panel-line" />
      </div>

      <div className="scan-core-zone">
        <div className="scanner-disc" aria-hidden="true">
          <div className="scanner-outer scanner-outer-one" />
          <div className="scanner-outer scanner-outer-two" />
          <div className="scanner-grid" />
          <div className="scanner-crosshair" />
          <div className="scanner-sweep" />
          <span className="scanner-core-dot" />
        </div>

        <div className="scan-readout">
          {phase === "boot" && (
            <div className="scan-beat scan-beat-boot" key="boot">
              <span className="scan-kicker">SECTOR UNLOCKED / 01</span>
              <h1>PLAYER SCAN</h1>
              <p>Opening a narrow channel</p>
            </div>
          )}

          {phase === "analyzing" && (
            <div className="scan-beat scan-beat-analyzing" key="analyzing">
              <span className="scan-kicker">IDENTITY ANALYSIS / 01</span>
              <h1>ANALYZING PLAYER<span className="scan-ellipsis">...</span></h1>
              <div className="scan-loading-bar" aria-hidden="true"><span /></div>
              <p>Comparing visible signals</p>
            </div>
          )}

          {phase === "characteristic" && activeTrait && traitVisible && (
            <div className="scan-beat scan-beat-trait" key={activeTrait.label}>
              <div className="trait-tag">
                <span className="trait-glyph" aria-hidden="true">{activeTrait.glyph}</span>
                <span>{activeTrait.code}</span>
              </div>
              <h1 className="trait-label">{activeTrait.label}</h1>
              <p className="trait-detail">{activeTrait.detail}</p>
              <div className="trait-progress" aria-hidden="true"><span /></div>
            </div>
          )}

          {phase === "complete" && (
            <div className="scan-beat scan-beat-complete" key="complete">
              <span className="scan-kicker">ANALYSIS FINISHED / 03</span>
              <h1>PROFILE COMPLETE<span className="scan-ellipsis">.</span></h1>
              <p>Five signals confirmed</p>
            </div>
          )}

          {phase === "anomaly" && (
            <div className="scan-beat scan-beat-anomaly" key="anomaly">
              <span className="scan-kicker">SYSTEM ANOMALY / 04</span>
              <h1>BUT SOMETHING<br />DOESN&apos;T ADD UP<span className="scan-ellipsis">...</span></h1>
              <div className="anomaly-line" aria-hidden="true"><span /></div>
              <p>Unresolved signal in private channel</p>
            </div>
          )}

          {phase === "question" && (
            <div className="scan-beat scan-beat-question" key="question">
              <span className="scan-kicker">UNRESOLVED QUERY / 05</span>
              <h1>WHY DOES A PRIVATE PLAYER<br />HAVE AN OPEN CONNECTION?</h1>
              <p>Query withheld from current access level</p>
            </div>
          )}

          {phase === "accessing" && (
            <div className="scan-beat scan-beat-accessing" key="accessing">
              <span className="scan-kicker">ROUTING TO NEXT SECTOR / 06</span>
              <h1>ACCESSING LEVEL 02<span className="scan-ellipsis">...</span></h1>
              <div className="scan-loading-bar scan-loading-bar-long" aria-hidden="true"><span /></div>
              <p>Do not close the connection</p>
            </div>
          )}

          {phase === "level02" && (
            <div className="scan-beat scan-beat-level-two" key="level02">
              <span className="scan-kicker">NEXT SECTOR / RESERVED</span>
              <h1>LEVEL 02</h1>
              <div className="sealed-line" aria-hidden="true"><span>CONTENT SEALED</span></div>
              <p>Signal waiting for the next move</p>
            </div>
          )}
        </div>
      </div>

      <div className="scan-bottomline">
        <span>PLAYER SIGNATURE / UNRESOLVED</span>
        <span className="scan-bottom-progress"><i /><i /><i /><i /><i /><i /><i /></span>
        <span>KEEP WATCHING</span>
      </div>
    </section>
  );
}
