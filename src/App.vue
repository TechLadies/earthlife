<template>
  <div id="app">
    <Navigation />
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-if="!isLoading">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
export default{
  name:'App',
  data: {
    show: false
  },
  components: {
    'Navigation': Navigation
  },
  computed: {
    isLoading() {
      const { categories, questions, actionList } = this.$store.state;
      const loaded = categories.length && Object.keys(questions).length && actionList.length;
      return !loaded;
    }
  },
  created: function(){
    this.$store.dispatch('getData');
  }
}
</script>

<!-- Global styles for the entire app are here!!! -->
<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,700,800,900');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #2c3e50;
  height: 100%;
}

.global-earthlife-nav {
  padding: 25px 15%;
  color: #212B36;
  font-size: 16px;
  letter-spacing: 3px;
  line-height: 25px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
}

.show {
  display: none;
}

html{
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

button:focus {
  outline: 0;
}
</style>

