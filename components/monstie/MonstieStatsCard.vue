<template>
  <section v-if="hasStats" class="space-y-2 overflow-hidden">
    <h3 class="text-lg font-semibold">Monstie Stats</h3>

    <div class="flex gap-6">
      <div class="flex-1 space-y-1">
        <div>Growth: {{ growth }}</div>

        <div class="-mr-10 space-y-1 text-right">
          <div>HP</div>
          <div>ATK</div>
          <div>DEF</div>
          <div>SPD</div>
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <h4 class="text-right pr-4 font-semibold">Basic Stats</h4>

        <div class="space-y-1">
          <StatsBar :value="monster.monstie.stats.base.hp" />
          <StatsBar :value="monster.monstie.stats.base.atk" />
          <StatsBar :value="monster.monstie.stats.base.def" />
          <StatsBar :value="monster.monstie.stats.base.agi" />
        </div>
      </div>
    </div>

    <div class="flex gap-6">
      <div class="flex-1 space-y-1">
        <h4 class="text-right pr-4 font-semibold">Elemental Atk</h4>

        <div class="space-y-1">
          <StatsBar
            v-for="element in allElements"
            :key="element"
            :label="formatElement(element)"
            :value="monster.monstie.stats.attack[element]"
          >
            <ElementIcon class="w-5" :element="element" />
          </StatsBar>
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <h4 class="text-right pr-4 font-semibold">Elemental Res</h4>

        <div class="space-y-1">
          <StatsBar
            v-for="element in allElements"
            :key="element"
            :label="formatElement(element)"
            :value="monster.monstie.stats.defense[element]"
          >
            <ElementIcon class="w-5" :element="element" />
          </StatsBar>
        </div>
      </div>
    </div>

    <div class="flex pt-2 gap-6">
      <div class="flex-1">
        <div
          v-if="monster.monstie.stats.bestAttack"
          class="flex items-center gap-2"
        >
          <ElementIcon
            class="w-5"
            :element="monster.monstie.stats.bestAttack.element"
          />
          <span class="flex-1">Strongest</span>
          <span
            class="font-semibold"
            v-text="monster.monstie.stats.bestAttack.value"
          />
        </div>
      </div>

      <div class="flex-1">
        <div
          v-if="monster.monstie.stats.bestDefense"
          class="flex items-center gap-2"
        >
          <ElementIcon
            class="w-5"
            :element="monster.monstie.stats.bestDefense.element"
          />
          <span class="flex-1">Resistant</span>
          <span
            class="font-semibold"
            v-text="monster.monstie.stats.bestDefense.value"
          />
        </div>

        <div
          v-if="monster.monstie.stats.worstDefense"
          class="flex items-center gap-2"
        >
          <ElementIcon
            class="w-5"
            :element="monster.monstie.stats.worstDefense.element"
          />
          <span class="flex-1">Weak</span>
          <span
            class="font-semibold"
            v-text="monster.monstie.stats.worstDefense.value"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formatGrowth, formatElement, allElements } from '~/services/utils';

export default {
  name: 'MonstieStatsCard',

  props: {
    monster: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      allElements,
    };
  },

  computed: {
    hasStats() {
      return this.monster?.monstie?.stats?.base?.hp != null;
    },

    growth() {
      return formatGrowth(this.monster?.monstie?.growth);
    },
  },

  methods: {
    formatElement,
  },
};
</script>
