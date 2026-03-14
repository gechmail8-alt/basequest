import { getLevelInfo, shortAddr } from "../utils/contracts";

export default function Dashboard({ quests, wallet, setActiveTab }) {
  const { address, isConnected } = wallet;
  const { userProfile, completedCount, totalDaily, loading } = quests;

  const levelInfo = userProfile ? getLevelInfo(userProfile.totalXP) : null;

  if (!isConnected) return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <img src="/base.svg" style={{ width: "84px", height: "84px", marginBottom: "20px" }} />
      <h1 style={{ color: "white", fontSize: "28px", fontWeight: "900", marginBottom: "12px" }}>
        Skill issue if you're not on-chain yet.
      </h1>
      <p style={{ color: "#8892a4", fontSize: "15px", maxWidth: "420px", margin: "0 auto 6px" }}>
        Stack XP. Build legacy. Eat the airdrop.
      </p>
      <p style={{ color: "#0052ff", fontSize: "14px", fontWeight: "700" }}>
        Based chads only. No paper hands allowed.
      </p>
    </div>
  );

  if (loading && !userProfile) return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <img src="/loading.svg" style={{ width: "36px", height: "36px" }} />
      <p style={{ color: "#8892a4", marginTop: "12px" }}>Loading profile...</p>
    </div>
  );

  return (
    <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Header */}
      <div>
        <h2 style={{ color: "white", fontSize: "22px", fontWeight: "800", marginBottom: "4px" }}>
          Welcome back {userProfile?.usernameSet ? userProfile.username : shortAddr(address)}
        </h2>
        <p style={{ color: "#8892a4", fontSize: "13px" }}>BaseQuest dashboard</p>
      </div>

      {/* Row 1: Current Level (1x1 full width) */}
      {levelInfo && (
        <div style={{
          background: "linear-gradient(135deg, rgba(0,82,255,0.15), rgba(0,82,255,0.05))",
          border: "1px solid rgba(0,82,255,0.3)",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "16px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "36px" }}>{levelInfo.current.emoji}</span>
              <div>
                <div style={{ color: levelInfo.current.color, fontWeight: "900", fontSize: "22px" }}>
                  Level {levelInfo.current.level} — {levelInfo.current.name}
                </div>
                {levelInfo.next && (
                  <div style={{ color: "#8892a4", fontSize: "13px" }}>
                    Next: {levelInfo.next.name} at {levelInfo.next.minXP.toLocaleString()} XP
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#f0b429", fontWeight: "900", fontSize: "32px" }}>
                {levelInfo.xp.toLocaleString()}
              </div>
              <div style={{ color: "#8892a4", fontSize: "13px" }}>Total XP</div>
            </div>
          </div>
          {levelInfo.next && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "#8892a4", fontSize: "12px" }}>{levelInfo.xp.toLocaleString()} XP</span>
                <span style={{ color: "#8892a4", fontSize: "12px" }}>{levelInfo.next.minXP.toLocaleString()} XP</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "8px", height: "10px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${levelInfo.progress}%`,
                  background: `linear-gradient(90deg, ${levelInfo.current.color}, ${levelInfo.current.color}99)`,
                  borderRadius: "8px",
                  boxShadow: `0 0 10px ${levelInfo.current.color}66`,
                  transition: "width 0.5s ease"
                }} />
              </div>
              <div style={{ color: "#8892a4", fontSize: "12px", marginTop: "6px", textAlign: "center" }}>
                {levelInfo.progress.toFixed(1)}% to {levelInfo.next.name}
              </div>
            </div>
          )}
          {!levelInfo.next && (
            <div style={{ textAlign: "center", color: "#f0b429", fontWeight: "700", fontSize: "14px", marginTop: "8px" }}>
              🏆 Max Level Reached!
            </div>
          )}
        </div>
      )}

      {/* Row 2: Tasks Completed / Today Completed (2×1) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center"
        }}>
          <img src="/check.svg" style={{ width: "24px", height: "24px", marginBottom: "6px" }} />
          <div style={{ color: "white", fontWeight: "800", fontSize: "20px" }}>
            {userProfile?.tasksCompleted?.toLocaleString() || "0"}
          </div>
          <div style={{ color: "#8892a4", fontSize: "11px" }}>Tasks Completed</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center"
        }}>
          <img src="/progress.svg" style={{ width: "24px", height: "24px", marginBottom: "6px" }} />
          <div style={{ color: "white", fontWeight: "800", fontSize: "20px" }}>
            {completedCount}/{totalDaily}
          </div>
          <div style={{ color: "#8892a4", fontSize: "11px" }}>Today Completed</div>
        </div>
      </div>

      {/* Row 3: Streak / Member Since (2×1) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center"
        }}>
          <img src="/streak.svg" style={{ width: "24px", height: "24px", marginBottom: "6px" }} />
          <div style={{ color: "white", fontWeight: "800", fontSize: "20px" }}>
            {userProfile?.streakCount || "0"}
          </div>
          <div style={{ color: "#8892a4", fontSize: "11px" }}>Day Streak</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center"
        }}>
          <img src="/calendar.svg" style={{ width: "24px", height: "24px", marginBottom: "6px" }} />
          <div style={{ color: "white", fontWeight: "800", fontSize: "20px" }}>
            {userProfile?.joinedAt
              ? new Date(userProfile.joinedAt * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" })
              : "-"}
          </div>
          <div style={{ color: "#8892a4", fontSize: "11px" }}>Member Since</div>
        </div>
      </div>

      {/* Row 4: Leaderboard (1×1 full width) */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => setActiveTab("leaderboard")}
          style={{
            background: "linear-gradient(135deg, #f0b429, #d69e2e)",
            border: "none",
            borderRadius: "16px",
            padding: "16px 28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 6px 20px rgba(240,180,41,0.3)",
            fontWeight: "800",
            fontSize: "16px",
            color: "white",
            width: "100%"
          }}
        >
          <img src="/leaderboard.svg" style={{ width: "24px", height: "24px" }} />
          Leaderboard
        </button>
      </div>

    </div>
  );
}
