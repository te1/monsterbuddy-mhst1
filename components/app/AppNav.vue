<template>
  <div>
    <header
      class="fixed bottom-0 w-full h-12 z-20 shadow-top border-t border-gray-300 bg-white dark:border-cool-600 dark:bg-cool-800"
    >
      <nav
        class="container mx-auto px-4 h-full grid grid-flow-col auto-cols-fr divide-x divide-gray-300 dark:divide-cool-600 select-none"
      >
        <AppNavLink to="/monsters/" text="Monsters" />

        <AppNavLink to="/monsties/" text="Monsties" />

        <AppNavLink to="/eggs/" text="Eggs" />

        <div
          class="flex items-center justify-center font-semibold tracking-wide cursor-pointer transition-colors-slow text-gray-500 hover:text-gray-700 active:bg-gray-200 dark:text-cool-300 dark:hover:text-cool-100 dark:active:bg-cool-700"
          @click="toggleMore"
        >
          More
        </div>
      </nav>
    </header>

    <transition
      enter-active-class="transition-opacity-slow"
      leave-active-class="transition-opacity-slow"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      @after-enter="showMoreContent = true"
    >
      <div
        v-if="showMore"
        class="fixed top-0 bottom-12 inset-x-0 z-30 overflow-hidden bg-black/50"
        @click="toggleMore"
      >
        <transition
          enter-active-class="transition-transform-slow"
          leave-active-class="transition-transform-slow"
          enter-class="transform translate-y-full"
          enter-to-class="transform translate-y-0"
          leave-class="transform translate-y-0"
          leave-to-class="transform translate-y-full"
          @after-leave="showMore = false"
        >
          <nav
            v-if="showMoreContent"
            class="container mx-auto py-2 absolute bottom-0 right-0 w-auto select-none rounded-tl-md shadow-top border-t border-l border-gray-300 bg-white dark:border-cool-600 dark:bg-cool-800"
          >
            <AppNavLink to="/" text="Monster Buddy" exact more />

            <AppNavLink
              to="/tower-of-illusion/"
              text="Tower of Illusion"
              more
            />

            <AppNavLink to="/riding-actions/" text="Riding Actions" more />
          </nav>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppNav',

  data() {
    return {
      showMore: false,
      showMoreContent: false,
    };
  },

  mounted() {
    this.$router.beforeEach((to, from, next) => {
      if (this.showMore) {
        this.hideMore();
      }
      next();
    });
  },

  methods: {
    hideMore() {
      this.showMoreContent = false;

      document.body.style.overflow = 'auto';
    },

    toggleMore() {
      if (this.showMore) {
        this.hideMore();
      } else {
        this.showMore = true;

        document.body.style.overflow = 'hidden';
      }
    },
  },
};
</script>
