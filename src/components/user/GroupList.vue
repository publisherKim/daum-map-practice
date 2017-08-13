<template lang="pug">
  .group-list-container
    main-header
    h2 {{headerName}}
    ul.group-list
      li.list_item
        .group-info_wrap
          .group-image_wrap
            img(src="../../assets/logo.png", alt="")
          a.group-description_link(href @click.prevent="changeRoute(1)")
            span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
            span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.dsa asdasd ad asd asd asd 
            span.group_member(aria-label="모임멤버") 모임멤버 58명
            hobby-icon.group_hobby-icon(iconClass="fa-car")
</template>

<script>
import MainHeader from '@/components/common/Header';
import HobbyIcon from '@/components/common/HobbyIcon';

export default {
  created() {
    this.headerName = (this.$route.name === 'user_myGroupList') ? '내 모임' : '관심모임';
  },
  components: {
    MainHeader,
    HobbyIcon,
  },
  data() {
    return {
      headerName: null
    };
  },
  methods: {
    changeRoute(id) {
      this.$router.push({name: 'group_info_home', params: {id}});
    },
  },
};
</script>



<style lang="sass" scoped>
  @import "~chming"
  
  $list-item-height: 8rem
  // $my-group-header-color
  // $my-group-header-background-color
  // $my-group-list-color
  // $my-group-list-background-color

  .group-list-container
    background: $my-group-list-background-color

  h2
    line-height: 3rem
    font-size: 1.5rem
    +side-space
    color: $my-group-header-color
    background: $my-group-header-background-color

  .group-info_wrap
    position: relative
    width: 100%
    height: 100%
    padding: 0 1rem
    +clearfix
    
  .list_item
    height: $list-item-height
    padding: 3px 0
    border-bottom: 0.5px solid $my-group-list-border-color

  .group-image_wrap
    float: left
    position: relative
    height: 100%
    // +align-vertical-middle
    width: $list-item-height
    text-align: center
    img
      position: relative
      height: 80%
      +align-vertical-middle

  .group-description_link
    float: left
    position: relative
    +align-vertical-middle
    width: calc(100% - #{$list-item-height} - 3rem)
    margin-left: 1rem
    padding-right: 2.5rem
    span
      display: block
      +fit-text-in-box
    .group_name
      font-size: 1.5rem
      font-weight: bold
    .group_description,
    .group_member
      font-size: 1.3rem
    .group_hobby-icon
      position: absolute
      top: 0
      right: 0
    &:hover
      text-decoration: none
  
</style>