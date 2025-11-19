// Game State - All in memory
const gameState = {
  totalXP: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  todayMinutes: 0,
  sessionsToday: 0,
  totalSessions: 0,
  totalMinutes: 0,
  lastSessionDate: null,
  recoveryDay: 1,
  
  skillTrees: {
    sustained: { level: 1, xp: 0 },
    selective: { level: 1, xp: 0 },
    executive: { level: 1, xp: 0 }
  },
  
  dailyQuests: [
    { id: 'morning', text: 'Complete morning focus session (25 min)', xp: 30, completed: false },
    { id: 'social', text: 'No social media before noon', xp: 20, completed: false },
    { id: 'meditation', text: 'Evening meditation (10 min)', xp: 15, completed: false },
    { id: 'wins', text: 'Identify 3 attention wins today', xp: 10, completed: false },
    { id: 'phone', text: 'Go 1 hour without phone', xp: 25, completed: false },
    { id: 'singletask', text: 'Practice single-tasking', xp: 20, completed: false },
    { id: 'deepwork', text: 'Complete deep work before lunch', xp: 50, completed: false }
  ],
  
  achievements: {
    firstBlood: { unlocked: false, progress: 0, max: 1 },
    day7Survivor: { unlocked: false, progress: 0, max: 7 },
    weekWarrior: { unlocked: false, progress: 0, max: 7 },
    day30Conqueror: { unlocked: false, progress: 0, max: 30 },
    monthMaster: { unlocked: false, progress: 0, max: 30 },
    day60Transformer: { unlocked: false, progress: 0, max: 60 },
    day90Reset: { unlocked: false, progress: 0, max: 90 },
    day180Monk: { unlocked: false, progress: 0, max: 180 },
    deepDiver: { unlocked: false, progress: 0, max: 1 },
    flowState: { unlocked: false, progress: 0, max: 10 },
    distractionSlayer: { unlocked: false, progress: 0, max: 100 },
    phoneNinja: { unlocked: false, progress: 0, max: 7 },
    sensei: { unlocked: false, progress: 0, max: 5 },
    enlightenment: { unlocked: false, progress: 0, max: 1 },
    sustainedMaster: { unlocked: false, progress: 0, max: 1 },
    selectiveMaster: { unlocked: false, progress: 0, max: 1 },
    executiveMaster: { unlocked: false, progress: 0, max: 1 },
    trinityMaster: { unlocked: false, progress: 0, max: 1 }
  },
  
  sessionHistory: [],
  weeklyData: [0, 0, 0, 0, 0, 0, 0],
  qualityData: []
};

