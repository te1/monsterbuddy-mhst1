<template>
  <div class="space-y-3">
    <section class="box px-4 py-3 flex flex-col space-y-3">
      <div class="flex items-center">
        <h3 class="flex-1 text-lg font-semibold">
          <label class="block w-full cursor-pointer" for="MonsterFilter_Mode">
            Quick Info
          </label>
        </h3>

        <select
          id="MonsterFilter_QuickInfo"
          v-model="store.mode"
          class="input w-[180px] px-2 py-1"
        >
          <option v-for="mode in modes" :key="mode.value" :value="mode.value">
            {{ mode.caption }}
          </option>
        </select>
      </div>
    </section>

    <section v-if="!hideSort" class="box px-4 py-3 flex flex-col space-y-3">
      <div class="flex items-center">
        <h3 class="flex-1 text-lg font-semibold">
          <label class="block w-full cursor-pointer" for="MonsterFilter_SortBy">
            Sort By
          </label>
        </h3>

        <select
          id="MonsterFilter_SortBy"
          :value="store.sortKey"
          class="input w-[180px] px-2 py-1"
          @input="onSortKeyChanged"
        >
          <option
            v-for="item in sortConfig"
            :key="item.value"
            :value="item.value"
          >
            {{ item.caption }}
          </option>
        </select>
      </div>

      <div
        class="flex items-center cursor-pointer select-none"
        @click="toggleSortOrder"
      >
        <label class="flex-1 cursor-pointer">Order</label>

        <AppSortOrderToggle v-model="store.sortOrder" class="w-[180px]" />
      </div>
    </section>

    <section class="box px-4 py-3 flex flex-col space-y-3">
      <div class="flex items-center">
        <h3 class="flex-1 text-lg font-semibold">
          <label
            class="block w-full cursor-pointer"
            for="MonsterFilter_NameFilter"
          >
            Filter
          </label>
        </h3>

        <div class="w-[180px] relative">
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer transition-opacity-slow"
            :class="{ 'opacity-0': !store.nameFilter }"
          >
            <AppIconButton
              :icon="['fas', 'times']"
              class="text-gray-500 dark:text-cool-400"
              title="Clear"
              @click="clearNameFilter"
            />
          </div>

          <input
            id="MonsterFilter_NameFilter"
            ref="inputName"
            v-model="store.nameFilter"
            type="text"
            class="input w-full px-2 py-1"
            placeholder="Search"
          />
        </div>
      </div>

      <div class="flex items-center">
        <label class="flex-1 cursor-pointer" for="MonsterFilter_GenusFilter">
          Genus
        </label>

        <select
          id="MonsterFilter_GenusFilter"
          :value="store.genusFilter"
          class="input w-[180px] px-2 py-1"
          @input="onGenusFilterChanged"
        >
          <option :value="null">All</option>

          <option v-for="genus in store.allGenera" :key="genus" :value="genus">
            {{ genus }}
          </option>
        </select>
      </div>

      <div v-if="showHabitatFilter" class="flex items-center">
        <label class="flex-1 cursor-pointer" for="MonsterFilter_HabitatFilter">
          Habitat
        </label>

        <select
          id="MonsterFilter_HabitatFilter"
          :value="store.habitatFilter"
          class="input w-[180px] px-2 py-1"
          @input="onHabitatFilterChanged"
        >
          <option :value="null">All</option>

          <option
            v-for="habitat in store.allHabitats"
            :key="habitat"
            :value="habitat"
          >
            {{ habitat }}
          </option>
        </select>
      </div>

      <div v-if="showTowerOfIllusionFilter" class="flex items-center">
        <label
          class="flex-1 cursor-pointer"
          for="MonsterFilter_TowerOfIllusionFilter"
        >
          Tower of Illusion
        </label>

        <select
          id="MonsterFilter_TowerOfIllusionFilter"
          :value="store.towerOfIllusionFilter"
          class="input w-[180px] px-2 py-1"
          @input="onTowerOfIllusionFilterChanged"
        >
          <option :value="null">All</option>

          <option
            v-for="floor in store.allTowerOfIllusionFloors"
            :key="floor"
            :value="floor"
          >
            {{ floor }}
          </option>
        </select>
      </div>

      <div v-if="showAttackTypeFilter" class="flex items-center">
        <label
          class="flex-1 cursor-pointer"
          for="MonsterFilter_AttackTypeFilter"
        >
          Tendency
        </label>

        <select
          id="MonsterFilter_AttackTypeFilter"
          v-model="store.attackTypeFilter"
          class="input w-[180px] px-2 py-1"
        >
          <option :value="null">All</option>

          <option
            v-for="type in ['power', 'speed', 'technical']"
            :key="type"
            :value="type"
            v-text="formatAttackType(type)"
          />
        </select>
      </div>

      <div v-if="showAttackElementFilter" class="flex items-center">
        <label
          class="flex-1 cursor-pointer"
          for="MonsterFilter_AttackElementFilter"
        >
          Strong Elemental Atk
        </label>

        <select
          id="MonsterFilter_AttackElementFilter"
          v-model="store.attackElementFilter"
          class="input w-[180px] px-2 py-1"
        >
          <option :value="null">All</option>

          <option
            v-for="element in allElements"
            :key="element"
            :value="element"
            v-text="formatElement(element)"
          />
        </select>
      </div>

      <div v-if="showRidingActionFilter" class="flex items-center">
        <label
          class="flex-1 cursor-pointer"
          for="MonsterFilter_RidingActionFilter"
        >
          Riding Action
        </label>

        <select
          id="MonsterFilter_RidingActionFilter"
          :value="store.ridingActionFilter"
          class="input w-[180px] px-2 py-1"
          @input="onRidingActionFilterChanged"
        >
          <option :value="null">All</option>

          <option
            v-for="ridingAction in store.allRidingActions"
            :key="ridingAction"
            :value="ridingAction"
          >
            {{ ridingAction }}
          </option>
        </select>
      </div>

      <div
        v-if="showHatchableFilter"
        class="py-1 flex items-center select-none"
        @click="toggleFilterValue('hatchableFilter')"
      >
        <label class="flex-1 cursor-pointer">Hatchable</label>

        <AppFilterToggle
          v-model="store.hatchableFilter"
          class="w-[180px]"
          :texts="['Include', 'Only Hatchable', 'Exclude']"
        />
      </div>

      <div
        v-if="showDeviantsFilter"
        class="py-1 flex items-center select-none"
        @click="toggleFilterValue('deviantsFilter')"
      >
        <label class="flex-1 cursor-pointer">Deviants</label>

        <AppFilterToggle
          v-model="store.deviantsFilter"
          class="w-[180px]"
          :texts="['Include', 'Only Deviants', 'Exclude']"
        />
      </div>
    </section>

    <section class="box px-4 py-2 flex items-center">
      <h3 class="flex-1 text-lg font-semibold">Results</h3>

      <span class="w-[180px]" v-text="store.resultCount" />
    </section>

    <section class="flex gap-2 justify-center">
      <NuxtLink v-if="backTarget" :to="backTarget">
        <AppTextButton>Apply</AppTextButton>
      </NuxtLink>

      <AppTextButton @click="store.resetFilterAndSort">Reset</AppTextButton>
    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import { formatAttackType, formatElement } from '~/services/utils';
