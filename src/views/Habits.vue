<template>
  <div class="habits">
    <p class="heading1">Choose a living habit</p>
    <ol class="center">
      <li>
        <a href="#/habits/plant-based-diet"><img src="../assets/plantbased.png" />
        <p>Plant Based Diet</p></a>
      </li>
      <li>
        <a href="#/habits/zero-waste"><img src="../assets/zerowaste.png" />
        <span>Zero Waste</span></a>
      </li>
      <li>
        <a href="#/habits/biophilia"><img src="../assets/biophilia.png" />
        <span>Biophilia</span></a>
      </li>
      <li>
        <a href="#/habits/advocacy"><img src="../assets/advocacy.png" />
        <span>Advocacy</span></a>
      </li>
      <li>
        <a href="#/habits/minimalism"><img src="../assets/minimalism.png" />
        <span>Minimalism</span></a>
      </li>
      <li>
        <a href="#/habits/co2-positive"><img src="../assets/copositive.png" />
        <span>CO2 Positive</span></a>
      </li>
    </ol>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'habits',
    components: {
    }
  }
</script>

<style type="text/css" scoped>
.habits {
  width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: contain;
}

.heading1 {
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  text-align: center;
  margin: 0 24px 75px 24px;
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
}

@media (min-width: 500px) {
  .habits {
    background-image: url("../assets/other-1.png");
    margin: auto;
    background-size: 50% auto;
  }

  ol {
    display: flex;
    flex-wrap: wrap;
    margin: 50px auto;
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