import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MigratedComponentsComponent } from './migrated-components.component';

describe('MigratedComponentsComponent', () => {
  let component: MigratedComponentsComponent;
  let fixture: ComponentFixture<MigratedComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigratedComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MigratedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
