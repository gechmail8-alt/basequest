import { useState, useEffect } from "react";
import { getLevelInfo, shortAddr } from "../utils/contracts";

export default function Dashboard({ quests, wallet, setPage }) {
  const { address, isConnected } = wallet;
  const { userProfile, completedCount, totalDaily, loading } = quests;
  const levelInfo = userProfile ? getLevelInfo(userProfile.totalXP) : null;

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Responsive values ── */
  const heroFontSize    = isMobile ? "20px" : isTablet ? "24px" : "26px";
  const xpFontSize      = isMobile ? "24px" : isTablet ? "28px" : "32px";
  const levelFontSize   = isMobile ? "20px" : isTablet ? "22px" : "24px";
  const statValSize     = isMobile ? "20px" : "22px";
  const statCols        = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr";
  const heroPadding     = isMobile ? "18px 16px" : "22px 20px";
  const badgeSize       = isMobile ? "48px" : "56px";
  const badgeRadius     = isMobile ? "14px" : "18px";
  const badgeEmoji      = isMobile ? "24px" : "28px";

  /* ── Glass style helpers ── */
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

  const statCard = {
    ...glassBase,
    padding: isMobile ? "16px 12px" : "18px 14px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  };

  /* ── Not connected ── */
  if (!isConnected) {
    return (
      <div style={{ padding: isMobile ? "48px 16px" : "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: isMobile ? "56px" : "72px", marginBottom: "20px", lineHeight: 1 }}>🟦</div>
        <h1
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
        <p style={{ color: "#8892a4", fontSize: isMobile ? "14px" : "15px", margin: 0, lineHeight: 1.6 }}>
          Stack XP. Build legacy. Eat the airdrop.
        </p>
      </div>
    );
  }

  /* ── Loading ── */
  if (loading && !userProfile) {
    return (
      <div style={{ padding: isMobile ? "48px 16px" : "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>⏳</div>
        <div style={{ color: "#8892a4", fontSize: isMobile ? "14px" : "15px" }}>
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? "16px 0 8px" : "24px 0 8px" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: isMobile ? "16px" : "20px" }}>
        <h2
          style={{
            color: "white",
            fontSize: heroFontSize,
            fontWeight: "900",
            margin: "0 0 4px",
            letterSpacing: "-0.4px",
            lineHeight: 1.3,
          }}
        >
          👋 Welcome back,{" "}
          <span style={{ color: "#4da6ff" }}>
            {userProfile?.usernameSet ? userProfile.username : shortAddr(address)}
          </span>
        </h2>
        <p
          style={{
            color: "#5a6478",
            fontSize: isMobile ? "11px" : "13px",
            margin: 0,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          BASEQUEST OVERVIEW
        </p>
      </div>

      {/* ── Level + XP Hero Card ── */}
      {levelInfo && (
        <div style={{ ...glassBlue, padding: heroPadding, marginBottom: "14px" }}>

          {/* Top row: level badge + XP total */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "16px",
              flexWrap: isMobile ? "nowrap" : "nowrap",
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
                  fontSize: badgeEmoji,
                  flexShrink: 0,
                }}
              >
                {levelInfo.current.emoji}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: "#7a8799",
                    fontSize: isMobile ? "9px" : "10px",
                    fontWeight: "800",
                    letterSpacing: "0.1em",
                    marginBottom: "3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  CURRENT LEVEL
                </div>
                <div
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
                    fontWeight: "700",
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

          {/* XP Progress bar */}
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
                <span
                  style={{
                    color: "#5a6478",
                    fontSize: isMobile ? "10px" : "11px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  {levelInfo.xpIntoLevel?.toLocaleString() ?? 0} XP earned
                </span>
                <span
                  style={{
                    color: "#5a6478",
                    fontSize: isMobile ? "10px" : "11px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
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
        {/* Tasks Completed */}
        <div style={statCard}>
          <div style={{ fontSize: isMobile ? "22px" : "26px", lineHeight: 1 }}>✅</div>
          <div style={{ color: "#00e676", fontWeight: "900", fontSize: statValSize, lineHeight: 1 }}>
            {userProfile?.tasksCompleted?.toLocaleString() || "0"}
          </div>
          <div style={{ color: "#4a5568", fontSize: isMobile ? "9px" : "10px", fontWeight: "800", letterSpacing: "0.08em" }}>
            TASKS DONE
          </div>
        </div>

        {/* Streak */}
        <div style={statCard}>
          <div style={{ fontSize: isMobile ? "22px" : "26px", lineHeight: 1 }}>🔥</div>
          <div style={{ color: "#f0b429", fontWeight: "900", fontSize: statValSize, lineHeight: 1 }}>
            {userProfile?.streakCount || "0"}
          </div>
          <div style={{ color: "#4a5568", fontSize: isMobile ? "9px" : "10px", fontWeight: "800", letterSpacing: "0.08em" }}>
            DAY STREAK
          </div>
        </div>

        {/* Daily Progress */}
        <div style={statCard}>
          <div style={{ fontSize: isMobile ? "22px" : "26px", lineHeight: 1 }}>🗺️</div>
          <div style={{ color: "#4da6ff", fontWeight: "900", fontSize: statValSize, lineHeight: 1 }}>
            {completedCount}
            <span style={{ color: "#3a4a5e", fontSize: isMobile ? "14px" : "16px" }}>/{totalDaily}</span>
          </div>
          <div style={{ color: "#4a5568", fontSize: isMobile ? "9px" : "10px", fontWeight: "800", letterSpacing: "0.08em" }}>
            DAILY QUESTS
          </div>
        </div>

        {/* Member Since */}
        <div style={statCard}>
          <div style={{ fontSize: isMobile ? "22px" : "26px", lineHeight: 1 }}>📅</div>
          <div
            style={{
              color: "#c084fc",
              fontWeight: "900",
              fontSize: isMobile ? "14px" : "17px",
              lineHeight: 1,
            }}
          >
            {userProfile?.joinedAt
              ? new Date(userProfile.joinedAt * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "—"}
          </div>
          <div style={{ color: "#4a5568", fontSize: isMobile ? "9px" : "10px", fontWeight: "800", letterSpacing: "0.08em" }}>
            MEMBER SINCE
          </div>
        </div>
      </div>

      {/* ── Leaderboard Button ── */}
      <button
        onClick={() => setPage("leaderboard")}
        style={{
          width: "100%",
          ...glassGold,
          padding: isMobile ? "14px 16px" : "17px 20px",
          color: "#f0b429",
          fontWeight: "900",
          fontSize: isMobile ? "14px" : "15px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          letterSpacing: "0.02em",
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
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(240,180,41,0.18)";
        }}
        onTouchEnd={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(240,180,41,0.10)";
        }}
      >
        <span style={{ fontSize: isMobile ? "18px" : "20px" }}>🏆</span>
        View Leaderboard
        <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: "18px" }}>›</span>
      </button>

    </div>
  );
                       }
