import { Container } from "./container";

export class Ship {

    name: string;
    length: number;  // # container lang
    width: number;   // # container breedt
    maxLoad: number;

    layers: Array<Array<Array<Container | undefined>>> = [];  // lagen met containers

    constructor(name: string, width: number, length: number, maxLoad: number) {

        if (!name) {
            throw new Error("ERROR: ship must have a name");
        }
        if (maxLoad === null || maxLoad <= 0) {
            throw new Error("ERROR: max load must be > 0");
        }
        if (length === null || length <= 0) {
            throw new Error("ERROR: length must be > 0");
        }
        if (width === null || width <= 0 || width % 2 != 0) {
            throw new Error("ERROR: width must be > 0 and an even number to balance the ship");
        }

        this.name = name;
        this.maxLoad = maxLoad;
        this.length = length;
        this.width = width;
    }

    isLessThanMinumumLoad(actualLoad: number): boolean {
        return actualLoad < (this.maxLoad * .5);
    }

    isMoreThanMaxLoad(load: number): boolean {
        return load > this.maxLoad;
    }

    print() {
        console.log('\nSHIP');
        console.log(`Ship name: ${this.name}`);
        console.log(`Max. load: ${new Intl.NumberFormat('nl-NL').format(this.maxLoad)}`);
        console.log(`Min. load: ${new Intl.NumberFormat('nl-NL').format(this.maxLoad * 0.5)}`);
    }
}