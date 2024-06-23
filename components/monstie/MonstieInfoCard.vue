<template>
  <section class="relative space-y-3 overflow-hidden">
    <div class="space-y-1">
      <h3 class="text-lg font-semibold">Monstie Info</h3>

      <div class="flex items-center">
        <AttackTypeIcon class="w-8 mr-1.5" :monster="monster" />
        <AttackTypeLabel class="w-24 font-semibold" :monster="monster" />

        <span>Tendency</span>
      </div>

      <div v-if="monster.monstie?.attackElement" class="flex items-center">
        <ElementIcon
          class="w-8 mr-1.5"
          :element="monster.monstie.attackElement"
        />
        <ElementLabel
          class="w-24 font-semibold"
          :element="monster.monstie.attackElement"
        />

        <span>Strongest Elemental Atk</span>
      </div>

      <div
        v-if="monster.monstie?.stats?.bestDefense?.element"
        class="flex items-center"
      >
        <ElementIcon
          class="w-8 mr-1.5"
          :element="monster.monstie.stats.bestDefense.element"
        />
        <ElementLabel
          class="w-24 font-semibold"
          :element="monster.monstie.stats.bestDefense.element"
        />

        <span>Strongest Elemental Res</span>
      </div>

      <div
        v-if="monster.monstie?.stats?.worstDefense?.element"
        class="flex items-center"
      >
        <ElementIcon
          class="w-8 mr-1.5"
          :element="monster.monstie.stats.worstDefense.element"
        />
        <ElementLabel
          class="w-24 font-semibold"
          :element="monster.monstie.stats.worstDefense.element"
        />

        <span>Weakest Elemental Res</span>
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
