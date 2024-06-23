<template>
  <div>
    <AppTopBar heading="Monster Buddy" />

    <main class="max-w-screen-lg mx-auto">
      <div class="flex flex-col gap-6 lg:flex-col-reverse">
        <p class="text-base text-justify">
          <b>Monster Buddy</b> is a companion app for Monster Hunter Stories 1
          that can help you learn or remember information useful during combat
          and general gameplay. It's not a complete guide, walkthrough or
          advanced character / gene planner (yet). You can use it for all
          versions including the Remaster, iOS, Android and original on the
          Nintendo 3DS.
        </p>

        <div class="flex flex-col items-center">
          <div class="relative inline-block w-[180px] h-[200px]">
            <AttackTypeIcon
              class="absolute top-0 left-0 right-0 mx-auto w-[70px] h-[70px]"
              type="power"
            />
            <AttackTypeIcon
              class="absolute bottom-[25px] left-0 w-[70px] h-[70px]"
              type="speed"
            />
            <AttackTypeIcon
              class="absolute bottom-[25px] right-0 w-[70px] h-[75px]"
              type="technical"
            />
            <FaIcon
              class="absolute top-[45px] right-[10px] !w-12 !h-12 rotate-[85deg] text-gray-500 dark:text-cool-400"
              :icon="['fas', 'share']"
            />
            <FaIcon
              class="absolute top-[45px] left-[10px] !w-12 !h-12 rotate-[330deg] text-gray-500 dark:text-cool-400"
              :icon="['fas', 'share']"
            />
            <FaIcon
              class="absolute bottom-[0px] left-0 right-0 mx-auto !w-12 !h-12 rotate-[215deg] text-gray-500 dark:text-cool-400"
              :icon="['fas', 'share']"
            />
          </div>
        </div>
      </div>

      <div class="prose prose-sm dark:prose-dark max-w-none">
        <div class="grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h3>Features</h3>

            <ul>
              <li>
                <NuxtLink class="link" to="/monsters/">Monster list</NuxtLink>
                with <s>attack patterns</s> and elemental weaknesses
              </li>

              <li>
                <NuxtLink class="link" to="/monsties/">Monstie list</NuxtLink>
                with attack tendencies, <s>retreat conditions</s>, locations and
                stats
              </li>

              <li>
                <NuxtLink class="link" to="/eggs/">Visual egg list</NuxtLink>
                with search, sorting and filtering
              </li>

              <!--
              <li>
                <NuxtLink class="link" to="/catavan-stands/">Catavan stands</NuxtLink>
                with list of monsters you will find nearby
              </li>

              <li>
                <NuxtLink class="link" to="/elders-lair/">Elder's Lair overview</NuxtLink>
                to quickly find high rank monsters on each floor
              </li>

              <li>
                <NuxtLink class="link" to="/coop/">Co-Op quest list</NuxtLink>
                to see which eggs will be available in the different dens
              </li>
              -->

              <li>
                <NuxtLink class="link" to="/riding-actions/">
                  Riding action list
                </NuxtLink>
                and which monsties will learn them
              </li>

              <li>
                Keeps track of your recently viewed monsters, monsties and eggs
                for fast and easy navigation
              </li>

              <!--
              <li>Bookmark monsters to quickly check their attack patterns</li>
              -->

              <li>Bookmark your favorite monsties to find them quickly</li>

              <li>
                Bookmark eggs to quickly find what your are currently looking
                for
              </li>
            </ul>
          </div>

          <div>
            <h3>Spoiler Warning</h3>

            <p class="text-justify">
              This contains names and images of monsters, names of locations,
              information that can make combat easier, information on which
              monsters can become monsties, etc. If you don't want that
              information just yet proceed at your own discretion.
            </p>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h3>Sources for data and images</h3>

            <ul>
              <li>In-game Monsterpedia</li>

              <li>
                <a
                  class="link"
                  href="https://monsterhunter.fandom.com/wiki/Monster_Hunter_Wiki"
                  target="_blank"
                  rel="noopener"
                >
                  Monster Hunter Wiki
                </a>
              </li>

              <li>
                <a
                  class="link"
                  href="https://mhst.kiranico.com"
                  target="_blank"
                  rel="noopener"
                >
                  MHStories
                </a>
                by
                <a
                  class="link"
                  href="https://twitter.com/kiranico_db"
                  target="_blank"
                  rel="noopener"
                >
                  Kiranico
                </a>
              </li>

              <li>
                <a
                  class="link"
                  href="https://www.gameskinny.com/tips/monster-hunter-stories-guide-all-egg-patterns-and-locations/"
                  target="_blank"
                  rel="noopener"
                >
                  Monster Hunter Stories Guide: All Egg Patterns and Locations
                </a>
              </li>

              <li>
                <a
                  class="link"
                  href="https://www.reddit.com/r/MonsterHunterStories/comments/1dfkkc7/monster_hunter_stories_mega_spreadsheet/"
                  target="_blank"
                  rel="noopener"
                >
                  Monster Hunter Stories - Mega Spreadsheet
                </a>
                by
                <a
                  class="link"
                  href="https://www.reddit.com/user/AleHitti/"
                  target="_blank"
                  rel="noopener"
                >
                  AleHitti
                </a>
              </li>

              <li>
                <a
                  class="link"
                  href="https://www.reddit.com/r/MonsterHunterStories/comments/1disa4v/mhst_1_and_2_monstie_builder/"
                  target="_blank"
                  rel="noopener"
                >
                  MHST 1 and 2 Monstie Builder
                </a>
                by
                <a
                  class="link"
                  href="https://www.reddit.com/user/AtapelierArt/"
                  target="_blank"
                  rel="noopener"
                >
                  AtapelierArt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Other great resources</h3>

            <ul>
              <li>
                <a
                  class="link"
                  href="https://game.capcom.com/manual/MHST_Multi/"
                  target="_blank"
                  rel="noopener"
                >
                  Official Web Manual
                </a>
              </li>

              <li>
                <a
                  class="link"
                  href="https://www.reddit.com/r/MonsterHunterStories/comments/m17vcj/every_monster_in_stories_1_and_how_well_they/"
                  target="_blank"
                  rel="noopener"
                >
                  Every Monster in Stories 1, and how well they perform
                </a>
                by
                <a
                  class="link"
                  href="https://www.reddit.com/user/DreadAndDonuts/"
                  target="_blank"
                  rel="noopener"
                >
                  DreadAndDonuts
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { makeHead } from '~/services/utils';

export default {
  name: 'PageIndex',

  head() {
    return makeHead({
      canonical: 'https://mhst1.monsterbuddy.app',
    });
  },
};
</script>
