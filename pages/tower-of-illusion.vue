<template>
  <div>
    <h1 class="sr-only">Tower of Illusion</h1>

    <AppTopBar
      :showBack="showFilter"
      backFallback="/tower-of-illusion/"
      :heading="heading"
    >
      <AppSearchBox
        v-show="!showFilter"
        v-model="towerOfIllusionFilter.nameFilter"
      />
    </AppTopBar>

    <NuxtLink :to="fabTarget">
      <AppFloatingButton :title="fabTitle">
        <FaIcon :icon="fabIcon" />
      </AppFloatingButton>
    </NuxtLink>

    <NuxtChild v-show="!leaving && showFilter" />

    <main v-show="leaving || !showFilter">
      <div
        v-if="
          towerOfIllusionFilter.hasActiveSort ||
          towerOfIllusionFilter.hasActiveFilters
        "
        class="fixed z-20 w-full inset-x-0 top-12 mt-1"
      >
        <div
          class="container px-4 flex flex-wrap gap-2 items-center justify-center"
        >
          <AppFilterPill
            v-if="towerOfIllusionFilter.hasActiveSort"
            :caption="towerOfIllusionFilter.activeSort.caption"
            filterTarget="/monsties/filter/"
            :sortOrder="towerOfIllusionFilter.activeSort.order"
          />

          <AppFilterPill
            v-for="filter in towerOfIllusionFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/monsters/filter/"
            showRemove
            @remove="towerOfIllusionFilter[filter.name] = null"
          />
        </div>
      </div>

      <ul
        class="space-y-5"
        :class="{
          'mt-8':
            towerOfIllusionFilter.hasActiveSort ||
            towerOfIllusionFilter.hasActiveFilters,
        }"
      >
        <li
          v-for="(group, key) in towerOfIllusionFilter.groupedMonsters"
          :key="key"
        >
          <div
            v-if="towerOfIllusionFilter.isGrouped"
            class="sticky top-12 z-10 flex items-center -mx-1 px-1 -mt-3 -mb-1 py-1 border-t bg-gray-300 border-gray-300 dark:bg-cool-700 dark:border-cool-700"
          >
            <FaIcon
              class="!w-6 text-gray-500 dark:text-cool-400"
              :icon="['fas', 'map-marker-alt']"
            />

            <div class="font-semibold mb-1">Tower of Illusion - {{ key }}</div>
          </div>

          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/monsters/${monster.slug}/`"
            >
              <MonsterListItem
                :monster="monster"
                :mode="towerOfIllusionFilter.mode"
                class="box box-link px-1 overflow-hidden"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <MonsterNoResults v-if="towerOfIllusionFilter.isEmpty">
        No monsters found
      </MonsterNoResults>
    </main>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useTowerOfIllusionFilter from '~/stores/towerOfIllusionFilter';
import { makeHead } from '~/services/utils';

export default {
  name: 'PageTowerOfIllusion',

  provide: {
    useFilterStore: useTowerOfIllusionFilter,
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.leaving = false;

      if (to?.query?.floor) {
        vm.towerOfIllusionFilter.towerOfIllusionFilter = to.query.floor;

        // remove query parametrs from URL
        vm.$router.replace(to.path);
      }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.leaving = true;
    next();
  },

  data() {
    return {
      leaving: false,
    };
  },

  head() {
    return makeHead({
      title:
        'Monster Buddy - Tower of Illusion Monster List For Monster Hunter Stories 1 / Remaster',
      description:
        'Overview of all the high rank monsters and on which floor to find them in the Tower of Illusion end game zone',
      canonical: 'https://mhst1.monsterbuddy.app/tower-of-illusion/',
    });
  },

  computed: {
    ...mapStores(useTowerOfIllusionFilter),

    showFilter() {
      // workaround for <NuxtChild> not playing nice with <Nuxt keep-alive>
      return this.$route?.path === '/tower-of-illusion/filter/';
    },

    heading() {
      if (this.showFilter) {
        return 'View Options';
      }
      return null;
    },

    fabTarget() {
      if (this.showFilter) {
        return '/tower-of-illusion/';
      }
      return '/tower-of-illusion/filter/';
    },

    fabTitle() {
      if (this.showFilter) {
        return 'Apply';
      }
      return 'View options';
    },

    fabIcon() {
      if (this.showFilter) {
        return ['fas', 'check'];
      }
      return ['fas', 'sliders-h'];
    },
  },
};
</script>
