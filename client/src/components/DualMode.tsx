/*
 * Obsidian Signal direction: Level 02 is a controlled split-screen study.
 * The left channel behaves like an input system, the right like a focus system;
 * both move independently before converging into one classified player.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";

const DUAL_TIMELINE = [
  { at: 1200, phase: "active" },
  { at: 7800, phase: "merge" },
  { at: 9800, phase: "dualClass" },
  { at: 12400, phase: "time" },
  { at: 15700, phase: "interesting" },
  { at: 18900, phase: "dark" },
  { at: 20700, phase: "detected" },
  { at: 23400, phase: "you" },
  { at: 26600, phase: "unlock" },
] as const;

type DualPhase = (typeof DUAL_TIMELINE)[number]["phase"] | "intro";

const PARTICLE_COUNT = 42;

function useDualParticles() {
  return useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        id: index,
        left: `${3 + ((index * 43) % 94)}%`,
        top: `${6 + ((index * 59) % 86)}%`,
        delay: `${(index % 13) * 0.31}s`,
        duration: `${5 + (index % 7) * 0.8}s`,
        driftX: `${((index % 5) - 2) * 8}px`,
        driftY: `${((index % 7) - 3) * 9}px`,
      })),
    [],
  );
}

function ModeTelemetry({ side }: { side: "gamer" | "topper" }) {
  const isGamer = side === "gamer";

  return (
    <div className={`mode-telemetry mode-telemetry-${side}`}>
      <div className="mode-telemetry-title">
        <span>{isGamer ? "INPUT SYSTEM" : "FOCUS SYSTEM"}</span>
        <span className="mode-live-dot" />
      </div>
      <div className="mode-stat-row">
        <span>{isGamer ? "MODE" : "MODE"}</span>
        <strong>ACTIVE</strong>
      </div>
      <div className="mode-stat-row">
        <span>{isGamer ? "SESSION" : "CYCLE"}</span>
        <strong>{isGamer ? "OPEN" : "LOCKED"}</strong>
      </div>
      <div className="mode-stat-row">
        <span>{isGamer ? "PATTERN" : "FOCUS"}</span>
        <strong>{isGamer ? "READY" : "DEEP"}</strong>
      </div>
      <div className="mode-stat-bars" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <i key={index} style={{ animationDelay: `${index * 90}ms` }} />
        ))}
      </div>
    </div>
  );
}

export default function DualMode({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<DualPhase>("intro");
  const particles = useDualParticles();

  useEffect(() => {
    const timers = DUAL_TIMELINE.map(({ at, phase: nextPhase }) =>
      window.setTimeout(() => setPhase(nextPhase), at),
    );
    const completeTimer = window.setTimeout(onComplete, 29300);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const isSplitVisible = phase === "intro" || phase === "active" || phase === "merge";
  const isDarkPause = phase === "dark";

  return (
    <section className={`dual-mode dual-phase-${phase}`} aria-live="polite">
      <div className="dual-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="dual-particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                "--dual-drift-x": particle.driftX,
                "--dual-drift-y": particle.driftY,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="dual-grid" aria-hidden="true" />
      <div className="dual-scanline dual-scanline-one" aria-hidden="true" />
      <div className="dual-scanline dual-scanline-two" aria-hidden="true" />

      <div className="dual-header">
        <span>LEVEL 02</span>
        <span className="dual-header-rule" />
        <span>DUAL MODE</span>
      </div>

      <div className="dual-side-label dual-side-label-left" aria-hidden="true">
        <span>MODE / A</span>
        <span>INPUT CHANNEL</span>
      </div>
      <div className="dual-side-label dual-side-label-right" aria-hidden="true">
        <span>MODE / B</span>
        <span>FOCUS CHANNEL</span>
      </div>

      {isSplitVisible && (
        <div className="mode-split" aria-label="Two active player modes">
          <div className="mode-panel mode-panel-gamer">
            <div className="mode-panel-glow" aria-hidden="true" />
            <div className="game-grid" aria-hidden="true" />
            <div className="game-orbit game-orbit-one" aria-hidden="true" />
            <div className="game-orbit game-orbit-two" aria-hidden="true" />
            <div className="game-crosshair" aria-hidden="true" />
            <div className="mode-panel-content">
              <span className="mode-eyebrow">PLAYER SUBSYSTEM / A</span>
              <h1><span aria-hidden="true">🎮</span> GAMER MODE</h1>
              <ModeTelemetry side="gamer" />
            </div>
            <span className="panel-code panel-code-top">INPUT // 001</span>
            <span className="panel-code panel-code-bottom">SIGNAL: ACTIVE</span>
          </div>

          <div className="mode-panel mode-panel-topper">
            <div className="mode-panel-glow" aria-hidden="true" />
            <div className="study-lines" aria-hidden="true" />
            <div className="study-card study-card-one" aria-hidden="true" />
            <div className="study-card study-card-two" aria-hidden="true" />
            <div className="study-cursor" aria-hidden="true" />
            <div className="mode-panel-content">
              <span className="mode-eyebrow">PLAYER SUBSYSTEM / B</span>
              <h1><span aria-hidden="true">📚</span> TOPPER MODE</h1>
              <ModeTelemetry side="topper" />
            </div>
            <span className="panel-code panel-code-top">FOCUS // 002</span>
            <span className="panel-code panel-code-bottom">SIGNAL: ACTIVE</span>
          </div>
          <div className="split-seam" aria-hidden="true" />
        </div>
      )}

      <div className={`dual-readout ${isDarkPause ? "dual-readout-dark" : ""}`}>
        {phase === "intro" && (
          <div className="dual-beat dual-beat-intro" key="intro">
            <span className="dual-kicker">PLAYER PROFILE / TWO ACTIVE SYSTEMS</span>
            <p>Two modes detected.</p>
          </div>
        )}

        {phase === "active" && (
          <div className="dual-beat dual-beat-active" key="active">
            <span className="dual-kicker">PARALLEL PROCESSES / STABLE</span>
            <p>Both channels are active.</p>
          </div>
        )}

        {phase === "merge" && (
          <div className="dual-beat dual-beat-merge" key="merge">
            <span className="dual-kicker">CONVERGENCE PROTOCOL / RUNNING</span>
            <p>Resolving player architecture...</p>
          </div>
        )}

        {phase === "dualClass" && (
          <div className="dual-beat dual-beat-dual-class" key="dualClass">
            <span className="dual-kicker">PROFILE RESOLVED / 01</span>
            <h1>DUAL CLASS PLAYER</h1>
            <div className="dual-class-rule" aria-hidden="true" />
          </div>
        )}

        {phase === "time" && (
          <div className="dual-beat dual-beat-copy" key="time">
            <span className="dual-kicker">OBSERVATION LOG / 02</span>
            <blockquote>Somehow manages to make time for both.</blockquote>
          </div>
        )}

        {phase === "interesting" && (
          <div className="dual-beat dual-beat-copy" key="interesting">
            <span className="dual-kicker">OBSERVATION LOG / 03</span>
            <blockquote>But that&apos;s not even the interesting part.</blockquote>
          </div>
        )}

        {phase === "dark" && (
          <div className="dual-beat dual-beat-dark" key="dark">
            <span className="dark-pulse" aria-hidden="true" />
          </div>
        )}

        {phase === "detected" && (
          <div className="dual-beat dual-beat-connection" key="detected">
            <span className="dual-kicker">SYSTEM ALERT / UNRESOLVED</span>
            <h1>ANOTHER PLAYER CONNECTION DETECTED<span className="dual-ellipsis">...</span></h1>
            <div className="dual-alert-rule" aria-hidden="true"><span /></div>
          </div>
        )}

        {phase === "you" && (
          <div className="dual-beat dual-beat-you" key="you">
            <span className="dual-kicker">CONNECTION SOURCE / IDENTIFIED</span>
            <h1>CONNECTION: <strong>YOU</strong></h1>
            <p>Relationship data withheld</p>
          </div>
        )}

        {phase === "unlock" && (
          <div className="dual-beat dual-beat-unlock" key="unlock">
            <span className="dual-kicker">ACCESS GRANTED / NEXT SECTOR</span>
            <h1>LEVEL 03 UNLOCKED</h1>
            <div className="unlock-bar" aria-hidden="true"><span /></div>
            <p>Prepare for the next move</p>
          </div>
        )}
      </div>

      <div className={`dual-center-lock ${isDarkPause ? "dual-center-lock-dark" : ""}`} aria-hidden="true">
        <span className="center-lock-ring center-lock-ring-one" />
        <span className="center-lock-ring center-lock-ring-two" />
        <span className="center-lock-dot" />
      </div>

      <div className="dual-footer">
        <span>CLASSIFICATION / PRIVATE</span>
        <span className="dual-progress"><i /><i /><i /><i /><i /><i /></span>
        <span>{phase === "unlock" ? "SECTOR READY" : "OBSERVE THE SHIFT"}</span>
      </div>
    </section>
  );
}
