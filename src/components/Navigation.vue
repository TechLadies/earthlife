<template>
  <div class="nav">
    <div class="top-banner" :class="{ 'show': $route.path !=='/' }">
      <a href="http://earthfestsingapore.com/">Visit the Earthfest 2018 site <v-icon class='arrow' name="arrow-right"/></a>
    </div>
    <div class="global-earthlife-nav">EARTHLIFE
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: {
    show: false
  },
  components: {
  },
}
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
</style>

