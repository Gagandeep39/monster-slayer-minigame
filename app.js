// ################################
// ######## Vinalli JS ############
// ################################
function getRamdomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// ################################
// ########Vue Application ########
// ################################
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    attackMonster() {
      // Increment current round
      // Sued for special attack
      this.currentRound++;
      // Calculate damage between 5 and 12
      const damage = getRamdomValue(5, 12);
      // Update the health of monster
      this.monsterHealth -= damage;
      // Logs
      this.addLogMessage('player', 'attack', damage);
      // Attack player automatically
      this.attackPlayer();
    },
    attackPlayer() {
      // Calculate damage between 8 and 12
      const damage = getRamdomValue(8, 12);
      // Update the health of player
      this.playerHealth -= damage;
      // Logs
      this.addLogMessage('monster', 'attack', damage);
    },
    specialAttackMonster() {
      this.currentRound++;
      // Calculate damage between 5 and 12
      const damage = getRamdomValue(10, 25);
      // Update the health of monster
      this.monsterHealth -= damage;
      // Logs
      this.addLogMessage('player', 'specialattack', damage);
      // Attack player automatically
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = getRamdomValue(8, 20);
      if (this.playerHealth + healValue > 100) this.playerHealth = 100;
      else this.playerHealth += healValue;
      // Logs
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      // Monster wins
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    // To show Lose screen
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player Lost
        this.winner = 'monster';
      }
    },
    // Show Win screen
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player Won
        this.winner = 'player';
      }
    },
  },
});
app.mount('#game');
