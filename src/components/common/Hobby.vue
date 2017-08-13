<template lang="pug">
  div
    .hobby-wrap
      h3.title 운동/스포츠
      ul.hobby_list
        li
          input(v-model="selectedList" id="item1" type="checkbox" value="자전거")
          label(for="item1") 자전거    
        li
          input(v-model="selectedList" id="item2"  type="checkbox" value="배드민턴")
          label(for="item2") 배드민턴
        li
          input(v-model="selectedList" id="item3"  type="checkbox" value="축구")
          label(for="item3") 축구
        li
          input(v-model="selectedList" id="item4"  type="checkbox" value="농구")
          label(for="item4") 농구
        li
          input(v-model="selectedList" id="item5"  type="checkbox" value="레이싱")
          label(for="item5") 레이싱
    .hobby-wrap
      h3.title 음악
      ul.hobby_list
        li
          input(v-model="selectedList" id="item6" type="checkbox" value="클래식")
          label(for="item6") 클래식    
        li
          input(v-model="selectedList" id="item7"  type="checkbox" value="재즈")
          label(for="item7") 재즈
        li
          input(v-model="selectedList" id="item8"  type="checkbox" value="팝송")
          label(for="item8") 팝송
        li
          input(v-model="selectedList" id="item9"  type="checkbox" value="K-POP")
          label(for="item9") K-POP
      
    button.hobby_confirm(v-if="prevRoute" @click="confirm" type="button") 완료
    back-button(v-if="prevRoute" :route={name: prevRoute})
</template>

<script>
  import BackButton from '@/components/common/BackButton';

  export default {
    beforeRouteEnter (to, from, next) {
      let fromRouteName = from.name;

      if(fromRouteName === 'user_join' || fromRouteName === 'user_edit' 
        || fromRouteName === 'group_create' || fromRouteName === 'group_edit') {
        next();
      } else {
        next({name: fromRouteName});
      }
    },
    beforeRouteUpdate (to, from, next) {
      // called when the route that renders this component has changed,
      // but this component is reused in the new route.
      // For example, for a route with dynamic params /foo/:id, when we
      // navigate between /foo/1 and /foo/2, the same Foo component instance
      // will be reused, and this hook will be called when that happens.
      // has access to `this` component instance.
    },
    beforeRouteLeave (to, from, next) {
      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.
    },
    components: {
      BackButton,
    },
    data() {
      return {
        selectedList: [],
      };
    },
    methods: {
      confirm() {
        this.changeRoute({name: this.prevRoute, params: {hobby: this.selectedList}});
      },
      changeRoute(route) {
        this.$router.push(route);
      },
    },
    computed: {
      prevRoute() {
        return this.$route.params.prev;
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .title
    padding: 3px 0
    color: $hobby-color
    line-height: 3rem
    border-bottom: 1px solid $base-theme-color
    font-size: 1.4rem

  .hobby_list
    padding: 10px 0
    +clearfix
    li
      // float: left
      margin-bottom: 1rem
      text-align: center
      font-size: 1.2rem
      // &:not(:last-child)
      //   margin-right: 2rem
    label
      +rounded-rect-button(95%)
      &:hover
        +rounded-rect-button-active()
      display: block
      text-align: center
      cursor: pointer
    input
      position: absolute
      visibility: hidden
      width: 0
      height: 0
    input:checked + label
      +rounded-rect-button-active()
    
  .hobby_confirm
      display: block
      margin: 2rem auto
      +action-button(5rem, 3rem)
  
  +mobile
    .hobby_list
      +container()
      li
        +span(3 of 9)
  +desktop
    .hobby_list
      +container()
      li
        +span(3)

</style>

