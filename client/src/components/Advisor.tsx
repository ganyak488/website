/*
 * Obsidian Signal direction: Level 04 shifts from access-control to dialogue.
 * The advisor is represented as a non-human signal silhouette; technical HUD
 * language frames a warm friendship ritual without turning the scene romantic.
 */
import { useEffect, useMemo, useState } from "react";

type AdvisorPhase =
  | "intro"
  | "online"
  | "mission"
  | "board"
  | "question"
  | "response"
  | "advice"
  | "friendshipOne"
  | "friendshipTwo"
  | "friendshipThree"
  | "locked";
type Answer = "yes" | "no" | null;

const ADVISOR_TIMELINE: Array<{ at: number; phase: AdvisorPhase }> = [
  { at: 0, phase: "intro" },
  { at: 1800, phase: "online" },
  { at: 4200, phase: "mission" },
  { at: 7000, phase: "board" },
  { at: 12500, phase: "question" },
];

const MISSION_ITEMS = [
  { icon: "📚", label: "STUDY ADVICE", code: "MODULE / 01", note: "Tactical support" },
  { icon: "🧠", label: "EXPLANATIONS", code: "MODULE / 02", note: "Break it down" },
  { icon: "💡", label: "RANDOM SOLUTIONS", code: "MODULE / 03", note: "Unexpected route" },
  { icon: "⚡", label: "MOTIVATION", code: "MODULE / 04", note: "Keep the signal alive" },
];

