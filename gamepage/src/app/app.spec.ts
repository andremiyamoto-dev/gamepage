import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the gaming headline', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Jogue além');
  });

  it('should filter games by category', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rpgTab = Array.from(compiled.querySelectorAll('.category-tab')).find(
      (button) => button.textContent?.trim() === 'RPG',
    );

    rpgTab?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.game-card').length).toBe(1);
    expect(compiled.querySelector('.game-card h3')?.textContent).toContain('Realm of Ashes');
  });

  it('should filter games by search term', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const search = compiled.querySelector('input[type="search"]') as HTMLInputElement;
    search.value = 'Neon';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.game-card').length).toBe(1);
    expect(compiled.querySelector('.game-card h3')?.textContent).toContain('Neon Drift');
  });
});