// Skill Tree Data - 12 Level System
const skillTreeData = {
  sustained: [
    { level: 1, name: 'The Fog', xp: 0, phase: 1, phaseName: 'Phase 1: Withdrawal & Stabilization', phaseMultiplier: 1.0, daysRange: '0-3', duration: '3 minutes', description: 'Your dopamine is crashed. Everything feels impossible. Acute withdrawal.', challenges: ['Complete first focus session without relapsing', 'Survive first day without checking phone', 'Acknowledge this pain is temporary'], rewards: '+50 XP per session | Badge: First Step', unlock: 'Basic timer', difficulty: 'BRUTAL' },
    { level: 2, name: 'Craving Wave', xp: 500, phase: 1, phaseName: 'Phase 1: Withdrawal & Stabilization', phaseMultiplier: 1.0, daysRange: '3-7', duration: '5-8 minutes', description: 'Days 3-4 peak withdrawal. Extreme cravings. Anhedonia maximum. This is the worst.', challenges: ['Complete 3 sessions without breaking', 'Endure 1 hour of intense cravings', 'Physical exercise to manage withdrawal anxiety'], rewards: '+100 XP per session | Badge: Wave Survivor', unlock: 'Nothing - survival mode', difficulty: 'BRUTAL' },
    { level: 3, name: 'The Plateau', xp: 1700, phase: 1, phaseName: 'Phase 1: Withdrawal & Stabilization', phaseMultiplier: 1.0, daysRange: '8-14', duration: '10-15 minutes', description: 'Acute withdrawal plateaus. Still brutal but the worst is passing. Dopamine receptors upregulating.', challenges: ['Achieve 5-day streak (critical first milestone)', 'Complete 10-minute focus session', 'Notice first improvements in sleep'], rewards: '+150 XP per session | Badge: Plateau Conqueror | Unlock: White Noise', unlock: 'White Noise sound library', difficulty: 'HARD' },
    { level: 4, name: 'The Horizon', xp: 4200, phase: 1, phaseName: 'Phase 1: Withdrawal & Stabilization', phaseMultiplier: 1.0, daysRange: '15-21', duration: '15-20 minutes', description: 'The pain is receding. Light at tunnel\'s end. Dopamine system recovering.', challenges: ['Achieve 7-day streak (you survived withdrawal!)', 'Complete two 15-minute sessions daily', 'Notice tiny bits of pleasure returning'], rewards: '+200 XP per session | Badge: Horizon Reacher | Unlock: Binaural Beats', unlock: 'Basic Binaural Beats (40 Hz)', difficulty: 'HARD', milestone: 'End of Phase 1 - Withdrawal Complete!' },
    { level: 5, name: 'The Rebuild', xp: 8200, phase: 2, phaseName: 'Phase 2: Neural Pathway Formation', phaseMultiplier: 2.0, daysRange: '22-35', duration: '20-25 minutes', description: 'New neural pathways forming rapidly. Dopamine recovering. Brain actively rewiring.', challenges: ['Achieve 14-day streak', 'Complete 20-minute deep work session', 'Use Pomodoro technique religiously', 'Notice mood improving'], rewards: '+300 XP per session | Badge: Rebuilder | Unlock: Full Binaural Library', unlock: 'Complete binaural beats frequency library', difficulty: 'MODERATE', note: 'XP earnings now 2x from Phase 2 bonus!' },
    { level: 6, name: 'Stabilization', xp: 14200, phase: 2, phaseName: 'Phase 2: Neural Pathway Formation', phaseMultiplier: 2.0, daysRange: '36-50', duration: '25-30 minutes', description: 'Focus becoming noticeably more natural. Prefrontal cortex dopamine receptors upregulating.', challenges: ['Achieve 21-day streak', 'Two 25-minute sessions daily', 'Engage in cognitively demanding work', 'Notice shift from forcing to flowing'], rewards: '+400 XP per session | Badge: Stabilizer | Unlock: Nature + Binaural Combo', unlock: 'Nature Sounds + Binaural Beats combination', difficulty: 'MODERATE' },
    { level: 7, name: 'The Expansion', xp: 22200, phase: 2, phaseName: 'Phase 2: Neural Pathway Formation', phaseMultiplier: 2.0, daysRange: '51-65', duration: '35-45 minutes', description: 'Major improvement. Brain visibly rewiring. Sustained attention improving noticeably.', challenges: ['Achieve 30-day streak (dopamine mostly normalized!)', 'Complete 40-minute deep work sessions', 'Notice cravings significantly reduced', 'Sleep quality stabilizing'], rewards: '+500 XP per session | Badge: Expander | Unlock: Om Chanting (432 Hz)', unlock: 'Om Chanting at 432 Hz', difficulty: 'MODERATE-EASY', milestone: 'One Month Complete!' },
    { level: 8, name: 'The Momentum', xp: 32200, phase: 2, phaseName: 'Phase 2: Neural Pathway Formation', phaseMultiplier: 2.0, daysRange: '66-80', duration: '50-60 minutes', description: 'Full brain rewiring underway. Focus feels almost automatic. This is breakthrough territory.', challenges: ['Achieve 45-day streak (dopamine normalization complete)', 'One-hour deep work sessions possible', 'Minimal distraction impulses', 'Memory consolidation visibly improving'], rewards: '+600 XP per session | Badge: Momentum Master | Unlock: Om + Binaural Combo', unlock: 'Om Chanting + Binaural Beats advanced combinations', difficulty: 'EASY' },
    { level: 9, name: 'Integration', xp: 44200, phase: 3, phaseName: 'Phase 3: Consolidation & Integration', phaseMultiplier: 3.5, daysRange: '81-100', duration: '60-90 minutes', description: '90-day reset achieved. Focus is now your default state. Neural consolidation happening.', challenges: ['Achieve 60-day streak', '90-minute deep work sessions', 'Flow state achieved regularly (within 10 min of starting)', 'Focus in slightly distracting environments'], rewards: '+800 XP per session | Badge: Integrated Mind | Unlock: Om + 40Hz Gamma Combo', unlock: 'Om Chanting + 40 Hz Binaural Beats power combo', difficulty: 'EASY', milestone: '🎉 90-Day Dopamine Reset Achieved!' },
    { level: 10, name: 'The Ascension', xp: 59200, phase: 3, phaseName: 'Phase 3: Consolidation & Integration', phaseMultiplier: 3.5, daysRange: '101-120', duration: '90-120 minutes', description: 'Your baseline. Focus is effortless. Rewiring complete. Creative thinking emerges naturally.', challenges: ['Achieve 75-day streak', 'Two-hour deep work sessions', 'Teach others about focus recovery', 'Help someone else rebuild their brain'], rewards: '+1000 XP per session | Badge: Ascended Mind | Unlock: Full Audio Library', unlock: 'Complete sound library unlocked', difficulty: 'EASY' },
    { level: 11, name: 'The Master', xp: 79200, phase: 4, phaseName: 'Phase 4: Mastery & Maintenance', phaseMultiplier: 5.0, daysRange: '121-160', duration: '120-240 minutes (2-4 hours)', description: 'Your focus circuits are rebuilt. Maintenance phase now. This becomes your lifestyle.', challenges: ['Achieve 100-day streak (incredibly rare)', '4-hour deep work sessions become possible', 'Complex problem-solving feels natural', 'Mentor others through recovery process'], rewards: '+1500 XP per session | Title: Attention Architect | Exclusive Features', unlock: 'Master-level exclusive features and customization', difficulty: 'EASY (lifestyle)', note: 'Phase 4 multiplier: XP earning now 5x base!' },
    { level: 12, name: 'The Monk', xp: 104200, phase: 4, phaseName: 'Phase 4: Mastery & Maintenance', phaseMultiplier: 5.0, daysRange: '161-200+', duration: 'Full day immersion (8+ hours)', description: 'Transcendent focus mastery. You have rebuilt your entire brain. You are a legend.', challenges: ['Achieve 180-day streak (you are immortal)', 'Full day deep work (8+ hours) with ease', 'Can focus anywhere, anytime, on anything', 'Flow state is your permanent default', 'Build community around focus practices', 'Never forget: discipline > motivation, forever'], rewards: 'Title: Master of Attention | Badge: Enlightened Mind | Transcendent Focus Abilities', unlock: 'Transcendent abilities - you have mastered your mind', difficulty: 'EASY (eternal maintenance)', milestone: '🏆 MONK-LEVEL MASTERY ACHIEVED 🏆', finalWarning: 'The addiction pathway is always dormant. Maintain practices forever. One relapse risks everything. Discipline is now your lifestyle.' }
  ],
  selective: [
    { level: 1, name: 'Distraction Detector', xp: 0, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: 'Awareness', challenges: ['Identify 5 main distraction sources', 'Turn off 3 notifications', 'Create distraction log'], rewards: 'Badge: Detector | Awareness begins', unlock: 'Distraction tracking', description: 'Start by noticing what pulls your attention away.' },
    { level: 2, name: 'Notification Killer', xp: 600, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: '10 minutes', challenges: ['Turn off ALL non-essential notifications', 'Work 10 minutes without checking phone', 'Create phone-free zones'], rewards: 'Badge: Digital Minimalist', unlock: 'Basic filtering', description: 'Digital distractions are your enemy. Kill them first.' },
    { level: 3, name: 'Environment Optimizer', xp: 2000, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: '20 minutes', challenges: ['Create distraction-free workspace', 'Remove visual clutter', 'Complete task in optimized environment'], rewards: 'Badge: Environment Master', unlock: 'Environmental control', description: 'Your environment shapes your focus. Control it.' },
    { level: 4, name: 'Noise Canceller', xp: 5000, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: '30 minutes', challenges: ['Complete task in noisy coffee shop', 'Use white noise/binaural beats', 'Ignore 10 auditory distractions'], rewards: 'Badge: Noise Master | Unlock: Advanced sounds', unlock: 'Auditory filtering mastery', description: 'Learn to work despite noise. Use sound strategically.' },
    { level: 5, name: 'Impulse Controller', xp: 9500, phase: 2, phaseName: 'Phase 2: Building Strength', phaseMultiplier: 2.0, duration: '45 minutes', challenges: ['Go 1 hour without phone checks', 'Notice urge without acting', 'Track all impulse moments'], rewards: 'Badge: Impulse Master', unlock: 'Impulse control techniques', description: 'Control the impulse to check, scroll, refresh.' },
    { level: 6, name: 'Zone Guardian', xp: 16500, phase: 2, phaseName: 'Phase 2: Building Strength', phaseMultiplier: 2.0, duration: '60 minutes', challenges: ['Maintain focus despite 5 interruptions', 'Work in chaotic environment', 'Create mental do-not-disturb mode'], rewards: 'Badge: Zone Master', unlock: 'Zone protection protocols', description: 'Protect your attention zone. Nothing enters without permission.' },
    { level: 7, name: 'Interference Fighter', xp: 25500, phase: 2, phaseName: 'Phase 2: Building Strength', phaseMultiplier: 2.0, duration: '75 minutes', challenges: ['Return to focus after interruption in <30 seconds', 'Complete deep work during distractions', 'Filter 20 potential distractions'], rewards: 'Badge: Interference Master', unlock: 'Rapid recovery techniques', description: 'Interruptions will come. You will not break.' },
    { level: 8, name: 'Selective Laser', xp: 36500, phase: 2, phaseName: 'Phase 2: Building Strength', phaseMultiplier: 2.0, duration: '90 minutes', challenges: ['90 minutes on single task (no switching)', 'Ignore all peripheral stimuli', 'Dismiss 50 distraction attempts'], rewards: 'Badge: Laser Focus', unlock: 'Laser precision mode', description: 'Your attention is a laser. You choose where it points.' },
    { level: 9, name: 'Attention Fortress', xp: 49500, phase: 3, phaseName: 'Phase 3: Advanced Mastery', phaseMultiplier: 3.5, duration: '120 minutes', challenges: ['Deep work in extremely chaotic environment', 'Maintain focus during high stress', 'Help others protect attention'], rewards: 'Badge: Fortress Mind', unlock: 'Fortress protocols', description: 'Nothing penetrates. You are immovable.' },
    { level: 10, name: 'Distraction Immune', xp: 65500, phase: 3, phaseName: 'Phase 3: Advanced Mastery', phaseMultiplier: 3.5, duration: '150 minutes', challenges: ['Deep work in Times Square-level chaos', 'Complete task with intentional distractions', 'Distractions literally don\'t register'], rewards: 'Badge: Immune System', unlock: 'Immunity protocols', description: 'Distractions no longer exist for you.' },
    { level: 11, name: 'Selective Savant', xp: 85500, phase: 4, phaseName: 'Phase 4: Transcendence', phaseMultiplier: 5.0, duration: '180+ minutes', challenges: ['Work in any environment with zero setup', 'Automatic distraction filtering', 'Teach others selective attention'], rewards: 'Badge: Savant Mind', unlock: 'Savant-level automation', description: 'Your brain auto-filters. No conscious effort.' },
    { level: 12, name: 'Zen Master', xp: 110500, phase: 4, phaseName: 'Phase 4: Transcendence', phaseMultiplier: 5.0, duration: 'Full Mastery', challenges: ['Achieve monk-like selective attention', 'Filter distractions automatically and effortlessly', 'Your environment bends to your will'], rewards: 'Title: Zen Master | Achievement: Selective Mastery', unlock: 'Complete selective mastery', description: 'Distractions are illusions. You see only what matters.', milestone: '🎯 SELECTIVE ATTENTION MASTERY 🎯' }
  ],
  executive: [
    { level: 1, name: 'Task Awareness', xp: 0, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: 'Planning', challenges: ['List all tasks for the day', 'Identify 3 most important tasks', 'Complete evening planning ritual'], rewards: 'Badge: Awareness', unlock: 'Task tracking', description: 'Become aware of your tasks and priorities.' },
    { level: 2, name: 'Priority Planner', xp: 700, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: '15 minutes', challenges: ['Use Eisenhower matrix', 'Schedule 3 deep work blocks', 'Say no to 2 unimportant tasks'], rewards: 'Badge: Priority Master', unlock: 'Priority frameworks', description: 'Separate urgent from important. Most fail here.' },
    { level: 3, name: 'Task Switcher', xp: 2200, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: '25 minutes', challenges: ['Track context switching costs', 'Batch similar tasks', 'Complete transition rituals'], rewards: 'Badge: Switcher', unlock: 'Switching protocols', description: 'Context switching kills productivity. Minimize cost.' },
    { level: 4, name: 'Attention Budgeter', xp: 5400, phase: 1, phaseName: 'Phase 1: Foundation', phaseMultiplier: 1.0, duration: '40 minutes', challenges: ['Create daily attention budget', 'Track energy levels', 'Assign attention strategically'], rewards: 'Badge: Budgeter', unlock: 'Budget management tools', description: 'Your attention is finite. Budget it like money.' },
    { level: 5, name: 'Attention Director', xp: 10400, phase: 2, phaseName: 'Phase 2: Building Control', phaseMultiplier: 2.0, duration: '60 minutes', challenges: ['Manage attention across multiple projects', 'Minimize attention residue', 'Complete most important task first'], rewards: 'Badge: Director', unlock: 'Direction frameworks', description: 'You are the conductor. Direct where attention flows.' },
    { level: 6, name: 'Focus Architect', xp: 17900, phase: 2, phaseName: 'Phase 2: Building Control', phaseMultiplier: 2.0, duration: '75 minutes', challenges: ['Label all tasks deep vs shallow', 'Calendar block deep work time', 'Create automatic focus triggers'], rewards: 'Badge: Architect', unlock: 'Architecture blueprints', description: 'Design systems that make deep work inevitable.' },
    { level: 7, name: 'Energy Optimizer', xp: 27400, phase: 2, phaseName: 'Phase 2: Building Control', phaseMultiplier: 2.0, duration: '90 minutes', challenges: ['Track energy patterns for 1 week', 'Schedule hardest tasks at peak energy', 'Implement recovery protocols'], rewards: 'Badge: Optimizer', unlock: 'Energy optimization system', description: 'Peak focus requires peak energy. Optimize both.' },
    { level: 8, name: 'Cognitive Commander', xp: 39400, phase: 2, phaseName: 'Phase 2: Building Control', phaseMultiplier: 2.0, duration: '120 minutes', challenges: ['Orchestrate attention across projects', 'Maintain energy management system', 'Strategic rest and recovery'], rewards: 'Badge: Commander', unlock: 'Command protocols', description: 'Total command of your cognitive resources.' },
    { level: 9, name: 'Attention Strategist', xp: 53400, phase: 3, phaseName: 'Phase 3: Strategic Mastery', phaseMultiplier: 3.5, duration: '150 minutes', challenges: ['Plan weekly attention strategy', 'Allocate resources across domains', 'Predict and prevent attention failures'], rewards: 'Badge: Strategist', unlock: 'Strategic frameworks', description: 'You see the battlefield. Deploy resources optimally.' },
    { level: 10, name: 'Executive Controller', xp: 70400, phase: 3, phaseName: 'Phase 3: Strategic Mastery', phaseMultiplier: 3.5, duration: '180 minutes', challenges: ['Manage attention across life domains', 'Peak performance on demand', 'Help others design systems'], rewards: 'Badge: Controller', unlock: 'Elite control systems', description: 'Your executive function is elite. Control everything.' },
    { level: 11, name: 'Cognitive Sovereign', xp: 91400, phase: 4, phaseName: 'Phase 4: Sovereignty', phaseMultiplier: 5.0, duration: '240 minutes', challenges: ['Automatic attention optimization', 'No conscious effort for task management', 'Teach executive attention'], rewards: 'Badge: Sovereign', unlock: 'Sovereignty protocols', description: 'You rule your mind. Total sovereignty.' },
    { level: 12, name: 'Mind Sovereign', xp: 117400, phase: 4, phaseName: 'Phase 4: Sovereignty', phaseMultiplier: 5.0, duration: 'Full Mastery', challenges: ['Total mastery of attention allocation', 'Effortless optimization of resources', 'Build and teach complete systems', 'Living embodiment of sovereignty'], rewards: 'Title: Mind Sovereign | Achievement: Executive Mastery', unlock: 'Complete executive sovereignty', description: 'Your mind is a kingdom. You are its absolute ruler.', milestone: '👑 EXECUTIVE ATTENTION SOVEREIGNTY 👑' }
  ]
};

