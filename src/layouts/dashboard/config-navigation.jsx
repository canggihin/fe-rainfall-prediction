import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Data Table',
    path: '/data',
    icon: icon('ic_user'),
  },
  {
    title: 'Device Status',
    path: '/device',
    icon: icon('ic_status'),
  },
];

export default navConfig;
