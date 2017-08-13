<template lang="pug">
  .hobby-container
    h2.hobby_title 관심사 필터
    filter-header.hobby-wrap
    .hobby_content-wrap
      hobby.hobby-filter-wrap
</template>

<script>
import Hobby from '@/components/common/Hobby';
import FilterHeader from '@/components/filter/Header';

export default {
  components: {
    Hobby,
    FilterHeader
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .hobby-container
    width: 100%
    z-index: 10

  .hobby_title
    +a11y-hidden

  .hobby_content-wrap
    background: $filter-panel-background-color

  .hobby-filter-wrap
    width: 100%
    +side-space
</style>