<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/tower-of-illusion/"
      :modes="modes"
      hideSort
      showTowerOfIllusionFilter
      showHatchableFilter
    />
  </div>
</template>

<script>
export default {
  name: 'PageTowerOfIllusionFilter',

  inject: ['useFilterStore'],

  computed: {
    store() {
      return this.useFilterStore();
    },

    modes() {
      return [
        { value: 'location', caption: 'Location' },
        { value: 'combat', caption: 'Combat Info' },
      ];
    },
  },
};
</script>
