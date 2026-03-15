import { useState, useEffect } from "react";
import { getLevelInfo, shortAddr } from "../utils/contracts";

/* ── Icon component ── */
const Icon = ({ name, size = 24, color = "currentColor", style = {} }) => (
  <img
    src={`/${name}.svg`}
    alt={name}
    style={{
      width: size,
      height: size,
      display: "block",
      filter: color === "currentColor" ? undefined : undefined,
      ...style,
    }}
  />
);

/* ── Glass helpers ── */
const glassBase = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "24px",
};

const glassBlue = {
  background: "linear-gradient(135deg, rgba(0,82,255,0.18) 0%, rgba(0,180,255,0.10) 100%)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  border: "1px solid rgba(0,140,255,0.28)",
  borderRadius: "28px",
};

const glassGold = {
  background: "linear-gradient(135deg, rgba(240,180,41,0.16) 0%, rgba(255,140,0,0.08) 100%)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(240,180,41,0.30)",
  borderRadius: "20px",
};

/* ── Font injection ── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; }

  .dash-heading {
    font-family: 'Syne', sans-serif;
  }
  .dash-body {
    font-family: 'DM Sans', sans-serif;
  }
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .leaderboard-btn:active {
    transform: scale(0.98) !important;
  }
`;

export default function Dashboard({ quests, wallet, setPage }) {
  const { address, isConnected } = wallet;
  const { userProfile, completedCount, totalDaily, loading } = quests;
  const levelInfo = userProfile ? getLevelInfo(userProfile.totalXP) : null;

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    /* Inject fonts once */
    if (!document.getElementById("dash-fonts")) {
      const style = document.createElement("style");
      style.id = "dash-fonts";
      style.textContent = FONTS;
      document.head.appendChild(style);
    }

    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Responsive tokens ── */
  const heroFontSize  = isMobile ? "20px" : isTablet ? "23px" : "26px";
  const xpFontSize    = isMobile ? "24px" : isTablet ? "28px" : "32px";
  const levelFontSize = isMobile ? "20px" : isTablet ? "22px" : "24px";
  const statValSize   = isMobile ? "20px" : "22px";
  const statCols      = isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr";
  const heroPadding   = isMobile ? "18px 16px" : "22px 20px";
  const badgeSize     = isMobile ? "48px" : "56px";
  const badgeRadius   = isMobile ? "14px" : "18px";
  const iconSize      = isMobile ? 22 : 26;
  const statCard      = {
    ...glassBase,
    padding: isMobile ? "16px 12px" : "18px 14px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  };

  /* ── Not connected ── */
  if (!isConnected) {
    return (
      <div
        className="dash-body"
        style={{ padding: isMobile ? "48px 16px" : "60px 20px", textAlign: "center" }}
      >
        <Icon
          name="cube"
          size={isMobile ? 56 : 72}
          style={{ margin: "0 auto 20px", opacity: 0.9 }}
        />
        <h1
          className="dash-heading"
          style={{
            color: "white",
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: "900",
            margin: "0 0 12px",
            letterSpacing: "-0.5px",
            lineHeight: 1.3,
          }}
        >
          Skill issue if you're not on chain yet.
        </h1>
        <p
          style={{
            color: "#8892a4",
            fontSize: isMobile ? "14px" : "15px",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Stack XP. Build legacy. Eat the airdrop.
        </p>
      </div>
    );
  }

  /* ── Loading ── */
  if (loading && !userProfile) {
    return (
      <div
        className="dash-body"
        style={{ padding: isMobile ? "48px 16px" : "60px 20px", textAlign: "center" }}
      >
        <Icon
          name="hourglass"
          size={40}
          style={{ margin: "0 auto 16px", opacity: 0.7 }}
        />
        <div style={{ color: "#8892a4", fontSize: isMobile ? "14px" : "15px" }}>
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div
      className="dash-body"
      style={{ padding: isMobile ? "16px 0 8px" : "24px 0 8px" }}
    >

      {/* ── Header ── */}
      <div style={{ marginBottom: isMobile ? "16px" : "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <Icon name="wave" size={isMobile ? 22 : 26} style={{ flexShrink: 0, opacity: 0.9 }} />
        <div>
          <h2
            className="dash-heading"
            style={{
              color: "white",
              fontSize: heroFontSize,
              fontWeight: "900",
              margin: "0 0 3px",
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
            }}
          >
            Welcome back,{" "}
            <span style={{ color: "#4da6ff" }}>
              {userProfile?.usernameSet ? userProfile.username : shortAddr(address)}
            </span>
          </h2>
          <p
            style={{
              color: "#5a6478",
              fontSize: isMobile ? "11px" : "12px",
              margin: 0,
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            BASEQUEST OVERVIEW
          </p>
        </div>
      </div>

      {/* ── Level + XP Hero Card ── */}
      {levelInfo && (
        <div style={{ ...glassBlue, padding: heroPadding, marginBottom: "14px" }}>

          {/* Top row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {/* Level badge */}
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "12px", minWidth: 0 }}>
              <div
                style={{
                  width: badgeSize,
                  height: badgeSize,
                  borderRadius: badgeRadius,
                  background: `${levelInfo.current.color}22`,
                  border: `2px solid ${levelInfo.current.color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  name="level"
                  size={isMobile ? 24 : 28}
                  style={{
                    filter: `drop-shadow(0 0 6px ${levelInfo.current.color})`,
                    opacity: 0.95,
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: "#7a8799",
                    fontSize: isMobile ? "9px" : "10px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    marginBottom: "3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  CURRENT LEVEL
                </div>
                <div
                  className="dash-heading"
                  style={{
                    color: levelInfo.current.color,
                    fontWeight: "900",
                    fontSize: levelFontSize,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${levelInfo.current.color}66`,
                  }}
                >
                  Level {levelInfo.current.level}
                </div>
                <div
                  style={{
                    color: levelInfo.current.color,
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: "600",
                    opacity: 0.75,
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {levelInfo.current.name}
                </div>
              </div>
            </div>

            {/* XP pill */}
            <div
              style={{
                background: "rgba(240,180,41,0.12)",
                border: "1px solid rgba(240,180,41,0.30)",
                borderRadius: "14px",
                padding: isMobile ? "8px 12px" : "10px 16px",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              <div
                className="dash-heading"
                style={{
                  color: "#f0b429",
                  fontWeight: "900",
                  fontSize: xpFontSize,
                  lineHeight: 1,
                  textShadow: "0 0 16px rgba(240,180,41,0.45)",
                }}
              >
                {levelInfo.xp.toLocaleString()}
              </div>
              <div
                style={{
                  color: "#9a7a30",
                  fontSize: isMobile ? "10px" : "11px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                }}
              >
                TOTAL XP
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {levelInfo.next && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#5a6478", fontSize: isMobile ? "10px" : "11px", fontWeight: "600", whiteSpace: "nowrap" }}>
                  {levelInfo.xpIntoLevel?.toLocaleString() ?? 0} XP earned
                </span>
                <span style={{ color: "#5a6478", fontSize: isMobile ? "10px" : "11px", fontWeight: "600", whiteSpace: "nowrap" }}>
                  {levelInfo.xpForNext?.toLocaleString() ?? "?"} to Lv {levelInfo.next.level}
                </span>
              </div>
              <div
                style={{
                  height: isMobile ? "6px" : "8px",
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "99px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, levelInfo.progress ?? 0)}%`,
                    background: `linear-gradient(90deg, ${levelInfo.current.color}, #4da6ff)`,
                    borderRadius: "99px",
                    boxShadow: `0 0 12px ${levelInfo.current.color}88`,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Stat Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: statCols,
          gap: isMobile ? "8px" : "10px",
          marginBottom: "14px",
        }}
      >
        {[
          { icon: "check",    value: userProfile?.tasksCompleted?.toLocaleString() || "0", color: "#00e676", label: "TASKS DONE"    },
          { icon: "fire",     value: userProfile?.streakCount || "0",                       color: "#f0b429", label: "DAY STREAK"   },
          {
            icon: "map",
            value: (
              <span>
                {completedCount}
                <span style={{ color: "#3a4a5e", fontSize: isMobile ? "14px" : "16px" }}>/{totalDaily}</span>
              </span>
            ),
            color: "#4da6ff",
            label: "DAILY QUESTS",
          },
          {
            icon: "calendar",
            value: userProfile?.joinedAt
              ? new Date(userProfile.joinedAt * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" })
              : "—",
            color: "#c084fc",
            label: "MEMBER SINCE",
            smallVal: true,
          },
        ].map(({ icon, value, color, label, smallVal }) => (
          <div key={label} className="stat-card" style={statCard}>
            <Icon name={icon} size={iconSize} style={{ opacity: 0.85 }} />
            <div
              className="dash-heading"
              style={{
                color,
                fontWeight: "900",
                fontSize: smallVal ? (isMobile ? "14px" : "16px") : statValSize,
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                color: "#4a5568",
                fontSize: isMobile ? "9px" : "10px",
                fontWeight: "700",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Leaderboard Button ── */}
      <button
        className="leaderboard-btn dash-body"
        onClick={() => setPage("leaderboard")}
        style={{
          width: "100%",
          ...glassGold,
          padding: isMobile ? "14px 16px" : "17px 20px",
          color: "#f0b429",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "15px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          letterSpacing: "0.03em",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          boxShadow: "0 4px 24px rgba(240,180,41,0.10)",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(240,180,41,0.22)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(240,180,41,0.10)";
        }}
        onTouchStart={e => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onTouchEnd={e => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Icon name="trophy" size={isMobile ? 18 : 20} style={{ opacity: 0.9 }} />
        View Leaderboard
        <span style={{ marginLeft: "auto", opacity: 0.4, fontSize: "18px", fontWeight: "400" }}>›</span>
      </button>

    </div>
  );
}
