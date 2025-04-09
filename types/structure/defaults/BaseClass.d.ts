export class BaseClass<V> {
  #data: Record<V>;

  /**
   * @param data Data that will be used for base class
   * @param precedent A class constructor (not an instance) that can be used for other purposes
   */
  constructor(data: Record<V>, precedent: new (...args: any[]) => any);

  /**
   * Returns the data in JSON
   */
  toJSON(): Record<V>;
}
