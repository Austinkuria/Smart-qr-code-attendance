// assets
import { IconUser, IconPencil, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconUser,
  IconPencil,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const studentLecturerCollaboration = {
  id: 'Student-Lecturer Information',
  title: 'Student and Lecturer Information',
  type: 'group',
  children: [
    {
      id: 'Lecturers',
      title: 'Lecturers',
      type: 'item',
      url: '/admin/Enseignants',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'Student Lists',
      title: 'Student Lists',
      type: 'item',
      url: '/admin/liste-éleves',
      icon: icons.IconPencil,
      breadcrumbs: false
    }
  ]
};

export default studentLecturerCollaboration;
