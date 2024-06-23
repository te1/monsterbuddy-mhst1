<template>
  <section class="relative flex overflow-hidden isolate">
    <EggImage class="-mx-3" :monster="monster" />
    <EggImage
      v-if="monster?.monstie?.eggVariants >= 2"
      class="-ml-12 sm:-mx-3 -z-10"
      :monster="monster"
      :variant="2"
    />
    <EggImage
      v-if="monster?.monstie?.eggVariants >= 3"
      class="-ml-16 sm:-mx-3 -z-20"
      :monster="monster"
      :variant="3"
    />
    <EggImage
      v-if="monster?.monstie?.eggVariants >= 4"
      class="-ml-16 sm:-mx-3 -z-30"
      :monster="monster"
      :variant="4"
    />

    <div v-if="hasRetreat" class="flex-1 mx-3">
      <h3 class="text-lg font-semibold">Retreat</h3>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="retreat" />
    </div>

    <div class="absolute top-0 right-0 pt-3 pr-3">
      <AppPinToggle :pinned="isPinned" subject="egg" @toggle="togglePin" />
    </div>
  </section>
</template>

<script>
import { parseSomeMarkdown } from '~/services/utils';

export default {
  name: 'MonstieEggCard',

  props: {
    monster: {
      type: Object,
      required: true,
    },
  },

  computed: {
    history() {
      return this.$useHistoryStore();
    },

    hasRetreat() {
      return !!this.monster?.monstie?.retreat;
    },

    retreat() {
      return parseSomeMarkdown(this.monster?.monstie?.retreat);
    },

    isPinned() {
      return this.history.isEggPinned(this.monster?.slug);
    },
  },

  methods: {
    togglePin() {
      this.history.togglePinnedEgg(this.monster?.slug);
    },
  },
};
</script>
