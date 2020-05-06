import { Card } from './Card';

export interface List {
    _id?: string;
    board: string;
    name: string;
    description: string;
    cards?: Card[];
}