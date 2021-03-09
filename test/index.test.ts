import { BTree } from '../src';

describe('BTree', () => {
  describe('given an empty btree', () => {
    const btree = new BTree(3);
    const abscentKey = 1;
    it('should return a default size of 0', () => {
      expect(btree.size()).toEqual(0);
    });
    it('should not contain the element one', () => {
      expect(btree.has(abscentKey)).toEqual(false);
    });
    it('should return null when getting the element one', () => {
      expect(btree.get(abscentKey)).toEqual(null);
    });
  });
  describe('given a non-empty btree', () => {
    const btree = new BTree(3);
    btree.set(3);
    btree.set(10);
    btree.set(2);
    btree.set(4);
    it('should return a size of 3', () => {
      expect(btree.size()).toEqual(4);
    });
    it('should contain the keys 3, 10, and 2', () => {
      expect(btree.has(3)).toEqual(true);
      expect(btree.has(10)).toEqual(true);
      expect(btree.has(2)).toEqual(true);
      expect(btree.has(4)).toEqual(true);
    });
    it('should get the btree that contains the key', () => {
      expect(btree.get(3)).toEqual(btree);
      expect(btree.get(10)).toEqual(btree.edges[1]);
      expect(btree.get(2)).toEqual(btree.edges[0]);
      expect(btree.get(4)).toEqual(btree.edges[1]);
    });
  });
});
