<template>
  <div class="quiz-slider">
    <input type="range" min="0" :max="choices.length-1" v-model="inputSelected" @click="answer"/>
    <div class="range-label">
      <div class="range-point" v-for="choice in formattedChoices">{{choice.text}}</div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'QuizSlider',
  props: {
    // category: String,
    // question: String,
    choices: Array,
    labeled: Boolean
  },
  data: function() {
    let selected = '0';
    const indexSelected = [];
    let _choices = [];

    this.choices.forEach((choice, index) => {
      if (choice.selected == true) {
        selected = index;
        indexSelected.push(index);
      }

      /* For unlabeled slider, change text to empty string except the first and the last */
      if (!this.labeled && index != 0 && index != this.choices.length - 1) {
        let _choice = choice;
        _choice.text = '';
        _choices.push(_choice);
      } else {
        _choices.push(choice);
      }
    });

    this.$emit('answer', indexSelected);
    return {
      inputSelected: selected,
      formattedChoices: _choices
    };
  },

  watch: {
    inputSelected: function(newAnswer, oldAnswer) {
      this.$emit('answer', newAnswer);
    }
  },

  methods: {
    answer() {
      this.$emit('answer', this.inputSelected);
    }
  }
};
</script>

<style>
.quiz-slider {
  margin-top: 60px;
  max-width: 500px;
  position: relative; /*for the input::after*/
}

input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  margin: 0px;
  position: relative;
  z-index: 10;
}

input[type='range']:focus {
  outline: none; /* Removes the blue border. */
}

/*To hide the edge of the input range*/
input[type='range']::before,
input[type='range']::after {
  content: '';
  position: absolute;
  background: #f4f6f8;
  height: 18px;
  width: 14px;
}

input[type='range']::after {
  right: 0;
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-sizing: border-box;
  height: 4px;
  width: 100%;
  background: #c4cdd5;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: -18px;
  height: 36px;
  width: 36px;
  border-radius: 50px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  right: 0;
  z-index: 2;
}

input[type='range']::-moz-range-track {
  -webkit-appearance: none;
  box-sizing: border-box;
  height: 4px;
  width: 100%;
  background: #c4cdd5;
  width: calc(100% - 36px);
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  margin-top: -18px;
  height: 36px;
  width: 36px;
  border-radius: 50px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  right: 0;
  z-index: 1000;
}

input[type='range']::-moz-focus-outer {
  border: 0; /* Removes firefox's surrounding dotted line */
}

input[type='range']::-ms-track {
  width: calc(100% - 36px);
  margin-left: 18px;
  height: 4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 26px 0;
  color: transparent;
}

input[type='range']::-ms-thumb {
  margin-top: -10px;
  height: 36px;
  width: 36px;
  border-radius: 50px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  right: 0;
  z-index: 1000;
}

input[type='range']::-ms-fill-lower {
  background: #c4cdd5;
}

input[type='range']::-ms-fill-upper {
  background: #c4cdd5;
}

input[type='range']::-ms-tooltip {
  display: none;
}

.range-label {
  display: flex;
  justify-content: space-between; /*to space out evenly*/
  position: relative;
  margin-top: 20px;
  margin-left: 18px;
  width: calc(100% - 36px);
}

.range-point {
  /*the magic to make the dot to be at the center of the text*/
  width: 0;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  font-size: 16px;
}

.range-point:before {
  position: absolute;
  content: '';
  top: -33px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #c4cdd5;
}

@media only screen and (max-width: 500px) {
  .range-point {
    font-size: 12px;
  }
}
</style>
