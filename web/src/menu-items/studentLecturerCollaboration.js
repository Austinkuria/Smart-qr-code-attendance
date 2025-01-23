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
  id: 'Student-Lecturer Details',
  title: 'Student and Lecturer Details',
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
