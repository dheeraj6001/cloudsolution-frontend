// src/constants superadminMenu.ts
export const superadminMenu = [
   { title: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/admin/students', icon: 'Users' },
  {
    title: 'Misc',
    icon: 'BookOpen',
    children: [
      { title: 'Courses', href: '/admin/courses' },
      { title: 'Sub Courses', href: '/admin/subcourse' },
      { title: 'Subjects', href: '/admin/subjects' },
      { title: 'Topics', href: '/admin/topics' },
      { title: 'Instructions', href: '/admin/instructions' },
      { title: 'News', href: '/admin/news' },
      { title: 'Documents', href: '/admin/documents' },
      { title: 'Notifications', href: '/admin/notification' },
    ],
  },
  {
    title: 'Institutes',
    icon: 'School',
    children: [
      { title: 'Centers', href: '/admin/centers' },
      { title: 'Batches', href: '/admin/batch' },
    ],
  },
  {
    title: 'Manage Questions',
    icon: 'MessageSquare',
    children: [
      { title: 'Questions', href: '/admin/questions' },
      { title: 'Passages', href: '/admin/passages' },
    ],
  },
  {
    title: 'Manage Tests',
    icon: 'ClipboardList',
    children: [
      { title: 'Tests', href: '/admin/tests' },
      { title: 'Subjective Test', href: '/admin/subjetive-test' },
      { title: 'Test Series', href: '/admin/test-series' },
      { title: 'Reports', href: '/admin/reports' },
    ],
  },
  {
    title: 'Manage Videos',
    icon: 'Video',
    children: [
      { title: 'Video', href: '/admin/videos' },
      { title: 'Video Series', href: '/admin/test-series' },
    ],
  },
  { title: 'Messages', href: '/admin/message', icon: 'MessageSquare' },
  {
    title: 'Manage Setting',
    icon: 'Settings',
    children: [
      { title: 'Settings', href: '/admin/settings' },
      { title: 'Templates', href: '/admin/templates' },
      { title: 'Banners', href: '/admin/banners' },
    ],
  },
];
