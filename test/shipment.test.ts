import { Shipment } from "../src/shipment";

describe("Shipment", () => {
    let shipment: Shipment;

    beforeEach(() => {
        shipment = new Shipment();
    });

    test("should add a cooled container to the shipment", () => {
        const container = { bruto_weight: 100 } as any;
        shipment.addCooledContainer(container);
        expect(shipment.cooled.length).toBe(1);
        expect(shipment.cooled[0]).toBe(container);
    });

    test("should add a regular container to the shipment", () => {
        const container = { bruto_weight: 200 } as any;
        shipment.addRegularContainer(container);
        expect(shipment.regular.length).toBe(1);
        expect(shipment.regular[0]).toBe(container);
    });

    test("should add a value container to the shipment", () => {
        const container = { bruto_weight: 300 } as any;
        shipment.addValueContainer(container);
        expect(shipment.value.length).toBe(1);
        expect(shipment.value[0]).toBe(container);
    });

    test("should check if the shipment is empty", () => {
        expect(shipment.isEmpty()).toBe(true);
        shipment.addRegularContainer({ bruto_weight: 100 } as any);
        expect(shipment.isEmpty()).toBe(false);
    });

    test("should calculate the total weight of the shipment", () => {
        shipment.addRegularContainer({ bruto_weight: 100 } as any);
        shipment.addCooledContainer({ bruto_weight: 200 } as any);
        shipment.addValueContainer({ bruto_weight: 300 } as any);
        expect(shipment.getTotalWeight()).toBe(600);
    });

    test("should print the shipment details", () => {
        const consoleSpy = jest.spyOn(console, "log");
        shipment.addRegularContainer({ bruto_weight: 100 } as any);
        shipment.addCooledContainer({ bruto_weight: 200 } as any);
        shipment.addValueContainer({ bruto_weight: 300 } as any);
        shipment.print();
        expect(consoleSpy).toHaveBeenCalledTimes(6);
        expect(consoleSpy).toHaveBeenCalledWith("SHIPMENT");
        expect(consoleSpy).toHaveBeenCalledWith("Total number of container in shipment   : 3");
        expect(consoleSpy).toHaveBeenCalledWith("Total weight of shipment                : 600");
        expect(consoleSpy).toHaveBeenCalledWith("Total 1 coolead containers, weight      : 200");
        expect(consoleSpy).toHaveBeenCalledWith("Total 1 regular containers, weight      : 100");
        expect(consoleSpy).toHaveBeenCalledWith("Total 1 value containers, weight        : 300");
    });
});
