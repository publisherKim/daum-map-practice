// User
import User from '@/components/user/User';
import UserLogin from '@/components/user/Login';
import UserJoin from '@/components/user/Join';
import UserHobby from '@/components/common/Hobby';
import UserLocation from '@/components/common/Location';
import UserEdit from '@/components/user/Edit';
import UserInfo from '@/components/user/Info';
import UserFindId from '@/components/user/FindId';
import UserFindPw from '@/components/user/FindPw';
import UserGroupList from '@/components/user/GroupList';

export default {
  path: '/user',
  name: 'user',
  component: User,
  children: [
    {
      path: 'login',
      name: 'user_login',
      component: UserLogin,
    },
    {
      path: 'join',
      name: 'user_join',
      component: UserJoin,
      children: [
        {
          path: 'hobby',
          name: 'user_join_hobby',
          component: UserHobby,
        },
        {
          path: 'location',
          name: 'user_join_location',
          component: UserLocation,
        },
      ],
    },
    {
      path: 'edit',
      name: 'user_edit',
      component: UserEdit,
      children: [
        {
          path: 'hobby',
          name: 'user_edit_hobby',
          component: UserHobby,
        },
        {
          path: 'location',
          name: 'user_edit_location',
          component: UserLocation,
        },
      ],
    },
    {
      path: 'info',
      name: 'user_info',
      component: UserInfo,
    },
    {
      path: 'findId',
      name: 'user_findId',
      component: UserFindId,
    },
    {
      path: 'findPw',
      name: 'user_findPw',
      component: UserFindPw,
    },
    {
      path: 'myGroupList',
      name: 'user_myGroupList',
      component: UserGroupList,
    },
    {
      path: 'myFavoriteList',
      name: 'user_myFavoriteList',
      component: UserGroupList,
    },
  ],
};
