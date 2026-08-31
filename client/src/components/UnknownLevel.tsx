/*
 * Obsidian Signal direction: the hidden UNKNOWN level is the emotional turning
 * point of the private transmission. It removes the HUD noise, slows the
 * typography to a character-by-character confession, and lets a small light
 * emerge only after the answer has already been understood.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";

const TIMELINE = [
  { at: 0, phase: "warning" },
  { at: 3100, phase: "not-found" },
  { at: 6800, phase: "connection" },
  { at: 10100, phase: "why" },
  { at: 12800, phase: "question-1" },
  { at: 16400, phase: "question-2" },
  { at: 20000, phase: "question-3" },
  { at: 23600, phase: "question-4" },
  { at: 27200, phase: "answer" },
  { at: 32300, phase: "final" },
] as const;

type UnknownPhase = (typeof TIMELINE)[number]["phase"];

type UnknownParticleStyle = CSSProperties & {
  "--unknown-drift-x": string;
  "--unknown-drift-y": string;
  "--unknown-depth": string;
};

const QUESTIONS: Record<string, string> = {
  "question-1": "Who gets the random stories?",
  "question-2": "Who gets the study advice?",
  "question-3": "Who gets to hear the things that aren't shared with everyone?",
  "question-4": "Who has access to the private server?",
};

function TypeLine({ value, speed = 96 }: { value: string; speed?: number }) {
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
    <span className="unknown-type-line" aria-label={value}>
      {value.slice(0, visibleCount)}
      <span className="unknown-type-cursor" aria-hidden="true" />
    </span>
  );
}

function UnknownBeat({ phase }: { phase: UnknownPhase }) {
  if (phase === "warning") {
    return (
      <div className="unknown-beat unknown-beat-warning" key={phase}>
        <span className="unknown-kicker">HIDDEN LEVEL / 00</span>
        <h1><TypeLine value="WARNING." speed={180} /></h1>
        <span className="unknown-rule" aria-hidden="true" />
      </div>
    );
  }

  if (phase === "not-found") {
    return (
      <div className="unknown-beat unknown-beat-statement" key={phase}>
        <span className="unknown-kicker">ACCESS VIOLATION / UNRESOLVED</span>
        <h1><TypeLine value="THIS LEVEL WAS NOT SUPPOSED TO BE FOUND." speed={72} /></h1>
      </div>
    );
  }

  if (phase === "connection") {
    return (
      <div className="unknown-beat unknown-beat-connection" key={phase}>
        <span className="unknown-kicker">PRIVATE CHANNEL / ORIGIN UNKNOWN</span>
        <h1><TypeLine value="PLAYER CONNECTION: YOU" speed={104} /></h1>
        <span className="unknown-connection-line" aria-hidden="true" />
      </div>
    );
  }

  if (phase === "why") {
    return (
      <div className="unknown-beat unknown-beat-why" key={phase}>
        <span className="unknown-kicker">QUERY / UNANSWERED</span>
        <h1><TypeLine value="WHY?" speed={190} /></h1>
      </div>
    );
  }

  if (phase in QUESTIONS) {
    return (
      <div className="unknown-beat unknown-beat-question" key={phase}>
        <span className="unknown-kicker">PRIVATE CHANNEL / QUESTION {phase.slice(-1)}</span>
        <h1><TypeLine value={QUESTIONS[phase]} speed={76} /></h1>
        <span className="unknown-question-pulse" aria-hidden="true" />
      </div>
    );
  }

  if (phase === "answer") {
    return (
      <div className="unknown-beat unknown-beat-answer" key={phase}>
        <span className="unknown-kicker">RESPONSE / ALREADY KNOWN</span>
        <h1><TypeLine value="YOU ALREADY KNOW THE ANSWER." speed={86} /></h1>
        <span className="unknown-answer-line" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="unknown-beat unknown-beat-final" key={phase}>
      <span className="unknown-kicker">FINAL LEVEL / UNSEALED</span>
      <div className="unknown-final-orbit" aria-hidden="true">
        <span className="unknown-final-orbit-ring unknown-final-orbit-ring-one" />
        <span className="unknown-final-orbit-ring unknown-final-orbit-ring-two" />
        <span className="unknown-final-orbit-core" />
      </div>
      <h1><TypeLine value="FINAL LEVEL UNLOCKED." speed={112} /></h1>
      <p>Connection retained.</p>
    </div>
  );
}

export default function UnknownLevel({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<UnknownPhase>("warning");
  const particles = useMemo(
    () =>
      Array.from({ length: 54 }, (_, index) => ({
        id: index,
        left: `${3 + ((index * 43) % 94)}%`,
        top: `${5 + ((index * 61) % 89)}%`,
        delay: `${(index % 17) * 0.35}s`,
        duration: `${8 + (index % 8) * 1.1}s`,
        driftX: `${((index % 7) - 3) * 11}px`,
        driftY: `${((index % 9) - 4) * 13}px`,
        depth: `${0.35 + (index % 5) * 0.16}`,
        size: `${index % 4 === 0 ? 2 : 1}px`,
      })),
    [],
  );

  useEffect(() => {
    const timers = TIMELINE.slice(1).map(({ at, phase: nextPhase }) =>
      window.setTimeout(() => setPhase(nextPhase), at),
    );
    const finalHandoff = window.setTimeout(() => onComplete(), 39200);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(finalHandoff);
    };
  }, [onComplete]);

  const step = TIMELINE.findIndex(({ phase: item }) => item === phase) + 1;
  const isQuestion = phase in QUESTIONS;

  return (
    <section className={`unknown-level unknown-level-${phase}`} data-phase={phase} aria-live="polite">
      <div className="unknown-void" aria-hidden="true" />
      <div className="unknown-horizon" aria-hidden="true" />
      <div className="unknown-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="unknown-particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
                "--unknown-drift-x": particle.driftX,
                "--unknown-drift-y": particle.driftY,
                "--unknown-depth": particle.depth,
              } as UnknownParticleStyle
            }
          />
        ))}
      </div>
      <div className="unknown-light" aria-hidden="true" />
      <div className="unknown-scanline" aria-hidden="true" />

      <div className="unknown-topline" aria-hidden="true">
        <span>UNKNOWN / {String(step).padStart(2, "0")}</span>
        <span className="unknown-topline-rule" />
        <span>{isQuestion ? "QUERYING CONNECTION" : "PRIVATE TRANSMISSION"}</span>
      </div>

      <div className="unknown-stage">
        <UnknownBeat phase={phase} />
      </div>

      <div className="unknown-bottomline" aria-hidden="true">
        <span>DO NOT LOOK AWAY</span>
        <span>HIDDEN CHANNEL / OPEN</span>
        <span>{phase === "final" ? "FINAL INPUT / READY" : "ANSWER / PENDING"}</span>
      </div>
      <div className="unknown-zoom-field" aria-hidden="true" />
    </section>
  );
}
