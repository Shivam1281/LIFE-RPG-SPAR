import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./context/AuthContext";
import API from "./services/api";

const categories = {
  Study: "📚",
  Fitness: "🏃",
  Reading: "📖",
  Work: "💼",
  Personal: "👤",
  Other: "⚔️",
};

const rewards = {
  Easy: { xp: 50, coins: 25 },
  Medium: { xp: 80, coins: 40 },
  Hard: { xp: 100, coins: 50 },
};

const rankForXP = (xp) => {
  if (xp >= 7000) return "S-RANK HUNTER";
  if (xp >= 4000) return "A-RANK HUNTER";
  if (xp >= 2000) return "B-RANK HUNTER";
  if (xp >= 1000) return "C-RANK HUNTER";
  if (xp >= 500) return "D-RANK HUNTER";
  return "E-RANK HUNTER";
};

const levelForXP = (xp) => Math.floor((xp || 0) / 100) + 1;

function SystemFrame({ children, className = "" }) {
  return (
    <div className={`system-frame ${className}`}>
      <span className="frame-corner tl" />
      <span className="frame-corner tr" />
      <span className="frame-corner bl" />
      <span className="frame-corner br" />
      {children}
    </div>
  );
}

function Particles({ count = 22 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        delay: `${(i % 8) * 0.18}s`,
        duration: `${2 + (i % 5) * 0.35}s`,
      })),
    [count]
  );

  return (
    <div className="particles" aria-hidden="true">
      {dots.map((dot) => (
        <i
          key={dot.id}
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}

function LoginScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") await login(email, password);
      else await register(username, email, password);
    } catch (err) {
      setError(err?.response?.data?.message || "System authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-rays" />
      <Particles count={35} />
      <SystemFrame className="login-card">
        <div className="login-top"><span>SYSTEM ONLINE</span><span>SECURE CHANNEL</span></div>
        <div className="login-logo">⚔️</div>
        <div className="login-brand">LIFE<span>RPG</span></div>
        <div className="login-sub">REAL LIFE // QUEST MANAGEMENT SYSTEM</div>

        <div className="system-title"><b>!</b><div><small>SYSTEM ACCESS</small><h2>{mode === "login" ? "LOGIN" : "AWAKEN HUNTER"}</h2></div></div>

        <form onSubmit={submit} className="login-form">
          {mode === "register" && (
            <label className="field"><span>HUNTER NAME</span><input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter hunter name" required /></label>
          )}
          <label className="field"><span>EMAIL</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hunter@system.com" required /></label>
          <label className="field"><span>PASSWORD</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required /></label>
          {error && <div className="form-error">{error}</div>}
          <button className="system-button" disabled={busy}>{busy ? "VERIFYING..." : mode === "login" ? "ENTER SYSTEM →" : "AWAKEN HUNTER →"}</button>
        </form>

        <div className="login-switch">
          <span>{mode === "login" ? "NEW HUNTER?" : "ALREADY REGISTERED?"}</span>
          <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "CREATE ACCOUNT" : "RETURN TO LOGIN"}
          </button>
        </div>
      </SystemFrame>
    </div>
  );
}

function Stat({ icon, label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div><small>{label}</small><strong>{value}</strong><span>{sub}</span></div>
    </div>
  );
}

function QuestCard({ quest, onComplete, completing }) {
  const difficulty = quest.difficulty || "Easy";
  return (
    <SystemFrame className={`quest-card ${quest.completed ? "quest-completed" : ""} ${difficulty.toLowerCase()}`}>
      <div className="quest-card-glow" />
      <div className="quest-top">
        <div className={`quest-icon ${difficulty.toLowerCase()}`}>{categories[quest.category] || categories.Other}</div>
        <span className={`difficulty ${difficulty.toLowerCase()}`}>{difficulty} LEVEL</span>
      </div>

      <div className="quest-content">
        <div className="quest-info-label"><span>!</span> QUEST INFO</div>
        <h3>{quest.title}</h3>
        <div className="quest-goal">GOAL // {quest.category || "Other"}</div>
      </div>

      <div className="quest-rewards">
        <div className="quest-reward xp"><b>⚡</b><div><small>REWARD</small><strong>+{quest.xpReward} XP</strong></div></div>
        <div className="quest-warning"><span>WARNING:</span> Failure to complete this quest delays your hunter progression.</div>
        <div className="quest-reward coins"><b>◈</b><div><small>COINS</small><strong>+{quest.coinReward}</strong></div></div>
      </div>

      <button className={quest.completed ? "completed-button" : "complete-button"} disabled={quest.completed || completing} onClick={() => onComplete(quest)}>
        {quest.completed ? <><span>✓</span> COMPLETED</> : completing ? <>PROCESSING... <span>◌</span></> : <>COMPLETE QUEST <span>→</span></>}
      </button>
    </SystemFrame>
  );
}

function CompletionFX({ data, onClose }) {
  const title = data.difficulty === "Hard" ? "BOSS QUEST DEFEATED" : data.difficulty === "Medium" ? "MISSION CLEARED" : "QUEST COMPLETE";
  return (
    <div className="completion-fx" onClick={onClose}>
      <div className="fx-flash" />
      <div className="fx-rings"><i /><i /><i /></div>
      <div className="fx-rays" />
      <Particles count={65} />
      <SystemFrame className={`notification-card ${data.difficulty === "Hard" ? "boss" : ""}`}>
        <div className="notification-header"><div className="notification-icon">!</div><div><small>SYSTEM NOTIFICATION</small><h2>NOTIFICATION</h2></div></div>
        <div className="notification-body">
          <p>{data.difficulty === "Hard" ? "Threat neutralized." : "Your quest has been completed."}</p>
          <div className="notification-quest">[ {data.title} ]</div>
          <div className="down-arrows"><span>⌄</span><span>⌄</span><span>⌄</span></div>
          <div className="complete-banner">[ {title} ]</div>
          <div className="reward-burst">
            <div><small>EXPERIENCE</small><strong>+{data.xp} XP</strong></div>
            <div><small>COINS</small><strong>+{data.coins}</strong></div>
          </div>
          {data.levelUp && <div className="level-up-banner">LEVEL UP <b>LV {data.newLevel}</b></div>}
          <span className="continue-hint">CLICK TO CONTINUE</span>
        </div>
      </SystemFrame>
    </div>
  );
}

function CreateQuest({ onClose, onCreate, busy }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [difficulty, setDifficulty] = useState("Easy");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title: title.trim(), category, difficulty });
  };

  return (
    <div className="modal-backdrop">
      <Particles count={30} />
      <SystemFrame className="create-modal">
        <div className="modal-title"><div className="notification-icon">!</div><div><small>QUEST REGISTRATION</small><h2>QUEST INFO</h2></div><button onClick={onClose}>×</button></div>
        <p className="modal-copy">A new objective is ready to enter the Hunter System.</p>
        <form onSubmit={submit}>
          <label className="field"><span>QUEST TITLE</span><input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Complete DSA practice" /></label>
          <div className="field-row">
            <label className="field"><span>CATEGORY</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option>Study</option><option>Fitness</option><option>Reading</option><option>Work</option><option>Personal</option><option>Other</option></select></label>
            <label className="field"><span>DIFFICULTY</span><select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
          </div>
          <div className="reward-preview"><div><small>QUEST REWARD</small><strong>⚡ +{rewards[difficulty].xp} XP</strong></div><div><small>COINS</small><strong>◈ +{rewards[difficulty].coins}</strong></div></div>
          <div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose} disabled={busy}>Cancel</button><button className="system-button" disabled={busy}>{busy ? "CREATING..." : "⚔️ CREATE QUEST"}</button></div>
        </form>
      </SystemFrame>
    </div>
  );
}

