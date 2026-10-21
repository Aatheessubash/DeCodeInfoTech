import assert from 'node:assert/strict';
import test from 'node:test';
import { INITIAL_MEDIA_ASSETS } from '../src/data/site-content.ts';

test('initial media assets are properly structured and valid', () => {
  assert.ok(Array.isArray(INITIAL_MEDIA_ASSETS));
  assert.ok(INITIAL_MEDIA_ASSETS.length > 0);
  for (const asset of INITIAL_MEDIA_ASSETS) {
    assert.ok(asset.id, 'Asset must have an id');
    assert.ok(asset.name, 'Asset must have a name');
    assert.ok(asset.path, 'Asset must have a path');
    assert.ok(['image', 'video'].includes(asset.type), 'Asset type must be image or video');
  }
});

test('reordering helper correctly handles both string ID and index movements', () => {
  const items = [
    { id: 'item-1', name: 'First' },
    { id: 'item-2', name: 'Second' },
    { id: 'item-3', name: 'Third' },
  ];

  function moveItem(prev, fromIndexOrId, toIndexOrDirection) {
    let fromIndex;
    let toIndex;
    if (typeof fromIndexOrId === 'string') {
      fromIndex = prev.findIndex((p) => p.id === fromIndexOrId);
      if (fromIndex === -1) return prev;
      toIndex = fromIndex + toIndexOrDirection;
    } else {
      fromIndex = fromIndexOrId;
      toIndex = toIndexOrDirection;
    }
    if (toIndex < 0 || toIndex >= prev.length || fromIndex === toIndex) return prev;
    const copy = [...prev];
    const [item] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, item);
    return copy;
  }

  // Move item-2 up by 1 position (direction: -1)
  const movedUp = moveItem(items, 'item-2', -1);
  assert.deepEqual(
    movedUp.map((i) => i.id),
    ['item-2', 'item-1', 'item-3'],
  );

  // Move item-2 down by 1 position (direction: 1)
  const movedDown = moveItem(items, 'item-2', 1);
  assert.deepEqual(
    movedDown.map((i) => i.id),
    ['item-1', 'item-3', 'item-2'],
  );

  // Move item-1 up (out of bounds) should return unchanged
  const outOfBounds = moveItem(items, 'item-1', -1);
  assert.deepEqual(
    outOfBounds.map((i) => i.id),
    ['item-1', 'item-2', 'item-3'],
  );

  // Move by numeric index (from 0 to 2)
  const movedByIndex = moveItem(items, 0, 2);
  assert.deepEqual(
    movedByIndex.map((i) => i.id),
    ['item-2', 'item-3', 'item-1'],
  );
});
