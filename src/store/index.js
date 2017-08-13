import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import markerImage from '../assets/marker.svg';

Vue.use(Vuex);

let http = axios;

export default new Vuex.Store({
  state: {
    userInfo: null,
    map: null,
    groupList: [],
    markers: [],
    myLocation: null,
  },
  getters: {
    map(state) {
      return state.map;
    },
    userInfo(state) {
      return state.userInfo;
    },
    groupList(state) {
      return state.groupList;
    },
    markers(state) {
      return state.markers;
    },
  },
  mutations: {
    setUserInfo(state, data){
      state.userInfo = data;
    },
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
    setMap(state, map) {
      state.map = map;
    },
    setMarker(state) {

      state.markers = state.groupList.map((group, index) => {
        let map = state.map;
        let position = new Vue.maps.LatLng(group.latitude, group.longitude);

        // 마커 생성 및 표시
        let marker = new Vue.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: position, // 마커를 표시할 위치
          title: group.name + '\n' + group.description, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: Vue.maps.getMarkerImage(), // 마커 이미지 
        });

        return marker;
      });
    },
    arrangeGroupByDistance(state) {
      let groupList = state.groupList;
      let myLocation = state.myLocation;

      groupList.forEach(function(group) {
        let line = Vue.maps.getPolyline();
        group.position = new Vue.maps.LatLng(group.latitude, group.longitude);
        line.setPath([myLocation, group.position]);
        group.distance = Math.round(line.getLength());
      });

      groupList.sort(function(group1, group2) {
        return group1.distance - group2.distance;
      });

      state.map.setCenter(myLocation);
    },
    setMyLocation(state, myLocation) {
      state.myLocation = myLocation;
    },
    setMarkerNumber(state) {
      state.groupList.forEach((group, index) => {
        let map = state.map;
        let position = new Vue.maps.LatLng(group.latitude, group.longitude);

        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        let content = `<span style="position: absolute; top: -31.5px; left: -2.5px;
              font-size: 12px; color: #3b8de0; font-weight: bold">${index+1}</span>`;

        // 커스텀 오버레이를 생성합니다
        let customOverlay = new Vue.maps.CustomOverlay({
          position: position,
          content: content,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
      });
    },
  },
  actions: {
    //  - 현재위치 위도
    //  - 현재위치 경도
    //  - 반경 ( meter 단위 )
    //  - 로그인 한 유저의 관심사 리스트 { 관심사명 }
    setGroupList({commit, state}, location) {
      location && commit('setMyLocation', location);
      !location && commit('setMyLocation', Vue.maps.getDefaultLocation());

      http.get('groups.json').
        then(response => {
          if(response.status === 200) {
            commit('setGroupList', response.data);
            commit('setMarker');
            commit('arrangeGroupByDistance');
            commit('setMarkerNumber');
          }
        }).
        catch(error => {
          console.log('error:', error.response);
        });
    },
    login({commit}, loginInfo) {
      http.post('/user/login/', loginInfo)
        .then(response => {
          if(response.status === 200) {
            let data = response.data.login_user_info;
            sessionStorage.setItem('token', response.data.token);
            commit('setUserInfo', data);
          }
        })
        .catch(error => {
          if(error.non_field_errors !== null){
            alert('아이디와 비밀번호를 확인해주세요');
          }
          
          console.log('error:', error.response);
        });
    },
    logout({commit}){
      let token = sessionStorage.getItem('token');

      http.post('/user/logout/', null, {
        headers: {'Authorization': `Token ${token}`}
      })
        .then(response => {
          if(response.status === 200) {
            sessionStorage.removeItem('token');
            commit('setUserInfo', null);
          }
        })
        .catch(error => {
          console.log('error:', error.response);
        });
    }    
  }
});