function Dashboard({ user, xp, coins, streak, quests, onComplete, onCreate, completingId, setPage }) {
  const level = levelForXP(xp);
  const progress = xp % 100;
  const active = quests.filter((q) => !q.completed);
  const completed = quests.filter((q) => q.completed).length;
  return (
    <>
      <div className="dashboard-grid">
        <SystemFrame className="hero-status">
          <div className="system-label">HUNTER STATUS // ACTIVE</div>
          <div className="hero-status-inner">
            <div className="level-orb"><span>LV</span><strong>{level}</strong><i /><b /></div>
            <div className="hero-info"><small>REGISTERED HUNTER</small><h2>{user?.username || "PLAYER"}</h2><div className="rank">[ {rankForXP(xp)} ]</div><p>The system has recognized your progress. Continue completing real-life objectives.</p></div>
          </div>
          <div className="xp-section"><div><span>EXPERIENCE</span><strong>{xp} / {level * 100} XP</strong></div><div className="xp-bar"><i style={{ width: `${progress}%` }} /></div><small>{progress}% TO NEXT LEVEL</small></div>
        </SystemFrame>

        <div className="stats-grid"><Stat icon="⚡" label="EXPERIENCE" value={xp} sub="TOTAL XP" /><Stat icon="◈" label="COINS" value={coins} sub="AVAILABLE" /><Stat icon="🔥" label="STREAK" value={streak} sub="DAYS ACTIVE" /><Stat icon="✓" label="QUESTS" value={completed} sub="CLEARED" /></div>

        <SystemFrame className="dashboard-quests">
          <div className="section-heading"><div className="notification-icon">!</div><div><small>DAILY QUEST SYSTEM</small><h2>QUEST INFO</h2></div><button onClick={() => setPage("quests")}>VIEW ALL →</button></div>
          <div className="quest-grid compact">{active.slice(0, 4).map((q) => <QuestCard key={q._id} quest={q} onComplete={onComplete} completing={completingId === q._id} />)}{active.length === 0 && <div className="empty-state">NO ACTIVE QUESTS DETECTED<button className="system-button" onClick={onCreate}>REGISTER QUEST</button></div>}</div>
        </SystemFrame>
      </div>
    </>
  );
}

