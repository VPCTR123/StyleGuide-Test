import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanitizeHtmlPipeComponent } from './sanitize-html-pipe.component';

describe('SanitizeHtmlPipeComponent', () => {
  let component: SanitizeHtmlPipeComponent;
  let fixture: ComponentFixture<SanitizeHtmlPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanitizeHtmlPipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanitizeHtmlPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
