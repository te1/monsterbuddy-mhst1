<template>
  <div>
    <div class="leading-tight text-gray-500 dark:text-cool-400" v-text="info" />
    <div class="text-base font-semibold leading-snug" v-text="monster.name" />

    <template v-if="showLocation || showRarity">
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />

      <div v-if="showLocation && location" v-text="location" />

      <div v-if="showRarity && monster.rarity">
        Rarity <span class="font-bold" v-text="monster.rarity" />
      </div>
    </template>

    <template v-if="showTowerOfIllusionFloors">
      <div v-for="floor in towerOfIllusionFloors" :key="floor">
        Tower of Illusion - {{ floor }}
      </div>
    </template>

    <!-- eslint-disable vue/no-v-html -->
    <div v-if="showRetreat" class="whitespace-normal" v-html="retreat" />

    <div v-if="showRidingActions && monster.monstie" class="whitespace-normal">
      <span
        v-for="(action, index) in monster.monstie.ridingActions"
        :key="action"
      >
        <span v-text="action" /><span
          v-if="index + 1 < monster.monstie.ridingActions.length"
          >,
        </span>
      </span>
    </div>

    <div v-if="showStats">
      <div v-if="hasStats">
        HP
        <span
          class="font-bold"
          :class="getStatClass('base.hp')"
          v-text="monster.monstie.stats.base.hp"
        />, ATK
        <span
          class="font-bold"
          :class="getStatClass('base.atk')"
          v-text="monster.monstie.stats.base.atk"
        />, DEF
        <span
          class="font-bold"
          :class="getStatClass('base.def')"
          v-text="monster.monstie.stats.base.def"
        />, SPD
        <span
          class="font-bold"
          :class="getStatClass('base.spd')"
          v-text="monster.monstie.stats.base.spd"
        />
      </div>

      <div v-if="monster.monstie?.stats?.bestAttack">
        Elemental Atk
        <span
          class="font-bold"
          :class="getStatClass('bestAttack.value')"
          v-text="monster.monstie.stats.bestAttack.value"
        />
      </div>

      <div v-if="defense">
        Elemental Res
        <span
          class="font-bold"
          :class="getStatClass('bestDefense.value', 'worstDefense.value')"
          v-text="defense"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapStores } from 'pinia';
import useMonstieFilter from '~/stores/monstieFilter';
import {
  formatMonsterInfo,
  formatMonsterPrimaryLocation,
  formatRetreatShort,
} from '~/services/utils';
import { getMonsterLocations } from '~/services/data';

export default {
  name: 'MonstieListItemContent',

  props: {
    monster: {
      type: Object,
      required: true,
    },

    mode: {
      type: String,
      required: false,
      default: 'location',
    },
  },

  computed: {
    ...mapStores(useMonstieFilter),

    info() {
      return formatMonsterInfo(this.monster);
    },

    location() {
      return formatMonsterPrimaryLocation(this.monster);
    },

    towerOfIllusionFloors() {
      let locations = _.take(
        getMonsterLocations(this.monster, 'towerOfIllusion'),
        3
      );

      return _.map(locations, 'main');
    },

    retreat() {
      return formatRetreatShort(this.monster?.monstie?.retreat);
    },

    hasStats() {
      return this.monster?.monstie?.stats?.base?.hp != null;
    },

    defense() {
      let result = [];

      if (this.monster?.monstie?.stats?.bestDefense) {
        result.push(this.monster.monstie.stats.bestDefense.value);
      }

      if (this.monster?.monstie?.stats?.worstDefense) {
        result.push(this.monster.monstie.stats.worstDefense.value);
      }

      return result.join(' / ');
    },

    showLocation() {
      return _.includes(['location'], this.mode);
    },

    showTowerOfIllusionFloors() {
      return _.includes(['location-towerOfIllusion'], this.mode);
    },

    showRidingActions() {
      return _.includes(['ridingActions'], this.mode);
    },

    showRetreat() {
      return (
        _.includes(['retreat'], this.mode) && !!this.monster?.monstie?.retreat
      );
    },

    showRarity() {
      return _.includes(['rarity'], this.mode);
    },

    showStats() {
      return _.includes(['stats'], this.mode);
    },
  },

  methods: {
    getStatClass(...statKeys) {
      if (!_.isArray(statKeys)) {
        statKeys = [statKeys];
      }
      statKeys = _.map(statKeys, (statKey) => 'monstie.stats.' + statKey);

      if (_.includes(statKeys, this.monstieFilter.sortKey)) {
        return ['text-brand-600', 'dark:text-brand-400'];
      }
      return null;
    },
  },
};
</script>
