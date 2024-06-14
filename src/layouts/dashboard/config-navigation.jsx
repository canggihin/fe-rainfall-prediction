import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const iconSecond = (name) => (
  <SvgColor src={`/assets/icon-gif/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: iconSecond('device'),
  },
  {
    title: 'Data Table',
    path: '/data',
    icon: iconSecond('server'),
  },
  {
    title: 'Device Status',
    path: '/device',
    icon: iconSecond('wireless-connection'),
  },
];

export default navConfig;
