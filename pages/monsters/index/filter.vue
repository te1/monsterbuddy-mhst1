<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/monsters/"
      :modes="modes"
      showHabitatFilter
      showHatchableFilter
    />
  </div>
</template>

<script>
export default {
  name: 'PageMonstersFilter',

  inject: ['useFilterStore'],

  computed: {
    store() {
      return this.useFilterStore();
    },

    modes() {
      return [
        { value: 'location', caption: 'Location' },
        // { value: 'location-eldersLair', caption: "Elder's Lair" },
        { value: 'combat', caption: 'Combat Info' },
        { value: 'rarity', caption: 'Rarity' },
      ];
    },
  },
};
</script>
