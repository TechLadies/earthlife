import Vue from 'vue';
import Vuex from 'vuex';
import GetSheetDone from 'get-sheet-done';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      //   {
      //     slug: 'plantbased',
      //     title: "Title",
      //     description: "Description",
      //     imgSrc: require('./assets/01_plantbased.png'),
      //     questions: [
      //       {
      //       text: 'When eating out, I usually...',
      //       imgs: '',
      //       type: '',
      //         answers: [
      //           {
      //             text: 'Choose a restaurant that doesn\'t use disposables or bring my own reusable servingware and cutlery.',
      //             value: 10,
      //             selected: false
      //           },
      //           {
      //             text: 'Don\'t really think about the waste created from eating there.',
      //             value: 20
      //           }
      //         ]
      //       },
      //       {
      //       text: 'plant-based question 2',
      //       imgs: '',
      //       type: '',
      //       answers: [
      //           {
      //             text: 'plant-based question 2 answer 1',
      //             value: ''
      //           },
      //           {
      //             text: 'plant-based question 2 answer 2',
      //             value: ''
      //           }
      //         ]
      //       },
      //       {
      //       text: 'plant-based question 3',
      //       imgs: '',
      //       type: '',
      //       answers: [
      //           {
      //             text: 'plant-based question 3 answer 1',
      //             value: ''
      //           },
      //           {
      //             text: 'plant-based question 3 answer 2',
      //             value: ''
      //           }
      //         ]
      //       },
      //     ]
      //   },
      //   {
      //     slug: 'zerowaste',
      //     title: "Zero Waste",
      //     description: "Zero Waste is a concept that challenges the old way of thinking about waste as something that has no value and to be thrown away.",
      //     imgSrc: require('./assets/02_zerowaste.png'),
      //     questions: [
      //       {
      //       text: 'Zero Waste question 1',
      //       imgs: '',
      //       type: '',
      //       answers: [
      //           {
      //             text: 'Zero Waste question 1 answer 1',
      //             value: ''
      //           },
      //           {
      //             text: 'Zero Waste question 1 answer 2',
      //             value: ''
      //           }
      //         ]
      //       },
      //       {
      //       text: 'Zero Waste question 2',
      //       imgs: '',
      //       type: '',
      //       answers: [
      //           {
      //             text: 'Zero Waste question 2 answer 1',
      //             value: ''
      //           },
      //           {
      //             text: 'Zero Waste question 2 answer 2',
      //             value: ''
      //           }
      //         ]
      //       },
      //       {
      //       text: 'Zero Waste question 3',
      //       imgs: '',
      //       type: '',
      //       answers: [
      //           {
      //             text: 'Zero Waste question 3 answer 1',
      //             value: ''
      //           },
      //           {
      //             text: 'Zero Waste question 3 answer 2',
      //             value: ''
      //           }
      //         ]
      //       },
      //     ],
      //   },
      //   {
      //     slug: 'biophilia'
      //   },
      //   {
      //     slug: 'advocacy'
      //   },
      //   {
      //     slug: 'minimalism'
      //   },
      //   {
      //     slug: 'co2positive'
      //   }
    ],
    questions: {},
    actionList: [],
  },
  mutations: {
    storeDescriptions(state, data) {
      data.forEach(function(item) {
        let slug = item.category.toLowerCase().replace(' ', '-');
        state.categories.push({
          slug: slug,
          title: item.category,
          description: item.descriptionkeepthethelengthofthiscell,
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
            type: q.type
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
      const sheet1 = await GetSheetDone.labeledCols(
        '17_sT-7gZqDicun-bf5IC82CaB64p-nBy3tX5eiP7cfk',
        1
      );
      const sheet2 = await GetSheetDone.labeledCols(
        '17_sT-7gZqDicun-bf5IC82CaB64p-nBy3tX5eiP7cfk',
        2
      );
      const sheet3 = await GetSheetDone.labeledCols(
        '17_sT-7gZqDicun-bf5IC82CaB64p-nBy3tX5eiP7cfk',
        3
      );
      this.commit('storeDescriptions', sheet1.data);
      this.commit('storeQuestions', sheet2.data);
      this.commit('storeActions', sheet3.data);
    }
  }
});
