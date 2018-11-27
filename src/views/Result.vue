<template>
  <div id="result">
    <div class="not-fixed">
      <div class="result-header">Results</div>
      <img class="result-image" :src="require('../assets/images/result/' + bestCategory.slug + '.jpg')" v-if="bestCategory != undefined"/>
      <div class="buttons">
        <a class="social-buttons" :href="require('../assets/images/result/'+result.title+'.jpg')" :download="result.title+'.jpg'">
          <v-icon name="download"/>
        </a>
        <a class="social-buttons" @click="shareFacebook">
          <v-icon name="brands/facebook-f"/>
        </a>
      </div>
      <div class="result-text">Here's how you did</div>
      <div class="habits-columns">
        <div class="habit-wrapper" v-for="category in completedCategories">
              <img class="habit-img" :src="require('../assets/images/buttons/' + category.slug + '.png')"/>
              <div class="habit-name">{{category.title}}</div>
        </div> 
      </div>
      <div class="graph">
        <div class="graph-inner">
          <div class="habits-columns baseline">
            <div class="habit-wrapper" v-for="score in completedCategoryScore">
                <div v-bind:style="{ height: Math.abs(score) + '%'}" :class="{bar: true, positive: score > 0}"></div>
            </div>
          </div>
        </div> <!-- graph inner -->
      </div> <!--graph -->
      <div class="incomplete-box" v-if="uncompletedCategories.length > 0">
        <div class="incomplete-icon">
            <v-icon name="exclamation-circle" scale="2"/>
        </div>
        <div class="incomplete-box-inner">
          <div class="incomplete-box-title">
            <h2 class="incomplete-title-text">Oops! You didn't complete all 6 living habits.</h2>
          </div>
          <p class="incomplete-box-desc">Finish completing the remaining parts below:</p>
          <div class="button-wrapper">
            <div class="incomplete-habit-wrapper" v-for="category in uncompletedCategories">
              <router-link :to="{ path: `/habits/${category.slug}` }" class="incomplete-buttons">{{category.title}}</router-link>
            </div> 
          </div>
        </div>
      </div>
    </div>
    <div class="step2-rectangle">
      <div class="step2-inner">
        <span class="step2-text">STEP 2</span>
        <span class="step2-text-body">Get some actions on how to level up your sustainable living!</span>
      </div>
      <div class="get-actions-bttn">
        <button class="get-actions" @click="goToAction">Get actions<v-icon name="arrow-right" class="arrow-icon"/></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Result',
    components: {

    },
    computed: {
      completedCategories () {
        console.log(this.$store.getters.completedCategories);
        return this.$store.getters.completedCategories
      },
      bestCategory () {
        // const potato = this.$store.getters.completedCategories;
        return this.$store.getters.bestCategory;
      },
      uncompletedCategories () {
        return this.$store.getters.uncompletedCategories
      },
      completedCategoryScore () {
        return this.$store.getters.completedCategoryScore
      },
      result() {
        //Get the highest score
        const idx = this.completedCategoryScore.reduce(
          (bestIndex, currentValue, currentIndex, array) =>
            currentValue > array[bestIndex] ? currentIndex : bestIndex,
          0
        );

        const title = this.completedCategories[idx].slug;

        return {
          title: title
        };
      }
    },
    methods: {
      goToAction: function() {
        this.$router.push({ name: 'actions' });
      },
      shareFacebook: function() {
        const staticPage =
          'http://earthfestsingapore.com/earthlife/results/' +
          this.result.title +
          '.html';

        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' + staticPage,
          'pop',
          'width=600, height=400, scrollbars=no'
        );
      }
    }
  };
</script>

<style>
/* mobile first */
.not-fixed {
  position: inherit;
}

.habit-img {
  height: auto;
  width: 30px;
}

.result-header {
  padding-top: 32pt;
  font-size: 16pt;
  line-height: 25pt;
  text-align: center;
  color: #403E3D; 
  font-family: Poppins;    
  font-weight: 500;   
}

.result-text{
  padding-top: 40pt;
  margin-bottom: 24pt;
  color: #403E3D; 
  font-family: Poppins;   
  font-size: 24px;    
  font-weight: 500;   
  line-height: 35px;  
  text-align: center;
}

.buttons {
  text-align: center;
}

.social-buttons {
  margin: 10px;
  display: inline-block;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background-color: #DFE3E8;
  padding-top: 14px; 
  }

.habit-name {
  font-size: 6px;
  letter-spacing: 0.7px;
  color: #403E3D; 
  line-height: 30px;
  text-transform: uppercase; 
}

.habits-bar {
  padding: 0 20px;
}

.habit-wrapper {
  width: 130px;
}

.habits-columns {
  max-width: 320px;
  display: flex;
  text-align: center;
  justify-content: center;
  padding-top: 20px;
  margin: 0 auto;
  padding-bottom: 71.5px;
}

.result-image {
  width: 100%;
  padding-top: 32pt;
  padding-bottom: 24pt;
}

.bar {
  width: 30px;
  margin-left: -16px;
  background-color: #EE6F84;
  position: absolute;
  left: 50%;
  border-radius: 0 0 4px 4px;
}

.graph {
  padding-right: 16px;
  padding-left: 16px;
  margin-top: 30px;
  height: 315px;
  position: relative;
}

.graph-inner {
  width: 95%;
  position: absolute;
  top: 30%;  
}

