import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonModal,
  IonFooter,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonMenuButton,
  IonBadge,
  ToastController,
  ModalController,
  IonSpinner
} from '@ionic/angular/standalone';

// Icons
const cartOutline = 'cart-outline';
const closeOutline = 'close-outline';
const removeOutline = 'remove-outline';
const addOutline = 'add-outline';
const trashOutline = 'trash-outline';
const searchOutline = 'search-outline';
const star = 'star';
const starOutline = 'star-outline';
const heart = 'heart';
const heartOutline = 'heart-outline';
const arrowForward = 'arrow-forward';
const chevronForward = 'chevron-forward';

// Register icons
const icons = {
  'cart-outline': cartOutline,
  'close-outline': closeOutline,
  'remove-outline': removeOutline,
  'add-outline': addOutline,
  'trash-outline': trashOutline,
  'search-outline': searchOutline,
  'star': star,
  'star-outline': starOutline,
  'heart': heart,
  'heart-outline': heartOutline,
  'arrow-forward': arrowForward,
  'chevron-forward': chevronForward
};

import { register } from 'swiper/element/bundle';

// Register Swiper elements
register();

type SwiperOptions = {
  slidesPerView: number | 'auto';
  spaceBetween: number;
  freeMode: boolean;
};

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonModal,
    IonFooter,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonMenuButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  cartItemCount: number = 0;
  isCartAnimating: boolean = false;

  slideOpts: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    freeMode: true
  };

  categories: Category[] = [
  { 
    id: 1, 
    name: 'Sneakers', 
    image: '/sneakers.jpg' 
  },
  { 
    id: 2, 
    name: 'Running', 
    image: '/runningshoes.webp' 
  },
  { 
    id: 3, 
    name: 'Basketball', 
    image: '/bball-shoes.jpg' 
  },
  { 
    id: 4, 
    name: 'Casual', 
    image: '/casualshoes.jpg' 
  },
  { 
    id: 5, 
    name: 'Training', 
    image: '/trainingshoes.webp' 
  },
  { 
    id: 6, 
    name: 'Sandals', 
    image: '/sandals.jpg' 
  },
];

  featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    discount: 17,
    image: '/nk270.jpg',
    brand: 'Nike',
    category: 'Sneakers'
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 21',
    price: 180,
    originalPrice: 210,
    discount: 14,
    image: '/addboost.webp',
    brand: 'Adidas',
    category: 'Running'
  },
  {
    id: 3,
    name: 'Puma RS-X',
    price: 110,
    originalPrice: 140,
    discount: 21,
    image: '/pumarsx.jpg',
    brand: 'Puma',
    category: 'Lifestyle'
  },
  {
    id: 4,
    name: 'New Balance 574',
    price: 85,
    originalPrice: 100,
    discount: 15,
    image: '/nb574.jpg',
    brand: 'New Balance',
    category: 'Casual'
  },
  {
    id: 5,
    name: 'Vans Old Skool',
    price: 75,
    originalPrice: 90,
    discount: 17,
    image: '/vansOS.webp',
    brand: 'Vans',
    category: 'Casual'
  },
  {
    id: 6,
    name: 'Converse Chuck 70',
    price: 85,
    originalPrice: 95,
    discount: 11,
    image: '/con70.webp',
    brand: 'Converse',
    category: 'Sneakers'
  },
  {
    id: 7,
    name: 'Nike Air Force 1',
    price: 100,
    originalPrice: 120,
    discount: 17,
    image: '/nke1.jpg',
    brand: 'Nike',
    category: 'Sneakers'
  },
  {
    id: 8,
    name: 'Adidas NMD_R1',
    price: 130,
    originalPrice: 150,
    discount: 13,
    image: '/nmd.avif',
    brand: 'Adidas',
    category: 'Lifestyle'
  }
];

  brands: string[] = [
  '/nikelogo.jpg',
  '/addlogo.jpg',
  '/pumalogo.jpg',
  '/nblogo.jpg',
  '/conlogo.jpg',
  '/vanslogo.jpg',
  '/reeboklogo.jpg',
  '/underlogo.jpg',
  '/asicslogo.jpg',
  '/skecherslogo.jpg'
];

  // Search functionality properties
  searchQuery: string = '';
  searchResults: Product[] = [];
  isSearchOpen: boolean = false;
  isSearchFocused: boolean = false;
  isCartOpen: boolean = false;
  cartItems: { product: Product; quantity: number }[] = [];

  constructor(
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    // Register all icons
    Object.entries(icons).forEach(([name, value]) => {
      const iconElement = document.createElement('ion-icon');
      iconElement.setAttribute('name', name);
      iconElement.setAttribute('data-name', name);
      document.body.appendChild(iconElement);
    });
  }

  ngOnInit(): void {
    // Initialization code here if needed
  }

  // Search methods
  onSearchFocus() {
    this.isSearchFocused = true;
  }

  onSearchBlur() {
    if (!this.searchQuery) {
      this.isSearchFocused = false;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.isSearchFocused = false;
    this.isSearchOpen = false;
  }

  onSearch(event: any) {
    const query = (event.target?.value || '').toLowerCase().trim();
    
    if (!query) {
      this.searchResults = [];
      this.isSearchOpen = false;
      return;
    }

    this.searchResults = this.featuredProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });

    // Open search results modal if we have results
    this.isSearchOpen = this.searchResults.length > 0;
  }

  openSearch() {
    this.isSearchOpen = true;
    this.isSearchFocused = true;
    
    // Focus the search input after a short delay
    setTimeout(() => {
      const searchbar = document.querySelector('ion-searchbar');
      if (searchbar) {
        searchbar.setFocus();
      }
    }, 100);
  }

  dismissSearch() {
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
    this.isSearchFocused = false;
  }

  onSearchDismiss() {
    this.dismissSearch();
  }

  addToCart(product: Product) {
    // Check if product is already in cart
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    
    // Update cart count
    this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // Show toast notification
    this.presentToast(`${product.name} added to cart`);
    
    // Trigger cart animation
    this.animateCartButton();
  }

  animateCartButton() {
    this.isCartAnimating = true;
    setTimeout(() => {
      this.isCartAnimating = false;
    }, 500); // Match this with the animation duration
  }

  openCart() {
    this.isCartOpen = true;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  updateQuantity(item: { product: Product; quantity: number }, change: number) {
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      this.removeFromCart(item);
    } else {
      item.quantity = newQuantity;
      this.updateCartCount();
    }
  }

  removeFromCart(item: { product: Product; quantity: number }) {
    const index = this.cartItems.findIndex(i => i.product.id === item.product.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.updateCartCount();
      this.presentToast(`${item.product.name} removed from cart`);
    }
  }

  private updateCartCount() {
    this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }

  checkout() {
    // Here you would typically navigate to the checkout page
    this.presentToast('Proceeding to checkout');
    this.closeCart();
    
    // Example checkout logic:
    // this.router.navigate(['/checkout']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
