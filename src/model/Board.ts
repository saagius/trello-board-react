import { List } from './List';

export enum Visibility {
    PRIVATE = 'private',
    TEAM = 'team',
    ORGANISATION = 'organisation',
    PUBLIC = 'public'
}

export interface Board {
    _id?: string;
    name: string;
    description: string;
    background?: string;
    visibility?: Visibility,
    lists?: List[]
}