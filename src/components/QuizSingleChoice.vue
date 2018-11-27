<template>
  <div class="quiz-single">
    <div v-for="answer in choices">
      <input type="radio" :id="answer.text" name="answer"
        :value="answer.text" v-model="inputSelected" />
      <label class="question-answer" :for="answer.text" :class="{ 'answer-selected': inputSelected == answer.text}">{{ answer.text }}</label>
    </div>
  </div>     
</template>

<script>
export default {
  name: 'QuizSingleChoice',
  props: {
    // category: String,
    // question: String,
    choices: Array
  },
  data: function() {
    const selected = [];
    const indexSelected = [];

    this.choices.forEach((choice, index) => {
      if (choice.selected == true) {
        selected.push(choice.text);
        indexSelected.push(index);
      }
    });

    this.$emit('answer', indexSelected);

    return {
      inputSelected: selected
    };
  },
  watch: {
    inputSelected: function(newAnswer) {
      var answers = [];
      var index = this.choices.findIndex(x => x.text == newAnswer);
      answers.push(index);

      this.$emit('answer', answers);
    }
  }
};
</script>

<style scoped>
input[type='radio'] {
  display: none;
}

.question-answer {
  margin-top: 20px;
  padding: 24px;
  max-width: 560px;
  color: #212b36;
  font-size: 16px;
  line-height: 22px;
  background-color: white;
  display: block;
}

.question-answer:hover {
  cursor: pointer;
}

.answer-selected {
  background-color: #4e4d86;
  color: white;
  transition-property: background-color;
  transition-duration: 0.3s;
}
</style>