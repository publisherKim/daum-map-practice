<template lang="pug">
  .icon-container(:class="'bg-' + iconClass")
    i.fa(:class="iconClass" aria-hidden="true")
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      iconColor: false
    };
  }
};
</script>

<style lang="sass" scoped>
  .icon-container
    display: inline-block
    width: 2.5rem
    height: 2.5rem
    text-align: center
    border-radius: 1000px
  i
    color: inherit
    vertical-align: middle
    font-size: 1.4rem
  .bg-fa-car
    background: #ff9966
  .bg-fa-futbol-o
    background: #33cccc
  .bg-fa-music
    background: #ffcc00
  .bg-fa-shopping-bag
    background: #ff9966
</style>