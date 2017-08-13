<template lang="pug">
  .filter-container
    .location-filter-wrap
      .location-filter
        h2 지금 보고있는 지역은
        button(@click="viewFilter('location')" type="button") 서현/야탑 &dtrif;
      .filter-button-wrap
        button.sort-button(@click="viewFilter('sort')" type="button") 거리순 &dtrif;
        button.hobby-button(@click="viewFilter('hobby')" type="button") 관심사 &dtrif;
        button.mylocation-button(@click="viewFilter('mylocation')" type="button" aria-label="내 주변 검색")
          i.fa.fa-street-view(aria-hidden='true')
    .filter(ref="filter" :is="filter")
</template>

<script>
  import SortFilter from '@/components/filter/SortFilter';
  import HobbyFilter from '@/components/filter/HobbyFilter';
  import MylocationFilter from '@/components/filter/MylocationFilter';
  import LocationFilter from '@/components/filter/LocationFilter';

  export default {
    data() {
      return {
        filter: null
      };
    },
    components: {
      SortFilter,
      HobbyFilter,
      MylocationFilter,
      LocationFilter,
    },
    methods: {
      viewFilter(filter) {
        this.filter = filter + '-filter';
        let refFilter = this.$refs.filter;

        refFilter && refFilter.$options._componentTag.includes(filter) && (this.filter = null);
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .filter-container
    background: $filter-background-color
  .location-filter-wrap
    position: relative
    padding: 0 2rem
    height: 100%
    .location-filter
      position: absolute
      +align-vertical-middle
      display: inline-block
      button
        font-size: 1.5rem
        font-weight: bold
    h2
      color: $filter-color
      font-size: 1.1rem
      font-weight: normal
    button
      color: $filter-color
      background: none
      border: 0
    .mylocation-button
      position: absolute
      right: 0
      z-index: 10
      background: #fff
      padding: 0 7px
      line-height: 3rem
      font-size: 1.7rem
      border-radius: 3px

  .filter-button-wrap
    position: absolute
    right: 0
    height: 100%
    font-weight: normal
    button
      border: 0

  .sort-button,
  .hobby-button
    position: relative
    +align-vertical-middle
    margin-left: 1rem
    font-size: 1.3rem
    background: none
    &:hover
      text-decoration: underline

  .filter
    position: absolute
    bottom: 0
    left: 0

  .sort-filter_content-wrap button,
  .hobby_list label
      color: $base-theme-color

  +mobile
    .filter-container
      height: $mobile-filter-container-height  
    .filter-button-wrap
      margin-right: 2rem
    .mylocation-button
      top: $mobile-filter-container-height + 1.5rem
  +desktop
    .filter-container
      height: $desktop-filter-container-height
    .mylocation-button
      top: $desktop-filter-container-height + 2rem
    .filter-button-wrap
      margin-right: 2rem
</style>