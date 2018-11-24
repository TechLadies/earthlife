<template>
  <div class="todo">
    <div class="todo-main">
      <h1 class="todo-title">My Earthlife To-do List</h1>
      <div v-if="this.todos.length == 0">
        <div class="todo-empty">
          <div class="todo-empty-sign-border"><v-icon class="todo-empty-sign" name="exclamation-circle"/></div>
          <div class="todo-empty-text">
            <h2>Oops! You didn't have any actions to do :(</h2>
            <h5>Go back to add some?</h5>
            <button class="action-button" @click="goToAction"><span>Actions </span><v-icon class="arrow" name="arrow-right"/></button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="button-wrapper">
              <a class="button-links" :href="emailContent">
                <v-icon name="envelope"/>
              </a>
              <a class="button-links" @click="print">
                <v-icon name="copy"/>
              </a>
        </div>
        <div class="checklist-wrapper">
          <div class="checklist-item" v-for="(todo, key) in todos">
            <input type="checkbox" :id=key class="checkbox"/><label :for=key></label>
            <div class="checkbox-text">
              <span>{{todo.text}}</span>
              <div class="side-text-wrapper" v-if="!(todo.linkTitle == '')">
                <v-icon name="arrow-right"/>
                <a :href="todo.linkUrl" target="_blank">{{todo.linkTitle}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  components: {},

  computed: {
    emailContent: function() {
      const subject = 'Earthlife';
      let body = `I pledge to:

${this.todos.map(todo => '- ' + todo.text).join('\r\n')}


http://earthfestsingapore.com`;

      return 'mailto:?subject=' + subject + '&body=' + encodeURIComponent(body);
    },
    todos: function() {
      //Only get the todo for the "completed" category
      const filteredTodosByCategory = this.$store.state.actionList.filter(
        action => {
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
        }
      );

      console.log('Filtered', filteredTodosByCategory);

      let allTodos = [];

      filteredTodosByCategory.forEach(filteredTodo => {
        filteredTodo.actions.forEach(todo => {
          //Check if the todo is in the "removedActions" list
          if (!this.$store.state.removedActions.includes(todo.id)) {
            allTodos.push(todo);
          }
        });
      });

      return allTodos;
    }
  },
  methods: {
    print: function() {
      window.print();
    },
    goToAction: function() {
      this.$router.push({ name: 'actions' });
    }
  }
};
</script>

<style scoped>
.todo {
  background-image: url('../assets/Group 2.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 200%;
  background-color: #f9fafb;
  width: 100%;
  min-height: calc(100vh - 75px);
  padding: 0 20px;
}

.todo-main {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 32px 0 206px 0;
}

h1 {
  margin: 0;
  font-weight: 500;
}

.todo-title {
  font-family: 'Futura', 'Poppins', sans-serif;
  color: #403e3d;
  font-size: 23px;
  line-height: 42px;
  text-align: center;
}

.button-wrapper {
  padding: 32px 0;
}

button {
  margin: 0;
  display: inline-block;
  border: 0;
  padding: 0;
}

.button-links {
  width: 48px;
  height: 48px;
  display: inline-block;
  background-color: #dfe3e8;
  border-radius: 100px;
  padding-top: 15px;
  margin-right: 16px;
}

.checklist-wrapper {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.checklist-item {
  padding: 35px;
  background-color: white;
  border-bottom: 0.5px solid #e5e5e5;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 16px;
}

input[type='checkbox'] {
  display: none;
}

.checkbox + label {
  background-color: #fafafa;
  border: 1px solid black;
  padding: 8px;
  border-radius: 2px;
  display: inline-block;
  position: relative;
}

.checkbox:checked + label {
  background-color: #e9ecee;
  border: 1px solid black;
  color: #99a1a7;
}

.checkbox:checked + label:after {
  content: '\2714';
  font-size: 14px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: #99a1a7;
}

.checkbox-text {
  margin-left: 30px;
  display: inline-block;
  /* max-width: 500px; */
}

.side-text-wrapper {
  padding-top: 10px;
  color: #403e3d;
  opacity: 0.5;
}
.side-text-wrapper a {
  margin-left: 10px;
  text-decoration: none;
  color: #403e3d;
}

.todo-empty {
  display: flex;
  text-align: left;
  background-color: #fdf7e5;
  width: 100%;
  border-radius: 6px;
  margin-top: 32px;
  padding: 28px;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.todo-empty-sign {
  width: 24px;
  height: 24px;
  font-weight: bold;
  color: #fff;
  background-color: #9c6f19;
  border: solid 2px #9c6f19;
  border-radius: 100px;
  text-align: center;
}

.todo-empty-sign-border {
  border: solid 4px #ffea8a;
  border-radius: 1000px;
  height: 32px;
  width: 32px;
}

.todo-empty-text {
  color: #212b36;
  padding-top: 10px;
}

.todo-empty-text h2 {
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 20px;
}

.todo-empty-text h5 {
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  padding-top: 12px;
}

.todo-empty-text button {
  margin-top: 32px;
  padding: 10px 25px;
  color: #454f5b;
  font-size: 16px;
  text-align: center;
  border-radius: 100px;
  background-color: #fff;
}

.todo-empty-text button:hover {
  background-color: #4e4d86;
  cursor: pointer;
  color: #fff;
}

.arrow {
  padding-top: 3px;
}

@media (min-width: 600px) {
  .todo {
    background-size: contain;
  }
  .todo-title {
    font-size: 32px;
  }

  .todo-main {
    padding: 100px 0;
  }

  .todo-empty {
    flex-direction: row;
    align-items: inherit;
  }

  .todo-empty-text {
    padding-top: 0px;
    padding-left: 20px;
    text-align: left;
  }

  .todo-empty-text h2 {
    font-size: 23px;
  }
}
</style>
