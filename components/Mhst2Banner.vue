<template>
  <div
    v-show="show || force"
    class="note flex gap-3 bg-[#fef9c3] dark:bg-[#eab308]/25 px-4 py-3"
  >
    <div class="flex-1">
      Looking for info on
      <strong>Monster Hunter Stories 2: Wings of Ruin</strong> instead? Check
      out
      <a class="link" href="https://monsterbuddy.app" target="_blank">
        Monster Buddy for MHST2</a
      >.
    </div>

    <div v-if="!force" class="-mt-3 -mr-3">
      <AppIconButton
        :icon="['fas', 'times']"
        title="Don't show this anymore"
        class="text-xl"
        @click="hide"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mhst2Banner',

  props: {
    force: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    history() {
      return this.$useHistoryStore();
    },

    show() {
      return this.history.showMhst2Banner;
    },
  },

  methods: {
    hide() {
      this.history.hideMhst2Banner();
    },
  },
};
</script>
