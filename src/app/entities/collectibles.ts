export interface ICollectibleCard {
    id: number
    name?: string;
    imgUrl: string;
    purchased?: boolean;
    firebaseName: string
    description?: Array<{
        key: string
        value: string
    }>;
    amount?: number;
    category?: string;
}

export interface ICollectibleCardDescription {
    id: number
    name?: string;
    imgUrl: string;
    firebaseName: string
    description?: Array<{
        key: string
        value: string
    }>;
}
