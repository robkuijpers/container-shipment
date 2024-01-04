import { Container } from "../src/container";
import { Plan } from "../src/plan";

describe("Plan", () => {
    let plan: Plan;

    beforeEach(() => {
        plan = new Plan();
    });

    it("should print 'No containers in planned.' when there are no layers", () => {
        const consoleSpy = jest.spyOn(console, "log");
        plan.print();
        expect(consoleSpy).toHaveBeenCalledWith("No containers in planned.");
        consoleSpy.mockRestore();
    });

    it("should print the correct plan when there are layers", () => {
        const consoleSpy = jest.spyOn(console, "log");

        const container1 = new Container("C001", 10000);
        const container2 = new Container("C002", 20000);
        const container3 = new Container("C003", 30000);

        plan.layers = [
            [
                [container1, container2],
                [container3, undefined],
            ],
        ];

        plan.print();

        expect(consoleSpy).toHaveBeenCalledWith("\n\nPLAN");
        expect(consoleSpy).toHaveBeenCalledWith("Layer: 0");
        expect(consoleSpy).toHaveBeenCalledWith("     L00         L01    ");
        expect(consoleSpy).toHaveBeenCalledWith("+---------+---------+");
        expect(consoleSpy).toHaveBeenCalledWith(" W00 |  C001   |  C002   |");
        expect(consoleSpy).toHaveBeenCalledWith(" W01 |  C003   |         |");
        expect(consoleSpy).toHaveBeenCalledWith("+---------+---------+");

        consoleSpy.mockRestore();
    });
});
