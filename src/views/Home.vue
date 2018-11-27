
<template>
    <div class ="main">
      <div class="slogan">
        <h1 class="text">Discover happiness through responsible living</h1>
      </div>
      <div class="button-start">
        <router-link to="steps"><button class="start">Start</button></router-link>
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
.main {
  background-image: url(../assets/cover.png);
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
}

.slogan {
  padding-top: 54px;
}

.text {
  margin: 0px;
  padding-top: 0;
  padding-left: 15%;
  width: 50%;
  color: #212b36;
  font-size: 60px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 100%;
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
  border: none;
  transition: 0.5s;
}

.start:hover {
  background-color: #2b3174;
  cursor: pointer;
}

@media only screen and (max-width: 500px) {
  .text {
    font-size: 40px;
  }

  .main {
    background-size: 100vh;
  }
}
</style>
