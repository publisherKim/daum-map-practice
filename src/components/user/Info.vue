<template lang="pug">
  .user-info-container
    .user-info_profile
      img.profile_image(:src="userInfo.profile_img" alt="userName")
      .profile-wrap
        span.profile_name(aria-label="이름") {{userInfo.username}}
        span.profile_birth(aria-label="생년월일") {{birth}}
        span.profile_location(aria-label="주소")
          i.fa.fa-map-marker(aria-hidden="true")
          | {{userInfo.address}}
        ul.hobby_list
          li.list-item(aria-label="축구")
            hobby-icon.hobby-icon(iconClass="fa-futbol-o")
          li.list-item(aria-label="음악")
            hobby-icon.hobby-icon(iconClass="fa-music")
          li.list-item(aria-label="쇼핑")
            hobby-icon.hobby-icon(iconClass="fa-shopping-bag")
          li.list-item(aria-label="축구")
            hobby-icon.hobby-icon(iconClass="fa-futbol-o")
          li.list-item(aria-label="음악")
            hobby-icon.hobby-icon(iconClass="fa-music")
          li.list-item(aria-label="쇼핑")
            hobby-icon.hobby-icon(iconClass="fa-shopping-bag")
    ul.user-info_list
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'main'})") 홈
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'user_edit'})") 정보수정
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'user_myGroupList'})") 내모임
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'user_myFavoriteList'})") 관심모임
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'group_create'})") 모임개설
      li.list_menu
        a(href @click.prevent="userLogout") 로그아웃
    back-button(:route={name: 'back'})
</template>

<script>
import BackButton from '@/components/common/BackButton';
import { mapGetters, mapActions } from 'vuex';
import HobbyIcon from '@/components/common/HobbyIcon';

export default {
  components: {
    BackButton,
    HobbyIcon,
  },
  methods: {
    ...mapActions(['logout']),
    changeRoute(route) {
      this.$router.push(route);
    },
    userLogout() {
      this.logout();
      this.changeRoute({name: 'main'});
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
    birth() {
      let userInfo = this.userInfo;
      return `${userInfo.birth_year}.${userInfo.birth_month}.${userInfo.birth_day}`;
    },
  }
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $profile-height: 15rem
  $menu-height: 6rem

  .user-info-container
    width: 100%
    height: 100vh
    background: $user-info-background-color
    .edit-button
      position: absolute
      top: 4rem
      right: 3rem
    .logout-button
      position: absolute
      top: 6rem
      right: 3rem
      font-size: 1.7rem
      background: none
      border: 0

  .user-info_profile
    padding: 4rem 2rem 0 2rem
    background: $user-info-profile-background-color
    +clearfix
    .profile_image
      float: left
      position: relative
      +align-vertical-middle
      border-radius: 1000px
    .hobby_list
      +clearfix
      li
        float: left
        margin-right: 0.5rem
    .profile-wrap
      float: left
      position: relative
      margin-left: 2rem
      +align-vertical-middle
      span
        font-size: 1.5rem
      .profile_name
        margin-right: 1rem

    .profile_location
      display: block
      margin: 0.6rem 0
      i
        margin-right: 1rem

  .user-info_list
    .list_menu
      border-bottom: 0.5px solid $user-info-menu-color
      height: $menu-height
      margin: 0 2rem
      text-align: center
      font-size: 1.7rem
      line-height: $menu-height
      color: $user-info-menu-color
      font-weight: bold
      & > a
        display: block
        line-height: $menu-height
        &:hover
          background: $user-info-menu-background-hover-color
          text-decoration: none
          color: $user-info-menu-hover-color
  
  +mobile
    $profile-image-height: $profile-height - 7rem
    .user-info_profile
      height: $profile-height
    .profile_image
      height: $profile-image-height
      width: $profile-image-height
    .profile-wrap
      width: calc(100% - #{$profile-image-height} - 2rem)
  +desktop
    $profile-height: $profile-height + 2rem
    $profile-image-height: $profile-height - 9rem
    .user-info_profile
      height: $profile-height
    .profile_image
      height: $profile-image-height
      width: $profile-image-height
    .profile-wrap
      width: calc(100% - #{$profile-image-height} -2rem)
</style>