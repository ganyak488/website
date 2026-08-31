/*
 * Obsidian Signal direction: Level 03 turns the interface inward.
 * A locked server door becomes a private archive; every system confirmation
 * makes the friendship subtext warmer without losing the classified atmosphere.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";

const SERVER_TIMELINE = [
  { at: 0, phase: "intro" },
  { at: 1900, phase: "restricted" },
  { at: 4400, phase: "authorized" },
  { at: 6900, phase: "verifying" },
  { at: 9700, phase: "verified" },
  { at: 12700, phase: "identityComplete" },
  { at: 16000, phase: "playerDeepak" },
  { at: 19300, phase: "trusted" },
  { at: 22300, phase: "established" },
  { at: 26400, phase: "memory" },
  { at: 29700, phase: "quoteOne" },
  { at: 33000, phase: "quoteTwo" },
  { at: 36300, phase: "quoteThree" },
  { at: 39600, phase: "quoteFour" },
  { at: 42900, phase: "granted" },
  { at: 46200, phase: "you" },
  { at: 49500, phase: "deepakFinal" },
  { at: 52800, phase: "trust" },
  { at: 60500, phase: "more" },
  { at: 64700, phase: "unlocking" },
  { at: 69000, phase: "level04" },
] as const;

type ServerPhase = (typeof SERVER_TIMELINE)[number]["phase"];

const MEMORY_PARTICLES = 58;

function useMemoryParticles() {
  return useMemo(
    () =>
      Array.from({ length: MEMORY_PARTICLES }, (_, index) => ({
        id: index,
        left: `${8 + ((index * 41) % 84)}%`,
        top: `${8 + ((index * 67) % 82)}%`,
        delay: `${(index % 15) * 0.23}s`,
        duration: `${5.5 + (index % 8) * 0.65}s`,
        driftX: `${((index % 5) - 2) * 8}px`,
        driftY: `${((index % 7) - 3) * 10}px`,
        size: `${1 + (index % 3)}px`,
      })),
    [],
  );
}

function ServerReadout({ phase, trustProgress }: { phase: ServerPhase; trustProgress: number }) {
  return (
    <div className="server-readout" aria-live="polite">
      {phase === "intro" && (
        <div className="server-beat server-beat-intro" key="intro">
          <span className="server-kicker">SECTOR 03 / SECURE CHANNEL</span>
          <h1>PRIVATE SERVER</h1>
          <p>Restricted archive detected</p>
        </div>
      )}

      {phase === "restricted" && (
        <div className="server-beat" key="restricted">
          <span className="server-kicker">ACCESS GATE / LOCKED</span>
          <h1>ACCESS RESTRICTED</h1>
          <p>Unverified connection</p>
        </div>
      )}

      {phase === "authorized" && (
        <div className="server-beat" key="authorized">
          <span className="server-kicker">ACCESS GATE / RULE</span>
          <h1>AUTHORIZED PLAYERS: 1</h1>
          <p>One trusted channel permitted</p>
        </div>
      )}

      {phase === "verifying" && (
        <div className="server-beat" key="verifying">
          <span className="server-kicker">IDENTITY CHECK / IN PROGRESS</span>
          <h1>VERIFYING ACCESS<span className="server-ellipsis">...</span></h1>
          <div className="server-verification-bar" aria-hidden="true"><span /></div>
          <p>Scanning authorization pattern</p>
        </div>
      )}

      {phase === "verified" && (
        <div className="server-beat server-beat-verified" key="verified">
          <span className="server-kicker">IDENTITY CHECK / PASSED</span>
          <h1>PLAYER VERIFIED <span className="verified-check">✓</span></h1>
          <p>Hold position</p>
        </div>
      )}

      {phase === "identityComplete" && (
        <div className="server-beat server-beat-identity-complete" key="identityComplete">
          <span className="server-kicker">IDENTITY CHECK / COMPLETE</span>
          <h1>IDENTITY VERIFICATION COMPLETE</h1>
          <p>Awaiting final player identification</p>
        </div>
      )}

      {phase === "playerDeepak" && (
        <div className="server-beat server-beat-player-deepak" key="playerDeepak">
          <span className="server-kicker">PLAYER SIGNATURE / RESOLVED</span>
          <h1>PLAYER: <strong>DEEPAK</strong></h1>
          <div className="player-deepak-line" aria-hidden="true" />
          <p>System identity confirmed</p>
        </div>
      )}

      {phase === "trusted" && (
        <div className="server-beat server-beat-trusted" key="trusted">
          <span className="server-kicker">ACCESS CLASSIFICATION / CONFIRMED</span>
          <h1>ACCESS LEVEL: TRUSTED</h1>
          <p>Permission exceeds standard access</p>
        </div>
      )}

      {phase === "established" && (
        <div className="server-beat" key="established">
          <span className="server-kicker">PRIVATE CHANNEL / OPENING</span>
          <h1>CONNECTION ESTABLISHED</h1>
          <p>Server door responding</p>
        </div>
      )}

      {phase === "memory" && (
        <div className="server-beat server-beat-memory" key="memory">
          <span className="server-kicker">ARCHIVE INTERIOR / MEMORY</span>
          <div className="memory-readout-line" aria-hidden="true" />
        </div>
      )}

      {phase === "quoteOne" && (
        <div className="server-beat server-beat-copy" key="quoteOne">
          <span className="server-kicker">PRIVATE LOG / 01</span>
          <blockquote>Some people keep their world private.</blockquote>
        </div>
      )}

      {phase === "quoteTwo" && (
        <div className="server-beat server-beat-copy" key="quoteTwo">
          <span className="server-kicker">PRIVATE LOG / 02</span>
          <blockquote>They don&apos;t share everything with everyone.</blockquote>
        </div>
      )}

      {phase === "quoteThree" && (
        <div className="server-beat server-beat-copy" key="quoteThree">
          <span className="server-kicker">PRIVATE LOG / 03</span>
          <blockquote>But sometimes...</blockquote>
        </div>
      )}

      {phase === "quoteFour" && (
        <div className="server-beat server-beat-copy" key="quoteFour">
          <span className="server-kicker">PRIVATE LOG / 04</span>
          <blockquote>They choose one person they trust.</blockquote>
        </div>
      )}

      {phase === "granted" && (
        <div className="server-beat server-beat-granted" key="granted">
          <span className="server-kicker">ACCESS PROTOCOL / COMPLETE</span>
          <h1>ACCESS GRANTED<span className="server-ellipsis">.</span></h1>
          <div className="granted-rule" aria-hidden="true" />
        </div>
      )}

      {phase === "you" && (
        <div className="server-beat server-beat-you" key="you">
          <span className="server-kicker">TRUSTED CONNECTION / SOURCE</span>
          <h1>YOU</h1>
          <div className="you-line" aria-hidden="true" />
          <p>Connection source identified</p>
        </div>
      )}

      {phase === "deepakFinal" && (
        <div className="server-beat server-beat-deepak-final" key="deepakFinal">
          <span className="server-kicker">TRUSTED CONNECTION / CONFIRMED</span>
          <h1>DEEPAK</h1>
          <div className="deepak-line" aria-hidden="true" />
          <p>The connection was never random.</p>
        </div>
      )}

      {phase === "trust" && (
        <div className="server-beat server-beat-trust" key="trust">
          <span className="server-kicker">CONNECTION INTEGRITY / LOCKED</span>
          <div
            className="trust-meter"
            style={{ "--trust-progress": `${trustProgress * 3.6}deg` } as CSSProperties}
          >
            <div className="trust-meter-inner">
              <strong>{trustProgress}%</strong>
              <span>TRUST LEVEL</span>
            </div>
          </div>
          <h1>TRUST LEVEL: {trustProgress}%</h1>
          <p>Private connection confirmed</p>
        </div>
      )}

      {phase === "more" && (
        <div className="server-beat server-beat-more" key="more">
          <span className="server-kicker">ARCHIVE DEPTH / CONTINUES</span>
          <h1>THERE&apos;S MORE INSIDE<span className="server-ellipsis">.</span></h1>
          <p>Some access changes everything</p>
        </div>
      )}

      {phase === "unlocking" && (
        <div className="server-beat server-beat-unlocking" key="unlocking">
          <span className="server-kicker">ROUTING TO NEXT SECTOR / 04</span>
          <h1>LEVEL 04 UNLOCKING<span className="server-ellipsis">...</span></h1>
          <div className="server-verification-bar server-verification-bar-long" aria-hidden="true"><span /></div>
          <p>Keep the connection open</p>
        </div>
      )}

      {phase === "level04" && (
        <div className="server-beat server-beat-level04" key="level04">
          <span className="server-kicker">NEXT SECTOR / RESERVED</span>
          <h1>LEVEL 04</h1>
          <div className="server-sealed-rule" aria-hidden="true"><span>CONTENT SEALED</span></div>
          <p>Something special is waiting beyond the archive</p>
        </div>
      )}
    </div>
  );
}

export default function PrivateServer({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<ServerPhase>("intro");
  const [trustProgress, setTrustProgress] = useState(0);
  const particles = useMemoryParticles();
  const doorOpen = [
    "established",
    "memory",
    "quoteOne",
    "quoteTwo",
    "quoteThree",
    "quoteFour",
    "granted",
    "you",
    "deepakFinal",
    "trust",
    "more",
    "unlocking",
    "level04",
  ].includes(phase);

  useEffect(() => {
    const timers = SERVER_TIMELINE.map(({ at, phase: nextPhase }) =>
      window.setTimeout(() => setPhase(nextPhase), at),
    );
    const completeTimer = window.setTimeout(onComplete, 72200);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "trust") {
      setTrustProgress(phase === "more" || phase === "unlocking" || phase === "level04" ? 100 : 0);
      return;
    }

    let progress = 0;
    const interval = window.setInterval(() => {
      progress = Math.min(progress + 1, 100);
      setTrustProgress(progress);
      if (progress >= 100) window.clearInterval(interval);
    }, 48);

    return () => window.clearInterval(interval);
  }, [phase]);

  return (
    <section className={`private-server server-phase-${phase} ${doorOpen ? "door-open" : ""}`} aria-live="polite">
      <div className="server-ambient" aria-hidden="true" />
      <div className="server-grid" aria-hidden="true" />
      <div className="server-noise" aria-hidden="true" />
      <div className="server-particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="server-particle"
            key={particle.id}
            style={
              {
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
                "--server-drift-x": particle.driftX,
                "--server-drift-y": particle.driftY,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="server-topline">
        <span>LEVEL 03</span>
        <span className="server-topline-rule" />
        <span>PRIVATE SERVER</span>
      </div>

      <div className="server-side-label server-side-label-left" aria-hidden="true">
        <span>ACCESS / {phase === "level04" ? "04" : "03"}</span>
        <span>TRUSTED NODE</span>
      </div>
      <div className="server-side-label server-side-label-right" aria-hidden="true">
        <span>ARCHIVE / PRIVATE</span>
        <span>MEMORY: ENCRYPTED</span>
      </div>

      <div className="server-door-stage">
        <div className="server-door-glow" aria-hidden="true" />
        <div className="server-door">
          <div className="door-frame door-frame-outer" aria-hidden="true" />
          <div className="door-frame door-frame-inner" aria-hidden="true" />
          <div className="door-panel door-panel-left">
            <span className="door-panel-code">A / PRIVATE</span>
            <span className="door-panel-line door-panel-line-one" />
            <span className="door-panel-line door-panel-line-two" />
          </div>
          <div className="door-panel door-panel-right">
            <span className="door-panel-code">B / TRUSTED</span>
            <span className="door-panel-line door-panel-line-one" />
            <span className="door-panel-line door-panel-line-two" />
          </div>
          <div className="door-interior" aria-hidden="true">
            <div className="door-interior-grid" />
            <div className="door-memory-glow" />
          </div>
          <div className="server-lock" aria-hidden="true">
            <span className="server-lock-outer" />
            <span className="server-lock-inner" />
            <span className="server-lock-core" />
            <span className="server-lock-crosshair" />
          </div>
          <div className="door-scanline" aria-hidden="true" />
        </div>
      </div>

      <ServerReadout phase={phase} trustProgress={trustProgress} />

      <div className="server-bottomline">
        <span>ONE AUTHORIZED CONNECTION</span>
        <span className="server-progress"><i /><i /><i /><i /><i /><i /><i /></span>
        <span>{phase === "level04" ? "ARCHIVE HELD" : `DOOR STATUS: ${doorOpen ? "OPEN" : "LOCKED"}`}</span>
      </div>

      <div className="server-transition-flash" aria-hidden="true" />
    </section>
  );
}
