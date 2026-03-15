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
  { id: "dashboard", label: "Dashboard", icon: "/dashboard.svg" },
  { id: "quests", label: "Quests", icon: "/quests.svg" },
  { id: "bossraid", label: "Boss", icon: "/boss.svg" },
  { id: "analyzer", label: "Wallet", icon: "/wallet.svg" },
];

const ICON_BLUE = "#0082FF";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [slideIndex, setSlideIndex] = useState(0);
  const wallet = useWallet();
  const quests = useQuests(wallet);
  const walletWithProfile = { ...wallet, userProfile: quests.userProfile };

  const pages = [
    <Dashboard key="dashboard" quests={quests} wallet={wallet} setActiveTab={setActiveTab} />,
    <QuestBoard key="quests" quests={quests} wallet={wallet} />,
    <BossRaid key="bossraid" wallet={wallet} />,
    <WalletAnalyzer key="analyzer" wallet={wallet} />,
    <Leaderboard key="leaderboard" wallet={wallet} />,
  ];

  // Map activeTab or leaderboard click to slideIndex
  const getSlideIndex = (tab) => {
    switch (tab) {
      case "dashboard": return 0;
      case "quests": return 1;
      case "bossraid": return 2;
      case "analyzer": return 3;
      case "leaderboard": return 4;
      default: return 0;
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSlideIndex(getSlideIndex(tabId));
  };

  const openLeaderboard = () => {
    setSlideIndex(getSlideIndex("leaderboard"));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0b0f", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <Navbar wallet={walletWithProfile} />

      <div style={{ overflow: "hidden", width: "100%" }}>
        <div
          style={{
            display: "flex",
            width: `${pages.length * 100}%`,
            transform: `translateX(-${slideIndex * 100}%)`,
            transition: "transform 0.4s ease",
          }}
        >
          {pages.map((page, i) => (
            <div key={i} style={{ width: "100%", flexShrink: 0 }}>
              {page}
            </div>
          ))}
        </div>
      </div>

      {/* Example button for leaderboard inside dashboard */}
      {/* You can also place it wherever needed */}
      <button onClick={openLeaderboard} style={{ position: "fixed", top: 100, right: 20, zIndex: 200 }}>
        Open Leaderboard
      </button>

      <div style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "480px",
        display: "flex",
        justifyContent: "space-between",
        background: "rgba(10,11,15,0.45)",
        borderRadius: "9999px",
        padding: "2px 0",
        backdropFilter: "blur(18px)",
        zIndex: 100,
      }} className="mobile-nav">
        <div
          style={{
            position: "absolute",
            top: "2%",
            left: `${TABS.findIndex(t => t.id === activeTab) * (100 / TABS.length)}%`,
            width: `${100 / TABS.length}%`,
            height: "96%",
            borderRadius: "9999px",
            background: "rgba(0,82,255,0.25)",
            backdropFilter: "blur(12px)",
            transition: "left 0.3s",
            zIndex: -1,
          }}
        />
        {TABS.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: "2px 0",
            }}
          >
            <img
              src={tab.icon}
              alt={tab.label}
              style={{
                width: "22px",
                height: "22px",
                marginBottom: "1px",
                filter: activeTab === tab.id
                  ? "invert(37%) sepia(98%) saturate(4869%) hue-rotate(199deg) brightness(101%) contrast(101%)"
                  : "invert(100%)",
              }}
            />
            <span style={{
              fontSize: "10px",
              fontWeight: 700,
              color: activeTab === tab.id ? ICON_BLUE : "white",
            }}>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
