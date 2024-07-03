import _ from 'lodash';
import { makeMonsterFilterStore } from './base';
import { monsters } from '~/services/data';

const initial = {
  sortKey: 'towerOfIllusion',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'combat',
    autoSwitchModes: ['location', 'combat'],
  },
};

let filteredMonsters = _.filter(monsters, (monster) => {
  return _.some(monster.locations, { type: 'towerOfIllusion' });
});

const useTowerOfIllusionFilter = makeMonsterFilterStore(
  'towerOfIllusionFilter',
  filteredMonsters,
  initial,
  extend
);

export default useTowerOfIllusionFilter;
