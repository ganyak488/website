/*
 * Obsidian Signal / Final Level: the systems interface softens into a warm,
 * quiet friendship epilogue. Sequential cards give way to readable confession
 * beats, restrained particles, and one clear replay path back to the opening.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";

const TIMELINE = [
  { at: 0, phase: "approach" },
  { at: 3000, phase: "profile" },
  { at: 5100, phase: "card-1" },
  { at: 6800, phase: "card-2" },
  { at: 8500, phase: "card-3" },
  { at: 10200, phase: "card-4" },
  { at: 11900, phase: "card-5" },
  { at: 14100, phase: "calm" },
  { at: 16500, phase: "message-1" },
  { at: 23500, phase: "message-2" },
  { at: 31500, phase: "message-3" },
  { at: 37500, phase: "message-4" },
  { at: 43000, phase: "achievement" },
  { at: 49000, phase: "closing" },
] as const;

type FinalPhase = (typeof TIMELINE)[number]["phase"];

type FinalParticleStyle = CSSProperties & {
  "--final-drift-x": string;
  "--final-drift-y": string;
  "--final-depth": string;
};

const PROFILE_CARDS = [
  { icon: "🎮", label: "GAMER", note: "Mode: permanently active" },
  { icon: "📚", label: "TOPPER", note: "Academic signal: unmistakable" },
  { icon: "🧠", label: "ADVISOR", note: "Explanations: always available" },
  { icon: "🔐", label: "PRIVATE", note: "Access: carefully chosen" },
  { icon: "🤝", label: "TRUSTED FRIEND", note: "Connection: deeply valued" },
] as const;

const MESSAGES: Record<string, string> = {
  "message-1": "You're one of those people who doesn't share everything with everyone, which makes it mean a lot that you trust me enough to share your life with me.",
  "message-2": "Thank you for the random conversations, the stories, the advice, the study help, the motivation, and all the times you've listened to me too.",
  "message-3": "You're somehow a topper, a gamer, a private person, and my personal study advisor all at once.",
  "message-4": "I'm genuinely glad I got to know you.",
};

function TypeLine({ value, speed = 28 }: { value: string; speed?: number }) {
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
    <span className="final-type-line" aria-label={value}>
      {value.slice(0, visibleCount)}
      <span className="final-type-cursor" aria-hidden="true" />
    </span>
  );
}

function FinalBeat({ phase, onReplay }: { phase: FinalPhase; onReplay: () => void }) {
  if (phase === "approach") {
    return (
      <div className="final-beat final-beat-approach" key={phase}>
        <span className="final-kicker">FINAL TRANSMISSION / 01</span>
        <div className="final-signal-orbit" aria-hidden="true"><span /></div>
        <h1><TypeLine value="FINAL BOSS APPROACHING..." speed={82} /></h1>
        <p>Prepare the last connection.</p>
      </div>
    );
  }

  if (phase === "profile") {
    return (
      <div className="final-beat final-beat-profile" key={phase}>
        <span className="final-kicker">PLAYER DOSSIER / COMPLETE</span>
        <h1><TypeLine value="PLAYER PROFILE COMPLETE." speed={62} /></h1>
        <p>Every known signal resolved.</p>
      </div>
    );
  }

  if (phase.startsWith("card-")) {
    const card = PROFILE_CARDS[Number(phase.slice(-1)) - 1];
    return (
      <div className="final-beat final-beat-card" key={phase}>
        <span className="final-kicker">PROFILE SIGNAL / {String(Number(phase.slice(-1))).padStart(2, "0")}</span>
        <div className="final-profile-card">
          <span className="final-profile-icon" aria-hidden="true">{card.icon}</span>
          <div>
            <h2>{card.label}</h2>
            <p>{card.note}</p>
          </div>
          <span className="final-card-status">RESOLVED</span>
        </div>
      </div>
    );
  }

  if (phase === "calm") {
    return (
      <div className="final-beat final-beat-calm" key={phase}>
        <span className="final-kicker">SYSTEM NOTE / 06</span>
        <h1><TypeLine value="Okay, enough of the gaming nonsense." speed={58} /></h1>
      </div>
    );
  }

  if (phase in MESSAGES) {
    return (
      <div className="final-beat final-beat-message" key={phase}>
        <span className="final-kicker">PRIVATE NOTE / {phase.slice(-1)}</span>
        <blockquote><TypeLine value={MESSAGES[phase]} speed={24} /></blockquote>
      </div>
    );
  }

  if (phase === "achievement") {
    return (
      <div className="final-beat final-beat-achievement" key={phase}>
        <span className="final-kicker">HIDDEN ACHIEVEMENT / UNSEALED</span>
        <div className="final-achievement-medallion" aria-hidden="true">🏆</div>
        <h1>RARE FRIENDSHIP UNLOCKED</h1>
        <div className="final-achievement-stats">
          <span>STATUS: <strong>BEST FRIEND</strong></span>
          <span>TRUST LEVEL: <strong>100%</strong></span>
          <span>FRIENDSHIP SERVER: <strong>PERMANENTLY ONLINE</strong></span>
        </div>
      </div>
    );
  }

  return (
    <div className="final-beat final-beat-closing" key={phase}>
      <span className="final-kicker">CONNECTION RETAINED / ALWAYS</span>
      <h1><TypeLine value="Thanks for being you." speed={70} /></h1>
      <button className="final-replay-button" type="button" onClick={onReplay}>
        <span>[</span>
        <span>REPLAY THE CHAOS</span>
        <span aria-hidden="true">↻</span>
        <span>]</span>
      </button>
      <p>Return to the beginning of the transmission.</p>
    </div>
  );
}

export default function FinalLevel({ onReplay }: { onReplay: () => void }) {
  const [phase, setPhase] = useState<FinalPhase>("approach");
  const particles = useMemo(
    () => Array.from({ length: 42 }, (_, index) => ({
      id: index,
      left: `${4 + ((index * 47) % 92)}%`,
      top: `${6 + ((index * 59) % 86)}%`,
      delay: `${(index % 13) * 0.42}s`,
      duration: `${9 + (index % 7) * 1.2}s`,
      driftX: `${((index % 7) - 3) * 9}px`,
      driftY: `${((index % 9) - 4) * 10}px`,
      depth: `${0.35 + (index % 5) * 0.14}`,
      size: `${index % 4 === 0 ? 2 : 1}px`,
    })),
    [],
  );

  useEffect(() => {
    const timers = TIMELINE.slice(1).map(({ at, phase: nextPhase }) =>
      window.setTimeout(() => setPhase(nextPhase), at),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const step = TIMELINE.findIndex(({ phase: item }) => item === phase) + 1;

  return (
    <section className={`final-level final-level-${phase}`} data-phase={phase} aria-live="polite">
      <div className="final-ambient" aria-hidden="true" />
      <div className="final-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="final-particle"
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              width: particle.size,
              height: particle.size,
              "--final-drift-x": particle.driftX,
              "--final-drift-y": particle.driftY,
              "--final-depth": particle.depth,
            } as FinalParticleStyle}
          />
        ))}
      </div>
      <div className="final-topline" aria-hidden="true">
        <span>FINAL / {String(step).padStart(2, "0")}</span>
        <span className="final-topline-rule" />
        <span>PRIVATE TRANSMISSION</span>
      </div>
      <div className="final-stage"><FinalBeat phase={phase} onReplay={onReplay} /></div>
      <div className="final-bottomline" aria-hidden="true">
        <span>PLAYER 1: HIM</span>
        <span>FRIENDSHIP CHANNEL / OPEN</span>
        <span>CONNECTION RETAINED</span>
      </div>
    </section>
  );
}

export { PROFILE_CARDS };