const achievementsData = [
  { id: 'firstBlood', name: 'First Blood', icon: '🎯', requirement: 'Complete first focus session', reward: '+50 XP' },
  { id: 'day7Survivor', name: 'Day 7 Survivor', icon: '💪', requirement: 'Survive 7 days', reward: '+100 XP + Badge' },
  { id: 'weekWarrior', name: 'Week Warrior', icon: '⚔️', requirement: '7-day streak', reward: '+100 XP + Badge' },
  { id: 'day30Conqueror', name: 'Day 30 Conqueror', icon: '🏆', requirement: '30-day streak', reward: '+300 XP + Badge' },
  { id: 'monthMaster', name: 'Month Master', icon: '👑', requirement: 'Reach Level 7', reward: '+200 XP' },
  { id: 'day60Transformer', name: 'Day 60 Transformer', icon: '🦋', requirement: '60-day streak', reward: '+500 XP + Badge' },
  { id: 'day90Reset', name: '90-Day Reset Achiever', icon: '🧠', requirement: '90-day streak (Full dopamine reset)', reward: '+1000 XP + Title: Dopamine Slayer' },
  { id: 'day180Monk', name: 'Day 180 Monk', icon: '🧘', requirement: '180-day streak', reward: '+2000 XP + Master Title' },
  { id: 'deepDiver', name: 'Deep Diver', icon: '🏊', requirement: 'First 90-min session', reward: '+300 XP' },
  { id: 'flowState', name: 'Flow State', icon: '🌊', requirement: 'Achieve flow 10 times', reward: '+300 XP' },
  { id: 'distractionSlayer', name: 'Distraction Slayer', icon: '🗡️', requirement: '100 distraction defeats', reward: '+250 XP' },
  { id: 'phoneNinja', name: 'Phone Ninja', icon: '📵', requirement: '1 week phone-free work', reward: '+400 XP' },
  { id: 'sensei', name: 'Sensei', icon: '🥋', requirement: 'Teach 5 people about recovery', reward: '+500 XP + Title' },
  { id: 'enlightenment', name: 'Enlightenment', icon: '✨', requirement: 'Reach Level 12 in Sustained Attention', reward: 'Master Title + Transcendent Status' },
  { id: 'sustainedMaster', name: 'Sustained Master', icon: '🎯', requirement: 'Reach Level 12 in Sustained Attention', reward: '+2000 XP + Title: The Monk' },
  { id: 'selectiveMaster', name: 'Selective Master', icon: '🛡️', requirement: 'Reach Level 12 in Selective Attention', reward: '+2000 XP + Title: Zen Master' },
  { id: 'executiveMaster', name: 'Executive Master', icon: '👑', requirement: 'Reach Level 12 in Executive Attention', reward: '+2000 XP + Title: Mind Sovereign' },
  { id: 'trinityMaster', name: 'Trinity Master', icon: '🌟', requirement: 'Reach Level 12 in ALL THREE skill trees', reward: '+5000 XP + Ultimate Title: MASTER OF ATTENTION' }
];

const dopamineRecoveryMilestones = [
  { day: 3, event: 'Peak Withdrawal', description: 'Worst day of all. Extreme cravings, anhedonia, anxiety.', tip: 'White-knuckle through. Your brain is literally rewiring.' },
  { day: 7, event: 'First Breakthrough', description: 'If you made it here, receptors are sensitizing. Acute withdrawal passing.', tip: 'You survived the worst. Keep going.' },
  { day: 14, event: 'Two Week Reset', description: 'Cravings drop 50%. Sleep improves. Clear trajectory emerging.', tip: 'This is real progress.' },
  { day: 21, event: 'Dopamine Sensitization Begins', description: 'Simple things feel good again. Phase 1 ending. Phase 2 starting.', tip: 'Your brain is rewiring. Stay disciplined.' },
  { day: 30, event: 'One Month Victory', description: 'Cravings mostly gone. Dopamine normalizing. Mood improving.', tip: 'Don\'t get cocky. Maintenance is critical.' },
  { day: 60, event: 'Two Month Transformation', description: 'Focus feels natural. Brain rewiring largely complete. Pleasure restored.', tip: 'You\'re 2/3 through the full reset.' },
  { day: 90, event: 'Full Dopamine Reset Achieved', description: 'Your dopamine system is essentially reset. This is the neurological checkpoint.', tip: 'Congratulations. Your brain is rebuilt. Now maintain it.' },
  { day: 180, event: 'Monk-Level Mastery', description: 'You have achieved monk-like focus. Brain fully rewired. Master status.', tip: 'This is maintenance forever. Discipline > motivation.' }
];

