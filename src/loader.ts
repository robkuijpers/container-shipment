import { Container } from "./container.js";
import { CooledContainer } from "./cooled-container.js";
import { Plan } from "./plan.js";
import { RegularContainer } from "./regular-container.js";
import { Ship } from "./ship.js";
import { Shipment } from "./shipment.js";
import { ValueContainer } from "./value-container.js";

export class Loader {

    ship!: Ship;
    shipment!: Shipment;
    plan!: Plan;

    //private maxDifferenceLeftRight = 0;  // weight left - weight right must be less than this.

    createPlan(ship: Ship, shipment: Shipment): Plan {
        this.ship = ship;
        this.shipment = shipment;

        //this.maxDifferenceLeftRight = this.shipment.getTotalWeight() * .2

        // Check if there is load to ship
        if (this.shipment.isEmpty()) {
            throw Error('ERROR: there is no load, no plan created');
        }

        // Check if there is less than the minimum required load
        const shipmentWeight = this.shipment.getTotalWeight();
        if (this.ship.isLessThanMinumumLoad(shipmentWeight)) {
            throw Error(`ERROR: to less load (load must be more than 50% of ${new Intl.NumberFormat('nl-NL').format(this.ship.maxLoad)}`);
        }

        // Check if there is more than the maximum load
        if (this.ship.isMoreThanMaxLoad(shipmentWeight)) {
            console.log(`WARNING: shipment exceeds maximum load, load can max be ${new Intl.NumberFormat('nl-NL').format(this.ship.maxLoad)}, not all containers can be loaded`);
        }


        this.plan = new Plan();

        this.processCooled();     // First process the cooled because they are the most restrictive, they can only be on the first row.
        this.processRegular();    // Next the regular becasue they are the most flexible.
        this.processValue();      // Next the value containers these can only be put on top layer and must be accissible from front or back.

        if (this.ship.isLessThanMinumumLoad(this.getTotalWeight())) {
            console.log('After processing all containers, load is to low.');
        }

        const wl = this.getWeightForLeftSide();
        const wr = this.getWeightForRightSide();
        console.log(`Total weight      : ${new Intl.NumberFormat('nl-NL').format(this.getTotalWeight())}`);
        console.log(`Total weight left : ${new Intl.NumberFormat('nl-NL').format(wl)}`);
        console.log(`Total weight right: ${new Intl.NumberFormat('nl-NL').format(wr)}`);

        const diff: number = Math.abs(this.getWeightForLeftSide() - this.getWeightForRightSide());
        const perc = diff / Math.max(this.getWeightForLeftSide(), this.getWeightForRightSide()) * 100;
        console.log(`Weight difference : ${new Intl.NumberFormat('nl-NL').format(perc)} %\n\n`);


        return this.plan;
    }

    // Cooled must be first 
    // - they must be on the first row, l = 0
    // - max weight of containers on (bottom) container (layer 0) must be <= 120.000
    processCooled(): void {
        const cooledContainers: Array<CooledContainer> = this.shipment.cooled;

        if (cooledContainers.length === 0) {
            console.log('No cooled containers to load');
            return;
        }

        if (this.plan.layers.length === 0 && cooledContainers.length > 0) {
            this.plan.layers[0] = this.createLayer()
        }

        let placed = 0;  // number of cooled containers placed in the loading plan
        for (const container of cooledContainers) {

            // To much weight we cannot place another container
            if (this.loadExceedsMaximumLoad(container)) {
                throw new Error('Maximum load exceeded processing cooled containers');
            }

            const weightLeft = this.getWeightForLeftSide();
            const weightRight = this.getWeightForRightSide();

            // console.log(`Weight left: ${weightLeft}, weight right: ${weightRight}`);

            let position = null;

            if (weightLeft <= weightRight) {
                position = this.findFirstAvailablePositionForCooledContainerLeft(container);
            } else {
                position = this.findFirstAvailablePositionForCooledContainerRight(container);
            }

            if (position != null && position != -1) {
                this.plan.layers[position.layer][position.width][position.length] = container;
                placed++;
                console.log(`Cooled container ${container.code} placed on ${position.layer}:${position.width}:${position.length}`);
            }

            if (position === null) {
                const layer = this.createLayer();
                this.plan.layers.push(layer);
                if (weightLeft < weightRight) {
                    position = this.findFirstAvailablePositionForCooledContainerLeft(container);
                } else {
                    position = this.findFirstAvailablePositionForCooledContainerRight(container);
                }
                if (position != null && position != -1) {
                    this.plan.layers[position.layer][position.width][position.length] = container;
                    placed++;
                    console.log(`Cooled container ${container.code} placed on ${position.layer}:${position.width}:${position.length}`);
                }
            }

            if (position === -1) {
                // position -1 == no more positions and no need to create a new layer
                console.log(`WARNING: no position found for cooled container ${container.code} and all positions have max weigth so it could not be loaded.`);
                break;
            }
        };

        console.log(`Cooled containers processed, placed: ${placed}, left ${cooledContainers.length - placed}\n`);
    }

