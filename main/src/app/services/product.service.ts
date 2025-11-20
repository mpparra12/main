import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { ProductDetails ,} from '../../app/models/product-details'
import { ProductCard } from '../../app/models/product-card'


let products: ProductDetails[] = [
  {
    id: '1',
    image: './assets/e-commerce/products/1.png',
    imageLarge: './assets/e-commerce/products/large-1.png',
    imageSmall: './assets/e-commerce/managment/1.png',
    title: 'Arabe',
    subtitle: 'Arabe Field',
    description1: 'sds sdsds ewrwre sdsd dsds sfsdse erere asdsd ,' +
      ' sdd retrtyry rtrttttttttttttttt sfdfdf fdfdfd dfdfdfdfd ' +
      ' erere erere rer erereree rere .',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#arabe',
    code: '135234',
    discount: '20',
    price: '8580',
    rating: '754.6',
    status: 'New'
  },
  {
    id: '2',
    image: './assets/e-commerce/products/2.png',
    imageLarge: './assets/e-commerce/products/large-2.png',
    imageSmall: './assets/e-commerce/managment/2.png',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135264',
    discount: '20',
    title: 'Arcabuz',
    subtitle: 'Arcabuz in blue',
    price: '9637',
    rating: '244.6',
    status: 'Sale'
  },
  {
    id: '3',
    image: './assets/e-commerce/products/3.png',
    imageLarge: './assets/e-commerce/products/large-3.png',
    imageSmall: './assets/e-commerce/managment/3.png',
            title: 'Arcos',
        subtitle: 'Arcos in white',
        price: '5870',
        rating: '424.6',

    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '125234',
    discount: '20',

    status: 'New'
  },
  {
    id: '4',
    image: './assets/e-commerce/products/4.png',
    imageLarge: './assets/e-commerce/products/large-4.png',
    imageSmall: './assets/e-commerce/managment/4.png',
        title: 'Bato',
        subtitle: 'Bato in blue',
        price: '9685',
        rating: '454.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '133234',
    discount: '20',

    status: 'Sale'
  },
  {
    id: '5',
    image: './assets/e-commerce/products/5.png',
    imageLarge: './assets/e-commerce/products/large-5.png',
    imageSmall: './assets/e-commerce/managment/5.png',
        title: 'Bayo',
        subtitle: 'Bayo in white',
        price: '4512',
        rating: '784.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '138234',
    discount: '20',

    status: 'New'
  },
  {
    id: '6',
    image: './assets/e-commerce/products/6.png',
    imageLarge: './assets/e-commerce/products/large-6.png',
    imageSmall: './assets/e-commerce/managment/6.png',
        title: 'Camargo',
        subtitle: 'Camargo in blue',
        price: '63576',
        rating: '854.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135237',
    discount: '20',

    status: 'Sale'
  },
  {
    id: '7',
    image: './assets/e-commerce/products/1.png',
    imageLarge: './assets/e-commerce/products/large-1.png',
    imageSmall: './assets/e-commerce/managment/1.png',
        title: 'Catarin',
        subtitle: 'Catarin in white',
        price: '48.250',
        rating: '584.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135234',
    discount: '20',

    status: 'New'
  },
  {
    id: '8',
    image: './assets/e-commerce/products/2.png',
    imageLarge: './assets/e-commerce/products/large-2.png',
    imageSmall: './assets/e-commerce/managment/2.png',
        title: 'Comitas',
        subtitle: 'Comitas in blue',
        price: '537.5',
        rating: '754.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135264',
    discount: '20',

    status: 'Sale'
  },
  {
    id: '9',
    image: './assets/e-commerce/products/3.png',
    imageLarge: './assets/e-commerce/products/large-3.png',
    imageSmall: './assets/e-commerce/managment/3.png',
        title: 'Comitas',
        subtitle: 'Comitas in white',
        price: '458.2',
        rating: '8554.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '125234',
    discount: '20',

    status: 'New'
  },
  {
    id: '10',
    image: './assets/e-commerce/products/4.png',
    imageLarge: './assets/e-commerce/products/large-4.png',
    imageSmall: './assets/e-commerce/managment/4.png',
        title: 'Cougar',
        subtitle: 'Cougar in blue',
        price: '452.7',
        rating: '45.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '133234',
    discount: '20',

    status: 'Sale'
  },
  {
    id: '11',
    image: './assets/e-commerce/products/5.png',
    imageLarge: './assets/e-commerce/products/large-5.png',
    imageSmall: './assets/e-commerce/managment/5.png',
        title: 'Cuatro milpas',
        subtitle: 'Cuatro milpas in white',
        price: '12.53',
        rating: '45889.2',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '138234',
    discount: '20',

    status: 'New'
  },
  {
    id: '12',
    image: './assets/e-commerce/products/6.png',
    imageLarge: './assets/e-commerce/products/large-6.png',
    imageSmall: './assets/e-commerce/managment/6.png',
        title: 'Cucana',
        subtitle: 'Cucana',
        price: '145.5',
        rating: 'sd4.6',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135237',
    discount: '20',

    status: 'Sale'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public getProducts(): Observable<ProductDetails[]> {
    return of(products);
  }

  public getProduct(id: string): Observable<ProductDetails[]> {
    return of(products);
   // .find((product: ProductDetails) => product.id === id)
  }

  public saveChangedProduct(editProduct: ProductDetails) {
    products.map((product: ProductDetails, i: number) => {
      if (product.id === editProduct.id) {
        products.splice(i, 1, editProduct);
      }
    });
  }

  public deleteProduct(id: string): void {
    products.map((product: ProductDetails, i: number) => {
      if (product.id === id) {
        products.splice(i, 1);
      }
    });
  }

  public getSimilarProducts(): Observable<ProductCard[]> {
    return of([
      {
        id: '1',
        image: './assets/e-commerce/products/1.png',
        title: 'Trainers',
        subtitle: 'Trainers in white',
        price: '$80',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '2',
        image: './assets/e-commerce/products/2.png',
        title: 'Boots',
        subtitle: 'Trainers in blue',
        price: '$37',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '3',
        image: './assets/e-commerce/products/3.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in white',
        price: '$70',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '4',
        image: './assets/e-commerce/products/4.png',
        title: 'Trainers',
        subtitle: 'Trainers in blue',
        price: '$85',
        rating: '4.6',
        status: 'Sale'
      }
    ]);
  }

  public createProduct(product: ProductDetails): void {
    products.push(product);
  }
}
