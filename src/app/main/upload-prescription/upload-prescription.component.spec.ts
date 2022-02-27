import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadPrescriptionComponent } from './upload-prescription.component';

describe('UploadPrescriptionComponent', () => {
  let component: UploadPrescriptionComponent;
  let fixture: ComponentFixture<UploadPrescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPrescriptionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