import { allElements } from '~/services/data';

export default {
  name: 'MonsterFilter',

  inject: ['useFilterStore'],

  props: {
    backTarget: {
      type: String,
      required: false,
      default: null,
    },

    modes: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },

    hideSort: {
      type: Boolean,
      required: false,
      default: false,
    },

    showSortByStats: {
      type: Boolean,
      require: false,
      default: false,
    },

    showHabitatFilter: {
      type: Boolean,
      required: false,
      default: false,
    },

    showTowerOfIllusionFilter: {
      type: Boolean,
      required: false,
      default: false,
    },

    showAttackTypeFilter: {
      type: Boolean,
      required: false,
      default: false,
    },

    showAttackElementFilter: {
      type: Boolean,
      required: false,
      default: false,
    },

    showRidingActionFilter: {
      type: Boolean,
      required: false,
      default: false,
    },

    showHatchableFilter: {
      type: Boolean,
      required: false,
      default: false,
    },

    showDeviantsFilter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      allElements,
    };
  },

  computed: {
    store() {
      return this.useFilterStore();
    },

    sortConfig() {
      let result = [
        { value: 'no', caption: 'Number' },
        { value: 'name', caption: 'Name' },
        { value: 'rarity', caption: 'Rarity', default: 'desc', mode: 'rarity' },
        { value: 'genus', caption: 'Genus', mode: 'location' },
        { value: 'habitat', caption: 'Habitat', mode: 'location' },
      ];

      if (this.showSortByStats) {
        result.push(
          {
            value: 'monstie.stats.base.hp',
            caption: 'HP',
            default: 'desc',
            mode: 'stats',
          },
          {
            value: 'monstie.stats.base.atk',
            caption: 'ATK',
            default: 'desc',
            mode: 'stats',
          },
          {
            value: 'monstie.stats.base.def',
            caption: 'DEF',
            default: 'desc',
            mode: 'stats',
          },
          {
            value: 'monstie.stats.base.spd',
            caption: 'SPD',
            default: 'desc',
            mode: 'stats',
          }
          // {
          //   value: 'monstie.stats.bestAttack.value',
          //   caption: 'Strongest Elemental Atk',
          //   default: 'desc',
          //   mode: 'stats',
          // },
          // {
          //   value: 'monstie.stats.bestDefense.value',
          //   caption: 'Strongest Elemental Res',
          //   default: 'desc',
          //   mode: 'stats',
          // },
          // {
          //   value: 'monstie.stats.worstDefense.value',
          //   caption: 'Weakest Elemental Res',
          //   default: 'desc',
          //   mode: 'stats',
          // }
        );
      }

      return result;
    },
  },

  methods: {
    formatAttackType,
    formatElement,

    getSortConfigItem(value) {
      return _.find(this.sortConfig, { value });
    },

    onSortKeyChanged(e) {
      let oldValue = this.store.sortKey;
      let newValue = e?.target?.value;

      if (newValue != null && newValue !== oldValue) {
        this.store.sortKey = newValue;

        let config = this.getSortConfigItem(newValue);

        if (config && config.default) {
          this.store.sortOrder = config.default;
        } else {
          this.store.sortOrder = 'asc';
        }

        if (
          config &&
          config.mode &&
          this.store.mode !== 'compact' &&
          (this.store.autoSwitchModes == null ||
            _.includes(this.store.autoSwitchModes, config.mode))
        ) {
          this.store.mode = config.mode;
        }
      }
    },

    toggleSortOrder() {
      this.store.sortOrder = this.store.sortOrder === 'asc' ? 'desc' : 'asc';
    },

    clearNameFilter() {
      this.store.nameFilter = null;

      let input = this.$refs.inputName;
      if (input) {
        this.$nextTick(() => {
          input.focus();
        });
      }
    },

    onFilterChanged(filterKey, e, mode = null) {
      let oldValue = this.store[filterKey];
      let newValue = e?.target?.value;

      if (newValue === '') {
        newValue = null;
      }

      if (newValue !== oldValue) {
        this.store[filterKey] = newValue;

        if (
          newValue != null &&
          mode != null &&
          this.store.mode !== 'compact' &&
          (this.store.autoSwitchModes == null ||
            _.includes(this.store.autoSwitchModes, mode))
        ) {
          this.store.mode = mode;
        }
      }
    },

    onGenusFilterChanged(e) {
      this.onFilterChanged('genusFilter', e, 'location');
    },

    onHabitatFilterChanged(e) {
      this.onFilterChanged('habitatFilter', e, 'location');
    },

    onTowerOfIllusionFilterChanged(e) {
      this.onFilterChanged(
        'towerOfIllusionFilter',
        e,
        'location-towerOfIllusion'
      );
    },

    onRidingActionFilterChanged(e) {
      this.onFilterChanged('ridingActionFilter', e, 'ridingActions');
    },

    toggleFilterValue(key) {
      let value = this.store[key];

      switch (value) {
        case null:
          value = true;
          break;

        case true:
          value = false;
          break;

        case false:
          value = null;
          break;
      }

      this.store[key] = value;
    },
  },
};
</script>
