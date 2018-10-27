<template>
	<div class="quiz-multiple">
		<div v-for="answer in choices">
			<input type="checkbox" :id="answer.text" name="answer"
				:value="answer.text" v-model="inputSelected" >
			</input>
			<label class="question-answer" :for="answer.text" :class="{'answer-selected': inputSelected.includes(answer.text)}">{{ answer.text }}</label>
   	</div>
	</div>     
</template>

<script>
export default{
	name:'QuizMultiChoice',
	props:{
		// category: String,
		// question: String,
		choices: Array
	},

	data: function(){
    return {
     inputSelected: []
   }

	}
}
</script>

<style scoped>
input[type="checkbox"]{
	display:none;
}

.question-answer {
  margin-top: 20px;
  padding: 24px;
  max-width: 560px;
  color: #212B36;
  font-size: 16px;
  line-height: 22px;
  background-color: white;
  display: block;
}

.question-answer:hover{
  cursor: pointer;
}

.answer-selected{
  background-color: #4E4D86;
  color: white;
}
</style>