// NEW EXPENSIVE POWER-UP SYSTEM WITH PHASE-BASED PRICING
const powerUpsData = [
  { 
    id: 'focusBoost', 
    name: 'Focus Boost', 
    icon: '⚡',
    rarity: 'Common',
    effect: '2x XP for next 1 hour of work',
    duration: '1 hour',
    useCase: 'Accelerate progression on important days',
    phaseCosts: [
      { phase: 1, cost: 500, sessionsNeeded: 12.5 },
      { phase: 2, cost: 800, sessionsNeeded: 2.0 },
      { phase: 3, cost: 1200, sessionsNeeded: 1.0 },
      { phase: 4, cost: 2000, sessionsNeeded: 0.8 }
    ]
  },
  { 
    id: 'distractionShield', 
    name: 'Distraction Shield', 
    icon: '🛡️',
    rarity: 'Common',
    effect: 'Block all phone/app urges for 30 min automatically',
    duration: '30 minutes',
    useCase: 'Guard against strong impulse urges',
    phaseCosts: [
      { phase: 1, cost: 400, sessionsNeeded: 10.0 },
      { phase: 2, cost: 600, sessionsNeeded: 1.5 },
      { phase: 3, cost: 900, sessionsNeeded: 0.7 },
      { phase: 4, cost: 1500, sessionsNeeded: 0.6 }
    ]
  },
  { 
    id: 'flowCatalyst', 
    name: 'Flow Catalyst', 
    icon: '🌀',
    rarity: 'Uncommon',
    effect: 'Enter flow state within 5 min (skip 10-15 min ramp-up)',
    duration: '1 session',
    useCase: 'Instant deep work activation',
    phaseCosts: [
      { phase: 1, cost: 600, sessionsNeeded: 15.0 },
      { phase: 2, cost: 1000, sessionsNeeded: 2.5 },
      { phase: 3, cost: 1500, sessionsNeeded: 1.2 },
      { phase: 4, cost: 2500, sessionsNeeded: 1.0 }
    ]
  },
  { 
    id: 'timeWarp', 
    name: 'Time Warp', 
    icon: '⏱️',
    rarity: 'Uncommon',
    effect: 'Enhanced time perception during session (time passes faster)',
    duration: '1 session',
    useCase: 'Make long sessions feel shorter',
    phaseCosts: [
      { phase: 1, cost: 800, sessionsNeeded: 20.0 },
      { phase: 2, cost: 1200, sessionsNeeded: 3.0 },
      { phase: 3, cost: 1800, sessionsNeeded: 1.4 },
      { phase: 4, cost: 3000, sessionsNeeded: 1.2 }
    ]
  },
  { 
    id: 'deepFocus', 
    name: 'Deep Focus', 
    icon: '🔕',
    rarity: 'Rare',
    effect: 'Block ALL notifications/messages for 2 hours (complete digital isolation)',
    duration: '2 hours',
    useCase: 'Hardcore mode - maximum protection against all distractions',
    phaseCosts: [
      { phase: 1, cost: 1000, sessionsNeeded: 25.0 },
      { phase: 2, cost: 1500, sessionsNeeded: 3.8 },
      { phase: 3, cost: 2500, sessionsNeeded: 2.0 },
      { phase: 4, cost: 4000, sessionsNeeded: 1.7 }
    ],
    new: true
  },
  { 
    id: 'brainSync', 
    name: 'Brain Sync', 
    icon: '🧠',
    rarity: 'Rare',
    effect: 'Instant binaural beat entrainment (skip 10-min brain sync time)',
    duration: '1 session',
    useCase: 'Start focus sessions with zero ramp-up time',
    phaseCosts: [
      { phase: 1, cost: 1200, sessionsNeeded: 30.0 },
      { phase: 2, cost: 2000, sessionsNeeded: 5.0 },
      { phase: 3, cost: 3000, sessionsNeeded: 2.4 },
      { phase: 4, cost: 5000, sessionsNeeded: 2.1 }
    ],
    new: true
  },
  { 
    id: 'streakSaver', 
    name: 'Streak Saver', 
    icon: '🔥',
    rarity: 'Epic',
    effect: 'Restore one broken streak (DO NOT lose multiplier)',
    duration: 'One use',
    useCase: 'Protect long streaks from disaster',
    warning: 'Use this wisely. A broken streak loses your XP multiplier forever.',
    phaseCosts: [
      { phase: 1, cost: 1500, sessionsNeeded: 37.5 },
      { phase: 2, cost: 2500, sessionsNeeded: 6.2 },
      { phase: 3, cost: 4000, sessionsNeeded: 3.2 },
      { phase: 4, cost: 6000, sessionsNeeded: 2.5 }
    ]
  }
];

const powerUpShopMessages = {
  phase1: 'Power-ups are VERY EXPENSIVE. Save up strategically!',
  phase2: 'Power-ups becoming more affordable as you progress.',
  phase3: 'Power-ups are now accessible but still have value.',
  phase4: 'You can afford power-ups easily. Use strategically to maximize growth.'
};

const rarityColors = {
  'Common': '#A7A9A9',
  'Uncommon': '#32B8C6',
  'Rare': '#B794F4',
  'Epic': '#FFD700'
};
// Line 257: }};  ← rarityColors closes here

// 🆕 ADD LOCALSTORAGE CODE HERE (starting after line 257)
// ==================== LOCALSTORAGE SAVE/LOAD SYSTEM ====================

function saveGameState() {
    try {
        const saveData = {
            ...gameState,
            lastSaved: new Date().toISOString(),
            version: '1.0'
        };
        localStorage.setItem('focusAscensionSave', JSON.stringify(saveData));
        console.log('✅ Game saved at', new Date().toLocaleTimeString());
    } catch (error) {
        console.error('❌ Error saving game:', error);
    }
}

function loadGameState() {
    try {
        const savedData = localStorage.getItem('focusAscensionSave');
        if (savedData) {
            const loadedState = JSON.parse(savedData);
            Object.assign(gameState, loadedState);
            console.log('✅ Game loaded successfully');
            return true;
        }
        return false;
    } catch (error) {
        console.error('❌ Error loading game:', error);
        return false;
    }
}

