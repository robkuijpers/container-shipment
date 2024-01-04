// write a unit test using Jest for ship.ts
//  - test the constructor
//  - test the isLessThanMinumumLoad method
//  - test the isMoreThanMaxLoad method
//  - test the layers property
//  - test the length property
//  - test the width property
//  - test the maxLoad property
//  - test the name property    
//  - test the constructor with invalid values  
//  - test the isLessThanMinumumLoad method with invalid values
//  - test the isMoreThanMaxLoad method with invalid values
//  - test the print method with invalid values
//  - test the layers property with invalid values
//  - test the length property with invalid values
//  - test the width property with invalid values
//  - test the maxLoad property with invalid values
//  - test the name property with invalid values
//  - test the constructor with valid values

import { Ship } from "../src/ship";

describe('Ship', () => {
    describe('constructor', () => {
        it('should create a ship', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship).toBeDefined();
            expect(ship.name).toBe('ship');
            expect(ship.length).toBe(2);
            expect(ship.width).toBe(2);
            expect(ship.maxLoad).toBe(100);
        });
    });

    describe('isLessThanMinumumLoad', () => {
        it('should return true if the actual load is less than half the max load', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.isLessThanMinumumLoad(49)).toBe(true);
        });
        it('should return false if the actual load is more than half the max load', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.isLessThanMinumumLoad(51)).toBe(false);
        });
    });

    describe('isMoreThanMaxLoad', () => {
        it('should return true if the load is more than the max load', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.isMoreThanMaxLoad(101)).toBe(true);
        });
        it('should return false if the load is less than the max load', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.isMoreThanMaxLoad(99)).toBe(false);
        });
    });

    describe('print', () => {
        it('should print the ship', () => {
            const ship = new Ship('ship', 2, 2, 100);
            ship.print();
        });
    });

    describe('layers', () => {
        it('should return the layers', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.layers).toBeDefined();
        });
    });

    describe('length', () => {
        it('should return the length', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.length).toBe(2);
        });
    });

    describe('width', () => {
        it('should return the width', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.width).toBe(2);
        });
    });

    describe('maxLoad', () => {
        it('should return the maxLoad', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.maxLoad).toBe(100);
        });
    });

    describe('name', () => {
        it('should return the name', () => {
            const ship = new Ship('ship', 2, 2, 100);
            expect(ship.name).toBe('ship');
        });
    });

    describe('constructor', () => {
        it('should throw an error if the name is empty', () => {
            expect(() => new Ship('', 2, 2, 100)).toThrow('ERROR: ship must have a name');
        });
        it('should throw an error if the maxLoad is empty', () => {
            expect(() => new Ship('ship', 2, 2, null as any)).toThrow('ERROR: max load must be > 0');
        });
        it('should throw an error if the maxLoad is less than 0', () => {
            expect(() => new Ship('ship', 2, 2, -1)).toThrow('ERROR: max load must be > 0');
        });
        it('should throw an error if the length is empty', () => {
            expect(() => new Ship('ship', 2, null as any, 100)).toThrow('ERROR: length must be > 0');
        });
        it('should throw an error if the length is less than 0', () => {
            expect(() => new Ship('ship', 2, -1, 100)).toThrow('ERROR: length must be > 0');
        });
        it('should throw an error if the width is empty', () => {
            expect(() => new Ship('ship', null as any, 2, 100)).toThrow('ERROR: width must be > 0 and an even number to balance the ship');
        });
        it('should throw an error if the width is less than 0', () => {
            expect(() => new Ship('ship', -1, 2, 100)).toThrow('ERROR: width must be > 0 and an even number to balance the ship');
        });
        it('should throw an error if the width is not an even number', () => {
            expect(() => new Ship('ship', 3, 2, 100)).toThrow('ERROR: width must be > 0 and an even number to balance the ship');
        });
    });

});

