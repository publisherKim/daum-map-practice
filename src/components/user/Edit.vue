<template lang="pug">
  .edit-container
    .user-edit-wrap
      h3.title 사용자 정보 수정
      form.user-edit_form
        p {{ `이메일 : ${user.email}` }}
        p
          input.form_name(v-model="user.name" type="text" placeholder="이름" aria-label="이름")
        p
          input.form_password(v-model="user.password" type="password" placeholder="비밀번호" aria-label="비밀번호")
        p
          label.form_birth(for="birth") 생년월일
          input#birth.form_year(type="number" v-model="user.year" min="1900" :max="maxYear" aria-label="생년")
          input.form_month(type="number" v-model="user.month" min="1" max="12" aria-label="월")
          input.form_day(type="number" v-model="user.day" min="1" max="31" aria-label="일")
          input#man(v-model="user.gender" type="radio" name="gender" value="man" checked)
          label(for="man") 남
          input#woman(:v-model="user.gender" type="radio" name="gender" value="woman")
          label(for="woman") 여
        .form_file-upload-wrap
          input#upload(@change="fileUpload" type="file")
          label.file-upload_label(for="upload") 프로필 사진
            i.fa.fa-picture-o(aria-hidden="true")
          img(:src="uploadSrc")
        .form_hobby-wrap
          button.hobby_button(
            @click="changeRoute({name: 'user_edit_hobby', params: {prev: 'user_edit'}})"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.hobby-list
            li
              img(src="" alt="관심사1")
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_edit_location', params: {prev: 'user_edit'}})" 
            type="button"
          ) 지역선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address 경기도 성남시 분당구 정자동 11-2
        button.form_confirm(@click="confirm" type="submit") 완료
      back-button(:route={name: 'user_info'})
    router-view.user_hobby
</template>

<script>
  import BackButton from '@/components/common/BackButton';

  export default {
    data() {  
      return {
        isMap: false,
        maxYear: new Date().getFullYear(),
        user: {
          name: 'kkk',
          email: 'h@naver.com',
          password: 12345,
          year: 1983,
          month: 9,
          day: 1,
          gender: 'man'
        },
        uploadSrc: '',
      };
    },
    components: {
      BackButton,
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      },
      typing(e) {
        this.user.name = e.target.value;
      },
      confirm() {
        this.$router.push('/');
      },
      fileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      }
    },
    computed: {
      maskingPassword() {
        // let length = this.user.password.length;
        let length = 5;
        let masking = '';
        while(length--) masking += '*';
        return masking;
      },
    },
  };
</script>

<style lang="sass">
  @import "~chming"

  .user-edit-wrap
    display: block
    padding: 3rem
    background: $user-edit-background-color

  .hobby-list
    +clearfix
    .list_item
      float: left
      margin-right: 1rem

  .title
    +sub-page-title

  .user-edit_form
    .hobby-list, .location-address
      margin-top: 0.5rem
      padding-left: 1.5rem
    p
      margin-top: 1.5rem
    .form_name,
    .form_email,
    .form_password,
      +text-input(100%)
    input[type="number"]
      +text-input(27%)
      &:not(:nth-of-type(1))
        width: 23%
        margin-left: 0.5rem
    input[type="radio"]
      visibility: hidden
      position: absolute
      & + label
        display: inline-block
        vertical-align: top
        padding: 0 0.7rem
        margin-left: 0.5rem
        line-height: 3rem
        color: $user-edit-color
        border-radius: 3px
        cursor: pointer
      &:checked + label
        +action-active()
    .form_birth, .form_gender
      display: block
      line-height: 3rem
      font-weight: bold

  .form_file-upload-wrap,
  .form_hobby-wrap,
  .form_location-wrap
    margin-top: 1.5rem
    & .fa
      margin-left: 1rem
      font-size: 1.5rem

  .form_file-upload-wrap
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer

  .hobby_button,
  .location_button,
  .file-upload_label
    color: $user-edit-color
    font-weight: bold
    background: none
    border: 0

  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)

  .user-info_hobby-wrap
    .title
      border: none
</style>