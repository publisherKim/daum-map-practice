<template lang="pug">
  .group-create-container
    h3.title 모임 개설
    form.group-create_form
      input.form_name(v-model="group.name" type="text" placeholder="모임 이름을 작성해주세요." aria-label="모임 이름")
      textarea.form_description(placeholder="어떤 모임인지 설명해주세요." aria-label="모임 설명")
      .form_file-upload-wrap
        input#upload(@change="fileUpload" type="file")
        label.file-upload_label(for="upload") 모임 대표 사진
          i.fa.fa-picture-o(aria-hidden="true")
          img.label_group-img(v-if="group.introduceImg" :src="uploadSrc")
      .form_location-wrap
        button.location_button(
          @click="changeRoute({name: 'group_create_location', params: {prev: 'group_create'}})"
          type="button"
        ) 지역선택
          i.fa.fa-map-marker(aria-hidden='true')
        p.location-address {{group.address}}
      .form_hobby-wrap
        button.hobby_button(
          @click="changeRoute({name: 'group_create_hobby', params: {prev: 'group_create'}})"
          type="button"
        ) 관심사 설정
          i.fa.fa-cog(aria-hidden='true')
        ul.hobby-list
          li {{group.hobby}}
      button.form_confirm(@click="changeRoute('main')" type="submit") 완료
    router-view.hobby-container
    back-button(:route={name: 'user_info', params})
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import BackButton from '@/components/common/BackButton';

  export default {
    components: {
      GroupHeader,
      BackButton,
    },
    data(){
      return {
        uploadSrc: '',
        group: {
          name: null,
          introdeceContent: '',
          introduceImg: null,
          address: 'test',
          lat: '',
          lng: '',
          hobby: 'test1',
        }
      };
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        this.group.introduceImg = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      },
      watch: {
        $route(newRoute) {
          let group = this.group;
          let hobby = newRoute.params.hobby;
          hobby && (group.hobby = hobby);
          let position = newRoute.params.position;
          if(position) {
            group.address = position.address;
            group.lat = position.latitude;
            group.lng = position.longitude;
          }
        },
      }
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
    display: block
    margin-top: 1.5rem

  .form_name,    
    +text-input(100%)
  
  .form_description
    +text-input(100%, 100px)

  .form_file-upload-wrap,
  .form_hobby-wrap,
  .form_location-wrap
    margin-top: 1.5rem
    .label_group-img
      display: block
      width: 100%
  .form_file-upload-wrap
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer
  
  .hobby_button,
  .location_button
    & > .fa
      margin-left: 1rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0
  
  .hobby-list, .location-address
    margin-top: 0.5rem
    padding-left: 1.5rem

  .hobby-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
    .hobby_confirm
      display: block
      margin: 2rem auto
      +action-button(5rem, 3rem)
        
  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)
</style>