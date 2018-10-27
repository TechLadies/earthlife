<template>
<div>
  <div class="wrapper">
    <div class="back-button">
      <v-icon name="arrow-left"/>
      <a href="#/results">Results</a>
    </div>
  </div>
    <div class="actions-intro-message" v-if="showIntroMessage">
      <p>Earth is about the daily actions that enables responsible living.</p>        
      <p>Based on your responses, we've complied a list of actions you can do in Singapore...</p>
      <button class="next" @click="changePage"><v-icon class="next-content" name="arrow-right"/></button>
    </div>
    <div class="actions-pledge" v-else>
      <div class="no">
        <input type="radio" id="no" name="action" value="no" />
        <p class="label" for="no">Not Now 
        <br>
        <v-icon name="arrow-left"/></p>
      </div>
      <div class="cards">
        <div class="pink-card">
          <div class="inner-card">
            <h1>S Zero Waste</h1>
            <hr/>
            <p>Grab a resuseable straw and takeaway container with cutlery</p>
          </div>
        </div>
        <div class="orange-card"></div>
        <div class="green-card"></div>
      </div>
      <div class="yes">
        <input type="radio" id="yes" name="action" value="yes" />
        <p class="label" for="yes">I'll Do It 
        <br>
        <v-icon name="arrow-right"/></p>
      </div>
      </div>
  </div>
</div>
</template>

<script type="text/javascript">


export default {
    name: 'actions',
    components: {
   },
    data: function() {
    return {
      showIntroMessage: true,
    }
  },
  methods: {
    changePage: function() {
      this.showIntroMessage = !this.showIntroMessage
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding-top: 100px;
  margin: 0 auto;
}

input[type="radio"]{
	display:none;
}

.back-button{
  padding: 0 150px;
  color: #919EAB;
  font-family: Poppins;
  font-size: 20px;
}

.back-button a{
  text-decoration: none;
  color: #919EAB;
  padding-left: 8px;
}

.next {
  background-color: #4E4D86;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  color: white;
  margin: 0 auto;
}

.next-content {
  padding-top: 3px;
  
}

.actions-intro-message { /* thing to center */
  font-size: 1.5em;
  margin: auto;
  width: 50%;
  text-align: center;
  font-weight: 500;
  color: #403E3D;
  padding-top: 100px;
}

.actions-pledge {;
  text-align: center;
  display: flex;
  flex-direction: row;
}

.cards {
  position: relative;
  margin-top: 18px;
  margin: 0 75px;
}

.pink-card {
  background-color: #D45C86;
  width: 340px;
  height: 490px;
  border-radius: 10px;
  transform: rotate(2deg);
  z-index: 5;
  position: absolute;
}

.inner-card {
  background-color: white;
  margin-top: 20px;
  width: 300px;
  height: 450px;
  margin-left: 20px;
}

.inner-card h1 {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 100;
  padding-top: 27px;
  letter-spacing: 3px;
}

.inner-card p {
  margin: 0 auto;
  font-size: 20px;
  margin-top: 250px;
  padding-left: 20px;
  padding-right: 20px;
}

hr {
  width: 24px;
}
.green-card {
  position: absolute;
  background-color: #53B687;
  width: 340px;
  height: 490px;
  border-radius: 10px;
  padding-top: 10px;
}

.orange-card {
  position: absolute;
  background-color: #F2A069;
  width: 340px;
  height: 490px;
  border-radius: 10px;
  transform: rotate(-3deg);
}

.no, .yes {
  width: 136px;
  height: 136px;
  border-radius: 200px;
  border: 1px solid #979797;
  margin-top: 238px;
}

.no {
  margin-left: 290px;
}

.yes {
  margin-left: 330px;
}

.label {
  margin-top: 50px;
}


@media only screen and (max-width: 800px) {
  .actions-intro-message {
    width: 90%;
    padding-top: 80px;
  }

/* Remove back button in mobile screen. Pending design*/
  .wrapper {
    display: none; 
  }

}
</style>