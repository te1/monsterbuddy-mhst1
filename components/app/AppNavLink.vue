<template>
  <NuxtLink
    :to="to"
    class="flex items-center font-semibold tracking-wide transition-colors-slow text-gray-500 hover:text-gray-700 active:bg-gray-200 dark:text-cool-300 dark:hover:text-cool-100 dark:active:bg-cool-700"
    :class="classes"
    :active-class="activeClasses"
    :exact-active-class="exactActiveClasses"
    @mousedown.native="handleClick"
  >
    {{ text }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'AppNavLink',

  props: {
    to: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    exact: {
      type: Boolean,
      required: false,
      default: false,
    },

    more: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    classes() {
      if (this.more) {
        return 'justify-start pl-6 pr-8 py-1.5';
      }
      return 'justify-center';
    },

    baseActiveClasses() {
      return 'text-brand-500 hover:text-brand-500 active:text-brand-500 dark:text-brand-400 dark:hover:text-brand-400 dark:active:text-brand-400';
    },

    activeClasses() {
      if (this.exact) {
        return null;
      }
      return this.baseActiveClasses;
    },

    exactActiveClasses() {
      if (!this.exact) {
        return null;
      }
      return this.baseActiveClasses;
    },
  },

  methods: {
    handleClick() {
      let route = this.$router.match(this.to);

      if (route && this.$route && route.path === this.$route.path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  },
};
</script>
