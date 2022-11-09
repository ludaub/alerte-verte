import { Category } from './category';

export const categories: Record<string, Category> = {
  agriculture: {
    name: 'Agriculture',
    icon: 'agriculture',
    color: '#ffcdd2',
  },
  biodiversity: {
    name: 'Biodiversité',
    icon: 'emoji_nature',
    color: '#ef9a9a',
  },
  climate: {
    name: 'Climat',
    icon: 'device_thermostat',
    color: '#e57373',
  },
  demography: {
    name: 'Démographie',
    icon: 'group',
    color: '#ef5350',
  },
  economy: {
    name: 'Économie',
    icon: 'euro_symbol',
    color: '#f44336',
  },
  energy: {
    name: 'Énergie',
    icon: 'bolt',
    color: '#e53935',
  },
};