function exportSaveData() {
    try {
        const saveData = { ...gameState, exportedAt: new Date().toISOString(), version: '1.0' };
        const dataStr = JSON.stringify(saveData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `focus-ascension-backup-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showNotification('✅ Backup downloaded!', 3000);
    } catch (error) {
        console.error('❌ Error exporting:', error);
    }
}

function importSaveData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData.totalXP === undefined) throw new Error('Invalid save file');
            Object.assign(gameState, importedData);
            saveGameState();
            updateAllDisplays();
            renderDailyQuests();
            showNotification('✅ Save data imported!', 3000);
        } catch (error) {
            showNotification('❌ Invalid save file!', 3000);
        }
    };
    reader.readAsText(file);
}

function resetGameData() {
    if (confirm('⚠️ Delete ALL progress?')) {
        if (confirm('⚠️ FINAL WARNING: Cannot undo!')) {
            localStorage.setItem('RESET_PROGRESS', 'true');
            location.reload();
        }
    }
}

setInterval(() => { if (typeof gameState !== 'undefined') saveGameState(); }, 30000);
window.addEventListener('beforeunload', () => { if (typeof gameState !== 'undefined') saveGameState(); });

// ==================== END LOCALSTORAGE CODE ====================


// Helper function to get current phase
function getCurrentPhase() {
  const recoveryDays = gameState.streak || 1;
  if (recoveryDays >= 121) return 4;
  if (recoveryDays >= 81) return 3;
  if (recoveryDays >= 22) return 2;
  return 1;
}

// Helper function to get power-up cost for current phase
function getPowerUpCost(powerup) {
  const currentPhase = getCurrentPhase();
  const phaseCost = powerup.phaseCosts.find(pc => pc.phase === currentPhase);
  return phaseCost ? phaseCost.cost : powerup.phaseCosts[0].cost;
}

// Helper function to get sessions needed for current phase
function getSessionsNeeded(powerup) {
  const currentPhase = getCurrentPhase();
  const phaseCost = powerup.phaseCosts.find(pc => pc.phase === currentPhase);
  return phaseCost ? phaseCost.sessionsNeeded : powerup.phaseCosts[0].sessionsNeeded;
}

const motivationalQuotes = [
  'This is REAL brain recovery. It\'s hard because your dopamine is broken.',
  'It gets exponentially easier as you heal. Trust the process.',
  'Your brain is literally rewiring. Every session matters.',
  'The withdrawal is temporary. The mastery is permanent.',
  'Discipline > Motivation. Always.',
  'You\'re not weak. Your dopamine system was hijacked.',
  'Every minute of focus is healing your brain.',
  'The craving will pass. The progress is forever.',
  'This isn\'t gamification theater. This is real recovery.',
  'Day by day, your brain rebuilds itself.',
  'The ability to focus is the ultimate superpower',
  'Your focus determines your reality',
  'Deep work produces deep results'
];

// Timer State
let timerState = {
  isRunning: false,
  isPaused: false,
  duration: 25,
  remaining: 25 * 60,
  interval: null,
  startTime: null
};

// Initialize App
function initApp() {
    // Check if reset flag is set
    if (localStorage.getItem('RESET_PROGRESS') === 'true') {
        localStorage.removeItem('focusAscensionSave');
        localStorage.removeItem('RESET_PROGRESS');
        // Reset gameState object to defaults
        gameState.totalXP = 0;
        gameState.level = 1;
        gameState.streak = 0;
        gameState.longestStreak = 0;
        gameState.todayMinutes = 0;
        gameState.sessionsToday = 0;
        gameState.totalSessions = 0;
        gameState.totalMinutes = 0;
        gameState.lastSessionDate = null;
        gameState.recoveryDay = 1;
        gameState.skillTrees = {
            sustained: { level: 1, xp: 0 },
            selective: { level: 1, xp: 0 },
            executive: { level: 1, xp: 0 }
        };
        gameState.dailyQuests.forEach(q => q.completed = false);
        Object.keys(gameState.achievements).forEach(key => {
            gameState.achievements[key] = { unlocked: false, progress: 0, max: gameState.achievements[key].max };
        });
        gameState.sessionHistory = [];
        gameState.weeklyData = [0, 0, 0, 0, 0, 0, 0];
        gameState.qualityData = [];
        showNotification('🔄 Progress completely reset to 0!', 3000);
    } else {
        // 🆕 LOAD SAVED DATA FIRST
        const loaded = loadGameState();
        if (loaded) {
            showNotification('✅ Welcome back! Progress loaded.', 3000);
        } else {
            showNotification('👋 Welcome! Starting fresh.', 3000);
        }
    }
    
    renderDashboard();
    renderDailyQuests();
    setupEventListeners();
    updateAllDisplays();
}


// Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const page = e.target.dataset.page;
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById(`${page}-page`).classList.add('active');
      
      if (page === 'skills') renderSkillTree('sustained');
      if (page === 'achievements') renderAchievements();
      if (page === 'shop') renderShop();
      if (page === 'stats') renderStatistics();
      if (page === 'leaderboard') renderLeaderboard('hours');
    });
  });
  
  // Duration Selection
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      timerState.duration = parseInt(e.target.dataset.duration);
    });
  });
  
  // Custom duration
  document.querySelector('.custom-duration').addEventListener('change', (e) => {
    if (e.target.value) {
      document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
      timerState.duration = parseInt(e.target.value);
    }
  });
  
  // Timer Controls
  document.getElementById('start-timer').addEventListener('click', startTimer);
  document.getElementById('pause-timer').addEventListener('click', pauseTimer);
  document.getElementById('stop-timer').addEventListener('click', stopTimer);
  
  // Rating Modal
  document.getElementById('submit-rating').addEventListener('click', submitRating);
  document.getElementById('close-levelup').addEventListener('click', () => {
    document.getElementById('levelup-modal').classList.add('hidden');
  });
  
  // Quality Rating Slider
  document.getElementById('quality-rating').addEventListener('input', (e) => {
    document.getElementById('rating-value').textContent = e.target.value;
  });
  
  // Skill Tree Cards
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const tree = card.dataset.tree;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('[data-page="skills"]').classList.add('active');
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('skills-page').classList.add('active');
      renderSkillTree(tree);
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      document.querySelector(`[data-tree="${tree}"]`).classList.add('active');
    });
  });
  
  // Skill Tabs
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      renderSkillTree(e.target.dataset.tree);
    });
  });
  
  // Leaderboard Tabs
  document.querySelectorAll('.leaderboard-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      renderLeaderboard(e.target.dataset.category);
    });
  });
}

// Timer Functions
function startTimer() {
  timerState.isRunning = true;
  timerState.isPaused = false;
  timerState.remaining = timerState.duration * 60;
  timerState.startTime = Date.now();
  
  document.getElementById('timer-setup').classList.add('hidden');
  document.getElementById('timer-running').classList.add('hidden');
  document.getElementById('timer-running').classList.remove('hidden');
  
  const sound = document.getElementById('sound-select').value;
  document.getElementById('current-sound').textContent = sound;
  
  updateTimerDisplay();
  timerState.interval = setInterval(updateTimer, 1000);
  
  showNotification('Focus session started! 🎯');
}

function updateTimer() {
  if (timerState.isPaused) return;
  
  timerState.remaining--;
  
  if (timerState.remaining <= 0) {
    completeTimer();
    return;
  }
  
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerState.remaining / 60);
  const seconds = timerState.remaining % 60;
  document.getElementById('timer-display').textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // Update progress circle
  const totalSeconds = timerState.duration * 60;
  const progress = (timerState.remaining / totalSeconds) * 565.48;
  document.getElementById('timer-progress-circle').style.strokeDashoffset = progress;
}

function pauseTimer() {
  timerState.isPaused = !timerState.isPaused;
  document.getElementById('pause-timer').textContent = timerState.isPaused ? 'Resume' : 'Pause';
}

function stopTimer() {
  clearInterval(timerState.interval);
  timerState.isRunning = false;
  timerState.isPaused = false;
  
  document.getElementById('timer-setup').classList.remove('hidden');
  document.getElementById('timer-running').classList.add('hidden');
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('timer-progress-circle').style.strokeDashoffset = 565.48;
  
  showNotification('⚠️ Session cancelled - No XP earned. Consistency is key to recovery.');
}

function completeTimer() {
  clearInterval(timerState.interval);
  timerState.isRunning = false;
  
  document.getElementById('timer-setup').classList.remove('hidden');
  document.getElementById('timer-running').classList.add('hidden');
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('timer-progress-circle').style.strokeDashoffset = 565.48;
  
  // Show rating modal
  document.getElementById('rating-modal').classList.remove('hidden');
}

function submitRating() {
  const quality = parseInt(document.getElementById('quality-rating').value);
  const minutes = timerState.duration;
  
  // Determine current phase based on streak (days)
  let phaseMultiplier = 1.0;
  let phaseName = 'Phase 1';
  if (gameState.streak >= 121) {
    phaseMultiplier = 5.0;
    phaseName = 'Phase 4';
  } else if (gameState.streak >= 81) {
    phaseMultiplier = 3.5;
    phaseName = 'Phase 3';
  } else if (gameState.streak >= 22) {
    phaseMultiplier = 2.0;
    phaseName = 'Phase 2';
  } else {
    phaseMultiplier = 1.0;
    phaseName = 'Phase 1';
  }
  
  // Calculate XP with phase multiplier
  const streakMultiplier = gameState.streak >= 30 ? 2.5 : (gameState.streak >= 14 ? 2.0 : (gameState.streak >= 7 ? 1.5 : 1.0));
  const baseXP = minutes * quality;
  const earnedXP = Math.floor(baseXP * phaseMultiplier * streakMultiplier);
  
  // Show calculation breakdown
  console.log(`XP Calculation: ${minutes} min × ${quality} quality × ${phaseMultiplier}x ${phaseName} × ${streakMultiplier}x streak = ${earnedXP} XP`);
  
  // Update game state
  gameState.totalXP += earnedXP;
  gameState.todayMinutes += minutes;
  gameState.sessionsToday++;
  gameState.totalSessions++;
  gameState.totalMinutes += minutes;
  
  // Update streak
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  // Check if streak is broken (more than 1 day gap)
  if (gameState.lastSessionDate && gameState.lastSessionDate !== today && gameState.lastSessionDate !== yesterday) {
    // Streak is broken!
    const lostStreak = gameState.streak;
    gameState.streak = 1; // Reset to 1 (today's session)
    gameState.lastSessionDate = today;
    showNotification(`⚠️ STREAK BROKEN! You lost a ${lostStreak}-day streak. Starting over from Day 1. This is painful but necessary. Discipline is everything.`, 7000);
  } else if (gameState.lastSessionDate !== today) {
    gameState.streak++;
    gameState.lastSessionDate = today;
    if (gameState.streak > gameState.longestStreak) {
      gameState.longestStreak = gameState.streak;
    }
  }
  
  // Add to history
  gameState.sessionHistory.push({
    date: new Date(),
    duration: minutes,
    quality: quality,
    xp: earnedXP
  });
  
  gameState.qualityData.push(quality);
  
  // Update weekly data (simplified)
  const dayIndex = new Date().getDay();
  gameState.weeklyData[dayIndex] += minutes / 60;
  
  // Check for level up
  checkLevelUp();
  
  // Check achievements
  checkAchievements(minutes);
  
  // Check tree mastery
  checkTreeMasteryAchievements();
  
  // Update all displays
  updateAllDisplays();
  
  // Hide modal
  document.getElementById('rating-modal').classList.add('hidden');
  
  // Show notification with calculation breakdown and quote
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  showNotification(`+${earnedXP} XP earned!<br><small>${minutes} min × ${quality} quality × ${phaseMultiplier}x phase × ${streakMultiplier}x streak</small><br><em>"${quote}"</em>`, 6000);
    showNotification(`${earnedXP} XP earned!<br><small>${minutes} min × ${quality} quality × ${phaseMultiplier}x phase × ${streakMultiplier}x streak</small><br><em>"${quote}"</em>`, 6000);
    
    saveGameState();
}


function checkLevelUp() {
  const xpForNextLevel = gameState.level * 100;
  if (gameState.totalXP >= xpForNextLevel) {
    gameState.level++;
    document.getElementById('new-level').textContent = gameState.level;
    document.getElementById('levelup-modal').classList.remove('hidden');
    showNotification(`LEVEL UP! You are now Level ${gameState.level}! ⭐`, 3000);
  }
}

function checkAchievements(minutes) {
  // First Blood
  if (!gameState.achievements.firstBlood.unlocked && gameState.totalSessions === 1) {
    unlockAchievement('firstBlood', 50);
  }
  
  // Day 7 Survivor
  if (!gameState.achievements.day7Survivor.unlocked && gameState.streak >= 7) {
    unlockAchievement('day7Survivor', 100);
  }
  
  // Week Warrior
  if (!gameState.achievements.weekWarrior.unlocked && gameState.streak >= 7) {
    unlockAchievement('weekWarrior', 100);
  }
  
  // Day 30 Conqueror
  if (!gameState.achievements.day30Conqueror.unlocked && gameState.streak >= 30) {
    unlockAchievement('day30Conqueror', 300);
  }
  
  // Day 60 Transformer
  if (!gameState.achievements.day60Transformer.unlocked && gameState.streak >= 60) {
    unlockAchievement('day60Transformer', 500);
  }
  
  // Day 90 Reset
  if (!gameState.achievements.day90Reset.unlocked && gameState.streak >= 90) {
    unlockAchievement('day90Reset', 1000);
  }
  
  // Day 180 Monk
  if (!gameState.achievements.day180Monk.unlocked && gameState.streak >= 180) {
    unlockAchievement('day180Monk', 2000);
  }
  
  // Deep Diver
  if (!gameState.achievements.deepDiver.unlocked && minutes >= 90) {
    unlockAchievement('deepDiver', 300);
  }
  
  // Update progress
  gameState.achievements.day7Survivor.progress = Math.min(gameState.streak, 7);
  gameState.achievements.weekWarrior.progress = Math.min(gameState.streak, 7);
  gameState.achievements.day30Conqueror.progress = Math.min(gameState.streak, 30);
  gameState.achievements.day60Transformer.progress = Math.min(gameState.streak, 60);
  gameState.achievements.day90Reset.progress = Math.min(gameState.streak, 90);
  gameState.achievements.day180Monk.progress = Math.min(gameState.streak, 180);
}

function unlockAchievement(id, xp) {
  gameState.achievements[id].unlocked = true;
  gameState.totalXP += xp;
  const achievement = achievementsData.find(a => a.id === id);
  showNotification(`🏆 Achievement Unlocked: ${achievement.name}! +${xp} XP`, 4000);
}

function checkTreeMasteryAchievements() {
  // Check Sustained Master
  if (!gameState.achievements.sustainedMaster.unlocked && gameState.skillTrees.sustained.level >= 12) {
    unlockAchievement('sustainedMaster', 2000);
  }
  
  // Check Selective Master
  if (!gameState.achievements.selectiveMaster.unlocked && gameState.skillTrees.selective.level >= 12) {
    unlockAchievement('selectiveMaster', 2000);
  }
  
  // Check Executive Master
  if (!gameState.achievements.executiveMaster.unlocked && gameState.skillTrees.executive.level >= 12) {
    unlockAchievement('executiveMaster', 2000);
  }
  
  // Check Trinity Master (all three at level 12)
  if (!gameState.achievements.trinityMaster.unlocked && 
      gameState.skillTrees.sustained.level >= 12 && 
      gameState.skillTrees.selective.level >= 12 && 
      gameState.skillTrees.executive.level >= 12) {
    unlockAchievement('trinityMaster', 5000);
    showNotification('🌟🌟🌟 TRINITY MASTER ACHIEVED! 🌟🌟🌟<br>You are a TRUE MASTER OF ATTENTION!', 8000);
  }
}

// Render Functions
function renderDashboard() {
  updateAllDisplays();
}

function updateAllDisplays() {
  // Recovery Days and Phase
  const recoveryDays = gameState.streak || 1;
  document.getElementById('recovery-days').textContent = recoveryDays;
  
  // Determine current phase
  let currentPhase = 'Phase 1: Withdrawal & Stabilization';
  let phaseClass = 'phase-1';
  let phaseMessage = 'Your dopamine is crashed. Everything feels boring/impossible. This is the worst. You\'ve got this.';
  let phaseMultiplier = '1.0x';
  
  if (recoveryDays >= 121) {
    currentPhase = 'Phase 4: Mastery & Maintenance';
    phaseClass = 'phase-4';
    phaseMessage = 'You\'ve rebuilt your brain. This is maintenance now. Keep the discipline forever.';
    phaseMultiplier = '5.0x';
  } else if (recoveryDays >= 81) {
    currentPhase = 'Phase 3: Consolidation & Integration';
    phaseClass = 'phase-3';
    phaseMessage = 'Dopamine normalizing. Brain consolidating. Momentum building.';
    phaseMultiplier = '3.5x';
  } else if (recoveryDays >= 22) {
    currentPhase = 'Phase 2: Neural Pathway Formation';
    phaseClass = 'phase-2';
    phaseMessage = 'Your brain is rewiring. New pathways forming. You\'re past the worst.';
    phaseMultiplier = '2.0x';
  }
  
  const phaseIndicator = document.getElementById('current-phase');
  phaseIndicator.textContent = currentPhase;
  phaseIndicator.className = 'phase-indicator ' + phaseClass;
  document.getElementById('timeline-message').textContent = phaseMessage;
  
  // Update modal phase info
  if (document.getElementById('modal-phase')) {
    document.getElementById('modal-phase').textContent = currentPhase;
    document.getElementById('modal-multiplier').textContent = phaseMultiplier;
  }
  
  // XP and Level
  document.getElementById('total-xp').textContent = gameState.totalXP.toLocaleString();
  document.getElementById('player-level').textContent = gameState.level;
  
  const xpForNextLevel = gameState.level * 100;
  const currentLevelXP = gameState.totalXP % 100;
  const progress = (currentLevelXP / xpForNextLevel) * 100;
  document.getElementById('level-progress').style.width = `${progress}%`;
  document.getElementById('level-progress-text').textContent = `${currentLevelXP} / ${xpForNextLevel} XP`;
  
  // Today's Stats
  document.getElementById('today-minutes').textContent = gameState.todayMinutes;
  document.getElementById('streak-count').textContent = gameState.streak;
  document.getElementById('sessions-today').textContent = gameState.sessionsToday;
  
  // Skill Trees Progress
  updateSkillTreeCards();
  
  // Shop XP
  document.getElementById('shop-xp').textContent = gameState.totalXP.toLocaleString();
}

function updateSkillTreeCards() {
  let totalLevels = 0;
  
  Object.keys(gameState.skillTrees).forEach(tree => {
    const treeData = skillTreeData[tree];
    
    // Calculate current level based on total XP
    let currentLevel = 1;
    for (let i = treeData.length - 1; i >= 0; i--) {
      if (gameState.totalXP >= treeData[i].xp) {
        currentLevel = treeData[i].level;
        break;
      }
    }
    
    totalLevels += currentLevel;
    gameState.skillTrees[tree].level = currentLevel;
    
    document.getElementById(`${tree}-level`).textContent = currentLevel;
    
    // Calculate progress to next level
    const nextLevel = treeData.find(l => l.level === currentLevel + 1);
    if (nextLevel) {
      const currentLevelData = treeData.find(l => l.level === currentLevel);
      const xpIntoLevel = gameState.totalXP - currentLevelData.xp;
      const xpNeeded = nextLevel.xp - currentLevelData.xp;
      const progress = (xpIntoLevel / xpNeeded) * 100;
      document.getElementById(`${tree}-progress`).style.width = `${Math.min(progress, 100)}%`;
    } else {
      document.getElementById(`${tree}-progress`).style.width = '100%';
    }
  });
  
  // Update total mastery display
  if (document.getElementById('total-mastery-levels')) {
    document.getElementById('total-mastery-levels').textContent = totalLevels;
  }
  
  // Check for tree mastery achievements
  checkTreeMasteryAchievements();
}

function renderDailyQuests() {
  const questList = document.getElementById('quest-list');
  questList.innerHTML = '';
  
  gameState.dailyQuests.forEach((quest, index) => {
    const questItem = document.createElement('div');
    questItem.className = `quest-item ${quest.completed ? 'completed' : ''}`;
    questItem.innerHTML = `
      <div class="quest-checkbox ${quest.completed ? 'checked' : ''}" data-index="${index}"></div>
      <div class="quest-text">${quest.text}</div>
      <div class="quest-xp">+${quest.xp} XP</div>
    `;
    questList.appendChild(questItem);
  });
  
  // Add click handlers
  document.querySelectorAll('.quest-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      if (!gameState.dailyQuests[index].completed) {
        gameState.dailyQuests[index].completed = true;
        gameState.totalXP += gameState.dailyQuests[index].xp;
        renderDailyQuests();
        updateAllDisplays();
        showNotification(`Quest completed! +${gameState.dailyQuests[index].xp} XP`);
      }
    });
  });
}

function renderSkillTree(treeName) {
  const container = document.getElementById('skill-tree-content');
  const treeData = skillTreeData[treeName];
  
  container.innerHTML = '';
  
  // Add header for each tree
  const header = document.createElement('div');
  header.style.cssText = 'text-align: center; margin-bottom: 24px; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 12px;';
  
  if (treeName === 'sustained') {
    header.innerHTML = `
      <h3 style="color: var(--neon-cyan); margin-bottom: 12px;">Attention Reboot - Dopamine Recovery Protocol</h3>
      <p style="color: var(--color-gray-300); font-size: 14px;">⚠️ Realistic Timeline: Reaching Level 12 (The Monk) takes ~180 days of consistent focus</p>
      <p style="color: var(--neon-purple); font-size: 13px; margin-top: 8px;">This is REAL brain recovery. It's hard because your dopamine is broken. It gets exponentially easier as you heal.</p>
      <div style="margin-top: 16px; padding: 12px; background: rgba(0, 255, 255, 0.1); border-left: 3px solid var(--neon-cyan); border-radius: 6px; text-align: left;">
        <strong style="color: var(--neon-cyan);">Realistic XP Examples:</strong><br>
        <small style="color: var(--color-gray-300); line-height: 1.6;">
          • Phase 1: 3 min at 8/10 quality = ~24 XP (brutally slow)<br>
          • Phase 2: 25 min at 8/10 quality = ~400 XP (accelerating)<br>
          • Phase 3: 45 min at 8/10 quality = ~1,260 XP (momentum!)<br>
          • Phase 4: 60 min at 8/10 quality = ~2,400 XP (exponential)
        </small>
      </div>
    `;
  } else if (treeName === 'selective') {
    header.innerHTML = `
      <h3 style="color: var(--neon-cyan); margin-bottom: 12px;">🛡️ Selective Attention Mastery</h3>
      <p style="color: var(--color-gray-300); font-size: 14px;">Master filtering distractions and focusing on what matters</p>
      <p style="color: var(--neon-purple); font-size: 13px; margin-top: 8px;">Timeline: ~180 days to Level 12 (Zen Master)</p>
      <div style="margin-top: 16px; padding: 12px; background: rgba(0, 255, 255, 0.1); border-left: 3px solid var(--neon-cyan); border-radius: 6px; text-align: left;">
        <strong style="color: var(--neon-cyan);">Path to Mastery:</strong><br>
        <small style="color: var(--color-gray-300); line-height: 1.6;">
          • Phase 1 (Levels 1-4): Foundation - Learn distraction awareness<br>
          • Phase 2 (Levels 5-8): Building - Develop filtering strength<br>
          • Phase 3 (Levels 9-10): Advanced - Build attention fortress<br>
          • Phase 4 (Levels 11-12): Transcendence - Achieve Zen mastery
        </small>
      </div>
    `;
  } else if (treeName === 'executive') {
    header.innerHTML = `
      <h3 style="color: var(--neon-cyan); margin-bottom: 12px;">👑 Executive Attention Control</h3>
      <p style="color: var(--color-gray-300); font-size: 14px;">Master directing, switching, and optimizing attention allocation</p>
      <p style="color: var(--neon-purple); font-size: 13px; margin-top: 8px;">Timeline: ~180 days to Level 12 (Mind Sovereign)</p>
      <div style="margin-top: 16px; padding: 12px; background: rgba(0, 255, 255, 0.1); border-left: 3px solid var(--neon-cyan); border-radius: 6px; text-align: left;">
        <strong style="color: var(--neon-cyan);">Path to Sovereignty:</strong><br>
        <small style="color: var(--color-gray-300); line-height: 1.6;">
          • Phase 1 (Levels 1-4): Foundation - Task awareness & planning<br>
          • Phase 2 (Levels 5-8): Building - Cognitive control & direction<br>
          • Phase 3 (Levels 9-10): Strategic - Elite attention management<br>
          • Phase 4 (Levels 11-12): Sovereignty - Complete mind mastery
        </small>
      </div>
    `;
  }
  
  container.appendChild(header);
  
  treeData.forEach(level => {
    const isUnlocked = gameState.totalXP >= level.xp;
    const card = document.createElement('div');
    
    // Determine phase color
    let phaseColor = '#ff4444'; // Red for Phase 1
    if (level.phase === 2) phaseColor = '#ff9944'; // Orange for Phase 2
    if (level.phase === 3) phaseColor = '#44ff88'; // Green for Phase 3
    if (level.phase === 4) phaseColor = '#00ff88'; // Dark Green for Phase 4
    
    card.className = `skill-level-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.style.borderLeft = `4px solid ${phaseColor}`;
    
    card.innerHTML = `
      <div class="skill-level-header">
        <div class="level-title">Level ${level.level}: ${level.name}</div>
        <div class="level-xp">${level.xp.toLocaleString()} XP Required</div>
      </div>
      ${level.phaseName ? `<div style="background: ${phaseColor}22; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; border-left: 3px solid ${phaseColor};"><strong style="color: ${phaseColor};">${level.phaseName}</strong><br><small style="color: var(--color-gray-300);">Days ${level.daysRange} | ${level.phaseMultiplier}x XP Multiplier</small></div>` : ''}
      <div class="level-duration">⏱️ Target: ${level.duration} | 🎯 Difficulty: ${level.difficulty}</div>
      ${level.description ? `<p style="color: var(--color-gray-300); font-style: italic; margin: 12px 0; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 6px;">${level.description}</p>` : ''}
      <div class="level-challenges">
        <h4>Challenges:</h4>
        <ul>
          ${level.challenges.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
      <div class="level-rewards">
        <strong>Rewards:</strong> ${level.rewards}
      </div>
      ${level.note ? `<div style="background: rgba(0, 255, 255, 0.15); padding: 10px; border-radius: 6px; margin-top: 12px; border-left: 3px solid var(--neon-cyan);"><strong style="color: var(--neon-cyan);">💡 ${level.note}</strong></div>` : ''}
      ${level.milestone ? `<div style="background: rgba(255, 215, 0, 0.15); padding: 10px; border-radius: 6px; margin-top: 12px; border-left: 3px solid gold;"><strong style="color: gold;">🎉 ${level.milestone}</strong></div>` : ''}
      ${level.finalWarning ? `<div style="background: rgba(255, 0, 0, 0.15); padding: 12px; border-radius: 6px; margin-top: 12px; border: 2px solid #ff4444;"><strong style="color: #ff4444;">⚠️ PERMANENT WARNING:</strong><br><span style="color: var(--color-gray-200); font-size: 13px;">${level.finalWarning}</span></div>` : ''}
      <div class="level-unlock">
        🔓 ${level.unlock}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';
  
  achievementsData.forEach(achievement => {
    const state = gameState.achievements[achievement.id];
    const card = document.createElement('div');
    card.className = `achievement-card ${state.unlocked ? 'unlocked' : 'locked'}`;
    
    const progressPercent = state.max ? (state.progress / state.max) * 100 : 0;
    
    card.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <h3>${achievement.name}</h3>
      <div class="achievement-requirement">${achievement.requirement}</div>
      <div class="achievement-reward">${achievement.reward}</div>
      ${!state.unlocked && state.max ? `
        <div class="achievement-progress">
          <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
        </div>
        <div style="font-size: 12px; color: #A7A9A9; margin-top: 8px;">${state.progress} / ${state.max}</div>
      ` : ''}
    `;
    grid.appendChild(card);
  });
}

