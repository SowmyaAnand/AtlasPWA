import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterpostsPage } from './filterposts.page';

describe('FilterpostsPage', () => {
  let component: FilterpostsPage;
  let fixture: ComponentFixture<FilterpostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterpostsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterpostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
