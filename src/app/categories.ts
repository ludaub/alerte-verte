import { Category } from './category';

export const categories: Record<string, Category> = {
  agriculture: {
    name: 'Agriculture',
    icon: 'nutrition',
    color: '#ffcdd2',
  },
  biodiversity: {
    name: 'Biodiversité',
    icon: 'pets',
    color: '#ef9a9a',
  },
  climate: {
    name: 'Climat',
    icon: 'device_thermostat',
    color: '#e57373',
  },
  energy: {
    name: 'Énergie',
    icon: 'bolt',
    color: '#ef5350',
  },
  environment: {
    name: 'Environnement',
    icon: 'public',
    color: '#f44336',
  },
  resources: {
    name: 'Ressources',
    icon: 'water_drop',
    color: '#e53935',
  },
};
