export class BaseClass<K extends string, V> {
  #data: Record<K, V>;

  /**
   * @param data Data that will be used for base class
   * @param precedent A class constructor (not an instance) that can be used for other purposes
   */
  constructor(data: Record<K, V>, precedent: new (...args: any[]) => any) {
    this.#data = data;
    // You can use the `precedent` constructor here if needed
  }

  /**
   * Returns the data in JSON
   */
  toJSON(): Record<K, V> {
    return this.#data;
  }
}
