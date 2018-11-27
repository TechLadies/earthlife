<template>
  <div id="app">
    <Navigation />
    <template v-if="!isLoading">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </template>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
export default {
  name: 'App',
  data: function() {
    return {
      show: false
    };
  },
  components: {
    Navigation: Navigation
  },
  computed: {
    isLoading() {
      const { categories, questions, actionList } = this.$store.state;
      const loaded =
        categories.length && Object.keys(questions).length && actionList.length;
      return !loaded;
    }
  },
  created: function() {
    this.$store.dispatch('getData');
  }
};
</script>

<!-- Global styles for the entire app are here!!! -->
<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,700,800,900');

*,
*::after,
*::before {
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.show {
  display: none;
}

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

button:focus {
  outline: 0;
}

button {
  font-family: poppins;
}
</style>

