"use strict";

import { Loader } from "./loader.js";
import { Plan } from "./plan.js";
import { Ship } from "./ship.js";
import { Shipment } from "./shipment.js";
import { ValueContainer } from "./value-container.js";


export class Main {

    scenario1() {

        // Create Ship, name, length, width, max load
        // Provide even number of rows to keep the ship in balance.
        // 4 x 8 = 32 container per layer
        const width = 4;
        const length = 6;
        const maxLoad = 500_000;
        const ship = new Ship('Maasbracht', width, length, maxLoad);

        // Create containers to ship
        // If we want to take as many containers as possible sort by weight first.
        const shipment = new Shipment();

        // Cooled containers 
        // shipment.addCooledContainer(new CooledContainer("CO000", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO001", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO002", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO003", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO004", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO005", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO006", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO007", 30_000));
        // shipment.addCooledContainer(new CooledContainer("CO008", 25_000));
        // shipment.addCooledContainer(new CooledContainer("CO009", 25_000));
        // shipment.addCooledContainer(new CooledContainer("CO010", 25_000));
        // shipment.addCooledContainer(new CooledContainer("CO011", 25_000));
        // shipment.addCooledContainer(new CooledContainer("CO012", 20_000));
        // shipment.addCooledContainer(new CooledContainer("CO013", 20_000));
        // shipment.addCooledContainer(new CooledContainer("CO014", 20_000));
        // shipment.addCooledContainer(new CooledContainer("CO015", 20_000));
        // shipment.addCooledContainer(new CooledContainer("CO016", 15_000));
        // shipment.addCooledContainer(new CooledContainer("CO017", 15_000));
        // shipment.addCooledContainer(new CooledContainer("CO018", 15_000));
        // shipment.addCooledContainer(new CooledContainer("CO019", 15_000));
        // shipment.addCooledContainer(new CooledContainer("CO020", 12_500));
        // shipment.addCooledContainer(new CooledContainer("CO021", 12_500));
        // shipment.addCooledContainer(new CooledContainer("CO022", 12_500));
        // shipment.addCooledContainer(new CooledContainer("CO023", 12_500));

        // Regular containers
        // for (let idx = 0; idx < 168; idx++) {
        //     shipment.addRegularContainer(new RegularContainer(`RE${idx.toString().padStart(3, '0')}`, 30_000));
        // }

        // Value containers
        shipment.addValueContainer(new ValueContainer("VA000", 20_000));
        shipment.addValueContainer(new ValueContainer("VA001", 20_000));
        shipment.addValueContainer(new ValueContainer("VA002", 20_000));
        shipment.addValueContainer(new ValueContainer("VA003", 20_000));
        shipment.addValueContainer(new ValueContainer("VA004", 20_000));
        shipment.addValueContainer(new ValueContainer("VA005", 20_000));
        shipment.addValueContainer(new ValueContainer("VA006", 20_000));
        shipment.addValueContainer(new ValueContainer("VA007", 20_000));
        shipment.addValueContainer(new ValueContainer("VA008", 20_000));
        shipment.addValueContainer(new ValueContainer("VA009", 20_000));
        shipment.addValueContainer(new ValueContainer("VA010", 20_000));
        shipment.addValueContainer(new ValueContainer("VA011", 20_000));
        shipment.addValueContainer(new ValueContainer("VA012", 20_000));
        shipment.addValueContainer(new ValueContainer("VA013", 20_000));
        shipment.addValueContainer(new ValueContainer("VA014", 20_000));
        shipment.addValueContainer(new ValueContainer("VA015", 20_000));
        shipment.addValueContainer(new ValueContainer("VA016", 20_000));
        shipment.addValueContainer(new ValueContainer("VA017", 20_000));

        ship.print();
        console.log('');
        shipment.print();

        // Create a loader that knows how to load the ship
        const loader = new Loader();
        const plan: Plan = loader.createPlan(ship, shipment);
        plan.print();

    }
}

const main = new Main();
main.scenario1();