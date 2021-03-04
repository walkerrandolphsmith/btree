import { BTree, Item } from '../src';

describe('BTree', () => {
  describe('given an empty btree', () => {
    const btree = new BTree(3);
    const one = new Item(1);
    it('should return a default length of 0', () => {
      expect(btree.length()).toEqual(0);
    });
    it('should not contain the element one', () => {
      expect(btree.contains(one)).toEqual(false);
    });
    it('should return null when getting the element one', () => {
      expect(btree.get(one)).toEqual(null);
    });
  });
});
