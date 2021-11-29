import Deck from './deck.interface';

declare class Model {
    public static getOne(id: number): Promise<any>;
    public static getAll(filters?: Object): Promise<any[]>;
    public static post(deck: Deck): Promise<any>;
    public static patch(deck: Deck): Promise<any>;
    public static delete(id: number): Promise<any>;
}

export default Model;
