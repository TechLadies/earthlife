<template>
  <div class="progress-bar-wrapper">
    <div class="progress-bar" v-bind:style="{width: progress + '%'}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  components: {}
};
</script>

<style scoped>
.progress-bar {
  height: 6px;
  background-color: #4e4d86;
  transition: width 0.3s ease-in-out;
}
</style>