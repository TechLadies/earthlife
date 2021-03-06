<template>
  <div class="question-wrapper">
    <ProgressBar :progress="question.progress"></ProgressBar>
    <router-link to="/habits" class="back-menu">Return to menu</router-link>
    <div class="question">
      <div class="question-category">{{ question.title }}</div>
      <transition name="fade" mode="out-in"><div class="question-text" :key="question.questionText">{{ question.questionText }}</div></transition>
      <transition name="fade" mode="out-in"><img class="question-img" v-if="question.imageUrl != ''" :src="question.imageUrl" :key="question.questionText"/></transition>
      <transition name="fade" mode="out-in">
        <a class="question-link" v-if="question.linkTitle != ''" :href="question.linkUrl" :key="question.questionText" target="_blank">
          <v-icon name="arrow-right"/>
          {{question.linkTitle}}
        </a>
      </transition>

      <div v-if="/single\s*choice/i.test(question.type)">
        <transition name="fade" mode="out-in">
          <QuizSingleChoice :choices="question.answers" @answer="getAnswers" :key="question.id"></QuizSingleChoice>
        </transition>
      </div>
      <div v-else-if="/multiple\s*choice/i.test(question.type)">
        <transition name="fade" mode="out-in">
          <QuizMultiChoice :choices="question.answers" @answer="getAnswers" :key="question.id"></QuizMultiChoice>
        </transition>
      </div>
      <div v-else-if="/slider|scale/i.test(question.type)">
        <transition name="fade" mode="out-in">
          <QuizSlider :choices="question.answers" :labeled="!(/u\w+d/i.test(this.question.type))" @answer="getAnswers" :key="question.id"></QuizSlider>
        </transition>
      </div>

      <transition name="fade" mode="out-in">
        <button class="submit-button" @click="submit" :disabled="!answered" :key="question.questionText">
          <v-icon class="arrow" name="arrow-right"/>
        </button>
      </transition>

    </div>
    <div class="habit-tracker">
      <img class="habit-category" src="../assets/images/buttons/plant-based-diet.png" :class="{'finished' : this.checkCompleted[0]}">
      <img class="habit-category" src="../assets/images/buttons/zero-waste.png" :class="{'finished' : this.checkCompleted[1]}">
      <img class="habit-category" src="../assets/images/buttons/advocacy.png" :class="{'finished' : this.checkCompleted[2]}">
      <img class="habit-category" src="../assets/images/buttons/co2-positive.png" :class="{'finished' : this.checkCompleted[3]}">
      <img class="habit-category" src="../assets/images/buttons/minimalism.png" :class="{'finished' : this.checkCompleted[4]}">
      <img class="habit-category" src="../assets/images/buttons/biophilia.png" :class="{'finished' : this.checkCompleted[5]}">
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
    ProgressBar,
  },
  data: function() {
    return {
      selected: 0,
      completed: ['plant-based', 'co2'],
      answers: [],
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
        lastQuestion: questionID == category.questions.length,
        linkTitle: categoryQuestion.linkTitle,
        linkUrl: categoryQuestion.linkUrl,
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

    completedCategories() {
      return this.$store.getters.completedCategories;
    },

    checkCompleted() {
      const completed = this.$store.state.categories.map(category => {
        return this.$store.getters.completedCategories.includes(category);
      });

      return completed;
    },
  },

  methods: {
    getAnswers: function(answer) {
      this.answers = answer;
    },

    submit: function() {
      //Update value in store
      this.$store.state.questions[this.question.id].options.forEach(
        (option, index) => {
          const selected = this.answers.includes(index);
          this.$store.state.questions[this.question.id].options[
            index
          ].selected = selected;

          if (option.removeAction != '') {
            if (selected) {
              //Add to removedAction list
              this.$store.commit('addToRemoveActionList', option.removeAction);
            } else {
              //Delete from removedAction list
              this.$store.commit(
                'deleteFromRemoveActionList',
                option.removeAction,
              );
            }
          }

          let removeAction = this.$store.state.questions[this.question.id]
            .options[index].removeAction;
          if (
            this.$store.state.questions[this.question.id].options[index]
              .selected == true &&
            removeAction.charAt(0) == 'A'
          ) {
            this.$store.state.actionRemoveList.push(removeAction);
          }
        },
      );

      //Check if it's the last question
      if (this.question.lastQuestion) {
        //Check if it's the last category
        if (this.$store.getters.completedCategories.length == 6) {
          this.$router.push({ name: 'result' });
        } else {
          this.$router.push({ name: 'habits' });
        }
      } else {
        //Go to next question
        this.$router.push({
          name: 'question',
          params: {
            category: this.$route.params.category,
            id: this.nextQuestionLink,
          },
        });
      }
    },
  },

  created: function() {
    // this.getData();
  },

  watch: {},
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.2s ease-out;
}

.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.question-img {
  margin-top: 48px;
  margin-bottom: 48px;
  max-width: 560px;
  width: 100%;
  display: block;
}

.question-link {
  font-size: 24px;
  color: #919eab;
  text-decoration: none;
  margin-top: 20px;
  display: block;
}

.back-menu {
  height: 50px;
  width: 160px;
  font-size: 16px;
  border-radius: 50px;
  bottom: 50px;
  padding: 0;
  background-color: white;
  border: none;
  color: #454f5b;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  text-align: center;
  text-decoration: none;
  line-height: 50px;
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
  flex-grow: 1;
  padding-bottom: 0px;
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
  border: none;
  padding-top: 5px;
}

.submit-button[disabled] {
  opacity: 0.5;
  background-color: #4e4d86;
  cursor: default;
}

.habit-tracker {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.habit-category {
  width: 36px;
  height: auto;
  margin-left: 10.5px;
  filter: grayscale(100%);
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

  .question-wrapper {
    background-image: url(../assets/other-3.png);
  }
}

@media (max-width: 600px) {
  .question-wrapper {
    padding-bottom: 100px;
  }
}

@media (min-width: 600px) {
  .habit-tracker {
    margin-right: 36px;
    margin-bottom: 36px;
    float: right;
  }

  .habit-category {
    width: 64px;
    height: auto;
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
  }
}

label {
  margin: 0;
  padding: 0;
}
</style>
