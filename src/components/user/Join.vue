<template lang="pug">
  .join-container
    .user-join-wrap
      h3.title 회원가입
      form.user-join_form
        p
          input.form_name(
            v-model="userJoinInfo.username" @blur="checkEmpty('username')" ref="username" type="text" placeholder="이름" aria-label="이름"
          )
          message-box(
            v-if="isEmptyUsername" :classList="['fa-check-circle-o', 'warning']" message="이름을 입력해주세요."
          )
        p.form_email-wrap
          input.form_email(
            v-model="userJoinInfo.email" @blur="checkEmpty('email')" ref="email" type="email" placeholder="이메일" aria-label="이메일"
          )
          message-box(
            v-if="isEmptyEmail" :classList="['fa-check-circle-o', 'warning']" message="이메일 입력해주세요."
          )
          message-box(
            v-if="userJoinInfo.email" :classList="['fa-check-circle-o', emailValidate ? 'info' : 'warning']"
            :message="emailValidationMessage"
          )
        p
          input.form_password(
            v-model="userJoinInfo.password" @blur="checkEmpty('password')" ref="password" type="password"
            placeholder="비밀번호(대소문자, 숫자 포함 8글자 이상)" aria-label="비밀번호"
          )
          message-box(
            v-if="isEmptyPassword" :classList="['fa-check-circle-o', 'warning']" message="비밀번호 입력해주세요."
          )
          message-box(
            v-if="userJoinInfo.password" :classList="['fa-check-circle-o', passwordValidate ? 'info' : 'warning']" 
            :message="passwordValidationMessage"
          )
        p
          label.form_birth(for="birth") 생년월일 / 성별
          input#birth.form_year(
            v-model.number="userJoinInfo.birth_year" type="number" min="1900" :max="maxYear" aria-label="생년"
          )
          input.form_month(
            v-model.number="userJoinInfo.birth_month" type="number" min="1" max="12" aria-label="월"
          )
          input.form_day(
            v-model.number="userJoinInfo.birth_day" type="number" min="1" max="31" aria-label="일"
          )
          input#man(
            v-model="userJoinInfo.gender" type="radio" name="gender" value="m" checked
          )
          label(
            ref="genderM" @keyup.enter="$refs.genderM.click()" for="man" tabindex="0"
          ) 남
          input#woman(
            v-model="userJoinInfo.gender" type="radio" name="gender" value="f"
          )
          label(
            ref="getderF" @keyup.enter="$refs.getderF.click()" for="woman" tabindex="0"
          ) 여
        .form_file-upload-wrap
          input#upload(@change="fileUpload" type="file")
          label.file-upload_label(
            ref="fileLabel" for="upload" @keyup.enter="$refs.fileLabel.click()" tabindex="0"
          ) 프로필 사진
            i.fa.fa-picture-o(aria-hidden="true")
          img(v-if="userJoinInfo.profile_img" :src="uploadSrc") 
          
        .form_hobby-wrap
          button.hobby_button(
            @click="changeRoute({name: 'user_join_hobby', params: {prev: 'user_join'}})"
            @blur="checkEmpty('hobby')" ref="hobby" type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.hobby-list(v-if="userJoinInfo.hobby && userJoinInfo.hobby.length !== 0")
            li.list_item(v-for="hobby in userJoinInfo.hobby")
              img(src="" :alt="hobby")
        message-box(
          v-if="isEmptyHobby" :classList="['fa-check-circle-o', 'warning']" message="관심사를 선택 해주세요"
        )
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_join_location', params: {prev: 'user_join'}})" 
            @blur="checkEmpty('address')" ref="location" type="button"
          ) 지역 선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address {{ userJoinInfo.address }}
        message-box(
          v-if="isEmptyAddress" :classList="['fa-check-circle-o', 'warning']" message="지역을 선택해주세요"
        )
        button.form_confirm(type="button" @click="join") 완료
    router-view.hobby-container
    back-button(v-if="!prevRoute" :route={name: 'user_login'})
</template>

