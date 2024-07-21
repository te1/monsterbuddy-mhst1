import _ from 'lodash';
import { deepFreeze, makeSlug } from './utils';
import monsters from '~/assets/data/monsters';
import sortedHabitats from '~/assets/data/habitats';
import sortedRidingActions from '~/assets/data/ridingActions';

export const allElements = ['fire', 'water', 'thunder', 'ice', 'dragon'];

_.forEach(monsters, (monster) => {
  monster.slug = makeSlug(monster.name);

  if (monster.habitat == null) {
    monster.habitat = 'Unknown Habitat';
  }

  if (monster.hatchable && monster.monstie) {
    if (monster.monstie.eggVariants == null) {
      monster.monstie.eggVariants = 4;
    }

    if (monster.monstie.stats) {
      monster.monstie.attackElement = getMonstieAttackElement(monster);
      monster.monstie.stats.bestAttack = getMonstieBestAttack(monster);
      monster.monstie.stats.bestDefense = getMonstieBestDefense(monster);
      monster.monstie.stats.worstDefense = getMonstieWorstDefense(monster);
    }
  }
});
deepFreeze(monsters);

_.forEach(sortedRidingActions, (ridingAction) => {
  ridingAction.slug = makeSlug(ridingAction.name);
});
deepFreeze(sortedRidingActions);

export { monsters, sortedHabitats, sortedRidingActions };
export const monstersByName = Object.freeze(_.keyBy(monsters, 'name'));
export const monstersBySlug = Object.freeze(_.keyBy(monsters, 'slug'));
export const monsties = getMonstersByHatchable(true);
export const ridingActionsBySlug = Object.freeze(
  _.keyBy(sortedRidingActions, 'slug')
);

export function getGenera(monsterList = monsters) {
  return deepFreeze(_.sortBy(_.uniq(_.map(monsterList, 'genus'))));
}

export function getHabitats(monsterList = monsters) {
  let habitats = _.uniq(_.map(monsterList, 'habitat'));

  return deepFreeze(
    _.sortBy(habitats, (habitat) => {
      return _.find(sortedHabitats, { name: habitat })?.sortOrder ?? habitat;
    })
  );
}

export function getTowerOfIllusionFloors(monsterList = monsters) {
  return deepFreeze(
    _.sortBy(
      _.uniq(
        _.flatMap(monsterList, (monster) => {
          return _.map(
            _.filter(monster.locations, { type: 'towerOfIllusion' }),
            'main'
          );
        })
      ),
      (floor) => parseInt(floor, 10)
    )
  );
}

export function getRidingActions(monsterList = monsties) {
  return deepFreeze(
    _.sortBy(
      _.reject(
        _.uniq(_.flatMap(_.map(monsterList, 'monstie.ridingActions'))),
        (ridingAction) => {
          return !ridingAction;
        }
      )
    )
  );
}

export function getMonstersByName(name, monsterList = monsters) {
  name = _.toLower(name);

  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return _.includes(_.toLower(monster.name), name);
    })
  );
}

export function getMonstersByGenus(genus, monsterList = monsters) {
  return deepFreeze(_.filter(monsterList, { genus }));
}

export function getMonstersByHabitat(habitat, monsterList = monsters) {
  return deepFreeze(_.filter(monsterList, { habitat }));
}

export function getMonstersByTowerOfIllusionFloor(
  towerOfIllusionFloor,
  monsterList = monsters
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return _.some(monster.locations, {
        type: 'towerOfIllusion',
        main: towerOfIllusionFloor,
      });
    })
  );
}

export function getMonstiesByAttackType(attackType, monsterList = monsties) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return monster?.monstie?.tendency === attackType;
    })
  );
}

export function getMonstiesByAttackElement(
  attackElement,
  monsterList = monsties
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return monster?.monstie?.attackElement === attackElement;
    })
  );
}

export function getMonstiesByRidingAction(
  ridingAction,
  monsterList = monsties
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return _.includes(monster?.monstie?.ridingActions, ridingAction);
    })
  );
}

export function getMonstersByIsSubspecies(
  mustBeSubspecies,
  monsterList = monsters
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return isSubspecies(monster) === mustBeSubspecies;
    })
  );
}

export function getMonstersByIsDeviant(mustBeDeviant, monsterList = monsters) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return isDeviant(monster) === mustBeDeviant;
    })
  );
}

export function getMonstersByHatchable(hatchable, monsterList = monsters) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      if (hatchable) {
        return monster.hatchable === hatchable;
      }
      return !monster.hatchable;
    })
  );
}

export function isVariant(monster, variantType) {
  return _.some(monster?.related, (relation) => relation.type === variantType);
}

export function isSubspecies(monster) {
  return isVariant(monster, 'subspeciesOf');
}

export function isDeviant(monster) {
  return isVariant(monster, 'deviantOf');
}

export function isColorVariant(monster) {
  return isVariant(monster, 'color');
}

export function isElementalVariant(monster) {
  return isVariant(monster, 'element');
}

export function isEx(monster) {
  return isVariant(monster, 'exOf');
}

export function getMonsterLocation(monster, locationType) {
  return _.find(monster.locations, { type: locationType });
}

export function getMonsterLocations(monster, locationType) {
  return _.filter(monster.locations, { type: locationType });
}

function getMonstieAttackElement(monster) {
  return getMonstieBestAttack(monster)?.element;
}

function getMonstieAttackStats(monster) {
  let attack = monster?.monstie?.stats?.attack;

  attack = _.transform(
    attack,
    (result, value, key) => {
      result.push({ element: key, value });
    },
    []
  );

  return attack;
}

function getMonstieBestAttack(monster) {
  const attack = getMonstieAttackStats(monster);

  const result = _.maxBy(attack, 'value');
  if (result) {
    result.elements = _.map(
      _.filter(attack, { value: result.value }),
      'element'
    );

    if (result.elements.length === allElements.length) {
      return;
    }
  }

  return result;
}

function getMonstieDefenseStats(monster) {
  let defense = monster?.monstie?.stats?.defense;

  defense = _.transform(
    defense,
    (result, value, key) => {
      result.push({ element: key, value });
    },
    []
  );

  return defense;
}

function getMonstieWorstDefense(monster) {
  const defense = getMonstieDefenseStats(monster);

  const result = _.minBy(defense, 'value');

  if (result) {
    result.elements = _.map(
      _.filter(defense, { value: result.value }),
      'element'
    );

    if (result.elements.length === allElements.length) {
      return;
    }
  }

  return result;
}

function getMonstieBestDefense(monster) {
  const defense = getMonstieDefenseStats(monster);

  const result = _.maxBy(defense, 'value');
  if (result) {
    result.elements = _.map(
      _.filter(defense, { value: result.value }),
      'element'
    );

    if (result.elements.length === allElements.length) {
      return;
    }
  }

  return result;
}
