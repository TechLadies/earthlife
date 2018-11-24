
<template>
  <div class="home">
    <div class ="main">
      <div class="slogan">
        <h1 class="text">Discover happiness through responsible living</h1>
      </div>
      <div class="button-start">
        <router-link to="steps"><button class="start">Start</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
};
</script>

<style type="text/css" scoped>
.home {
  display: static;
}

.arrow {
  margin-left: 8px;
  height: 12px;
}

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

.main {
  background-image: url(../assets/cover.png);
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100vh;
}

a {
  color: black;
}

a:hover {
  color: lightgrey;
}

.slogan {
  padding-top: 54px;
}

.text {
  margin: 0 auto;
  width: 75%;
  color: #212b36;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: -0.25px;
  line-height: 45px;
}

.button-start {
  padding-left: 15%;
}

.start {
  border-radius: 30px;
  background-color: #4e4d86;
  color: white;
  font-size: 16px;
  margin: 36px 0;
  height: 48px;
  width: 160px;
  /* padding: 12px 60px; */
  border: none;
  transition: 0.5s;
}

.start:hover {
  background-color: #2b3174;
  cursor: pointer;
}

button:focus {
  outline: 0;
}

@media only screen and (min-width: 700px) {
  .main {
    background-size: 160%;
    height: calc(100vh - 120px);
  }

  .text {
    margin: 0px;
    padding-top: 0;
    padding-left: 15%;
    width: 50%;
    color: #212b36;
    font-size: 5.5vw;
    font-weight: bold;
    letter-spacing: -0.5px;
    line-height: 6vw;
  }

  .start {
    font-size: 16px;
    padding: 12px 60px;
    margin: 20px 0;
  }
}
</style>
