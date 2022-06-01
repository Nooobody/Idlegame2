export const RESOURCES = [
  'gold',
  'wood',
  'stone',
  'iron',
  'lumber',
  'weapons'
]

export const UPGRADES = {
  wood_per_worker: {
    name: 'Wood per worker',
    type: 'basic',
    wood: 100,
    limit: 3,
    mul: 4,
    upgrade: {
      value: 'forest.tick.resource.amountPerWorker',
      op: '+',
      amount: 2
    }
  },
  wood_delay: {
    name: 'Reduce Wood timer',
    type: 'basic',
    wood: 50,
    gold: 100,
    limit: 3,
    mul: 15,
    upgrade: {
      value: 'forest.tick.delay',
      op: '/',
      amount: 1.3
    }
  },
  stone_delay: {
    name: 'Reduce Stone timer',
    type: 'basic',
    stone: 50,
    gold: 100,
    limit: 3,
    mul: 15,
    upgrade: {
      value: 'stone_gathering.tick.delay',
      op: '/',
      amount: 1.2
    }
  },
  stone_per_worker: {
    name: 'Stone per worker',
    type: 'basic',
    stone: 100,
    limit: 3,
    mul: 4,
    upgrade: {
      value: 'stone_gathering.tick.resource.amountPerWorker',
      op: '+',
      amount: 2
    }
  },
  food_per_worker: {
    name: 'Food per worker',
    type: 'basic',
    gold: 1000,
    wood: 1000,
    limit: 2,
    mul: 20,
    upgrade: {
      value: 'farm.staticResource.amountPerWorker',
      op: '+',
      amount: 1
    }
  },
  farm_capacity: {
    name: 'Farm worker capacity',
    type: 'basic',
    gold: 5000,
    wood: 2500,
    limit: 3,
    mul: 3,
    upgrade: {
      value: 'farm.workerCapacity',
      op: '+',
      amount: 1
    }
  },
  gold_mine_capacity: {
    name: 'Gold mine worker capacity',
    type: 'basic',
    gold: 2000,
    stone: 1000,
    limit: 2,
    mul: 5,
    upgrade: {
      value: 'gold_mine.workerCapacity',
      op: '+',
      amount: 1
    }
  },
  gold_tick: {
    name: 'Gold per tick',
    type: 'basic',
    gold: 1000,
    limit: 5,
    mul: 4,
    upgrade: {
      value: 'gold_mine.tick.resource.amountPerTick',
      op: '*',
      amount: 2
    }
  },
  iron_gold_tick: {
    name: 'Advanced Gold per tick',
    type: 'advanced',
    gold: 1000000,
    iron: 10000,
    limit: 1,
    upgrade: {
      value: 'gold_mine.tick.resource.amountPerTick',
      op: '*',
      amount: 4
    }
  },
  quarry_worker_capacity: {
    name: 'Quarry worker capacity',
    type: 'advanced',
    gold: 100000,
    iron: 1000,
    stone: 40000,
    limit: 2,
    mul: 1.2,
    upgrade: {
      value: 'quarry.workerCapacity',
      op: '+',
      amount: 2
    }
  },
  quarry_efficiency: {
    name: 'Quarry Efficiency',
    type: 'advanced',
    gold: 100000,
    iron: 1000,
    wood: 40000,
    mul: 1.2,
    limit: 3,
    upgrade: {
      value: 'quarry.tick.resource.amountPerTick',
      op: '*',
      amount: 1.5
    }
  },
  iron_mine_worker_capacity: {
    name: 'Iron mine worker capacity',
    type: 'advanced',
    gold: 100000,
    stone: 5000,
    wood: 5000,
    limit: 2,
    mul: 1.5,
    upgrade: {
      value: 'iron_mine.workerCapacity',
      op: '+',
      amount: 2
    }
  },
  iron_mine_efficiency: {
    name: 'Iron mine efficiency',
    type: 'advanced',
    gold: 100000,
    stone: 5000,
    wood: 5000,
    mul: 3,
    limit: 3,
    upgrade: {
      value: 'iron_mine.tick.resource.amountPerTick',
      op: '*',
      amount: 2
    }
  },
  lumbermill_efficiency: {
    name: 'Lumbermill efficiency',
    type: 'advanced',
    gold: 100000,
    iron: 5000,
    mul: 2,
    limit: 3,
    upgrade: [{
      value: 'lumbermill.tick.resource.amountPerTick',
      op: '*',
      amount: 1.5
    }, {
      value: 'lumbermill.tick.required.amountPerTick',
      op: '-',
      amount: 25
    }]
  },
  advanced_gold_mine_efficiency: {
    name: 'Advanced gold mine efficiency',
    type: 'advanced',
    gold: 5000000,
    lumber: 10000,
    iron: 10000,
    limit: 2,
    mul: 4,
    upgrade: {
      value: 'advanced_gold_mine.tick.resource.amountPerTick',
      op: '*',
      amount: 4
    }
  }
}

export const BUILDINGS = {
  farm: {
    name: 'Farm',
    gold: 100,
    wood: 50,
    mul: 1.1,
    workerCapacity: 1,
    staticResource: {
      name: 'food',
      amountPerWorker: 8
    }
  },
  forest: {
    name: 'Forest',
    tick: {
      delay: 5000,
      resource: {
        name: 'wood',
        amountPerWorker: 8
      }
    }
  },
  stone_gathering: {
    name: 'Stone Gathering',
    tick: {
      delay: 2000,
      resource: {
        name: 'stone',
        amountPerWorker: 4
      }
    }
  },
  gold_mine: {
    name: 'Gold Mine',
    stone: 50,
    add: 50,
    workerCapacity: 4,
    tick: {
      delay: 2000,
      resource: {
        name: 'gold',
        amountPerTick: 8
      }
    }
  },
  quarry: {
    name: 'Quarry',
    gold: 10000,
    iron: 1000,
    wood: 3000,
    mul: 1.2,
    workerCapacity: 5,
    tick: {
      delay: 2500,
      resource: {
        name: 'stone',
        amountPerTick: 30
      }
    }
  },
  iron_mine: {
    name: 'Iron Mine',
    gold: 2000,
    stone: 2000,
    mul: 1.5,
    workerCapacity: 4,
    tick: {
      delay: 4000,
      resource: {
        name: 'iron',
        amountPerTick: 20
      }
    }
  },
  lumbermill: {
    name: 'Lumbermill',
    gold: 5000,
    iron: 2000,
    wood: 2000,
    mul: 1.2,
    workerCapacity: 4,
    tick: {
      delay: 3000,
      resource: {
        name: 'lumber',
        amountPerTick: 20
      },
      required: {
        name: 'wood',
        amountPerTick: 100
      }
    }
  },
  advanced_gold_mine: {
    name: 'Advanced Gold Mine',
    iron: 400,
    lumber: 400,
    mul: 1.2,
    workerCapacity: 3,
    tick: {
      delay: 1500,
      resource: {
        name: 'gold',
        amountPerTick: 2000
      }
    }
  },
  blacksmith: {
    name: 'Blacksmith',
    gold: 10000,
    iron: 5000,
    lumber: 5000,
    mul: 1.2,
    workerCapacity: 2,
    tick: {
      delay: 6000,
      resource: {
        name: 'weapons',
        amountPerWorker: 2
      }
    }
  }
}
