import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabspagePage } from './tabspage.page';

describe('TabspagePage', () => {
  let component: TabspagePage;
  let fixture: ComponentFixture<TabspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabspagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
