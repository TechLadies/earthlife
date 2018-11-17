<template>
  <div class="question-wrapper">
    <ProgressBar :progress="question.progress"></ProgressBar>
  <a href="#/habits"><button class="back-menu">Return to menu</button></a>
    <div class="question">
      <div class="question-category">{{ question.title }}</div>
      <div class="question-text">{{ question.questionText }}</div>
      <img class="question-img" v-if="question.imageUrl != ''" :src="question.imageUrl"/>
        <div v-if="/single\s*choice/i.test(question.type)">
          <QuizSingleChoice :choices="question.answers" @answer="getAnswers" :key="question.id"></QuizSingleChoice>
        </div>
        <div v-else-if="/multiple\s*choice/i.test(question.type)">
          <QuizMultiChoice :choices="question.answers" @answer="getAnswers" :key="question.id"></QuizMultiChoice>
        </div> 
        <div v-else-if="/slider|scale/i.test(question.type)">
          <QuizSlider :choices="question.answers" :labeled="!(/u\w+d/i.test(this.question.type))" @answer="getAnswers" :key="question.id"></QuizSlider>
        </div> 

        <button class="submit-button" @click="submit" :disabled="!answered">
          <v-icon class="arrow" name="arrow-right"/>
        </button>

    </div>
    <div class="habit-tracker">
      <img class="habit-category" src="../assets/images/buttons/plant-based-diet.png">
      <img class="habit-category" src="../assets/images/buttons/zero-waste.png">
      <img class="habit-category" src="../assets/images/buttons/advocacy.png">
      <img class="habit-category" src="../assets/images/buttons/co2-positive.png">
      <img class="habit-category" src="../assets/images/buttons/minimalism.png">
      <img class="habit-category" src="../assets/images/buttons/biophilia.png">
    </div>
  </div>
</template>

<script>
import QuizSingleChoice from '@/components/QuizSingleChoice.vue';
import QuizMultiChoice from '@/components/QuizMultiChoice.vue';
import QuizSlider from '@/components/QuizSlider.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'Question',
  components: {
    QuizSingleChoice,
    QuizMultiChoice,
    QuizSlider,
    ProgressBar
  },
  data: function() {
    return {
      selected: 0,
      completed: ['plant-based', 'co2'],
      answers: []
    };
  },

  computed: {
    question: function() {
      let categorySlug = this.$route.params.category;
      let questionID = this.$route.params.id;
      let categories = this.$store.state.categories;
      let questionDetails = this.$store.state.questions;

      let category = categories.find(function(c) {
        return c.slug === categorySlug;
      });

      const categoryQuestion =
        questionDetails[category.questions[questionID - 1]];
      const categoryAnswers =
        questionDetails[category.questions[questionID - 1]].options;
      const numberOfQuestions = category.questions.length;
      const categoryProgress =
        100 * (Number(questionID) / category.questions.length);

      return {
        id: category.questions[questionID - 1],
        title: category.title,
        questionText: categoryQuestion.text,
        type: categoryQuestion.type,
        imageUrl: categoryQuestion.imageUrl,
        answers: categoryAnswers,
        progress: categoryProgress,
        lastQuestion: questionID == category.questions.length
      };
    },

    answered: function() {
      if (this.answers.length == 0) {
        return false;
      } else {
        return true;
      }
    },

    nextQuestionLink: function() {
      return String(Number(this.$route.params.id) + 1);
    },

    habitTracker: function() {}
  },

  methods: {
    getAnswers: function(answer) {
      console.log(answer);
      this.answers = answer;
    },

    submit: function() {
      console.log(this.answers);

      //Update value in store
      this.$store.state.questions[this.question.id].options.forEach(
        (option, index) => {
          const selected = this.answers.includes(index);
          this.$store.state.questions[this.question.id].options[
            index
          ].selected = selected;
        }
      );

      //store value is not updated in vue-devtools?
      console.log(
        this.$store.state.questions[this.question.id].options[0].selected
      );

      //Check if it's the last question
      if (this.question.lastQuestion) {
        let categories = this.$store.state.categories;
        let categorySlug = this.$route.params.category;

        let categoryIndex = categories.findIndex(function(c) {
          return c.slug == categorySlug;
        });

        this.$store.state.categories[categoryIndex].completed = true;

        this.$router.push({ name: 'result' });
      } else {
        //Go to next question
        this.$router.push({
          name: 'question',
          params: {
            category: this.$route.params.category,
            id: this.nextQuestionLink
          }
        });
      }
    }
  },

  created: function() {
    // this.getData();
  },

  watch: {}
};
</script>

<style scoped>
.question-img {
  margin-top: 48px;
  margin-bottom: 48px;
  max-width: 560px;
  width: 100%;
  display: block;
}

.back-menu {
  height: 50px;
  width: 160px;
  font-size: 16px;
  border-radius: 50px;
  margin-top: 50px;
  margin-left: 950px;
  padding: 0;
  background-color: white;
  border: none;
  color: #454f5b;
}

.question {
  max-width: 960px;
  padding: 0 36px;
  margin: 0 auto;
  margin-top: 70px;
}

.question-wrapper {
  background-repeat: no-repeat;
  background-position: right top;
  background-color: #f4f6f8;
  overflow: hidden;
  min-height: calc(100vh - 75px);
  padding-bottom: 100px;
  position: relative;
}

.question-category {
  color: #919eab;
  font-size: 12px;
  letter-spacing: 1.4px;
  line-height: 30px;
  text-transform: uppercase;
}

.question-text {
  max-width: 554px;
  color: #212b36;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
}

.submit-button {
  height: 52px;
  width: 52px;
  background-color: #4e4d86;
  color: white;
  border-radius: 10000px;
  margin: 60px auto 40px;
  cursor: pointer;
  display: block;
}

.submit-button[disabled] {
  opacity: 0.5;
  background-color: #4e4d86;
  cursor: default;
}

.arrow {
  padding-top: 5px;
}

.habit-tracker {
  margin-right: 36px;
  margin-bottom: 36px;
  float: right;
  /* margin-bottom: 36px;
  margin-top: 40px; */
  margin: 0 auto;
  padding: 20px;
  /* display: inline-block; */
  text-align: center;
  display: flex;
}

.habit-category {
  margin-left: 20px;
  filter: grayscale(100%);
  height: 65px;
  width: auto;
}

.habit-category.finished {
  width: 38px;
  height: auto;
  margin-left: 20px;
  filter: grayscale(0%);
}

@media (max-width: 900px) and (min-width: 600px) {
  .back-menu {
    top: 50px;
    right: 40px;
    transform: none;
    left: auto;
  }
}
@media (min-width: 900px) {
  .back-menu {
    top: 50px;
    right: 240px;
    transform: none;
    left: auto;
  }
}

@media (min-width: 600px) {
  .question-wrapper {
    background-image: url(../assets/other-3.png);
  }

  .habit-tracker {
    margin-right: 36px;
    margin-bottom: 36px;
    float: right;
  }

  .habit-category {
    width: 64px;
    /*height: auto;*/
    margin-left: 20px;
  }

  .habit-category.finished {
    width: 64px;
    height: auto;
    margin-left: 20px;
  }

  .submit-button {
    height: 52px;
    width: 52px;
    background-color: #4e4d86;
    color: white;
    border-radius: 10000px;
    margin: 60px 0 40px;
    cursor: pointer;
    /* display: block; */
  }
}

label {
  margin: 0;
  padding: 0;
}
</style>
