const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

const getXPForNextLevel = (level) => {
  return level * 100;
};

const getProgress = (xp) => {
  const level = calculateLevel(xp);
  const currentLevelXP = (level - 1) * 100;
  const nextLevelXP = level * 100;

  const progressXP = xp - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;

  return {
    level,
    progressXP,
    requiredXP,
  };
};

module.exports = {
  calculateLevel,
  getXPForNextLevel,
  getProgress,
};