function renderShop() {
  const grid = document.getElementById('shop-grid');
  const currentPhase = getCurrentPhase();
  
  // Add shop header with phase message
  grid.innerHTML = `
    <div style="grid-column: 1 / -1; background: var(--card-bg); border: 2px solid var(--neon-purple); border-radius: var(--radius-lg); padding: var(--space-24); margin-bottom: var(--space-24); text-align: center;">
      <h3 style="color: var(--neon-cyan); margin-bottom: var(--space-12); font-size: var(--font-size-2xl);">⚡ Power-Up Shop - Phase ${currentPhase}</h3>
      <p style="color: var(--neon-purple); font-size: var(--font-size-lg); margin-bottom: var(--space-8);">${powerUpShopMessages['phase' + currentPhase]}</p>
      <p style="color: var(--color-gray-300); font-size: var(--font-size-sm);">All prices are scaled to your current phase. Power-ups are STRATEGIC investments, not casual purchases.</p>
    </div>
  `;
  
  // Separate power-ups by rarity
  const streakSavers = powerUpsData.filter(p => p.rarity === 'Epic');
  const rarePowerUps = powerUpsData.filter(p => p.rarity === 'Rare');
  const uncommonPowerUps = powerUpsData.filter(p => p.rarity === 'Uncommon');
  const commonPowerUps = powerUpsData.filter(p => p.rarity === 'Common');
  
  // Render in order: Epic (Streak Saver), Rare, Uncommon, Common
  const orderedPowerUps = [...streakSavers, ...rarePowerUps, ...uncommonPowerUps, ...commonPowerUps];
  
  orderedPowerUps.forEach(powerup => {
    const currentCost = getPowerUpCost(powerup);
    const sessionsNeeded = getSessionsNeeded(powerup);
    const canAfford = gameState.totalXP >= currentCost;
    const rarityColor = rarityColors[powerup.rarity];
    const isEpic = powerup.rarity === 'Epic';
    
    const card = document.createElement('div');
    card.className = 'shop-item';
    card.style.cssText = isEpic ? `border: 3px solid ${rarityColor}; box-shadow: 0 0 30px ${rarityColor}55; grid-column: 1 / -1; max-width: 600px; margin: 0 auto; width: 100%;` : `border: 2px solid ${rarityColor}33;`;
    
    // Build phase costs display
    let phaseCostsHTML = '<div style="margin-top: 12px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 6px; font-size: 12px;">';
    phaseCostsHTML += '<strong style="color: var(--neon-cyan);">Cost by Phase:</strong><br>';
    powerup.phaseCosts.forEach(pc => {
      const isCurrent = pc.phase === currentPhase;
      phaseCostsHTML += `<span style="color: ${isCurrent ? rarityColor : 'var(--color-gray-300)'}; font-weight: ${isCurrent ? 'bold' : 'normal'};">`;
      phaseCostsHTML += `Phase ${pc.phase}: ${pc.cost} XP${isCurrent ? ' ← YOU ARE HERE' : ''}</span><br>`;
    });
    phaseCostsHTML += '</div>';
    
    card.innerHTML = `
      ${powerup.new ? '<div style="position: absolute; top: 12px; right: 12px; background: var(--neon-green); color: var(--darker-bg); padding: 4px 12px; border-radius: var(--radius-full); font-size: 11px; font-weight: bold;">NEW</div>' : ''}
      <div style="font-size: 64px; margin-bottom: 16px;">${powerup.icon}</div>
      <div style="display: inline-block; padding: 4px 12px; background: ${rarityColor}22; border: 1px solid ${rarityColor}; border-radius: var(--radius-full); color: ${rarityColor}; font-size: 12px; font-weight: bold; margin-bottom: 12px;">${powerup.rarity.toUpperCase()}</div>
      <h3 style="color: ${rarityColor};">${powerup.name}</h3>
      <div class="shop-cost" style="color: ${rarityColor};">${currentCost.toLocaleString()} XP</div>
      <div style="color: var(--color-gray-300); font-size: 13px; margin-bottom: 8px;">~${sessionsNeeded.toFixed(1)} sessions needed (Phase ${currentPhase})</div>
      <div class="shop-effect" style="margin-bottom: 12px;">${powerup.effect}</div>
      <div style="font-size: 12px; color: var(--neon-purple); font-style: italic; margin-bottom: 12px; padding: 8px; background: rgba(183, 148, 244, 0.1); border-radius: 6px;">${powerup.useCase}</div>
      ${powerup.warning ? `<div style="background: rgba(255, 0, 0, 0.15); padding: 10px; border-radius: 6px; margin-bottom: 12px; border-left: 3px solid #ff4444;"><strong style="color: #ff4444; font-size: 11px;">⚠️ WARNING:</strong><br><span style="color: var(--color-gray-200); font-size: 11px;">${powerup.warning}</span></div>` : ''}
      ${phaseCostsHTML}
      <button class="btn ${canAfford ? 'btn--primary' : 'btn--outline'}" onclick="buyPowerUp('${powerup.id}')" ${!canAfford ? 'style="opacity: 0.5; cursor: not-allowed;"' : ''}>
        ${canAfford ? 'BUY NOW' : `NEED ${(currentCost - gameState.totalXP).toLocaleString()} MORE XP`}
      </button>
      ${isEpic ? '<div style="margin-top: 12px; font-size: 11px; color: var(--neon-green); font-weight: bold;">💎 MOST VALUABLE POWER-UP - Losing a streak is devastating!</div>' : ''}
    `;
    grid.appendChild(card);
  });
}

