export interface INode {
    index: number;
    name: string;
    typeNode: string;
    id?: any;
    uid?: any;
    time?: any;
    messageText?: string;
}

export interface IArrow {
    index: number;
    from: number;
    to: number;
}

export interface IGraph {
    nodes: INode[];
    arrows: IArrow[];
}

export interface IGroupServiceDto {
    id: string;
    description: string;
}

