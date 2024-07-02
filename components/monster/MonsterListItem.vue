<template>
  <div class="relative flex items-center h-[122px]">
    <div
      class="w-[120px] h-[120px] -mx-3 flex-shrink-0 flex flex-col gap-2 items-center justify-center"
    >
      <MonsterIcon :monster="monster" />

      <img
        v-if="monster.hatchable"
        :src="require('~/assets/icons/hatchable.svg')"
        alt="Hatchable"
        title="Hatchable"
        width="20"
        height="20"
        class="w-8 h-8"
      />
    </div>

    <div class="w-full mt-3 ml-3 text-sm whitespace-nowrap self-start">
      <div
        class="leading-tight text-gray-500 dark:text-cool-400"
        v-text="info"
      />
      <div class="text-base font-semibold leading-snug" v-text="monster.name" />

      <template v-if="showLocation || showRarity">
        <div v-text="monster.genus" />
        <div v-text="monster.habitat" />

        <div v-if="showLocation && location" v-text="location" />

        <div v-if="showRarity && monster.rarity">
          Rarity <span class="font-bold" v-text="monster.rarity" />
        </div>
      </template>

      <template v-if="showEldersLairFloors">
        <div v-for="floor in eldersLairFloors" :key="floor">
          Elder's Lair - {{ floor }}
        </div>
      </template>

      <div v-if="showCombat && monster.monster?.tendency">
        Tendency
        <AttackTypeLabel
          class="font-semibold"
          :type="monster.monster?.tendency"
        />
      </div>
    </div>

    <MonsterImage
      class="w-full h-full p-2 object-contain object-right overflow-hidden"
      style="flex-basis: 250px"
      :monster="monster"
      hideFallback
    />

    <div
      v-if="ticket"
      class="absolute top-0 right-0 px-2 py-0.5 rounded-bl text-xs font-semibold tracking-widest bg-gold/75 dark:bg-gold/25 text-gray-700 dark:text-gold"
      title="Golden SR ticket required"
    >
      SR
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {
  formatMonsterInfo,
  formatMonsterPrimaryLocation,
  formatPhase,
} from '~/services/utils';
import { getMonsterLocations } from '~/services/data';

export default {
  name: 'MonsterListItem',

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

    ticket: {
      type: String,
      required: false,
      default: null,
    },
  },

  computed: {
    info() {
      return formatMonsterInfo(this.monster);
    },

    location() {
      return formatMonsterPrimaryLocation(this.monster);
    },

    eldersLairFloors() {
      let locations = _.take(
        getMonsterLocations(this.monster, 'eldersLair'),
        3
      );

      return _.map(locations, 'main');
    },

    showLocation() {
      return _.includes(['location'], this.mode);
    },

    showEldersLairFloors() {
      return _.includes(['location-eldersLair'], this.mode);
    },

    showCombat() {
      return _.includes(['combat'], this.mode);
    },

    showRarity() {
      return _.includes(['rarity'], this.mode);
    },
  },

  methods: {
    formatPhase,
  },
};
</script>
