import TestCategory from './testCategory.interface';

interface Test {
    id: number;
    testCategory: string | TestCategory;
}

export default Test;
