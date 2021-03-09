interface IBTree {
  branchingFactor: number;
  keys: number[];
  edges: IBTree[];
  size(): number;
  has(key: number): boolean;
  get(key: number): IBTree | null;
  set(key: number): void;
}

export class BTree implements IBTree {
  private _size: number;
  private _maxNumberOfKeys: number;
  branchingFactor: number;
  keys: number[];
  edges: IBTree[];
  constructor(branchingFactor: number) {
    this.branchingFactor = branchingFactor;
    this._maxNumberOfKeys = branchingFactor - 1;
    this.keys = [];
    this.edges = [];
    this._size = 0;
  }
  isLeaf() {
    return this.edges.length === 0;
  }
  hasOverflown() {
    return this.keys.length > this._maxNumberOfKeys;
  }
  size() {
    return this._size;
  }
  set(key: number) {
    this._size += 1;
    if (this.isLeaf()) {
      const foundIndex = this.keys.findIndex(k => key < k);
      const index = foundIndex === -1 ? this.keys.length : foundIndex;
      this.keys.splice(index, 0, key);
      if (this.hasOverflown()) {
        const middleIndex = Math.floor(this.keys.length / 2);
        const leftKeys = this.keys.slice(0, middleIndex);
        const parentKeys = this.keys.slice(middleIndex, middleIndex + 1);
        const rightKeys = this.keys.slice(middleIndex + 1);
        this.keys = parentKeys;
        const leftTree = new BTree(this.branchingFactor);
        leftTree.keys = leftKeys;
        const rightTree = new BTree(this.branchingFactor);
        rightTree.keys = rightKeys;
        this.edges.push(leftTree);
        this.edges.push(rightTree);
      }
    } else {
      const foundIndex = this.keys.findIndex(k => key < k);
      const edgeIndex = foundIndex === -1 ? this.keys.length : foundIndex;
      const btree = this.edges[edgeIndex];
      if (btree) {
        btree.set(key);
      } else {
        const newBtree = new BTree(this.branchingFactor);
        newBtree.keys = [key];
        this.edges[edgeIndex] = newBtree;
      }
    }
  }
  get(key: number): IBTree | null {
    if (this.keys.includes(key)) return this;
    const foundIndex = this.keys.findIndex(k => key < k);
    const edgeIndex = foundIndex === -1 ? this.keys.length : foundIndex;
    return this.edges[edgeIndex]?.get(key) ?? null;
  }
  has(key: number) {
    if (this.keys.includes(key)) return true;
    const foundIndex = this.keys.findIndex(k => key < k);
    const edgeIndex = foundIndex === -1 ? this.keys.length : foundIndex;
    return this.edges[edgeIndex]?.has(key) ?? false;
  }
}
