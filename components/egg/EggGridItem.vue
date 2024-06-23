<template>
  <div class="flex flex-col items-center h-[150px]">
    <EggImage
      v-if="genus"
      class="w-[120px] h-[120px] -mx-3"
      :monster="monster"
      :genus="genus"
    />
    <div v-else class="h-[120px] flex flex-row isolate">
      <EggImage :monster="monster" />
      <template v-if="monster?.monstie?.eggVariants !== 1">
        <EggImage
          class="-ml-16 lg:-ml-6 -z-10"
          :monster="monster"
          :variant="2"
        />
        <EggImage
          class="-ml-16 lg:-ml-6 -z-20"
          :monster="monster"
          :variant="3"
        />
        <EggImage
          class="-ml-16 lg:-ml-6 -z-30"
          :monster="monster"
          :variant="4"
        />
      </template>
    </div>

    <div class="mb-2 font-semibold whitespace-nowrap" v-text="text" />
  </div>
</template>

<script>
export default {
  name: 'EggGridItem',

  props: {
    monster: {
      type: Object,
      required: false,
      default: null,
    },

    genus: {
      type: String,
      required: false,
      default: null,
    },
  },

  computed: {
    text() {
      if (this.genus) {
        return this.genus;
      }
      return this.monster.name;
    },
  },
};
</script>
