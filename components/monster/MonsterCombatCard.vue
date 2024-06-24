<template>
  <section v-if="hasCombatInfo" class="relative space-y-3 overflow-hidden">
    <div class="space-y-1">
      <h3 class="text-lg font-semibold">Monster Info</h3>

      <div v-if="hasTendency" class="flex items-center">
        <span class="w-20 sm:w-40">Tendency</span>

        <AttackTypeIcon class="w-8 mr-1.5" :type="monster.monster.tendency" />
        <AttackTypeLabel
          class="font-semibold"
          :type="monster.monster.tendency"
        />
      </div>

      <div v-if="hasElementalAtk" class="flex items-center">
        <span class="w-20 sm:w-40">Elemental Attack</span>

        <span
          v-for="element in monster.monster.elementalAtk"
          :key="element"
          class="flex items-center"
        >
          <ElementIcon class="w-8 mr-1.5" :element="element" />
          <ElementLabel class="font-semibold" :element="element" />
        </span>
      </div>

      <div v-if="hasElementalResistance" class="flex items-center">
        <span class="w-20 sm:w-40">Resistance</span>

        <span
          v-for="element in monster.monster.elementalResistance"
          :key="element"
          class="flex items-center"
        >
          <ElementIcon class="w-8 mr-1.5" :element="element" />
          <ElementLabel class="w-12 font-semibold" :element="element" />
        </span>
      </div>

      <div v-if="hasElementalWeakness" class="flex items-center">
        <span class="w-20 sm:w-40">Weakness</span>

        <span
          v-for="element in monster.monster.elementalWeakness"
          :key="element"
          class="flex items-center"
        >
          <ElementIcon class="w-8 mr-1.5" :element="element" />
          <ElementLabel class="w-12 font-semibold" :element="element" />
        </span>
      </div>
    </div>

    <div class="absolute top-0 right-0 pt-1 pr-3">
      <AppPinToggle
        :pinned="isPinned"
        subject="monster attack pattern"
        @toggle="togglePin"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'MonsterCombatCard',

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

    hasTendency() {
      return !!this.monster?.monster?.tendency;
    },

    hasElementalAtk() {
      return !!this.monster?.monster?.elementalAtk?.length;
    },

    hasElementalResistance() {
      return !!this.monster?.monster?.elementalResistance?.length;
    },

    hasElementalWeakness() {
      return !!this.monster?.monster?.elementalWeakness?.length;
    },

    hasCombatInfo() {
      return (
        this.hasTendency ||
        this.hasElementalAtk ||
        this.hasElementalResistance ||
        this.hasElementalWeakness
      );
    },

    isPinned() {
      return this.history.isMonsterPinned(this.monster?.slug);
    },
  },

  methods: {
    togglePin() {
      this.history.togglePinnedMonster(this.monster?.slug);
    },
  },
};
</script>