.baseline {
  padding: 0;
  border: 0.5px solid #C4CDD5;
  height: 1px;
}

.baseline .habit-wrapper {
  position: relative;
  height: 200px;
}

.positive {
  bottom: 0;
  background-color: #70C48B;
  border-radius: 4px 4px 0 0;
  bottom: 100%;
}

.step2-rectangle {
  height: 25%;
  width: 100%;
  position: static;
  padding: 20px 15px 50px 50px;
  background-color: #F4F6F8;  
  box-shadow: 0 -1px 2px 0 rgba(0,0,0,0.05);
  bottom: 0;
  margin-top: 35px;
}

.step2-text {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 3.08px;
  color: #637381; 
  line-height: 25px;
  display: block;
}

.step2-text-body {
  font-size: 16px;
  line-height: 25px;
  max-width: 280px;
  color: #212B36;  
  font-weight: 500;    
}

.get-actions-bttn {
  padding: 0;
}

.get-actions {
  margin-top: 25px;
  color: white;
  font-size: 16px;
  border: none;
  transition: 0.5s;
  line-height: 25px;  
  height: 48px; 
  width: 165px; 
  border-radius: 24px;  
  background-color: #4E4D86;
  padding-right: 20px;
}

.get-actions:hover {
  background-color: #2b3174;
  cursor: pointer;
}

.arrow-icon {
  height: 14px;
  width: auto;
  padding-left: 10px;
  margin-top: 6px;
  position: absolute;
}

.incomplete-box {
  padding-bottom: 20px;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 6px; 
  background-color: #fdf8e7;
  width: auto;
}
.incomplete-buttons {
  border-radius: 24px;  
  background-color: #FFFFFF;
  color: #454F5B;
  margin-right: 12px;
  margin-bottom: 12px;
  display: inline-block;
  padding: 12px 20px;
  text-decoration: none;
}

.incomplete-icon {
  color: #9C6F19;
  position: absolute;
  left: 45%;
  margin-top: 20px;
}

.incomplete-title-text {
  font-size: 20px;
  text-align: center;
  line-height: 20px;
  color: #212B36;
  padding-top: 40px;
  padding-bottom: 12px;
  font-weight: 500;
  margin: 0;
}

.incomplete-box-desc {
  color: #212B36;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 32px;
  margin: 0;
}

.incomplete-box-inner {
  padding-top: 28px;
  padding-left: 72px;
  padding-right: 72px;
  text-align: center
}

button:focus {
  outline: 0;
}

/* tablet and desktop */
@media (min-width: 481px) {
  .not-fixed {
    position: absolute;
    width: 100%;
    padding-bottom: 200px;
  }

  .result-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45%;
    padding-top: 37px;
    padding-bottom: 37px;
  }

  .result-header {
    padding-top: 88.5px;
    color: #403E3D; 
    font-family: Futura;  
    font-size: 32px;  
    line-height: 42px;  
    text-align: center;
  }

  .result-text {
    color: #403E3D; 
    font-family: Poppins; 
    font-size: 24px;  
    font-weight: 500; 
    line-height: 35px;  
    text-align: center;
  }

  .habit-img {
    width: 65px;
    height: auto;
  }

  .habits-columns {
    display: flex;
    text-align: center;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 71.5px;
    width: 95%;
  }

  .habit-wrapper {
    width: 130px;
  }

  .habit-name {
    color: #403E3D; 
    font-size: 12px;  
    letter-spacing: 1.4px;  
    line-height: 30px;
    text-transform: uppercase;  
  }

  .habit-img {
    height: auto;
    width: 64px;
  }

  .graph { 
    margin-top: 50px;
    height: 400px;
    position: relative;
    width: 95%;
  }

  .graph-inner {
    position: absolute;
    top: 30%;
    width: 100%;
  }

  .baseline {
    padding: 0;
    border: 0.5px solid #C4CDD5;
    height: 1px;
  }

  .baseline .habit-wrapper {
    position: relative;
    height: 200px;
  }

  .bar {
    background-color: #EE6F84;
    position: absolute;
    width: 64px;
    left: 50%;
    margin-left: -32px;
    border-radius: 0 0 4px 4px;
  }

  .positive {
    bottom: 0;
    background-color: #70C48B;
    border-radius: 4px 4px 0 0;
    bottom: 100%;
  }

  .incomplete-box {
    margin-left: 25%;
    margin-right: 25%;
    position: relative;
  }

  .incomplete-icon {
    left: 5%;
    top: 5%;
  }

  .incomplete-box-inner {
    text-align: left;
  }

  .incomplete-title-text {
    text-align: left;
    padding-top: 15px;
  }

  .incomplete-habit-wrapper {
    display: inline-block;
  }

  .step2-rectangle { 
    width: 100%;
    max-height: 150px;
    padding-top: 45px;
    padding-left: 15%;
    padding-right: 15%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .step2-text {
    font-size: 16px; 
    letter-spacing: 4.1px; 
    
  }

  .step2-text-body {
    font-size: 20px; 
    line-height: 30px;   
  }

  .get-actions-bttn {
    margin-left: 20px;
    /*margin-top: -60px;*/
  }
}

/* tablet */
/*@media only screen and (min-width : 768px) and (max-width: 1023px) {
  .habits-columns {
    width: 95%;
  }

  .step2-text-body {
    font-size: 16px;
  }

  .get-actions-bttn {
    margin-left: 500px;
  }
}*/
</style>
