interface IItem {
  isLessThan(item: IItem): boolean;
  value(): any;
}

interface IBTree {
  length(): number;
  contains(key: IItem): boolean;
  get(key: IItem): IItem | null;
}

export class Item implements IItem {
  element: number;
  constructor(element: number) {
    this.element = element;
  }
  isLessThan(item: IItem) {
    return this.value() < item.value();
  }
  value() {
    return this.element;
  }
}

export class BTree implements IBTree {
  degree: number;
  constructor(degree: number) {
    this.degree = degree;
  }

  length() {
    return 0;
  }

  contains(key: IItem) {
    console.log(key);
    return false;
  }

  get(key: IItem) {
    return this.contains(key) ? key : null;
  }
}