<script>
  import Vue from 'vue';
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import { mapGetters } from 'vuex';

  let emailRegexp = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  let passwordRegexp = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  export default {
    components: {
      BackButton,
      MessageBox
    },
    data() {  
      return {
        imgSrc: false,  
        isMap: false,
        maxYear: new Date().getFullYear(),
        uploadSrc: '',
        emailValidationMessage: '',
        passwordValidationMessage: '',
        userJoinInfo: {
          email: null,
          username: null,
          password: null,
          confirm_password: null,
          birth_year: 1990,
          birth_month: 1,
          birth_day: 1,
          gender: 'm',
          profile_img: '',
          hobby: null,
          address: null,
          lat: null,
          lng: null,
        },
      };
    },
    methods: {
      checkEmpty(field) {
        let userJoinInfo = this.userJoinInfo;
        (field === 'hobby' && userJoinInfo[field] === null) && (userJoinInfo[field] = []);
        userJoinInfo[field] === null && (userJoinInfo[field] = '');
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        this.userJoinInfo.profile_img = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      },
      join() {
        if(!this.joinValidate()) return;

        let formData = Vue.setFormData(this.userJoinInfo);
        this.$http.post('/user/signup/', formData).
          then(response => {
            if(response.status === 200) {
              console.log(response);
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          });
      },
      joinValidate() {
        let refs = this.$refs;
        let userJoinInfo = this.userJoinInfo;
        
        if(this.isEmptyUsername || !userJoinInfo.username) {
          this.checkEmpty('username');
          refs.username.focus();
          return false;
        } else if(this.isEmptyEmail || !this.emailValidate) {
          this.checkEmpty('email');
          refs.email.focus();
          return false;
        } else if(this.isEmptyPassword || !this.passwordValidate) {
          this.checkEmpty('password');
          refs.password.focus();
          return false;
        } else if(this.isEmptyHobby || !userJoinInfo.hobby) {
          this.checkEmpty('hobby');
          refs.hobby.focus();
          return false;
        } else if(this.isEmptyAddress || !userJoinInfo.address) {
          this.checkEmpty('address');
          refs.location.focus();
          return false;
        }

        return true;
      },
    },
    watch: {
      $route(newRoute) {
        let userJoinInfo = this.userJoinInfo;
        let hobby = newRoute.params.hobby;
        hobby && (userJoinInfo.hobby = hobby);
        let position = newRoute.params.position;
        // position && (userJoinInfo.position = position);
        if(position) {
          userJoinInfo.address = position.address;
          userJoinInfo.lat = position.latitude;
          userJoinInfo.lng = position.longitude;
        }
      },
      userJoinInfo: {
        handler: (newVal) => {
          newVal.confirm_password = newVal.password;
        },
        deep: true,
      }
    },
    computed: {
      emailValidate() {
        if(emailRegexp.test(this.userJoinInfo.email)) {
          this.emailValidationMessage = '올바른 이메일 주소입니다.';
          return true;
        } else {
          this.emailValidationMessage = '올바른 이메일 주소를 입력해주세요';
          return false;
        }
      },
      passwordValidate() {
        if(passwordRegexp.test(this.userJoinInfo.password)) {
          this.passwordValidationMessage = '올바른 패스워드 형식입니다.';
          return true;
        } else {
          this.passwordValidationMessage = '대문자, 소문자, 숫자를 포함해야합니다.';
          return false;
        }
      },
      isEmptyUsername() {
        return this.userJoinInfo.username === '';
      },
      isEmptyEmail() {
        return this.userJoinInfo.email === '';
      },
      isEmptyPassword() {
        return this.userJoinInfo.password === '';
      },
      isEmptyHobby() {
        let hobby = this.userJoinInfo.hobby;
        return hobby && hobby.length === 0;
      },
      isEmptyAddress() {
        return this.userJoinInfo.address === '';
      },
      prevRoute() {
        return this.$route.params.prev;
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  .user-join-wrap
    display: block
    padding: 3.5rem
    // overflow-y: scroll
    // max-height: 100vh
    background: $user-join-background-color

  .form_file-upload-wrap
    img 
      display: block
      width: 50px
      height: 50px
  h3.title
    +sub-page-title

  .hobby-list
    +clearfix
    .list_item
      float: left
      margin-right: 1rem

  .user-join_form
    .hobby-list, .location-address
      margin-top: 0.5rem
      padding-left: 1.5rem
    p
      margin-top: 1.5rem

    .form_name,
    .form_email,
    .form_password,
      +text-input(100%)
      padding-right: 2.5rem
    input[type="number"]
      +text-input(25%)
      &:not(:nth-of-type(1))
        width: 21%
        margin-left: 0.8rem
    input[type="radio"]
      visibility: hidden
      position: absolute
      & + label
        display: inline-block
        vertical-align: top
        padding: 0 0.7rem
        margin-left: 0.5rem
        line-height: 3rem
        color: $user-join-color
        border-radius: 3px
        cursor: pointer
      &:checked + label
        +action-active()
    .form_birth
      display: block
      font-weight: bold
      line-height: 3rem

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

  .form_birth,
  .hobby_button,
  .location_button,
  .file-upload_label
    color: $user-join-color
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

  .hobby-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
        
</style>