    // Regular are the most flexible:
    // - weight of containers on top of (bottom) container (layer 0), must be <= 120.000
    // - we cannot stack them on top of Value
    processRegular(): void {
        const regularContainers: Array<RegularContainer> = this.shipment.regular;

        if (regularContainers.length === 0) {
            console.log('No regulars container to load')
            return;
        }

        if (this.plan.layers.length === 0 && regularContainers.length > 0) {
            this.plan.layers[0] = this.createLayer()
        }

        let placed = 0;  // number of regular containers placed in the loading plan
        for (const container of regularContainers) {
            // To much weight we cannot place another container
            if (this.loadExceedsMaximumLoad(container)) {
                throw new Error('Maximum load exceeded processing regular containers');
            }

            const weightLeft = this.getWeightForLeftSide();
            const weightRight = this.getWeightForRightSide();

            console.log(`Weight left: ${weightLeft}, weight right: ${weightRight}`);

            let position = null;

            if (weightLeft <= weightRight) {
                position = this.findFirstAvailablePositionForRegularContainerLeft(container);
            } else {
                position = this.findFirstAvailablePositionForRegularContainerRight(container);
            }

            if (position != null && position != -1) {
                this.plan.layers[position.layer][position.width][position.length] = container;
                placed++;
                console.log(`Regular container ${container.code} placed on ${position.layer}:${position.width}:${position.length}`);
            }

            if (position === null) {
                const layer = this.createLayer();
                this.plan.layers.push(layer);
                if (weightLeft <= weightRight) {
                    position = this.findFirstAvailablePositionForRegularContainerLeft(container);
                } else {
                    position = this.findFirstAvailablePositionForRegularContainerRight(container);
                }
                if (position != null && position != -1) {
                    this.plan.layers[position.layer][position.width][position.length] = container;
                    placed++;
                    console.log(`Regular container ${container.code} placed on ${position.layer}:${position.width}:${position.length}`);
                }
            }

            if (position === -1) {
                // position -1 == no more positions and no need to create a new layer
                console.log(`WARNING: no position found for regular container ${container.code} and all positions have max weigth so it could not be loaded.`);
                break;
            }
        };

        console.log(`Regular containers processed, placed: ${placed}, left ${regularContainers.length - placed}\n`);
    }

