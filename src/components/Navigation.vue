<template>
  <div class="nav">
    <div class="top-banner" :class="{ 'show': $route.path !=='/' }">
      <a href="http://earthfestsingapore.com/">Visit the Earthfest {{year}} site <v-icon class='arrow' name="arrow-right"/></a>
    </div>
    <div class="global-earthlife-nav">
      <router-link :to="{ name: 'home' }">EARTHLIFE</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: function() {
    return {
      show: false
    };
  },
  components: {},
  computed: {
    year: function() {
      var today = new Date();
      return today.getFullYear();
    }
  }
};
</script>

<style scoped>
.top-banner {
  background-image: url(../assets/header_strip.jpg);
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  line-height: 25px;
  padding-left: 15%;
}

.top-banner a {
  color: #ffffff;
  text-decoration: none;
}

.arrow {
  margin-left: 8px;
  height: 12px;
}

.global-earthlife-nav {
  padding: 25px 15%;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: block;
}

.global-earthlife-nav a {
  text-decoration: none;
  padding: 16px; /* to increase the clickable area */
  color: #212b36;
  font-size: 16px;
  letter-spacing: 3px;
  line-height: 25px;
}
</style>

