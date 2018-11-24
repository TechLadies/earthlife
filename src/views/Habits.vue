<template>
  <div class="habits">
    <p class="heading1">Choose a living habit</p>
    <ol class="center">
      <li>
        <a href="#/habits/plant-based-diet" >
          <img src="../assets/plantbased.png" :class="{'completed' : this.checkCompleted[0]}"/>
          <p>Plant Based Diet</p>
          <v-icon class="check" name="check-circle" v-show="this.checkCompleted[0]"/>
        </a>
        
      </li>
      <li>
        <a href="#/habits/zero-waste">
          <img src="../assets/zerowaste.png" :class="{'completed' : this.checkCompleted[1]}"/>
          <span>Zero Waste</span>
          <v-icon class="check" name="check-circle" v-show="this.checkCompleted[1]"/>
        </a>
      </li>
      <li>
        <a href="#/habits/biophilia">
          <img src="../assets/biophilia.png" :class="{'completed' : this.checkCompleted[2]}"/>
          <span>Biophilia</span>
          <v-icon class="check" name="check-circle" v-show="this.checkCompleted[2]"/>
        </a>
      </li>
      <li>
        <a href="#/habits/advocacy">
          <img src="../assets/advocacy.png" :class="{'completed' : this.checkCompleted[3]}"/>
          <span>Advocacy</span>
          <v-icon class="check" name="check-circle" v-show="this.checkCompleted[3]"/>
        </a>
      </li>
      <li>
        <a href="#/habits/minimalism">
          <img src="../assets/minimalism.png" :class="{'completed' : this.checkCompleted[4]}"/>
          <span>Minimalism</span>
          <v-icon class="check" name="check-circle" v-show="this.checkCompleted[4]"/>
        </a>
      </li>
      <li>
        <a href="#/habits/co2-positive">
          <img src="../assets/copositive.png" :class="{'completed' : this.checkCompleted[5]}"/>
          <span>CO2 Positive</span>
          <v-icon class="check" name="check-circle" v-show="this.checkCompleted[5]"/>
        </a>
      </li>
    </ol>

    <button class="btn-skip" @click="skipToResult" v-show="!this.completedCategories.length == 0">
      Skip to results
    </button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'habits',
  components: {},
  computed: {
    completedCategories() {
      return this.$store.getters.completedCategories;
    },
    checkCompleted() {
      const completed = this.$store.state.categories.map(category => {
        return this.$store.getters.completedCategories.includes(category);
      });

      return completed;
      // return [true, true, false, false, true, false]; //dummy
    }
  },
  methods: {
    skipToResult() {
      this.$router.push({ name: 'result' });
    }
  }
};
</script>

<style type="text/css" scoped>
.habits {
  width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: contain;
  padding-bottom: 38px;
}

.heading1 {
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  text-align: center;
  margin: 5% auto;
}

span {
  font-size: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  display: block;
}

img {
  width: 230px;
}

ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

section {
  padding: 92px 0;
}

li {
  width: 50%;
  text-align: center;
  position: relative;
}

li img {
  width: 60%;
}

a {
  text-decoration: none;
  color: black;
}

.center {
  text-align: center;
  margin: 0% auto;
}

.completed {
  opacity: 0.3;
}

.check {
  width: 32px;
  height: 32px;
  opacity: 0.7;
  position: absolute;
  top: 18%;
  left: 42%;
}

.btn-skip {
  width: 164px;
  height: 48px;
  border: 1px solid #454f5b;
  border-radius: 24px;
  background-color: #ffffff;
  color: #454f5b;
  font-family: Poppins;
  font-size: 16px;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

@media (min-width: 650px) {
  .habits {
    background-image: url('../assets/other-1.png');
    background-size: auto;
    min-height: calc(100vh - 75px);
  }

  ol {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    width: 700px;
  }

  li {
    width: 33%;
    box-sizing: border-box;
    margin-bottom: 50px;
  }

  li img {
    width: 70%;
  }
}
</style>