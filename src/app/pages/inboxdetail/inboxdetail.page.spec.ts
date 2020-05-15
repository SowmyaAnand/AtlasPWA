import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InboxdetailPage } from './inboxdetail.page';

describe('InboxdetailPage', () => {
  let component: InboxdetailPage;
  let fixture: ComponentFixture<InboxdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InboxdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
