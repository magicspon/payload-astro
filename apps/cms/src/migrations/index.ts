import * as migration_20260524_172653 from './20260524_172653';
import * as migration_20260524_173148 from './20260524_173148';
import * as migration_20260524_224227 from './20260524_224227';
import * as migration_20260525_001010 from './20260525_001010';
import * as migration_20260525_002931 from './20260525_002931';
import * as migration_20260525_004722 from './20260525_004722';

export const migrations = [
  {
    up: migration_20260524_172653.up,
    down: migration_20260524_172653.down,
    name: '20260524_172653',
  },
  {
    up: migration_20260524_173148.up,
    down: migration_20260524_173148.down,
    name: '20260524_173148',
  },
  {
    up: migration_20260524_224227.up,
    down: migration_20260524_224227.down,
    name: '20260524_224227',
  },
  {
    up: migration_20260525_001010.up,
    down: migration_20260525_001010.down,
    name: '20260525_001010',
  },
  {
    up: migration_20260525_002931.up,
    down: migration_20260525_002931.down,
    name: '20260525_002931',
  },
  {
    up: migration_20260525_004722.up,
    down: migration_20260525_004722.down,
    name: '20260525_004722'
  },
];
