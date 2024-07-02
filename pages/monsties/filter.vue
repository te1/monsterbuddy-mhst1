<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/monsties/"
      :modes="modes"
      showSortByStats
      showHabitatFilter
      showAttackTypeFilter
      showAttackElementFilter
      showRidingActionFilter
    />
  </div>
</template>

<script>
export default {
  name: 'PageMonstiesFilter',

  inject: ['useFilterStore'],

  computed: {
    store() {
      return this.useFilterStore();
    },

    modes() {
      return [
        { value: 'location', caption: 'Location' },
        // { value: 'location-eldersLair', caption: "Elder's Lair" },
        { value: 'ridingActions', caption: 'Riding Actions' },
        { value: 'retreat', caption: 'Retreat' },
        { value: 'rarity', caption: 'Rarity' },
        { value: 'stats', caption: 'Stats' },
      ];
    },
  },
};
</script>
