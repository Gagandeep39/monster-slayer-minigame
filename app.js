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
    };
  },
  methods: {
    attackMonster() {
      // Calculate damage between 5 and 12
      const damage = getRamdomValue(5, 12);
      // Update the health of monster
      this.monsterHealth -= damage;
      // Attack player automatically
      this.attackPlayer();
    },
    attackPlayer() {
      // Calculate damage between 8 and 12
      const damage = getRamdomValue(8, 12);
      // Update the health of player
      this.playerHealth -= damage;
    },
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' };
    },
  },
});
app.mount('#game');
