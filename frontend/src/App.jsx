import { useState } from "react";
import { useWallet } from "./hooks/useWallet";
import { useQuests } from "./hooks/useQuests";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QuestBoard from "./components/QuestBoard";
import BossRaid from "./components/BossRaid";
import Leaderboard from "./components/Leaderboard";
import WalletAnalyzer from "./components/WalletAnalyzer";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "quests", label: "Quests", icon: "🗺️" },
  { id: "bossraid", label: "Boss Raid", icon: "🐉" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "analyzer", label: "Wallet Analyzer", icon: "🔍" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const wallet = useWallet();
  const quests = useQuests(wallet);

  const walletWithProfile = { ...wallet, userProfile: quests.userProfile };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard quests={quests} wallet={wallet} setActiveTab={setActiveTab} />;
      case "quests": return <QuestBoard quests={quests} wallet={wallet} />;
      case "bossraid": return <BossRaid wallet={wallet} />;
      case "leaderboard": return <Leaderboard wallet={wallet} />;
      case "analyzer": return <WalletAnalyzer wallet={wallet} />;
      default: return <Dashboard quests={quests} wallet={wallet} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0b0f", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <Navbar wallet={walletWithProfile} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 16px 80px" }}>
        {renderTab()}
      </div>

      {/* Floating bottom nav with rounded rectangles */}
      <div style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        background: "rgba(10,11,15,0.95)",
        padding: "12px 16px",
        borderRadius: "50px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        backdropFilter: "blur(15px)",
        zIndex: 100,
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              minWidth: "50px",
              height: "50px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: activeTab === tab.id ? "#0052ff" : "rgba(255,255,255,0.05)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <span style={{
              fontSize: activeTab === tab.id ? "22px" : "20px",
              color: activeTab === tab.id ? "white" : "#8892a4",
              transition: "all 0.3s",
            }}>
              {tab.icon}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 16px 100px", textAlign: "center", marginTop: "40px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "12px" }}>
          <a href="https://twitter.com/Jee_phoenix" target="_blank" rel="noreferrer"
            style={{ color: "#8892a4", fontSize: "13px", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "#8892a4"}
          >
            𝕏 Contact Us
          </a>
        </div>
        <div style={{ color: "#4a5568", fontSize: "12px", marginBottom: "4px" }}>© 2026 BaseQuest™ — All rights reserved.</div>
        <div style={{ color: "#4a5568", fontSize: "11px" }}>Built with 💙 on Base 🟦</div>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0b0f; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(0,82,255,0.3); border-radius: 3px; }
        input::placeholder { color: #4a5568; }
        a { color: inherit; }
      `}</style>
    </div>
  );
}
