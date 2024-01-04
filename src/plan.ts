import { Container } from "./container";

export class Plan {

    // layer, length, width
    layers: Array<Array<Array<Container | undefined>>> = [];

    print(): void {
        console.log('\n\nPLAN');

        if (this.layers && this.layers.length === 0) {
            console.log('No containers in planned.');
            return;
        }

        this.layers.forEach((layer: Array<Array<Container | undefined>>, index: number) => {
            console.log(`Layer: ${index}`);
            this.printLayer(layer);
            console.log('\n');
        });
    }

    printLayer(layer: Array<Array<Container | undefined>>): void {
        // Header
        let header: string = '     ';
        let separator: string = '     ';

        //const width = layer.length;
        const length = layer[0].length;

        for (let l = 0; l <= length - 1; l++) {
            header = header.concat('   L' + l.toString().padStart(2, '0') + '    ');
            separator = separator.concat('+---------');
        };
        separator = separator.concat('+');

        console.log(header);
        console.log(separator);

        // Containers
        layer.forEach((width: Array<Container | undefined>, index: number) => {
            this.printWidth(width, index);
        });

        // Footer
        console.log(separator);
    }

    printWidth(width: Array<Container | undefined>, index: number): void {
        let s: string = ' W' + index.toString().padStart(2, '0') + ' |';
        for (let l = 0; l < width.length; l++) {
            const c: Container | undefined = width[l];
            s = s.concat('  ' + (c ? c?.code : '     ') + '  |');
        }
        console.log(s);
    }
}