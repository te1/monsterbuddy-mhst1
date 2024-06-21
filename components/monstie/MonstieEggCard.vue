<template>
  <section class="relative flex overflow-hidden">
    <EggImage class="-mx-3" :monster="monster" />
    <EggImage class="-mx-3" :monster="monster" :variant="2" />
    <EggImage class="-mx-3" :monster="monster" :variant="3" />
    <EggImage class="-mx-3" :monster="monster" :variant="4" />

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
