import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Product} from './Product';

@Component({
    selector: 'app-market-daily',
    templateUrl: 'daily.page.html',
    styleUrls: ['daily.page.scss']
})
export class ProductListPage implements OnInit {

    public products: Product[] = [];
    constructor(public navCtrl: NavController) {
        let products = [
            new Product(
                'Water 10L',
                18,
                '../assets/products/images/water.jpeg',
            ),
            new Product(
                'Basic White Shirt x 50',
                200,
                '../assets/products/images/shirt.jpeg',
            ),
            new Product(
                'Instant Rice x 50',
                100,
                '../assets/products/images/rice.jpeg',
            ),
            new Product(
                'Instant Cup Noodles x 50',
                100,
                '../assets/products/images/noodles.jpeg',
            ),
        ];
        // Increase array items to apply page scroll
        products = products.concat(products).concat(products).concat(products)

        // Re-create products so it will not have the same memory address
        this.products = products.map(prod => new Product(
            prod.name,
            prod.price,
            prod.img,
        ));
    }

    get finalValue(): number {
        return this.products.reduce((sum, prod) => sum + (prod._quantity * prod.price), 0);
    }

    Purchase() {
        console.log(`Value: ${this.finalValue} Dai`);
    }

    ngOnInit() {
    }
}
