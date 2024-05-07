import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPopupComponent } from './pedido-popup.component';

describe('PedidoPopupComponent', () => {
  let component: PedidoPopupComponent;
  let fixture: ComponentFixture<PedidoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
