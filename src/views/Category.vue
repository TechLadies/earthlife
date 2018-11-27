<template>
  <div class="category">
    <Description :title="category.title" :description="category.description" :imgSrc="category.imgSrc">
    </Description>
  </div>
  </template>

<script>
import Description from '@/components/Description.vue';
import QuizSingleChoice from '@/components/QuizSingleChoice.vue';

export default {
  name: 'category',
  components: {
    Description,
    QuizSingleChoice
  },

  computed: {
    category: function() {
      if (this.$store.state.categories.length > 0) {
        let pathItem = this.$route.params.category; //get url from router
        let arrayList = this.$store.state.categories; //get data from store
        let item = arrayList.find(function(element) {
          return element.slug === pathItem;
        });

        return {
          title: item.title,
          description: item.description,
          imgSrc: item.imageUrl
        };
      } else {
        return {
          title: '',
          description: '',
          imgSrc: ''
        };
      }
    }
  },

  methods: {
    getData: function() {
      let pathItem = this.$route.params.category; //get url from router
      let arrayList = this.$store.state.categories; //get data from store
      let item = arrayList.find(function(element) {
        return element.slug === pathItem;
      });

      return {
        title: item.title,
        description: item.description,
        imgSrc: item.imgSrc
      };
    },

    onStartQuiz: function() {
      this.startQuiz = true;
    }
  },

  watch: {
    $route() {
      //watch url change
      this.getData();
    }
  }
};
</script>

<style>
@media (max-width: 500px) {
}
.category {
  background-image: url('../assets/images/backgrounds/Bitmap.png');
  background-repeat: no-repeat;
  min-height: calc(100vh - 75px);
  background-position: bottom;
  background-size: contain;
  padding: 5em 0 5em 0;
}
</style>
