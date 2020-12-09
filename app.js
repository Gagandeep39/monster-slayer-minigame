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
      const damage = Math.floor(Math.random() * (12 - 5)) + 5;
      // Update the health of monster
      this.monsterHealth -= damage;
    },
    attackPlayer() {
      // Calculate damage between 8 and 12
      const damage = Math.floor(Math.random() * (12 - 8)) + 8;
      // Update the health of player
      this.playerHealth -= damage;
    },
  },
});
app.mount('#game');
