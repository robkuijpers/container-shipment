import { Loader } from "../src/loader";
import { RegularContainer } from "../src/regular-container";
import { Ship } from "../src/ship";
import { Shipment } from "../src/shipment";

describe("Loader", () => {
    let loader: Loader;
    let ship: Ship;
    let shipment: Shipment;

    beforeEach(() => {
        loader = new Loader();
        ship = new Ship('Ship1', 4, 8, 50000);
        shipment = new Shipment();
    });

    test("createPlan should throw an error if shipment is empty", () => {
        expect(() => {
            loader.createPlan(ship, shipment);
        }).toThrow("ERROR: there is no load, no plan created");
    });

    test("createPlan should throw an error if shipment weight is less than the minimum load", () => {
        shipment.addRegularContainer(new RegularContainer("R1", 10000));
        shipment.addRegularContainer(new RegularContainer("R2", 20000));
        ship.maxLoad = 50000;

        expect(() => {
            loader.createPlan(ship, shipment);
        }).toThrow("ERROR: to less load (load must be more than 50% of 50,000)");
    });

    test("createPlan should log a warning if shipment weight exceeds the maximum load", () => {
        shipment.addRegularContainer(new RegularContainer("R1", 60000));
        shipment.addRegularContainer(new RegularContainer("R2", 70000));
        ship.maxLoad = 100000;

        const consoleSpy = jest.spyOn(console, "log");

        loader.createPlan(ship, shipment);

        expect(consoleSpy).toHaveBeenCalledWith(
            "WARNING: shipment exceeds maximum load, load can max be 100,000, not all containers can be loaded"
        );

        consoleSpy.mockRestore();
    });

    // Add more tests for other methods and scenarios...

});