function useAdvisorParticles() {
  return useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${6 + ((index * 47) % 88)}%`,
        top: `${8 + ((index * 59) % 82)}%`,
        delay: `${(index % 13) * 0.28}s`,
        duration: `${5 + (index % 8) * 0.7}s`,
        driftX: `${((index % 5) - 2) * 8}px`,
        driftY: `${((index % 7) - 3) * 10}px`,
      })),
    [],
  );
}

function AdvisorAvatar() {
  return (
    <div className="advisor-avatar" aria-label="Abstract advisor signal silhouette">
      <div className="advisor-avatar-halo" aria-hidden="true" />
      <div className="advisor-avatar-ring advisor-avatar-ring-one" aria-hidden="true" />
      <div className="advisor-avatar-ring advisor-avatar-ring-two" aria-hidden="true" />
      <div className="advisor-avatar-silhouette" aria-hidden="true">
        <span className="advisor-avatar-head" />
        <span className="advisor-avatar-shoulders" />
        <span className="advisor-avatar-scan" />
      </div>
      <span className="advisor-avatar-label">ADVISOR // SIGNAL FORM</span>
    </div>
  );
}

function AdvisorReadout({
  phase,
  missionCount,
  answer,
}: {
  phase: AdvisorPhase;
  missionCount: number;
  answer: Answer;
}) {
  return (
    <div className="advisor-readout" aria-live="polite">
      {phase === "intro" && (
        <div className="advisor-beat advisor-beat-intro" key="intro">
          <span className="advisor-kicker">LEVEL 04 / DIALOGUE SYSTEM</span>
          <h1>INCOMING MESSAGE<span className="advisor-dots">...</span></h1>
          <p>Encrypted channel opening</p>
        </div>
      )}

      {phase === "online" && (
        <div className="advisor-beat advisor-beat-online" key="online">
          <span className="advisor-kicker">PERSONNEL CHANNEL / ONLINE</span>
          <h1>STUDY ADVISOR ONLINE.</h1>
          <p>Signal role: explain, insist, repeat</p>
        </div>
      )}

      {phase === "mission" && (
        <div className="advisor-beat advisor-beat-mission" key="mission">
          <span className="advisor-kicker">CURRENT MISSION / ASSIGNED</span>
          <div className="mission-copy">
            <span>CURRENT MISSION:</span>
            <strong>HELP YOUR FRIEND SURVIVE ACADEMICS.</strong>
          </div>
          <p className="mission-laugh">😂</p>
        </div>
      )}

      {phase === "board" && (
        <div className="advisor-beat advisor-beat-board" key="board">
          <span className="advisor-kicker">MISSION BOARD / ACTIVE</span>
          <div className="mission-list" aria-label="Advisor mission modules">
            {MISSION_ITEMS.map((item, index) => (
              <div className={`mission-item ${index <= missionCount ? "is-visible" : ""}`} key={item.label}>
                <span className="mission-item-icon" aria-hidden="true">{item.icon}</span>
                <span className="mission-item-main">
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </span>
                <span className="mission-item-code">{item.code}</span>
                <span className="mission-item-status">READY</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === "question" && (
        <div className="advisor-beat advisor-beat-question" key="question">
          <span className="advisor-kicker">ADVISOR QUERY / RESPONSE REQUIRED</span>
          <h1>Have you studied yet?</h1>
          <p className="advisor-question-hint">Select a response to continue</p>
        </div>
      )}

      {phase === "response" && (
        <div className={`advisor-beat advisor-beat-response advisor-beat-response-${answer}`} key="response">
          <span className="advisor-kicker">ADVISOR RESPONSE / LOGGED</span>
          {answer === "yes" ? (
            <>
              <h1>GOOD.</h1>
              <p className="response-followup">KEEP GOING.</p>
            </>
          ) : (
            <>
              <h1>YOU HAVE BEEN DETECTED.</h1>
              <p className="response-followup response-followup-fun">GO STUDY. 😂</p>
            </>
          )}
        </div>
      )}

      {phase === "advice" && (
        <div className="advisor-beat advisor-beat-advice" key="advice">
          <span className="advisor-kicker">ARCHIVE COUNT / UNRESOLVED</span>
          <div className="infinity-mark" aria-hidden="true">∞</div>
          <h1>ADVICE RECEIVED: ∞</h1>
          <p>There is always one more explanation</p>
        </div>
      )}

      {phase === "friendshipOne" && (
        <div className="advisor-beat advisor-beat-friendship" key="friendshipOne">
          <span className="advisor-kicker">FRIENDSHIP LOG / 01</span>
          <blockquote>Some friends give advice.</blockquote>
        </div>
      )}

      {phase === "friendshipTwo" && (
        <div className="advisor-beat advisor-beat-friendship" key="friendshipTwo">
          <span className="advisor-kicker">FRIENDSHIP LOG / 02</span>
          <blockquote>Some friends actually stay long enough to explain things.</blockquote>
        </div>
      )}

      {phase === "friendshipThree" && (
        <div className="advisor-beat advisor-beat-friendship" key="friendshipThree">
          <span className="advisor-kicker">FRIENDSHIP LOG / 03</span>
          <blockquote>You somehow became both.</blockquote>
        </div>
      )}

      {phase === "locked" && (
        <div className="advisor-beat advisor-beat-locked" key="locked">
          <span className="advisor-kicker">NEXT MISSION / CLASSIFIED</span>
          <div className="level-lock" aria-hidden="true">
            <span className="level-lock-shackle" />
            <span className="level-lock-body" />
            <span className="level-lock-core" />
          </div>
          <h1>LEVEL 05 LOCKED.</h1>
          <p>Complete the next mission to unlock it.</p>
        </div>
      )}
    </div>
  );
}

export default function Advisor({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<AdvisorPhase>("intro");
  const [missionCount, setMissionCount] = useState(-1);
  const [answer, setAnswer] = useState<Answer>(null);
  const particles = useAdvisorParticles();

  useEffect(() => {
    const timers = ADVISOR_TIMELINE.map(({ at, phase: nextPhase }) =>
      window.setTimeout(() => setPhase(nextPhase), at),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "board") {
      setMissionCount(-1);
      return;
    }

    let itemIndex = -1;
    const interval = window.setInterval(() => {
      itemIndex = Math.min(itemIndex + 1, MISSION_ITEMS.length - 1);
      setMissionCount(itemIndex);
      if (itemIndex >= MISSION_ITEMS.length - 1) window.clearInterval(interval);
    }, 720);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "response") return;
    const timer = window.setTimeout(() => setPhase("advice"), 4700);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "locked") return;
    const timer = window.setTimeout(onComplete, 5600);
    return () => window.clearTimeout(timer);
  }, [onComplete, phase]);

  useEffect(() => {
    const followups: Partial<Record<AdvisorPhase, { next: AdvisorPhase; delay: number }>> = {
      advice: { next: "friendshipOne", delay: 4300 },
      friendshipOne: { next: "friendshipTwo", delay: 3700 },
      friendshipTwo: { next: "friendshipThree", delay: 4100 },
      friendshipThree: { next: "locked", delay: 4900 },
    };
    const followup = followups[phase];
    if (!followup) return;
    const timer = window.setTimeout(() => setPhase(followup.next), followup.delay);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleAnswer = (selectedAnswer: Exclude<Answer, null>) => {
    if (phase !== "question" || answer) return;
    setAnswer(selectedAnswer);
    setPhase("response");
  };

  return (
    <section className={`advisor-scene advisor-phase-${phase}`} aria-live="polite">
      <div className="advisor-ambient" aria-hidden="true" />
      <div className="advisor-grid" aria-hidden="true" />
      <div className="advisor-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="advisor-particle"
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              "--advisor-drift-x": particle.driftX,
              "--advisor-drift-y": particle.driftY,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="advisor-topline">
        <span>LEVEL 04</span>
        <span className="advisor-topline-rule" />
        <span>THE ADVISOR</span>
      </div>

      <div className="advisor-side-label advisor-side-label-left" aria-hidden="true">
        <span>DIALOGUE / 04</span>
        <span>VOICE: TRUSTED</span>
      </div>
      <div className="advisor-side-label advisor-side-label-right" aria-hidden="true">
        <span>MISSION / ACADEMICS</span>
        <span>STATUS: ACTIVE</span>
      </div>

      <div className="dialogue-box">
        <div className="dialogue-box-header">
          <span className="dialogue-box-dot" />
          <span>INCOMING CHANNEL</span>
          <span className="dialogue-box-id">ADVISOR // 04</span>
        </div>
        <div className="dialogue-box-body">
          <AdvisorAvatar />
          <AdvisorReadout phase={phase} missionCount={missionCount} answer={answer} />
        </div>
      </div>

      {phase === "question" && (
        <div className="advisor-interaction-layer" aria-label="Study status response">
          <button type="button" className={`dialogue-choice ${answer === "yes" ? "is-selected" : ""}`} onClick={() => handleAnswer("yes")}>
            <span>[</span><strong>YES</strong><span>]</span>
          </button>
          <button type="button" className={`dialogue-choice ${answer === "no" ? "is-selected" : ""}`} onClick={() => handleAnswer("no")}>
            <span>[</span><strong>NO</strong><span>]</span>
          </button>
        </div>
      )}

      <div className="advisor-bottomline">
        <span>PRIVATE ADVISOR INSTANCE</span>
        <span className="advisor-progress"><i /><i /><i /><i /><i /><i /><i /><i /></span>
        <span>{phase === "locked" ? "NEXT MISSION: REQUIRED" : "DIALOGUE STATUS: LISTENING"}</span>
      </div>

      <div className="advisor-transition-flash" aria-hidden="true" />
    </section>
  );
}
