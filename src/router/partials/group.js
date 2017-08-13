// Group
import Group from '@/components/group/Group';
import GroupInfo from '@/components/group/Info';
import GroupHome from '@/components/group/Home';
import GroupBoard from '@/components/group/Board';
import GroupViewArticle from '@/components/group/ViewArticle';
import GroupEditArticle from '@/components/group/EditArticle';
import GroupWriteArticle from '@/components/group/WriteArticle';
import GroupAlbum from '@/components/group/Album';
import GroupCreate from '@/components/group/Create';
import GroupHobby from '@/components/common/Hobby';
import GroupLocation from '@/components/common/Location';
import GroupEdit from '@/components/group/Edit';

export default {
  path: '/group',
  name: 'group',
  component: Group,
  children: [
    {
      path: 'info',
      name: 'group_info',
      component: GroupInfo,
      children: [
        {
          path: 'home',
          name: 'group_info_home',
          component: GroupHome,
        },
        {
          path: 'album',
          name: 'group_info_album',
          component: GroupAlbum,
        },
        {
          path: 'board',
          name: 'group_info_board',
          component: GroupBoard,
        },
      ],
    },   
    {
      path: 'board/viewArticle',
      name: 'group_viewArticle',
      component: GroupViewArticle,
    },
    {
      path: 'board/editArticle',
      name: 'group_editArticle',
      component: GroupEditArticle,
    },
    {
      path: 'board/writeArticle',
      name: 'group_writeArticle',
      component: GroupWriteArticle,
    },
    {
      path: 'create',
      name: 'group_create',
      component: GroupCreate,
      children: [
        {
          path: 'hobby',
          name: 'group_create_hobby',
          component: GroupHobby,
        },
        {
          path: 'location',
          name: 'group_create_location',
          component: GroupLocation,
        },
      ],
    },
    {
      path: 'edit',
      name: 'group_edit',
      component: GroupEdit,
      children: [
        {
          path: 'hobby',
          name: 'group_edit_hobby',
          component: GroupHobby,
        },
        {
          path: 'location',
          name: 'group_edit_location',
          component: GroupLocation,
        },
      ],
    },
  ],
};
