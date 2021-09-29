import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserPanelComponent } from './login-user-panel.component';

describe('LoginUserPanelComponent', () => {
  let component: LoginUserPanelComponent;
  let fixture: ComponentFixture<LoginUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