    // Value will be processed last
    // - we can stack them on Regular and Cooled 
    // - no containers on top of them
    // - must be accessible from at leat one side
    // - weight of containers on top of bottom container (layer 0), including this container must be <= 120.000
    processValue(): void {
        const valueContainers: Array<ValueContainer> = this.shipment.value;

        if (valueContainers.length === 0) {
            console.log('No value containers to load');
            return;
        }

        if (this.plan.layers.length === 0 && valueContainers.length > 0) {
            this.plan.layers[0] = this.createLayer()
        }

        let placed = 0;  // number of value containers placed in the loading plan
        for (const container of valueContainers) {

            // To much weight we cannot place another container
            if (this.loadExceedsMaximumLoad(container)) {
                throw new Error('Maximum load exceeded processing value containers');
            }

            const weightLeft = this.getWeightForLeftSide();
            const weightRight = this.getWeightForRightSide();

            /// console.log(`Weight left: ${weightLeft}, weight right: ${weightRight}`);

            let position = null;

            if (weightLeft <= weightRight) {
                position = this.findFirstAvailablePositionForValueContainerLeft(container);
            } else {
                position = this.findFirstAvailablePositionForValueContainerRight(container);
            }

            if (position != null && position != -1) {
                this.plan.layers[position.layer][position.width][position.length] = container;
                placed++;
                console.log(`Value container ${container.code} placed on ${position.layer}:${position.width}:${position.length}`);
            }

            if (position === null) {
                const layer = this.createLayer();
                this.plan.layers.push(layer);
                if (weightLeft <= weightRight) {
                    position = this.findFirstAvailablePositionForValueContainerLeft(container);
                } else {
                    position = this.findFirstAvailablePositionForValueContainerRight(container);
                } if (position != null && position != -1) {
                    this.plan.layers[position.layer][position.width][position.length] = container;
                    placed++;
                    console.log(`Value container ${container.code} placed on ${position.layer}:${position.width}:${position.length}`);
                }
            }

            if (position === -1) {
                // position -1 == no more positions and no need to create a layer
                console.log(`WARNING: no position found for value container ${container.code} and all positions have max weigth or value container on top so it could not be loaded.`);
                break;
            }
        };

        console.log(`Value containers processed, placed: ${placed}, left ${valueContainers.length - placed}\n`);
    }

    createLayer(): Array<Array<Container | undefined>> {
        const layer: Array<Array<Container | undefined>> = new Array(this.ship.width);
        for (let w = 0; w < layer.length; w++) {
            layer[w] = new Array(this.ship.length);
            for (let l = 0; l < layer[w].length; l++) {
                layer[w][l] = undefined;
            }
        }
        return layer;
    }

