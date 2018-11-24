<template>
  <div class="category-desc">
    <div class="back">
      <v-icon name="arrow-left"/>
      <a href="#/habits">Back</a>
    </div>
    <div class="wrapper">
      <div class="wrapper-image">
        <img v-bind:src="imgSrc">
      </div>
      <div class="wrapper-content">
        <h1 class="title">{{ title }}</h1>
        <p class="description">{{description}}</p>
        <router-link :to="{ name: 'question', params: { category: this.$route.params.category, id: 1 }}">
          <button class="startButton"><v-icon name="arrow-right" scale="1"/></button>
        </router-link>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'category',
  props: {
    title: String,
    description: String,
    imgSrc: String
  }
};
</script>

<style scoped>
.category-desc {
  padding: 0 36px 0;
  height: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.back {
  height: 22px;
  width: 104px;
  color: #919eab;
  font-family: Poppins;
  font-size: 20px;
  line-height: 22px;
  margin-bottom: 50px;
}

.back a {
  text-decoration: none;
  color: #919eab;
  padding-left: 8px;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.wrapper-content {
  margin-top: 20px;
}

.wrapper-image {
  margin: 0 auto;
}

.wrapper-image img {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.title {
  height: auto;
  color: #212b36;
  font-family: Poppins;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: -2px;
  line-height: 48px;
  margin: 0;
}

.description {
  color: #637381;
  font-family: Poppins;
  font-size: 16px;
  line-height: 24px;
}

@media only screen and (min-width: 650px) {
  .wrapper {
    flex-direction: row;
  }

  .wrapper-content {
    width: 50%;
    margin: 0 auto;
  }

  .wrapper-image {
    width: 50%;
    order: 1;
    margin: auto;
  }

  .title {
    font-size: 52px;
    letter-spacing: -2px;
    line-height: 83px;
    margin: 0;
  }

  .description {
    font-size: 24px;
    line-height: 36px;
  }
}

.startButton {
  height: 52px;
  width: 52px;
  background-color: #4e4d86;
  color: white;
  border-radius: 10000px;
  margin-top: 20px;
  padding-top: 5px;
  border: none;
  cursor: pointer;
}
</style>