import { TestBed, inject } from '@angular/core/testing';

import { ShopingCartService } from './shoping-cart.service';

describe('ShoopingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopingCartService]
    });
  });

  it('should be created', inject([ShopingCartService], (service: ShopingCartService) => {
    expect(service).toBeTruthy();
  }));
});