    // Return null if no position found -> we can create new layer and search again.
    // Return -1 if no position found and all stacks have maximum load, no need to create a new layer.
    findFirstAvailablePositionForCooledContainerLeft(container: Container): any | null | number {
        let position = null;
        let maxHeightStacks = 0; // number of stacks that have reached max weight
        const lastWidthLeft = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length && position === null; layer++) {
            for (let w = 0; w <= lastWidthLeft && position === null; w++) {
                if (this.plan.layers[layer][w][0] === undefined) {  // cooled container can only be in 1st length, in front of the ship so l = 0
                    position = { layer: layer, width: w, length: 0 };
                    const weightOnTopOfBottomContainer = this.getWeightOnTopOfBottomContainer(position);   // container can hold max 120.000 on top, container is max 30.000 so we only have to check this for layer >= 5
                    if ((weightOnTopOfBottomContainer + container.bruto_weight) <= Container.MAX_LOAD_ON_TOP) {
                        return position;
                    } else {
                        console.log(`Cooled container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, weight on top of bottom container ${weightOnTopOfBottomContainer} including this container ${container.bruto_weight} exceeds maximum ${Container.MAX_LOAD_ON_TOP}`);
                        maxHeightStacks++;
                        position = null; // continue to next position
                    }
                }
            }

            // All positions on LEFT side have max weight, no need to create new layer
            if (maxHeightStacks === this.ship.width / 2)
                return -1;

            // No place in this layer return null to indicate that we cannot place this container in this layer and create new layer.
            if (position === null && layer === this.plan.layers.length - 1)
                return null;
        }
        return position;
    }

    // Return null if no position found -> we can create new layer and search again.
    // Return -1 if no position found and all stacks have maximum load, no need to create a new layer.
    findFirstAvailablePositionForCooledContainerRight(container: Container): any | null | number {
        let position = null;
        let maxHeightStacks = 0;  // number of stacks that have reached max weight
        const firstWidthRight = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length && position === null; layer++) {
            for (let w = firstWidthRight; w < this.ship.width && position === null; w++) {
                if (this.plan.layers[layer][w][0] === undefined) {  // cooled container can only be in 1st length, in front of the ship so l is 0
                    position = { layer: layer, width: w, length: 0 };
                    const weightOnTopOfBottomContainer = this.getWeightOnTopOfBottomContainer(position);   // container can hold max 120.000 on top, container is max 30.000 so we only have to check this for layer >= 5
                    if ((weightOnTopOfBottomContainer + container.bruto_weight) <= Container.MAX_LOAD_ON_TOP) {
                        return position;
                    } else {
                        console.log(`Cooled container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, weight on top of bottom container ${weightOnTopOfBottomContainer} including this container ${container.bruto_weight} exceeds maximum ${Container.MAX_LOAD_ON_TOP}`);
                        maxHeightStacks++;
                        position = null; // continue to next position
                    }
                }
            }

            // All position on RIGHT side have max weight, no need to create new layer
            if (maxHeightStacks === this.ship.width / 2)
                return -1;

            // No place in this layer return null to indicate that we cannot place this container in this layer and create new layer.
            if (position === null && layer === this.plan.layers.length - 1)
                return null;
        }
        return position;
    }

    // Return null if no position found -> we can create new layer and search again.
    // Return -1 if no position found and all stacks have maximum load, no need to create a new layer.
    findFirstAvailablePositionForRegularContainerLeft(container: Container): any | null | number {
        let position = null;
        let maxHeightStacks = 0; // number of stacks that have reached max weight
        const lastWidthLeft = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length && position === null; layer++) {
            for (let w = 0; w < lastWidthLeft && position === null; w++) {
                for (let l = 0; l < this.ship.length && position === null; l++) {

                    if (this.plan.layers[layer][w][l] === undefined) {  // cooled container can only be in 1st length, in front of the ship
                        position = { layer: layer, width: w, length: l };
                        const weightOnTopOfBottomContainer = this.getWeightOnTopOfBottomContainer(position);   // container can hold max 120.000 on top, container is max 30.000 so we only have to check this for layer >= 5
                        if ((weightOnTopOfBottomContainer + container.bruto_weight) <= Container.MAX_LOAD_ON_TOP) {
                            return position;
                        } else {
                            console.log(`Regular container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, weight on top of bottom container ${weightOnTopOfBottomContainer} including this container ${container.bruto_weight} exceeds maximum ${Container.MAX_LOAD_ON_TOP}`);
                            maxHeightStacks++;
                            position = null; // continue to next position
                        }
                    }

                }
            }

            // All position on LEFT side have max weight, no need to create new layer
            if (maxHeightStacks === (this.ship.width / 2) * this.ship.length) {
                return -1;
            }

            // No place in this layer return null to indicate that we cannot place this container in this layer and create new layer.
            if (position === null && layer === this.plan.layers.length - 1) {
                return null;
            }
        }
        return position;
    }

    // Return null if no position found -> we can create new layer and search again.
    // Return -1 if no position found and all stacks have maximum load, no need to create a new layer.
    findFirstAvailablePositionForRegularContainerRight(container: Container): any | null | number {
        let position = null;
        let maxHeightStacks = 0; // number of stacks that have reached max weight
        const firstWidthRight = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length && position === null; layer++) {
            for (let w = firstWidthRight; w < this.ship.width && position === null; w++) {
                for (let l = 0; l < this.ship.length && position === null; l++) {

                    if (this.plan.layers[layer][w][l] === undefined) {
                        position = { layer: layer, width: w, length: l };
                        const weightOnTopOfBottomContainer = this.getWeightOnTopOfBottomContainer(position);   // container can hold max 120.000 on top, container is max 30.000 so we only have to check this for layer >= 5
                        if ((weightOnTopOfBottomContainer + container.bruto_weight) <= Container.MAX_LOAD_ON_TOP) {
                            return position;
                        } else {
                            console.log(`Regular container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, weight on top of bottom container ${weightOnTopOfBottomContainer} including this container ${container.bruto_weight} exceeds maximum ${Container.MAX_LOAD_ON_TOP}`);
                            maxHeightStacks++;
                            position = null; // continue to next position
                        }
                    }
                }
            }

            // All positions on RIGHT side have max weight, no need to create new layer
            if (maxHeightStacks === (this.ship.width / 2) * this.ship.length) {
                return -1;
            }

            // No place in this layer return null to indicate that we cannot place this container in this layer and create new layer.
            if (position === null && layer === this.plan.layers.length - 1) {
                return null;
            }
        }
        return position;
    }


    // Return null if no position found -> we can create new layer and search again.
    // Return -1 if no position found and all stacks have maximum load, no need to create a new layer.
    findFirstAvailablePositionForValueContainerLeft(container: Container): any | null | number {
        let position = null;
        let maxHeightStacks = 0; // number of stacks that have reached max weight or has value contrainer on top
        const lastWidthLeft = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length && position === null; layer++) {
            for (let w = 0; w < lastWidthLeft && position === null; w++) {
                for (let l = 0; l < this.ship.length && position === null; l++) {
                    if (this.plan.layers[layer][w][l] === undefined) {
                        position = { layer: layer, width: w, length: l };

                        // Check that we stack on 'the floor' or on other container
                        const containerBelow = this.getContainerBelow(position);
                        if (containerBelow === undefined && layer > 0) {
                            console.log(`Value container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, because no container below it`);
                            position = null; // continue to next position
                        }

                        if (position && containerBelow instanceof ValueContainer) {
                            console.log(`Value container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, on top of other value container`);
                            maxHeightStacks++;
                            position = null; // continue to next position
                        }

                        // Check that value containers keeps accessible from front or back
                        // When there is a value cointainer before this one, does that container keeps accessible.
                        if (position) {
                            const containerBefore = this.getContainerBefore(position);
                            if ((containerBefore && containerBefore instanceof ValueContainer)) {
                                const posBefore = { layer: position.layer, width: position.width, length: position.length - 1 };
                                if (this.isPositionBeforeContainerEmpty(posBefore)) {
                                    const weight = this.getWeightOnTopOfBottomContainer(position);
                                    if ((weight + container.bruto_weight) <= Container.MAX_LOAD_ON_TOP) {
                                        return position; // not accessible from front. try next position
                                    } else {
                                        maxHeightStacks++;
                                        position = null;
                                    }
                                } else {
                                    position = null
                                    maxHeightStacks++;
                                }
                                //    } else {
                                //         // if containerAfter is Value or CooledValue this container must keep accessible from after side.
                                //         const containerAfter = this.getContainerAfter(position);
                                //         const posAfter = { layer: position.layer, width: position.width + 1, length: position.length };
                                //         if ((containerAfter instanceof ValueContainer)) {
                                //             if (this.isPositionBeforeContainerEmpty(posAfter) || this.isPositionAfterContainerEmpty(posAfter)) {
                                //                 return position;  // accessible from back
                                //             }
                                //         } else {
                                //             return null; // not accessible from front or back
                                //         }
                                //     }
                            } else {
                                return position; // accessible from front
                            }
                        }
                    }
                }
            }

            // All positions on RIGHT side have max weight, no need to create new layer
            if (maxHeightStacks === (this.ship.width / 2) * this.ship.length) {
                return -1;
            }

            // No place in this layer return null to indicate that we cannot place this container in this layer and create new layer.
            if (position === null && layer === this.plan.layers.length - 1) {
                return null;
            }
        }
        return position;
    }

    // Return null if no position found -> we can create new layer and search again.
    // Return -1 if no position found and all stacks have maximum load, no need to create a new layer.
    findFirstAvailablePositionForValueContainerRight(container: Container): any | null | number {
        let position = null;
        let maxHeightStacks = 0; // number of stacks that have reached max weight or has value contrainer on top
        const firstWidthRight = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length && position === null; layer++) {
            for (let w = firstWidthRight; w < this.ship.width && position === null; w++) {
                for (let l = 0; l < this.ship.length && position === null; l++) {
                    if (this.plan.layers[layer][w][l] === undefined) {
                        position = { layer: layer, width: w, length: l };

                        // Check that we not stack on other value container
                        const containerBelow = this.getContainerBelow(position);
                        if (containerBelow instanceof ValueContainer) {
                            console.log(`Value container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, on top of other value container`);
                            maxHeightStacks++;
                            position = null; // continue to next position
                        }

                        // Check that position before or position afer is empty
                        // if (position && !this.isPositionBeforeContainerEmpty(position) && !this.isPositionAfterContainerEmpty(position)) {
                        //     console.log(`Value container ${container.code} could not be placed at ${position.layer}:${position.width}:${position.length}, on top of other value container`);
                        //     position = null; // continue to next position
                        // }

                        if (position) {
                            const containerBefore = this.getContainerBefore(position);
                            if ((containerBefore && containerBefore instanceof ValueContainer)) {
                                const posBefore = { layer: position.layer, width: position.width, length: position.length - 1 };
                                if (this.isPositionBeforeContainerEmpty(posBefore)) {
                                    const weight = this.getWeightOnTopOfBottomContainer(position);
                                    if ((weight + container.bruto_weight) <= Container.MAX_LOAD_ON_TOP) {
                                        return position; // not accessible from front. try next position
                                    } else {
                                        maxHeightStacks++;
                                        position = null;
                                    }
                                } else {
                                    maxHeightStacks++;
                                    position = null
                                }
                            } else {
                                return position; // accessible from front
                            }
                        }
                    }
                }
            }

            // All positions on RIGHT side have max weight, no need to create new layer
            if (maxHeightStacks === (this.ship.width / 2) * this.ship.length) {
                return -1;
            }

            // No place in this layer return null to indicate that we cannot place this container in this layer and create new layer.
            if (position === null && layer === this.plan.layers.length - 1) {
                return null;
            }
        }
        return position;
    }

    getWeightOnTopOfBottomContainer(position: any): number {
        if (position.layer === 0) {
            return 0;
        }

        let weight = 0;
        for (let layer = position.layer - 1; layer > 0; layer--) {
            let container = this.plan.layers[layer][position.width][position.length]
            if (container) {
                weight += container?.bruto_weight;
            }
        }
        return weight;
    }

    getContainerBelow(position: any): Container | undefined {
        let container = undefined;
        if (position.layer > 0) {
            container = this.plan.layers[position.layer - 1][position.width][position.length];
        }
        return container;
    }

    getContainerBefore(position: any): Container | undefined {
        if (position.length === 0) {
            return undefined
        } else {
            return this.plan.layers[position.layer][position.width][position.length - 1];
        }
    }

    getContainerAfter(position: any): Container | undefined {
        if (position.length > this.ship.length) {
            return undefined
        } else {
            return this.plan.layers[position.layer][position.width][position.length + 1];
        }
    }

    isPositionBeforeContainerEmpty(position: any): boolean {
        const container = this.getContainerBefore(position);
        return container === undefined;
    }

    isPositionAfterContainerEmpty(position: any): boolean {
        const container = this.getContainerAfter(position);
        return container === undefined;
    }

    loadExceedsMaximumLoad(container: Container): boolean {
        const exceeded = (this.getTotalWeight() + container.bruto_weight) > this.ship.maxLoad;
        if (exceeded) {
            console.log(`ERROR: maximum load ${new Intl.NumberFormat('nl-NL').format(this.ship.maxLoad)} exceeded with ${new Intl.NumberFormat('nl-NL').format((this.getTotalWeight() + container.bruto_weight) - this.ship.maxLoad)} for container ${container.code}`);
        }
        return exceeded;
    }

    getTotalWeight(): number {
        let load = 0;
        for (let layer = 0; layer < this.plan.layers.length; layer++) {
            for (let w = 0; w < this.ship.width; w++) {
                for (let l = 0; l < this.ship.length; l++) {
                    if (this.plan.layers[layer][w][l] != undefined) {
                        const container = this.plan.layers[layer][w][l];
                        if (container && container.bruto_weight) {
                            load += container.bruto_weight;
                        }
                    }
                }
            }
        }
        return load;
    }

    getWeightForLeftSide(): number {
        let weight = 0;
        const lastWidthLeft = (this.ship.width / 2);
        for (let layer = 0; layer < this.plan.layers.length; layer++) {
            for (let w = 0; w < lastWidthLeft; w++) {
                for (let l = 0; l < this.ship.length; l++) {
                    const container = this.plan.layers[layer][w][l];
                    if (container != null) {
                        weight += container.bruto_weight;
                    }
                }
            }
        }
        return weight;
    }

    getWeightForRightSide(): number {
        let weight = 0;
        const firstWidthRight = (this.ship.width / 2);

        for (let layer = 0; layer < this.plan.layers.length; layer++) {
            for (let w = firstWidthRight; w < this.ship.width; w++) {
                for (let l = 0; l < this.ship.length; l++) {
                    const container = this.plan.layers[layer][w][l];
                    if (container != null) {
                        weight += container.bruto_weight;
                    }
                }
            }
        }
        return weight;
    }

}
