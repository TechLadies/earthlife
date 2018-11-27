<template>
  <div class="steps">
    <div class="steps-containers">
      <div class="step1">
        <h1>Step 1</h1>
        <p>See how you're doing based on the 6 living habits of EarthLife</p>
        <router-link to="habits" class="button">Start Quiz <v-icon class='arrow' name="arrow-right"/></router-link>
      </div>
      <div class="step2">
        <h1>Step 2</h1>
        <p>Get some actions on how to level up your sustainable living!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'steps',
  components: {}
};
</script>

<style scoped>
.steps {
  background-color: #f4f6f8;
  text-align: left;
  background-image: url('../assets/Group 2.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100%;
  flex-grow: 1;
}

.steps-containers {
  padding: 15px 20px;
  line-height: 30px;
  font-weight: 500;
}

h1 {
  font-size: 14px;
  text-transform: uppercase;
  color: #637381;
  letter-spacing: 4.1px;
  font-weight: 500;
  line-height: 25px;
}

span {
  display: block;
}

.step1 {
  margin-top: 20px;
  padding: 20px 20px;
  background-color: #ffffff;
}

.step2 {
  padding: 20px 20px;
}

.button {
  display: inline-block;
  text-decoration: none;
  padding: 12px 50px 12px 42px;
  background-color: #4e4d86;
  color: white;
  border-radius: 50px;
  font-weight: normal;
  font-size: 16px;
}
.arrow {
  position: absolute;
  margin: -23px 0px 0px 85px;
}

@media (min-width: 600px) {
  .arrow {
    position: absolute;
    margin: -23px 0px 0px 85px;
  }

  .step1,
  .step2 {
    padding: 20px 34px;
  }

  .steps-containers {
    padding: 50px 25%;
    width: 100%;
    /* min-height: 100vh; */
    font-size: 20px;
  }
}

@media (max-width: 500px) {
  .steps {
    background-size: 260%;
  }
}
</style>
