<template>
<div class="actions">
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
    <div class="options-wrapper">
      <div class="options">
        <button  @click="result(0)" class="no option-button" :disabled="buttonDisable"><span class="label">Not Now</span>
          <br>
          <v-icon class="gray" name="arrow-left"/>
        </button>
        <button @click="result(1)" class="yes option-button" :disabled="buttonDisable"><span class="label">I'll Do It</span>
          <br>
          <v-icon class="gray" name="arrow-right"/>
        </button>
      </div>
    </div>
      <div class="cards">
        <card 
          v-for="(actionItem, index) in actions.item" 
          ref="cardRef"
          :key=index+1
          :actionItem=actionItem 
          :index=index
          :class="{'is-current': (index == 0)}"
          @nextItem=nextItem
          
        />
    </div>
    
  </div>
</div>
</template>

<script type="text/javascript">
import card from '../components/Card.vue';

export default {
  name: 'actions',
  components: { card },
  data: function() {
    this.$store.state.actionTodo = [];

    let actionRemoveList = this.$store.state.actionRemoveList;
    this.$store.state.completedCategoriesListing = this.$store.getters.completedCategories.map(
      category => category.title
    );

    let showActionItem = [];

    showActionItem = this.$store.state.actionList
      .filter(action => {
        // this.$store.state.completedCategoriesListing.includes(item.category)
        let showAction = false;
        //Check if the action category is in the store's "completedCategories" array
        this.$store.getters.completedCategories.forEach(completedCategory => {
          if (
            completedCategory.title.toLowerCase() ==
            action.category.toLowerCase()
          ) {
            showAction = true;
          }
        });

        return showAction;
      })
      .flatMap(category => category.actions)
      .filter(action => !actionRemoveList.includes(action.id));

    let completedCategory = this.$store.state.completedCategoriesListing;
    let cards = [];

    if (this.actionCounter % 3 === 0) {
      cards = ['red', 'orange', 'green'];
    } else if (this.actionCounter % 3 === 1) {
      cards = ['green', 'red', 'orange'];
    } else if (this.actionCounter % 3 === 2) {
      cards = ['orange', 'green', 'red'];
    }

    return {
      showIntroMessage: true,
      categoryCounter: 0,
      actionCounter: 0,
      incompleteActionList: true,
      actions: {
        item: showActionItem,
        actionRemoveList: actionRemoveList,
        completedCategory: completedCategory,
        cardsOrder: cards
      },
      buttonDisable: false
    };
  },
  computed: {
    cardType() {
      return 'green';
    }
  },

  methods: {
    changePage: function() {
      this.showIntroMessage = !this.showIntroMessage;
    },
    nextItem: function() {
      this.buttonDisable = true;

      if (this.actions.item.length > 1) {
        setTimeout(() => {
          this.actions.item.pop();
          this.buttonDisable = false;
        }, 500);
      } else {
        setTimeout(() => {
          this.$router.push({ name: 'todo' });
        }, 500);
      }
    },
    result(value) {
      this.$refs.cardRef[this.actions.item.length - 1].resultCard(value);
    }
  }
};
</script>

<style scoped>
.actions {
  overflow: hidden;
  height: calc(100vh - 75px);
}

.card:nth-child(4n) {
  border: solid 20px #f2a069;
  background-color: white;
}

.card:nth-child(4n + 1) {
  border: solid 20px #79c19b;
  background-color: white;
}

.card:nth-child(4n + 2) {
  border: solid 20px #da7c99;
  background-color: white;
}

.card:nth-child(4n + 3) {
  border: solid 20px #9691b4;
  background-color: white;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  /* font: inherit; */
  cursor: pointer;
  outline: inherit;
}

.options-wrapper {
  text-align: center;
  width: 100%;
  height: 490px;
  position: absolute;
  position: absolute;
  top: 0;
}

.options {
  margin: 0 auto;
  position: relative;
  max-width: 840px;
}

.wrapper {
  margin: 0 auto;
  padding: 0 20px;
}

input[type='radio'] {
  display: none;
}

.back-button {
  color: #919eab;
  font-family: Poppins;
  font-size: 20px;
  padding-left: 60px;
  padding-top: 30px;
}

.back-button a {
  text-decoration: none;
  color: #919eab;
}

.next {
  background-color: #4e4d86;
  width: 52px;
  height: 52px;
  border-radius: 100px;
  color: white;
  margin: 0 auto;
  padding-top: 5px;
  margin-bottom: 40px;
}

.actions-intro-message {
  font-size: 1.5em;
  margin: auto;
  width: 50%;
  text-align: center;
  font-weight: 500;
  color: #403e3d;
  padding-top: 100px;
}

.actions-pledge {
  text-align: center;
  position: relative;
  margin: 50px auto 0;
}

.cards-wrapper {
  max-width: 420px;
  height: 490px;
  margin: 0 auto;
  padding: 0 40px;
}

.cards {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  background-color: white;
}

.current-card {
  position: absolute;
  width: 100%;
}

.current-card-image {
  width: 60%;
  margin-top: 30px;
}

.current-card h1 {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 100;
  padding-top: 27px;
  letter-spacing: 3px;
}

.current-card-message {
  margin: 0 auto;
  font-size: 17px;
  margin-bottom: 0px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0 5px;
}

hr {
  width: 24px;
}
.no,
.yes {
  width: 150px;
  height: 150px;
  border-radius: 200px;
  border: 1px solid #979797;
  font-size: 13px;
  margin-top: 20%;
  transition: transform 0.5s;
}

.no {
  z-index: 20 !important;
  position: absolute;
  left: 16px;
  display: inline-block;
}

.yes {
  z-index: 20 !important;
  position: absolute;
  right: 16px;
  display: inline-block;
}

.label {
  margin-top: 10px !important;
  display: inline-block;
}

.back-button a {
  padding-left: 5px;
}

.option-button:hover {
  background-color: #f8f8f8;
  opacity: 0.8;
  transform: scale(1.5);
}

.add-space {
  height: 13em;
}

@media only screen and (max-width: 800px) {
  .actions-intro-message {
    width: 90%;
    padding-top: 50px;
  }

  .add-space {
    height: 10em;
  }

  .label {
    margin-top: 10px !important;
  }

  .options-wrapper {
    height: 336px;
  }

  .option-button:hover {
    transform: scale(1);
  }

  .cards-wrapper {
    width: 317px;
    height: 336px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .current-card h1 {
    font-size: 9.59px;
  }

  .current-card p {
    font-size: 13.7px;
  }

  .no,
  .yes {
    width: 120px;
    height: 120px;
    border: 1px solid #c4cdd5;
    z-index: 20px;
  }

  .label {
    margin-top: 45px;
  }

  .gray {
    color: #919eab;
  }

  .back-button {
    font-size: 16px;
  }

  .no,
  .yes {
    margin-top: 30%;
  }
}
</style>