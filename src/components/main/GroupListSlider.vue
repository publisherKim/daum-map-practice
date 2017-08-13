<template lang="pug">
  .group-list-slider-container(v-if="groupList.length !== 0")
    ul.group-list
      h2 검색된 그룹 정보 리스트
      .list-item-wrap
        transition(:name="transition" mode="out-in")
          li.list_item(:key="index" v-for="(group, index) in groupList" v-if="index === count")
            .group-image_wrap
              img(:src="group.picture", alt="")
            a.group-description_link(href @click.prevent="changeRoute(group.pk)")
              span.group_name(aria-label="모임명") {{ `${index+1}. ${group.name}` }}
              span.group_description(aria-label="모임 설명") {{ group.description }}
              span.group_member(aria-label="모임멤버") 모임멤버 {{ group.member }}명
              hobby-icon.group_hobby-icon(iconClass="fa-car")
    button.prev-button(@click="prevGroup" type="button")
      i.fa.fa-angle-left(aria-hidden="true")
    button.next-button(@click="nextGroup" type="button")
      i.fa.fa-angle-right(aria-hidden="true")
</template>

<script>
  import HobbyIcon from '@/components/common/HobbyIcon';
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        count: 0,
        transition: '',
      };
    },
    components: {
      HobbyIcon,
    },
    methods: {
      changeRoute(id) {
        this.$router.push({name: 'group_info_home', params: {id}});
      },
      nextGroup() {
        this.count = (this.count + 1) % this.groupListLength;
        this.transition = 'slide-next';
        this.map.panTo(this.groupList[this.count].position);
      },
      prevGroup() {
        this.count = (this.count - 1 + this.groupListLength) % this.groupListLength;
        this.transition = 'slide-prev';
        this.map.panTo(this.groupList[this.count].position);
      },
    },
    computed: {
      ...mapGetters(['groupList', 'map']),
      groupListLength() {
        return this.groupList.length;
      },
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $list-item-height: 7rem

  .group-list-slider-container
    position: absolute
    width: 85%
    height: $list-item-height
    z-index: 20
    bottom: 3rem
    +align-horizontal-middle
    
  h2
    +a11y-hidden
    
  .list_item
    width: 100%
    height: $list-item-height
    padding: 3px 1rem
    background: $group-list-slider-background-color
    border: 0.5px solid $group-list-slider-border-color
    border-radius: 1rem

  .slide-prev-enter-active,
  .slide-prev-leave-active,
  .slide-next-enter-active,
  .slide-next-leave-active
    transition: all 0.2s ease
  .slide-next-enter,
  .slide-prev-leave-to
    transform: translateX(-4rem)
    opacity: 0
  .slide-next-leave-to,
  .slide-prev-enter
    transform: translateX(4rem)
    opacity: 0

  .group-image_wrap
    float: left
    position: relative
    height: 100%
    +align-vertical-middle
    width: $list-item-height
    overflow: hidden
    img
      position: relative
      height: 80%
      +align-center()

  .group-description_link
    float: left
    position: relative
    +align-vertical-middle
    width: calc(100% - #{$list-item-height} - 2rem)
    margin-left: 1rem
    padding-right: 2.5rem
    span
      display: block
      +fit-text-in-box
    .group_name
      font-weight: bold
    .group_description,
    .group_member
      font-size: 1.4rem
    .group_hobby-icon
      position: absolute
      z-index: 30
      top: 0
      right: 0
    &:hover
      text-decoration: none

  .prev-button,
  .next-button
    position: absolute
    z-index: 30
    // transform: translateY(-50%)
    background: none
    border: 0
    padding: 0 0.5rem
    i
      font-size: 5rem
      line-height: $list-item-height
      color: #555
  .prev-button
    transform: translate(-100%, -50%)
    top: 50%
    left: 0
  .next-button
    transform: translate(100%, -50%)
    top: 50%
    right: 0
</style>