function buyPowerUp(id) {
  const powerup = powerUpsData.find(p => p.id === id);
  if (!powerup) return;
  
  const currentCost = getPowerUpCost(powerup);
  
  if (gameState.totalXP >= currentCost) {
    gameState.totalXP -= currentCost;
    updateAllDisplays();
    renderShop(); // Re-render shop to update available XP
    
    const rarityColor = rarityColors[powerup.rarity];
    showNotification(
      `<strong style="color: ${rarityColor};">Power-Up Activated: ${powerup.name}</strong><br>` +
      `<span style="font-size: 13px;">${powerup.effect}</span><br>` +
      `<small style="color: var(--color-gray-300);">-${currentCost.toLocaleString()} XP</small>`,
      5000
    );
    
    // Special message for Streak Saver
    if (id === 'streakSaver') {
      setTimeout(() => {
        showNotification(
          '🔥 Streak Saver is now active. If you break your streak, it will be automatically restored ONCE. Use this power wisely.',
          6000
        );
      }, 5500);
    }
  } else {
    const needed = currentCost - gameState.totalXP;
    showNotification(
      `⚠️ Insufficient XP!<br>` +
      `<small>You need ${needed.toLocaleString()} more XP to buy ${powerup.name}</small>`,
      3000
    );
  }
}

