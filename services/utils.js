import _ from 'lodash';
import {
  isSubspecies,
  isDeviant,
  isColorVariant,
  isElementalVariant,
  isEx,
  getMonsterLocation,
} from '~/services/data';

export function deepFreeze(object) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

  const propNames = Object.getOwnPropertyNames(object);

  for (const name of propNames) {
    if (name === '__ob__') {
      continue;
    }

    const value = object[name];

    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function makeSlug(text) {
  return text
    .replace(/( |\/)/g, '-')
    .replace(/\(|\)/g, '')
    .replace(/-&/, '')
    .toLowerCase();
}

export function formatMonsterNo(no, withHash = true) {
  let result = _.padStart(no, 3, '0');

  if (withHash) {
    result = '#' + result;
  }

  return result;
}

export function formatMonsterInfo(monster) {
  let result = formatMonsterNo(monster.no);

  if (isSubspecies(monster)) {
    result += ', Subspecies';
  }

  if (isDeviant(monster)) {
    // result += ', Deviant'; // "Deviant" is not used in MHST1
    result += ', Subspecies';
  }

  if (isColorVariant(monster)) {
    result += ', Color variant';
  }

  if (isElementalVariant(monster)) {
    result += ', Elemental variant';
  }

  if (isEx(monster)) {
    result += ', EX';
  }

  return result;
}

export function formatMonsterPrimaryLocation(monster) {
  let location = getMonsterLocation(monster, 'primary');

  if (location && location.sub) {
    return location.sub;
  }
  return null;
}

export function formatRidingActionType(type) {
  switch (type) {
    case 'utility':
      return 'Utility';

    case 'explore':
      return 'Exploration';

    case 'search':
      return 'Search';

    default:
      return '';
  }
}

export function formatAttackType(attackTypeOrMonster) {
  if (typeof attackTypeOrMonster !== 'string') {
    attackTypeOrMonster = attackTypeOrMonster?.monstie?.attackType;
  }

  switch (attackTypeOrMonster) {
    case 'power':
      return 'Power';

    case 'speed':
      return 'Speed';

    case 'technical':
      return 'Technical';

    default:
      return 'Unknown';
  }
}

export function formatElement(element) {
  switch (element) {
    case 'none':
      return 'Non-elemental';

    case 'fire':
      return 'Fire';

    case 'water':
      return 'Water';

    case 'thunder':
      return 'Thunder';

    case 'ice':
      return 'Ice';

    case 'dragon':
      return 'Dragon';

    default:
      return 'Unknown';
  }
}

export function formatWeaponType(weaponType) {
  switch (weaponType) {
    case 'slash':
      return 'Slash';

    case 'blunt':
      return 'Blunt';

    case 'pierce':
      return 'Pierce';

    default:
      return 'Unknown';
  }
}

export function formatGrowth(growth) {
  switch (growth) {
    case 'slow':
      return 'Slow';

    case 'regular':
      return 'Regular';

    case 'quick':
      return 'Quick';

    default:
      return 'Unknown';
  }
}

export function formatPhase(phase) {
  if (phase === 'DEFAULT') {
    return 'Default';
  }
  return phase;
}

export function getCounterAttackType(attackType) {
  switch (attackType) {
    case 'power':
      return 'speed';

    case 'technical':
      return 'power';

    case 'speed':
      return 'technical';

    default:
      return '?';
  }
}

export function formatRetreat(retreat) {
  if (retreat == null) {
    return;
  }

  let result = '';

  if (retreat.paintball) {
    result += 'Defeat within 3 turns after using a **Paintball**';

    switch (retreat.paintball) {
      case 'low':
        result += ' (low chance)';
        break;

      case 'high':
        result += ' (high chance)';
        break;
    }
  }

  if (retreat.condition) {
    if (retreat.paintball) {
      result += '\n';
    }

    result += retreat.condition;

    switch (retreat.chance) {
      case 'low':
        result += ' (low chance)';
        break;

      case 'high':
        result += ' (high chance)';
        break;
    }
  }

  return parseSomeMarkdown(result);
}

export function formatRetreatShort(retreat) {
  if (retreat == null) {
    return;
  }

  let result = '';

  if (retreat.paintball) {
    result += '**Paintball**';
  }

  if (retreat.condition) {
    if (retreat.paintball) {
      result += ', ';
    }

    result += retreat.condition;
  }

  return parseSomeMarkdown(result);
}

export function stripTags(input) {
  if (typeof window !== 'undefined') {
    // https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708

    let doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || '';
  }

  // DOMParser is not available in SSR, so use a workaround
  // https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/822464#822464
  return input.replace(/<[^>]*>?/gm, '');
}

export function parseSomeMarkdown(input) {
  let result = stripTags(input);

  // **some text** -> <b>some text</b>
  result = result.replace(/\*\*([^**]*)\*\*/g, '<b>$1</b>');

  // \n -> <br>
  result = result.replace(/\n/g, '<br>');

  return result;
}

export function makeHead(config = {}) {
  let result = {
    meta: [],
    link: [],
  };

  if (config.title) {
    result.title = config.title;

    result.meta.push({
      hid: 'twitter:title',
      name: 'twitter:title',
      content: config.title,
    });

    result.meta.push({
      hid: 'og:title',
      name: 'og:title',
      content: config.title,
    });
  }

  if (config.description) {
    result.meta.push({
      hid: 'description',
      name: 'description',
      content: config.description,
    });

    result.meta.push({
      hid: 'twitter:description',
      name: 'twitter:description',
      content: config.description,
    });

    result.meta.push({
      hid: 'og:description',
      name: 'og:description',
      content: config.description,
    });
  }

  if (config.canonical) {
    result.link.push({
      hid: 'canonical',
      rel: 'canonical',
      href: config.canonical,
    });
  }

  if (config.image) {
    result.meta.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: config.image,
    });

    result.meta.push({
      hid: 'og:image',
      name: 'og:image',
      content: config.image,
    });

    result.meta.push({
      hid: 'og:image:secure_url',
      name: 'og:image:secure_url',
      content: config.image,
    });
  }

  if (config.imageAlt) {
    result.meta.push({
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: config.imageAlt,
    });

    result.meta.push({
      hid: 'og:image:alt',
      name: 'og:image:alt',
      content: config.imageAlt,
    });
  }

  return result;
}
