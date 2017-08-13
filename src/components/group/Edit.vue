<template lang="pug">
  .group-create-container
    h3.title 모임 정보 수정
    form.group-create_form
      p.form_name {{ group.name }}
      textarea.form_description(v-model="group.description" placeholder="어떤 모임인지 설명해주세요." aria-label="모임 설명")
      .form_location-wrap
        button.location_button(@click="changeRoute('user_join_location')" type="button") 지역선택
          i.fa.fa-map-marker(aria-hidden='true')
        p.location-address {{group.location}}
      .form_hobby-wrap
        button.hobby_button(@click="changeRoute('user_join_hobby')" type="button") 관심사 설정
          i.fa.fa-cog(aria-hidden='true')
        ul.hobby-list
          li
            img(src="" alt="관심사1")
      button.form_confirm(@click="changeRoute('main')" type="submit") 완료
    back-button
</template>

<script>
  import BackButton from '@/components/common/BackButton';

  export default {
    data() {
      return {
        group: {
          name: '분당 쉐보레 스파크 모임',
          description: '분당구 경차사랑 스파크 모임입니다.',
          location: '경기도 성남시 분당구 정자동 11-2',
          hobby: ['축구', '야구']
        },
      };
    },
    components: {
      BackButton,
    },
    methods: {
      changeRoute(route) {
        this.$router.push({name: route});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  .group-create-container
    padding: 3rem

  .title
    +sub-page-title

  .form_name,    
  .form_description,
  p
    display: block
    margin-top: 1.5rem

  .form_name
    font-size: 1.5rem
    font-weight: bold
  
  .form_description
    +text-input(100%, 100px)

  .form_hobby-wrap,
  .form_location-wrap
    margin-top: 1.5rem
  
  .hobby_button,
  .location_button
    & > .fa
      margin-left: 1rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0
  
  .hobby-list, .location-address
    margin-top: 1rem
    padding-left: 1.5rem

  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)
</style>