function renderStatistics() {
  // Update recovery stats
  const recoveryDays = gameState.streak || 1;
  document.getElementById('stats-days').textContent = recoveryDays;
  
  let phaseText = 'Phase 1';
  let phaseMultiplier = '1.0x XP Multiplier';
  if (recoveryDays >= 121) {
    phaseText = 'Phase 4';
    phaseMultiplier = '5.0x XP Multiplier';
  } else if (recoveryDays >= 81) {
    phaseText = 'Phase 3';
    phaseMultiplier = '3.5x XP Multiplier';
  } else if (recoveryDays >= 22) {
    phaseText = 'Phase 2';
    phaseMultiplier = '2.0x XP Multiplier';
  }
  
  document.getElementById('stats-phase').textContent = phaseText;
  document.getElementById('stats-phase-multiplier').textContent = phaseMultiplier;
  
  const progressPercent = Math.min((recoveryDays / 180) * 100, 100).toFixed(1);
  document.getElementById('stats-progress').textContent = progressPercent + '%';
  
  const daysToMonk = Math.max(0, 180 - recoveryDays);
  document.getElementById('stats-days-to-monk').textContent = daysToMonk > 0 ? `${daysToMonk} days to Monk status` : 'Monk status achieved! 🏆';
  
  // Render milestones
  renderMilestones();
  
  // Update stat boxes
  document.getElementById('total-hours').textContent = (gameState.totalMinutes / 60).toFixed(1);
  document.getElementById('longest-streak').textContent = gameState.longestStreak;
  document.getElementById('avg-duration').textContent = 
    gameState.totalSessions > 0 ? Math.round(gameState.totalMinutes / gameState.totalSessions) : 0;
  document.getElementById('total-sessions').textContent = gameState.totalSessions;
  
  // Weekly Chart
  const weeklyCtx = document.getElementById('weekly-chart').getContext('2d');
  new Chart(weeklyCtx, {
    type: 'bar',
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Focus Hours',
        data: gameState.weeklyData,
        backgroundColor: '#32B8C6',
        borderColor: '#00ffff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: { 
          beginAtZero: true,
          ticks: { color: '#A7A9A9' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: '#A7A9A9' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      },
      plugins: {
        legend: { labels: { color: '#A7A9A9' } }
      }
    }
  });
  
  // Quality Chart
  const qualityCtx = document.getElementById('quality-chart').getContext('2d');
  new Chart(qualityCtx, {
    type: 'line',
    data: {
      labels: gameState.qualityData.map((_, i) => `S${i + 1}`),
      datasets: [{
        label: 'Focus Quality',
        data: gameState.qualityData,
        borderColor: '#B794F4',
        backgroundColor: 'rgba(183, 148, 244, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: { 
          beginAtZero: true,
          max: 10,
          ticks: { color: '#A7A9A9' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: '#A7A9A9' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      },
      plugins: {
        legend: { labels: { color: '#A7A9A9' } }
      }
    }
  });
}

function renderLeaderboard(category) {
  const content = document.getElementById('leaderboard-content');
  
  // Mock leaderboard data
  const leaderboards = {
    hours: [
      { rank: 1, name: 'FocusMaster99', value: '156 hrs' },
      { rank: 2, name: 'ZenWarrior', value: '142 hrs' },
      { rank: 3, name: 'DeepWorker', value: '128 hrs' },
      { rank: 4, name: 'MindMonk', value: '115 hrs' },
      { rank: 5, name: 'FlowStateKing', value: '98 hrs' }
    ],
    streak: [
      { rank: 1, name: 'StreakLegend', value: '127 days' },
      { rank: 2, name: 'Consistent_One', value: '89 days' },
      { rank: 3, name: 'DailyGrinder', value: '76 days' },
      { rank: 4, name: 'NeverMiss', value: '65 days' },
      { rank: 5, name: 'FocusDaily', value: '54 days' }
    ],
    level: [
      { rank: 1, name: 'TheMonk', value: 'Level 47' },
      { rank: 2, name: 'SageOfFocus', value: 'Level 42' },
      { rank: 3, name: 'MasterMind', value: 'Level 38' },
      { rank: 4, name: 'AdeptWarrior', value: 'Level 35' },
      { rank: 5, name: 'Practitioner42', value: 'Level 31' }
    ],
    sessions: [
      { rank: 1, name: 'SessionKing', value: '892' },
      { rank: 2, name: 'DeepDiver_Pro', value: '756' },
      { rank: 3, name: 'FocusFreak', value: '643' },
      { rank: 4, name: 'WorkWarrior', value: '587' },
      { rank: 5, name: 'Pomodoro_Master', value: '521' }
    ],
    distractions: [
      { rank: 1, name: 'LaserFocus', value: '12' },
      { rank: 2, name: 'ZeroDistract', value: '15' },
      { rank: 3, name: 'PureConcentration', value: '18' },
      { rank: 4, name: 'AttentionAce', value: '23' },
      { rank: 5, name: 'FocusShield', value: '27' }
    ]
  };
  
  const data = leaderboards[category] || leaderboards.hours;
  
  content.innerHTML = data.map(entry => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank">#${entry.rank}</div>
      <div class="leaderboard-name">${entry.name}</div>
      <div class="leaderboard-value">${entry.value}</div>
    </div>
  `).join('');
}

function renderMilestones() {
  const grid = document.getElementById('milestones-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  const recoveryDays = gameState.streak || 1;
  
  dopamineRecoveryMilestones.forEach(milestone => {
    const card = document.createElement('div');
    const isAchieved = recoveryDays >= milestone.day;
    const isCurrent = recoveryDays < milestone.day && recoveryDays >= milestone.day - 3;
    
    card.className = `milestone-card ${isAchieved ? 'achieved' : ''} ${isCurrent ? 'current' : ''}`;
    
    let statusText = '⏳ Upcoming';
    let statusIcon = '🔒';
    if (isAchieved) {
      statusText = '✅ Achieved';
      statusIcon = '🏆';
    } else if (isCurrent) {
      statusText = '🔥 Next Goal';
      statusIcon = '🎯';
    }
    
    card.innerHTML = `
      <div class="milestone-header">
        <div class="milestone-day">${statusIcon} Day ${milestone.day}</div>
        <div class="milestone-status">${statusText}</div>
      </div>
      <div class="milestone-event">${milestone.event}</div>
      <div class="milestone-description">${milestone.description}</div>
      <div class="milestone-tip">💡 ${milestone.tip}</div>
    `;
    
    grid.appendChild(card);
  });
}

function showNotification(message, duration = 3000) {
  const notification = document.getElementById('notification');
  notification.innerHTML = message;
  notification.classList.remove('hidden');
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, duration);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initApp);