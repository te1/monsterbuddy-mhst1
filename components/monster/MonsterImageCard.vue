<template>
  <section class="flex flex-col">
    <div class="flex justify-around">
      <MonsterImage class="overflow-hidden" :monster="monster" />
    </div>
    <div
      v-if="monster.description"
      class="flex-1 content-center text-center"
      v-text="monster.description"
    />
  </section>
</template>

<script>
export default {
  name: 'MonsterImageCard',

  props: {
    monster: {
      type: Object,
      required: true,
    },
  },
};
</script>
