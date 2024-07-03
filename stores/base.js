import _ from 'lodash';
import { defineStore, setMapStoreSuffix } from 'pinia';

import {
  getGenera,
  getHabitats,
  getCatavanStands,
  getTowerOfIllusionFloors,
  getRidingActions,
  getMonstersByName,
  getMonstersByGenus,
  getMonstersByHabitat,
  getMonstersByCatavanStand,
  getMonstersByTowerOfIllusionFloor,
  getMonstiesByAttackType,
  getMonstiesByAttackElement,
  getMonstiesByRidingAction,
  getMonstersByHatchable,
  getMonstersByIsDeviant,
  sortedHabitats,
} from '~/services/data';
import { formatAttackType, formatElement } from '~/services/utils';

setMapStoreSuffix('');

export function makeMonsterFilterStore(
  storeId,
  monsters,
  initial = {},
  extend = {}
) {
  _.defaults(initial, {
    sortKey: null,
    sortOrder: null,
    nameFilter: null,
    genusFilter: null,
    habitatFilter: null,
    catavanFilter: null,
    towerOfIllusionFilter: null,
    attackTypeFilter: null,
    attackElementFilter: null,
    ridingActionFilter: null,
    hatchableFilter: null,
    deviantsFilter: null,
  });

  return defineStore({
    id: storeId,

    state() {
      return {
        monsters,

        sortKey: initial.sortKey,
        sortOrder: initial.sortOrder,
        nameFilter: initial.nameFilter,
        genusFilter: initial.genusFilter,
        habitatFilter: initial.habitatFilter,
        catavanFilter: initial.catavanFilter,
        towerOfIllusionFilter: initial.towerOfIllusionFilter,
        attackTypeFilter: initial.attackTypeFilter,
        attackElementFilter: initial.attackElementFilter,
        ridingActionFilter: initial.ridingActionFilter,
        hatchableFilter: initial.hatchableFilter,
        deviantsFilter: initial.deviantsFilter,

        ...extend?.state,
      };
    },

    getters: {
      allGenera() {
        return getGenera(this.monsters);
      },

      allHabitats() {
        return getHabitats(this.monsters);
      },

      allCatavanStands() {
        return getCatavanStands(this.monsters);
      },

      allTowerOfIllusionFloors() {
        return getTowerOfIllusionFloors(this.monsters);
      },

      allRidingActions() {
        return getRidingActions(this.monsters);
      },

      filteredMonsters() {
        let result = this.monsters;

        if (this.nameFilter != null) {
          result = getMonstersByName(this.nameFilter, result);
        }

        if (this.genusFilter != null) {
          result = getMonstersByGenus(this.genusFilter, result);
        }

        if (this.habitatFilter != null) {
          result = getMonstersByHabitat(this.habitatFilter, result);
        }

        if (this.catavanFilter != null) {
          result = getMonstersByCatavanStand(this.catavanFilter, result);
        }

        if (this.towerOfIllusionFilter != null) {
          result = getMonstersByTowerOfIllusionFloor(
            this.towerOfIllusionFilter,
            result
          );
        }

        if (this.attackTypeFilter != null) {
          result = getMonstiesByAttackType(this.attackTypeFilter, result);
        }

        if (this.attackElementFilter != null) {
          result = getMonstiesByAttackElement(this.attackElementFilter, result);
        }

        if (this.ridingActionFilter != null) {
          result = getMonstiesByRidingAction(this.ridingActionFilter, result);
        }

        if (this.hatchableFilter != null) {
          result = getMonstersByHatchable(this.hatchableFilter, result);
        }

        if (this.deviantsFilter != null) {
          result = getMonstersByIsDeviant(this.deviantsFilter, result);
        }

        return result;
      },

      sortedMonsters() {
        let result = this.filteredMonsters;

        let allowedSortKeys = [
          'no',
          'name',
          'genus',
          'habitat',
          'rarity',
          'monstie.stats.base.hp',
          'monstie.stats.base.atk',
          'monstie.stats.base.def',
          'monstie.stats.base.spd',
          'monstie.stats.bestAttack.value',
          'monstie.stats.bestDefense.value',
          'monstie.stats.worstDefense.value',
        ];

        if (!_.includes(allowedSortKeys, this.sortKey)) {
          return result;
        }

        const orderForNull = this.sortKey === 'no' ? Infinity : -Infinity;

        let getSortValue;

        switch (this.sortKey) {
          case 'habitat':
            getSortValue = (item) => {
              const habitat = _.get(item, this.sortKey);
              return (
                _.find(sortedHabitats, { name: habitat })?.sortOrder ?? habitat
              );
            };
            break;

          default:
            getSortValue = (item) => _.get(item, this.sortKey);
            break;
        }

        let value;

        return _.orderBy(
          result,
          (item) => {
            value = getSortValue(item);

            if (value == null || value === '?' || value === '???') {
              return orderForNull;
            }
            return value;
          },
          this.sortOrder
        );
      },

      groupedMonsters() {
        let result = this.sortedMonsters;

        switch (this.sortKey) {
          case 'genus':
            result = _.groupBy(result, 'genus');
            break;

          case 'habitat':
            result = _.groupBy(result, 'habitat');
            break;

          case 'towerOfIllusion':
            result = this.groupedMonstersByTowerOfIllusionFloors(result);
            break;

          default:
            result = { all: result };
            break;
        }

        return result;
      },

      groupedMonstersByTowerOfIllusionFloors: (state) => (monsters) => {
        let floors;
        if (state.towerOfIllusionFilter) {
          floors = [state.towerOfIllusionFilter];
        } else {
          floors = getTowerOfIllusionFloors(monsters);
        }

        return _.reduce(
          floors,
          (result, floor) => {
            result[floor] = getMonstersByTowerOfIllusionFloor(floor, monsters);

            return result;
          },
          {}
        );
      },

      resultCount() {
        return this.sortedMonsters.length;
      },

      isEmpty() {
        return !this.sortedMonsters.length;
      },

      isGrouped() {
        return _.includes(
          ['genus', 'habitat', 'towerOfIllusion'],
          this.sortKey
        );
      },

      activeSort() {
        switch (this.sortKey) {
          case 'name':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'Name',
            };

          case 'rarity':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'Rarity',
            };

          case 'monstie.stats.base.hp':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'HP',
            };

          case 'monstie.stats.base.atk':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'ATK',
            };

          case 'monstie.stats.base.def':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'DEF',
            };

          case 'monstie.stats.base.spd':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'SPD',
            };

          case 'monstie.stats.bestAttack.value':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'Best Attack',
            };

          case 'monstie.stats.bestDefense.value':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'Best Defense',
            };

          case 'monstie.stats.worstDefense.value':
            return {
              name: this.sortKey,
              order: this.sortOrder,
              caption: 'Worst Defense',
            };

          default:
            return null;
        }
      },

      hasActiveSort() {
        return this.activeSort != null;
      },

      activeFilters() {
        let result = [];

        if (this.genusFilter != null && this.sortKey !== 'genus') {
          result.push({ name: 'genusFilter', value: this.genusFilter });
        }

        if (this.habitatFilter != null && this.sortKey !== 'habitat') {
          result.push({ name: 'habitatFilter', value: this.habitatFilter });
        }

        if (this.catavanFilter != null) {
          result.push({ name: 'catavanFilter', value: this.catavanFilter });
        }

        if (
          this.towerOfIllusionFilter != null &&
          this.sortKey !== 'towerOfIllusion'
        ) {
          result.push({
            name: 'towerOfIllusionFilter',
            value: 'Tower of Illusion - ' + this.towerOfIllusionFilter,
          });
        }

        if (this.attackTypeFilter != null) {
          result.push({
            name: 'attackTypeFilter',
            value: formatAttackType(this.attackTypeFilter),
          });
        }

        if (this.attackElementFilter != null) {
          result.push({
            name: 'attackElementFilter',
            value: formatElement(this.attackElementFilter),
          });
        }

        if (this.ridingActionFilter != null) {
          result.push({
            name: 'ridingActionFilter',
            value: this.ridingActionFilter,
          });
        }

        if (this.hatchableFilter != null) {
          result.push({
            name: 'hatchableFilter',
            value: this.hatchableFilter ? 'Hatchable' : 'Not Hatchable',
          });
        }

        if (this.deviantsFilter != null) {
          result.push({
            name: 'deviantsFilter',
            value: this.deviantsFilter ? 'Deviant' : 'No Deviants',
          });
        }

        return result;
      },

      hasActiveFilters() {
        return !!this.activeFilters?.length;
      },

      ...extend?.getters,
    },

    actions: {
      resetFilter() {
        this.nameFilter = initial.nameFilter;
        this.genusFilter = initial.genusFilter;
        this.habitatFilter = initial.habitatFilter;
        this.catavanFilter = initial.catavanFilter;
        this.towerOfIllusionFilter = initial.towerOfIllusionFilter;
        this.attackTypeFilter = initial.attackTypeFilter;
        this.attackElementFilter = initial.attackElementFilter;
        this.ridingActionFilter = initial.ridingActionFilter;
        this.hatchableFilter = initial.hatchableFilter;
        this.deviantsFilter = initial.deviantsFilter;
      },

      resetFilterAndSort() {
        this.resetFilter();

        this.sortKey = initial.sortKey;
        this.sortOrder = initial.sortOrder;
      },

      ...extend?.actions,
    },
  });
}
