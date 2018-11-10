import Vue from 'vue';
import Vuex from 'vuex';
import GetSheetDone from 'get-sheet-done';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    questions: {},
    actionList: []
  },

  getters: {
    completedCategories: state => {
      let resultIfAnswered = state.categories.filter(function(c){
        let questionObjects = c.questions.map(function(id){
           return state.questions[id];
        });
        let allAnswered = true;
        let answerArray = questionObjects.map(function(x){
          let answered = false;
          x.options.forEach(function(y){
            if(y.selected === true){
              answered = true;
            }
          })
          return answered;
        })
        answerArray.forEach(function(e){
          if (e === false){
            allAnswered = false;
          }
        })
        return allAnswered;
      });
      console.log('monkeys', resultIfAnswered);
      return resultIfAnswered;
    },
  },

  mutations: {
    storeDescriptions(state, data) {
      data.forEach(function(item) {
        console.log({ item });
        let slug = item.category.toLowerCase().replace(' ', '-');
        state.categories.push({
          slug: slug,
          title: item.category,
          description: item.description,
          imageUrl: item.image,
          buttonUrl: item.button,
          completed: false,
          questions: []
        });
      });
    },

    storeQuestions(state, data) {
      console.log(state, data);
      let questionsList = {};
      data.forEach(function(q) {
        if (!q._cn6ca) {
          return;
        }

        let answer = {
          text: q.options,
          selected: false,
          score: q.score,
          removeAction: q.removeactionfromlist
        };

        if (questionsList[q._cn6ca]) {
          questionsList[q._cn6ca].options.push(answer);
        } else {
          questionsList[q._cn6ca] = {
            text: q.question,
            category: q.category,
            options: [answer],
            type: q.type,
            imageUrl: q.imageurl
          };
        }
      });

      state.questions = questionsList;

      for (let key in questionsList) {
        state.categories.forEach(function(storeData) {
          if (
            storeData.title.toLowerCase() ==
            questionsList[key].category.toLowerCase()
          ) {
            storeData.questions.push(key);
          }
        });
      }

      console.dir(state.categories);
    },

    storeActions(state, data) {
      data.forEach(d => {
        let categoryExist = state.actionList.filter(
          object => object.category == d.theme
        );

        if (categoryExist.length > 0) {
          //exist
          let index = state.actionList.indexOf(categoryExist[0]); //get the index
          let action = {
            id: d._cn6ca,
            text: d.action
          };

          state.actionList[index].actions.push(action); //add action at the index
        } else {
          //not added yet
          let newAction = {
            category: d.theme,
            actions: [
              {
                id: d._cn6ca,
                text: d.action
              }
            ]
          };

          state.actionList.push(newAction);
        }
      });

      console.log(state.actionList);
    }
  },
  actions: {
    async getData() {
      const metrics_id = '1not5_VpoAmpEDRBFEudT32O0OlXddV6I9iEX1AszFrA';
      const sheet1 = await GetSheetDone.labeledCols(metrics_id, 1);
      const sheet2 = await GetSheetDone.labeledCols(metrics_id, 2);
      const sheet3 = await GetSheetDone.labeledCols(metrics_id, 3);
      this.commit('storeDescriptions', sheet1.data);
      this.commit('storeQuestions', sheet2.data);
      this.commit('storeActions', sheet3.data);
    }
  }
});
