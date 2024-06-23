<template>
  <section class="relative space-y-3 overflow-hidden">
    <div class="space-y-1">
      <h3 class="text-lg font-semibold">Monstie Info</h3>

      <div class="flex items-center">
        <span class="w-40">Tendency</span>

        <AttackTypeIcon class="w-8 mr-1.5" :monster="monster" />
        <AttackTypeLabel class="font-semibold" :monster="monster" />
      </div>
    </div>

    <div v-if="monster.monstie?.kinshipSkill">
      <h3 class="text-lg font-semibold">Kinship Skill</h3>

      <div v-text="monster.monstie.kinshipSkill" />
    </div>

    <div v-if="hasRidingActions">
      <h3 class="text-lg font-semibold">Riding Actions</h3>

      <div>
        <span
          v-for="(action, index) in ridingActions"
          :key="action.name"
          class="inline-flex"
        >
          <NuxtLink :to="`/riding-actions/${action.slug}/`" class="link">
            {{ action.name }}
          </NuxtLink>
          <span v-if="index + 1 < ridingActions.length">,&nbsp;</span>
        </span>
      </div>
    </div>

    <div class="absolute top-0 right-0 pr-3">
      <AppPinToggle :pinned="isPinned" subject="monstie" @toggle="togglePin" />
    </div>
  </section>
</template>

<script>
import _ from 'lodash';
import { sortedRidingActions } from '~/services/data';

export default {
  name: 'MonstieInfoCard',

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

    hasRidingActions() {
      return !!this.monster?.monstie?.ridingActions?.length;
    },

    ridingActions() {
      return _.map(this.monster.monstie.ridingActions, (ridingAction) => {
        return {
          name: ridingAction,
          ..._.find(sortedRidingActions, { name: ridingAction }),
        };
      });
    },

    isPinned() {
      return this.history.isMonstiePinned(this.monster?.slug);
    },
  },

  methods: {
    togglePin() {
      this.history.togglePinnedMonstie(this.monster?.slug);
    },
  },
};
</script>
