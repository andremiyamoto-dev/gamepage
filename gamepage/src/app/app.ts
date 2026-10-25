import { Component, computed, signal } from '@angular/core';

interface Game {
  id: number;
  title: string;
  category: string;
  image: string;
  rating: string;
  price: string;
  badge?: string;
}

const GAMES: Game[] = [
  {
    id: 1,
    title: 'Eclipse Protocol',
    category: 'Ação',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    rating: '9.4',
    price: 'R$ 149,90',
    badge: 'MAIS JOGADO',
  },
  {
    id: 2,
    title: 'Neon Drift',
    category: 'Corrida',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85',
    rating: '8.9',
    price: 'R$ 89,90',
    badge: 'NOVO',
  },
  {
    id: 3,
    title: 'Realm of Ashes',
    category: 'RPG',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
    rating: '9.2',
    price: 'R$ 199,90',
  },
  {
    id: 4,
    title: 'Last Signal',
    category: 'Ação',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85&sat=-50',
    rating: '8.7',
    price: 'R$ 119,90',
  },
];

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly categories = ['Todos', 'Ação', 'RPG', 'Corrida'];
  protected readonly selectedCategory = signal('Todos');
  protected readonly searchTerm = signal('');
  protected readonly wishlist = signal<Set<number>>(new Set());
  protected readonly games = computed(() => {
    const category = this.selectedCategory();
    const search = this.searchTerm().trim().toLocaleLowerCase();

    return GAMES.filter(
      (game) =>
        (category === 'Todos' || game.category === category) &&
        game.title.toLocaleLowerCase().includes(search),
    );
  });

  protected onSearch(event: Event): void {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.searchTerm.set(input.value);
    }
  }

  protected toggleWishlist(gameId: number): void {
    this.wishlist.update((current) => {
      const next = new Set(current);
      if (next.has(gameId)) {
        next.delete(gameId);
      } else {
        next.add(gameId);
      }
      return next;
    });
  }

  protected isWishlisted(gameId: number): boolean {
    return this.wishlist().has(gameId);
  }
}
