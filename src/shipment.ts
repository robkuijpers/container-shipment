// The containers to ship

import { Container } from "./container.js";
import { CooledContainer } from "./cooled-container.js";
import { RegularContainer } from "./regular-container.js";
import { ValueContainer } from "./value-container.js";

export class Shipment {

    cooled: CooledContainer[] = new Array<CooledContainer>();
    value: ValueContainer[] = new Array<ValueContainer>();
    regular: RegularContainer[] = new Array<RegularContainer>();

    addCooledContainer(container: CooledContainer): void {
        this.cooled.push(container);
        // Sort by weight, heavy container at the bottom, light ones at the top so we can take more load.
        this.cooled.sort((a, b) => b.bruto_weight - a.bruto_weight);
    }


    addRegularContainer(container: RegularContainer): void {
        this.regular.push(container);
        this.regular.sort((a, b) => b.bruto_weight - a.bruto_weight);
    }

    addValueContainer(container: ValueContainer): void {
        this.value.push(container);
        this.value.sort((a, b) => b.bruto_weight - a.bruto_weight);
    }

    isEmpty(): boolean {
        return (this.regular.length === 0 && this.cooled.length === 0 && this.value.length === 0);
    }

    getTotalWeight(): number {
        let totalWeight = 0;
        totalWeight += this.getTotalWeightForContainers(this.regular);
        totalWeight += this.getTotalWeightForContainers(this.cooled);
        totalWeight += this.getTotalWeightForContainers(this.value);
        return totalWeight;
    }

    getTotalWeightForContainers(containers: Array<Container>): number {
        return containers.reduce((accumulator, currentValue) => accumulator + currentValue.bruto_weight, 0);
    }

    print() {
        console.log('SHIPMENT');
        console.log(`Total number of container in shipment   : ${this.cooled.length + this.value.length + this.regular.length}`);
        console.log(`Total weight of shipment                : ${new Intl.NumberFormat('nl-NL').format(this.getTotalWeight())}\n`);

        console.log(`Total ${this.cooled.length} coolead containers, weight`.padEnd(34, ' ') + `: ${new Intl.NumberFormat('nl-NL').format(this.getTotalWeightForContainers(this.cooled))}`);
        console.log(`Total ${this.regular.length} regular containers, weight`.padEnd(34, ' ') + `: ${new Intl.NumberFormat('nl-NL').format(this.getTotalWeightForContainers(this.regular))}`);
        console.log(`Total ${this.value.length} value containers, weight`.padEnd(34, ' ') + `: ${new Intl.NumberFormat('nl-NL').format(this.getTotalWeightForContainers(this.value))}\n`);
    }
}


