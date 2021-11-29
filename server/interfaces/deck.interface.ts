import UserEntity from '../entities/user.entity';

interface Deck {
    id?: number,
    name: string,
    user?: UserEntity
}

export default Deck;
