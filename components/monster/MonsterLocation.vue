<template>
  <div
    :title="hint"
    :class="{
      '[@media(hover:hover)_and_(pointer:fine)]:underline decoration-dotted underline-offset-4 decoration-gray-500 dark:decoration-cool-400':
        hint,
    }"
  >
    {{ typeCaption }}

    <NuxtLink v-if="hasLink" :to="target" class="link">
      {{ caption }}
    </NuxtLink>

    <span v-else>
      {{ caption }}
    </span>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'MonsterLocation',

    props: {
      location: {
        type: Object,
        required: true,
      },
    },

    computed: {
      typeCaption() {
        switch (this.location.type) {
          case 'subQuest':
            return 'Subquest: ';

          default:
            return null;
        }
      },

      caption() {
        let result = this.location.main;

        if (this.location.sub) {
          result += ` - ${this.location.sub}`;
        }

        switch (this.location.type) {
          case 'superRareDen':
            result = 'Super Rare Dens in ' + result;
            break;

          case 'towerOfIllusion':
            result = 'Tower of Illusion - ' + result;
            break;
        }

        const extras = [];

        switch (this.location.rank) {
          // case 'low':
          //   extras.push('Low Rank');
          //   break;

          case 'high':
            extras.push('High Rank');
            break;
        }

        if (this.location.lateGame) {
          extras.push('Late Game');
        }

        if (this.location.subQuest) {
          extras.push('Subquest');
        }

        if (extras.length) {
          result += ` (${extras.join(', ')})`;
        }

        return result;
      },

      hint() {
        if (this.location.lateGame && this.location.lateGameHint) {
          return this.location.lateGameHint;
        }

        return '';
      },

      hasLink() {
        return _.includes(['towerOfIllusion'], this.location.type);
      },

      target() {
        switch (this.location.type) {
          case 'towerOfIllusion':
            return `/tower-of-illusion/?floor=${this.location.main}`;

          default:
            return '';
        }
      },
    },
  };
</script>
