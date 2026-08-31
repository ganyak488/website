/*
 * Obsidian Signal direction: LEVEL 06 is a classified achievement vault.
 * Badges arrive like recovered game data, unlock one at a time, and keep the
 * final achievement hidden so the interface ends on earned curiosity.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type WheelEvent } from "react";

const ACHIEVEMENTS = [
  {
    id: "topper-mode",
    mark: "🏆",
    title: "TOPPER MODE",
    description: "Academic mode permanently available.",
  },
  {
    id: "gamer-mode",
    mark: "🎮",
    title: "GAMER MODE",
    description: "Gaming mode: activated.",
  },
  {
    id: "private-server",
    mark: "🔐",
    title: "PRIVATE SERVER",
    description: "Not everyone gets access.",
  },
  {
    id: "study-advisor",
    mark: "🧠",
    title: "STUDY ADVISOR",
    description: "Always has advice.",
  },
  {
    id: "trust-unlocked",
    mark: "🤝",
    title: "TRUST UNLOCKED",
    description: "Rare connection detected.",
  },
] as const;

type AchievementPhase = "scan" | "ready" | "all" | "wait" | "hidden" | "final";

type AchievementStyle = CSSProperties & {
  "--achievement-index": number;
};

function TypedDescription({ value, active }: { value: string; active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(active ? 0 : value.length);

  useEffect(() => {
    if (!active) {
      setVisibleCount(value.length);
      return;
    }

    setVisibleCount(0);
    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= value.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, 38);

    return () => window.clearInterval(timer);
  }, [active, value]);

  return (
    <p className="achievement-description" aria-label={value}>
      {value.slice(0, visibleCount)}
      {active && <span className="type-cursor" aria-hidden="true" />}
    </p>
  );
}

function AchievementEvent({ phase }: { phase: AchievementPhase }) {
  return (
    <div className={`achievement-event achievement-event-${phase}`} aria-live="polite">
      {phase === "all" && (
        <div className="achievement-event-beat" key="all">
          <span className="achievement-kicker">ACHIEVEMENT INDEX / RESOLVED</span>
          <h1>ALL KNOWN ACHIEVEMENTS UNLOCKED.</h1>
          <div className="achievement-event-rule" aria-hidden="true" />
        </div>
      )}
      {phase === "wait" && (
        <div className="achievement-event-beat" key="wait">
          <span className="achievement-kicker">SYSTEM INTERRUPT / 01</span>
          <h1>WAIT.</h1>
        </div>
      )}
      {phase === "hidden" && (
        <div className="achievement-event-beat" key="hidden">
          <span className="achievement-kicker">UNINDEXED SIGNAL / FOUND</span>
          <h1>1 HIDDEN ACHIEVEMENT DETECTED.</h1>
          <div className="hidden-achievement-code" aria-label="Hidden achievement name unavailable">???</div>
        </div>
      )}
      {phase === "final" && (
        <div className="achievement-event-beat" key="final">
          <span className="achievement-kicker">FINAL OBJECTIVE / LOCKED</span>
          <h1>COMPLETE THE FINAL LEVEL.</h1>
          <div className="final-level-lock" aria-hidden="true">
            <span className="final-lock-shackle" />
            <span className="final-lock-body" />
            <span className="final-lock-core" />
          </div>
          <p>Achievement vault suspended pending final input.</p>
        </div>
      )}
    </div>
  );
}

export default function Achievements({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<AchievementPhase>("scan");
  const [unlockedCount, setUnlockedCount] = useState(0);
  const stageRef = useRef<HTMLElement | null>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        id: index,
        left: `${4 + ((index * 41) % 92)}%`,
        top: `${6 + ((index * 67) % 86)}%`,
        delay: `${(index % 15) * 0.25}s`,
        duration: `${5.5 + (index % 8) * 0.72}s`,
        driftX: `${((index % 5) - 2) * 8}px`,
        driftY: `${((index % 7) - 3) * 10}px`,
        size: `${1 + (index % 3)}px`,
      })),
    [],
  );

  useEffect(() => {
    if (phase !== "scan") return;
    const timer = window.setTimeout(() => setPhase("ready"), 2800);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "final") {
      const timer = window.setTimeout(() => onComplete?.(), 5200);
      return () => window.clearTimeout(timer);
    }

    if (phase === "ready" && unlockedCount === ACHIEVEMENTS.length) {
      const timer = window.setTimeout(() => setPhase("all"), 1800);
      return () => window.clearTimeout(timer);
    }

    const followups: Partial<Record<AchievementPhase, { next: AchievementPhase; delay: number }>> = {
      all: { next: "wait", delay: 3000 },
      wait: { next: "hidden", delay: 1400 },
      hidden: { next: "final", delay: 3600 },
    };
    const followup = followups[phase];
    if (!followup) return;
    const timer = window.setTimeout(() => setPhase(followup.next), followup.delay);
    return () => window.clearTimeout(timer);
  }, [onComplete, phase, unlockedCount]);

  const unlockNext = useCallback(() => {
    if (phase !== "ready" || unlockedCount >= ACHIEVEMENTS.length) return;
    setUnlockedCount((count) => Math.min(count + 1, ACHIEVEMENTS.length));
  }, [phase, unlockedCount]);

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (event.deltaY > 8) {
      event.preventDefault();
      unlockNext();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      unlockNext();
    }
  };

  const visibleAchievements = ACHIEVEMENTS.slice(0, Math.min(unlockedCount + 1, ACHIEVEMENTS.length));
  const progress = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);
  const sceneStyle = { "--achievement-index": unlockedCount } as AchievementStyle;

  return (
    <section
      ref={stageRef}
      className={`achievements-shell achievement-phase-${phase}`}
      style={sceneStyle}
      aria-live="polite"
      tabIndex={0}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
    >
      <div className="achievements-ambient" aria-hidden="true" />
      <div className="achievements-grid" aria-hidden="true" />
      <div className="achievements-scanline achievements-scanline-one" aria-hidden="true" />
      <div className="achievements-scanline achievements-scanline-two" aria-hidden="true" />
      <div className="achievements-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="achievement-particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
                "--achievement-drift-x": particle.driftX,
                "--achievement-drift-y": particle.driftY,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="achievements-topline">
        <span>LEVEL 06</span>
        <span className="achievements-topline-rule" />
        <span>ACHIEVEMENTS</span>
      </div>

      <div className="achievements-side-label achievements-side-label-left" aria-hidden="true">
        <span>VAULT / PLAYER</span>
        <span>INDEX: 06</span>
      </div>
      <div className="achievements-side-label achievements-side-label-right" aria-hidden="true">
        <span>KNOWN / {ACHIEVEMENTS.length}</span>
        <span>HIDDEN / 01</span>
      </div>

      {phase === "scan" ? (
        <div className="achievements-scan-state">
          <span className="achievements-kicker">VAULT ACCESS / 06</span>
          <div className="achievement-scanner" aria-hidden="true">
            <span className="achievement-scanner-ring achievement-scanner-ring-one" />
            <span className="achievement-scanner-ring achievement-scanner-ring-two" />
            <span className="achievement-scanner-sweep" />
            <span className="achievement-scanner-core" />
          </div>
          <h1>SCANNING ACHIEVEMENTS...</h1>
          <p>Recovering known player records</p>
        </div>
      ) : (
        <>
          <div className="achievements-intro">
            <span className="achievements-kicker">ACHIEVEMENT VAULT / 06</span>
            <h1>Records earned. Signal retained.</h1>
            <p>{phase === "ready" ? "Scroll or click the active record to unlock the next." : "Known records indexed by the private channel."}</p>
          </div>

          <div className="achievement-rail" aria-hidden="true">
            <span className="achievement-rail-label">UNLOCK</span>
            <span className="achievement-rail-track"><i style={{ height: `${progress}%` }} /></span>
            <strong>{String(unlockedCount).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}</strong>
          </div>

          <div className="achievement-list" aria-label="Player achievements">
            {visibleAchievements.map((achievement, index) => {
              const isUnlocked = index < unlockedCount;
              const isCurrent = index === unlockedCount && phase === "ready";
              const isLatest = index === unlockedCount - 1;
              return (
                <article
                  className={`achievement-card ${isUnlocked ? "is-unlocked" : "is-locked"} ${isCurrent ? "is-current" : ""} ${isLatest ? "is-latest" : ""}`}
                  key={achievement.id}
                  style={{ "--achievement-index": index } as AchievementStyle}
                  role="button"
                  tabIndex={isCurrent ? 0 : -1}
                  aria-label={`${achievement.title}${isUnlocked ? " — unlocked" : " — locked"}`}
                  aria-disabled={!isCurrent}
                  onClick={() => isCurrent && unlockNext()}
                  onKeyDown={(event) => {
                    if (isCurrent && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      unlockNext();
                    }
                  }}
                >
                  <div className="achievement-card-topline">
                    <span>RECORD / {String(index + 1).padStart(2, "0")}</span>
                    <span>{isUnlocked ? "UNLOCKED" : "LOCKED"}</span>
                  </div>
                  <div className="achievement-badge" aria-hidden="true">
                    <span className="achievement-badge-ring achievement-badge-ring-one" />
                    <span className="achievement-badge-ring achievement-badge-ring-two" />
                    <span className="achievement-badge-mark">{achievement.mark}</span>
                    {!isUnlocked && <span className="achievement-badge-lock">LOCK</span>}
                  </div>
                  <div className="achievement-card-copy">
                    <span className="achievement-card-kicker">{isUnlocked ? "ACHIEVEMENT CONFIRMED" : isCurrent ? "INPUT REQUIRED" : "QUEUED"}</span>
                    <h2>{isUnlocked ? achievement.title : "LOCKED RECORD"}</h2>
                    {isUnlocked ? (
                      <TypedDescription value={achievement.description} active={isLatest} />
                    ) : (
                      <p className="achievement-locked-copy">CLICK OR SCROLL TO UNLOCK</p>
                    )}
                  </div>
                  <span className="achievement-card-corner achievement-card-corner-one" aria-hidden="true" />
                  <span className="achievement-card-corner achievement-card-corner-two" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </>
      )}

      {phase !== "scan" && phase !== "ready" && <AchievementEvent phase={phase} />}

      <div className="achievements-bottomline">
        <span>{phase === "final" ? "FINAL INPUT / REQUIRED" : "DO NOT SKIP THE RECORDS"}</span>
        <span className="achievements-progress-dots">
          {ACHIEVEMENTS.map((achievement, index) => <i key={achievement.id} className={index < unlockedCount ? "is-on" : ""} />)}
        </span>
        <span>VAULT STATUS / {phase === "scan" ? "SCANNING" : phase === "final" ? "SUSPENDED" : "LIVE"}</span>
      </div>
      <div className="achievements-transition-flash" aria-hidden="true" />
    </section>
  );
}