export default function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("dashboard");
  const [quests, setQuests] = useState([]);
  const [profile, setProfile] = useState(user);
  const [xp, setXp] = useState(user?.xp || 0);
  const [coins, setCoins] = useState(user?.coins || 0);
  const [streak, setStreak] = useState(user?.streak || 0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [completingId, setCompletingId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [completion, setCompletion] = useState(null);
  const [toast, setToast] = useState("");

  const load = async () => {
    try {
      const [u, q] = await Promise.all([API.get("/user/profile"), API.get("/quests")]);
      const data = u.data.user;
      setProfile(data); setXp(data.xp || 0); setCoins(data.coins || 0); setStreak(data.streak || 0);
      localStorage.setItem("lifeRPGUser", JSON.stringify(data));
      setQuests(q.data.quests || []);
    } catch (e) {
      setToast(e?.response?.data?.message || "SYSTEM DATA LOAD FAILED");
    } finally { setLoading(false); }
  };

  useEffect(() => { if (user) load(); else setLoading(false); }, [user]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2800); return () => clearTimeout(t); }, [toast]);

  if (!user) return <LoginScreen />;

  const completeQuest = async (quest) => {
    if (completingId || quest.completed) return;
    const oldLevel = levelForXP(xp);
    setCompletingId(quest._id);
    try {
      const response = await API.put(`/quests/${quest._id}/complete`);
      const u = response.data.user;
      setQuests((list) => list.map((q) => q._id === quest._id ? { ...q, completed: true, completedAt: new Date() } : q));
      setXp(u.xp || 0); setCoins(u.coins || 0); setStreak(u.streak || 0); setProfile(u);
      localStorage.setItem("lifeRPGUser", JSON.stringify(u));
      setCompletion({ title: quest.title, difficulty: quest.difficulty || "Easy", xp: quest.xpReward, coins: quest.coinReward, levelUp: (u.level || levelForXP(u.xp)) > oldLevel, newLevel: u.level || levelForXP(u.xp) });
    } catch (e) { setToast(e?.response?.data?.message || "FAILED TO COMPLETE QUEST"); }
    finally { setCompletingId(null); }
  };

  const createQuest = async ({ title, category, difficulty }) => {
    setCreating(true);
    try {
      const response = await API.post("/quests", { title, category, difficulty, xpReward: rewards[difficulty].xp, coinReward: rewards[difficulty].coins });
      setQuests((list) => [response.data.quest, ...list]);
      setShowCreate(false); setToast("QUEST REGISTERED SUCCESSFULLY");
    } catch (e) { setToast(e?.response?.data?.message || "FAILED TO CREATE QUEST"); }
    finally { setCreating(false); }
  };

  const active = quests.filter((q) => !q.completed);
  const completed = quests.filter((q) => q.completed).length;
  const level = levelForXP(xp);
  const rank = rankForXP(xp);

  const nav = [
    ["dashboard", "⌂", "DASHBOARD"],
    ["quests", "!", "QUESTS"],
    ["rewards", "◈", "REWARDS"],
    ["achievements", "✦", "ACHIEVEMENTS"],
    ["profile", "◉", "HUNTER PROFILE"],
  ];

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-bg" />
      <aside className="sidebar">
        <div className="logo"><div className="logo-icon">⚔️</div><div><h2>Life<span>RPG</span></h2><small>LEVEL YOUR LIFE</small></div></div>
        <div className="sidebar-title">ADVENTURE</div>
        <nav>{nav.map(([id, icon, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}><span>{icon}</span>{label}</button>)}</nav>
        <div className="sidebar-hunter"><small>CURRENT HUNTER</small><strong>{profile?.username || "PLAYER"}</strong><span>{rank}</span><div><i style={{ width: `${xp % 100}%` }} /></div><small>LV {level} // {xp} XP</small></div>
        <button className="logout" onClick={logout}>↪ DISCONNECT</button>
      </aside>

      <main className="main">
        <header className="topbar"><div><small>SYSTEM // {page.toUpperCase()}</small><h1>{page === "dashboard" ? "HUNTER STATUS" : page === "quests" ? "QUEST INFORMATION" : page === "rewards" ? "REWARD SYSTEM" : page === "achievements" ? "ACHIEVEMENT SYSTEM" : "HUNTER PROFILE"}</h1></div><div className="top-stats"><Stat icon="⌁" label="LV" value={level} sub="" /><Stat icon="⚡" label="XP" value={xp} sub="" /><Stat icon="◈" label="COINS" value={coins} sub="" /></div></header>

        <section className="content">
          {loading ? <SystemFrame className="loading"><div className="loader" /><span>SYSTEM INITIALIZING...</span></SystemFrame> : page === "dashboard" ? <Dashboard user={profile} xp={xp} coins={coins} streak={streak} quests={quests} onComplete={completeQuest} onCreate={() => setShowCreate(true)} completingId={completingId} setPage={setPage} /> : null}

          {!loading && page === "quests" && <SystemFrame className="full-panel"><div className="section-heading"><div className="notification-icon">!</div><div><small>SYSTEM // DAILY OBJECTIVES</small><h2>QUEST INFORMATION</h2></div><button onClick={() => setShowCreate(true)}>⚔️ CREATE QUEST</button></div><div className="quest-summary"><span>ACTIVE <b>{active.length}</b></span><span>CLEARED <b>{completed}</b></span><span>THREAT LEVEL <b>{active.length ? "DETECTED" : "CLEAR"}</b></span></div><div className="quest-grid">{quests.map((q) => <QuestCard key={q._id} quest={q} onComplete={completeQuest} completing={completingId === q._id} />)}{!quests.length && <div className="empty-state">NO QUESTS DETECTED<button className="system-button" onClick={() => setShowCreate(true)}>REGISTER FIRST QUEST</button></div>}</div></SystemFrame>}

          {!loading && page === "rewards" && <SystemFrame className="full-panel"><div className="section-heading"><div className="notification-icon">◈</div><div><small>SYSTEM // REWARD INVENTORY</small><h2>REWARD SYSTEM</h2></div><strong className="balance">◈ {coins} COINS</strong></div><div className="reward-grid">{[["☕","COFFEE BREAK","Take a short recovery break.",100],["🎮","GAMING SESSION","30 minutes of guilt-free gaming.",200],["🎬","MOVIE NIGHT","Watch one movie after your quests.",300],["🍕","PIZZA REWARD","Unlock a personal food reward.",500],["⏳","FREE TIME","One hour completely free from tasks.",250]].map(([icon,title,desc,cost]) => <SystemFrame className="reward-card" key={title}><div className="reward-icon">{icon}</div><small>LIFE REWARD</small><h3>{title}</h3><p>{desc}</p><div className="reward-price">◈ {cost}</div><button className="system-button" disabled={coins < cost} onClick={() => setToast(coins >= cost ? `${title} REDEEMED` : "INSUFFICIENT COINS")}>{coins >= cost ? "REDEEM →" : "LOCKED"}</button></SystemFrame>)}</div></SystemFrame>}

          {!loading && page === "achievements" && <SystemFrame className="full-panel"><div className="section-heading"><div className="notification-icon">✦</div><div><small>SYSTEM // HUNTER RECORD</small><h2>ACHIEVEMENT SYSTEM</h2></div></div><div className="achievement-grid">{[["✦","FIRST AWAKENING","Complete your first quest.",completed >= 1],["⚡","SYSTEM ONLINE","Reach 100 XP.",xp >= 100],["🔥","CONSISTENCY","Complete 5 quests.",completed >= 5],["◇","HUNTER'S INSTINCT","Reach 500 XP.",xp >= 500],["⚔️","D-RANK AWAKENING","Reach D-Rank.",xp >= 500],["∞","IRON WILL","Maintain a 7-day streak.",streak >= 7]].map(([icon,title,desc,unlocked]) => <SystemFrame className={`achievement-card ${unlocked ? "unlocked" : "locked"}`} key={title}><div className="achievement-big-icon">{unlocked ? icon : "🔒"}</div><small>{unlocked ? "UNLOCKED" : "LOCKED"}</small><h3>{title}</h3><p>{desc}</p><span>{unlocked ? "STATUS: UNLOCKED" : "STATUS: LOCKED"}</span></SystemFrame>)}</div></SystemFrame>}

          {!loading && page === "profile" && <div className="profile-layout"><SystemFrame className="profile-card"><div className="profile-avatar">H</div><small>HUNTER PROFILE</small><h2>{profile?.username || "PLAYER"}</h2><div className="profile-rank">[ {rank} ]</div>{[["LEVEL",level],["EXPERIENCE",`${xp} XP`],["COINS",`◈ ${coins}`],["STREAK",`${streak} DAYS`],["QUESTS CLEARED",completed]].map(([a,b]) => <div className="profile-row" key={a}><span>{a}</span><strong>{b}</strong></div>)}</SystemFrame><SystemFrame className="rank-card"><div className="section-heading"><div><small>RANK PROGRESSION</small><h2>HUNTER RANK</h2></div></div>{[["E-RANK",0],["D-RANK",500],["C-RANK",1000],["B-RANK",2000],["A-RANK",4000],["S-RANK",7000]].map(([r,min]) => <div className={`rank-row ${xp >= min ? "reached" : ""}`} key={r}><b>{r}</b><span>{min} XP</span><i>{xp >= min ? "✓" : "—"}</i></div>)}</SystemFrame></div>}
        </section>
      </main>

      {toast && <div className="toast"><b>✓</b><div><small>LIFE RPG</small><span>{toast}</span></div></div>}
      {showCreate && <CreateQuest onClose={() => setShowCreate(false)} onCreate={createQuest} busy={creating} />}
      {completion && <CompletionFX data={completion} onClose={() => setCompletion(null)} />}
    </div>
  );
}
