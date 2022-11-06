//generate mock data
export type MockData = {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
};

export type MockNFTData = MockData & {
    tokenId: string;
    tokenContract: string;
};
export const generateMockData = (): MockData[] => {
    return [
        {
            id: 4,
            name: 'Superbowl Llv',
            image:
                'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Super_Bowl_logo.svg/800px-Super_Bowl_logo.svg.png',
            price: 0.5,
            description: '',
        },
        {
            id: 6,
            name: 'ETH SanFrancisco',
            image: 'https://sf.ethglobal.com/img/sf-og.jpg?v=3.0.0',
            price: 0.03,
            description: '',
        },
    ];
};
