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
            id: 3,
            name: 'Save the Earth',
            image: 'src="https://www.greenpeace.org/usa/wp-content/uploads/2017/04/GP0STQIZH_Web_size_with_credit_line.jpg"',
            price: 0.03,
            description: '',
        },
        {
            id: 4,
            name: 'Cats & Dogs',
            image:
                'src="https://images.ctfassets.net/82d3r48zq721/45liwTLsDMSJt4N22RqrHX/cd992f88ca8737f95b085212906d6d86/Can-cats-and-dogs-get-coronavirus_resized.jpg?w=800&q=50"',
            price: 0.1,
            description: '',
        },
        {
            id: 6,
            name: 'Stop Oil without click bait paintings',
            image: 'https://media.npr.org/assets/img/2022/10/15/image_juststopoil_nationalgallery6_14102022-257491a2cc2e20a0069fe806cdda7fd33fc11da9.png',
            price: 0.1,
            description: '',
        },
    ];
};
