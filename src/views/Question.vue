<template>
  <div class="question-wrapper">
    <div class="question">
      <div class="question-category">{{ question.title }}</div>
      <div class="question-text">{{ question.questionText }}</div>
        <div v-if="question.type === 'Single choice'">
          <QuizSingleChoice :choices="question.answers" @answering="select"></QuizSingleChoice>
        </div>
        <div v-else-if="question.type === 'Multiple choice'">
          <QuizMultiChoice :choices="question.answers"></QuizMultiChoice>
        </div> 

        <button class="submit-button" @click="submit" :disabled="!answered">
          <v-icon name="arrow-right"/>
        </button>

    </div>
    <div class="habit-tracker">
      <img class="habit-category" src="../assets/images/buttons/plant-based.png">
      <img class="habit-category" src="../assets/images/buttons/zero-waste.png">
      <img class="habit-category" src="../assets/images/buttons/advocacy.png">
      <img class="habit-category" src="../assets/images/buttons/co2.png">
      <img class="habit-category" src="../assets/images/buttons/minimalism.png">
      <img class="habit-category" src="../assets/images/buttons/biophilia.png">
    </div>
  </div>
</template>

<script>

import QuizSingleChoice from '@/components/QuizSingleChoice.vue'
import QuizMultiChoice from '@/components/QuizMultiChoice.vue'
import QuizSlider from '@/components/QuizSlider.vue'

  export default{
   name: 'Question',
   components: {
     QuizSingleChoice,
     QuizMultiChoice,
     QuizSlider
   },
   data: function(){
    return {
     selected: 0,
     completed: ['plant-based', 'co2'],
     inputSelected: []
   }
 },

 computed: {
  question: function() {
    let categorySlug = this.$route.params.category;
    let questionID = this.$route.params.id;
    let categories = this.$store.state.categories; 
    let questionDetails = this.$store.state.questions;

    let category = categories.find(function(c){
      return c.slug === categorySlug;
      
    });

    let categoryQuestion = questionDetails[category.questions[questionID-1]];
    let categoryAnswers = questionDetails[category.questions[questionID-1]].options;

    return {
      id: category.questions[questionID-1],
      title: category.title,
      questionText: categoryQuestion.text,
      type: categoryQuestion.type,
      answers: categoryAnswers
    };
  },

  answered: function() {
    if (this.inputSelected.length == 0) {
      return false;
    }
    else {
      return true;
    }
    
  },

  nextQuestionLink: function() {
    return String(Number(this.$route.params.id)+1)
  },

  habitTracker: function() {

  }

},

methods: {
  select: function(answer){
    console.log(answer);
    this.inputSelected = answer;
  },

  submit: function(){
    console.log(this.inputSelected);

    this.inputSelected.forEach(a => {
      //Update the value in store
      this.$store.state.questions[this.question.id].options[a].selected = true;
    })

    //store value is not updated in vue-devtools?
    //console.log(this.$store.state.questions[this.question.id].options[0].selected);

    this.inputSelected = []; //clear memory

    //Go to next question
    this.$router.push({ name: 'question', params: { category: this.$route.params.category, id: this.nextQuestionLink}});
  }
},

created: function(){
  // this.getData();
},


watch:{
    '$route'(to, from){   //watch url change
     // this.getData();
   }

 }
}

</script>

<style scoped>
.question {
  max-width: 960px;
  padding: 0 36px;
  margin: 0 auto;
  margin-top: 218px;
}

.question-wrapper {
  background-image: url(../assets/other-3.png);
  background-repeat: no-repeat;
  background-position: right top;
  background-color: #DFE3E8; 
  overflow: hidden;
  padding-bottom: 200px;
}

.question-category {
  color: #919EAB;
  font-size: 12px;
  letter-spacing: 1.4px;
  line-height: 30px;
  text-transform: uppercase;
}

.question-text {
  max-width: 554px;
  color: #212B36;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
}

.submit-button{
  height: 52px;
  width: 52px;
  background-color: #4E4D86;
  color: white;
  border-radius: 10000px;
  margin-top: 60px;
  cursor: pointer;
}

.submit-button[disabled] {
  opacity: 0.5;
  background-color: #4E4D86;
  cursor: default;
}

.habit-tracker {
  margin-right: 36px;
  margin-bottom: 36px;
  float: right;
}

.habit-category {
  width: 64px;
  height: auto;
  margin-left: 20px;
  filter: grayscale(100%);
}

.habit-category.finished {
  width: 64px;
  height: auto;
  margin-left: 20px;
  filter: grayscale(0%);
}

label {
  margin: 0;
  padding: 0;
}
</style>
