import { TestBed } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;
  let appRefSpy: jasmine.SpyObj<ApplicationRef>;

  beforeEach(() => {
    const appRefMock = jasmine.createSpyObj<ApplicationRef>('ApplicationRef', [
      'attachView',
      'detachView',
    ]);
    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        { provide: ApplicationRef, useValue: appRefMock },
      ],
    });
    service = TestBed.inject(LoaderService);
    appRefSpy = TestBed.inject(
      ApplicationRef
    ) as jasmine.SpyObj<ApplicationRef>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and show loader component when show() is called', () => {
    spyOn(document.body, 'appendChild');
    spyOn(service, 'hide').and.callThrough();

    service.show();

    expect(appRefSpy.attachView).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(service['isVisible']).toBeTrue();
  });

  it('should not create multiple loader components if already visible', () => {
    spyOn(document.body, 'appendChild');

    service.show();
    service.show(); // Call again to test the guard

    expect(appRefSpy.attachView).toHaveBeenCalledTimes(1); // AttachView called only once
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(service['isVisible']).toBeTrue();
  });

  it('should hide and destroy loader component when hide() is called', () => {
    spyOn(service['componentRef'], 'destroy');

    service.show(); // Make loader visible
    service.hide();

    expect(appRefSpy.detachView).toHaveBeenCalled();
    expect(service['componentRef'].destroy).toHaveBeenCalled();
    expect(service['isVisible']).toBeFalse();
  });

  it('should not hide loader if it is not visible', () => {
    spyOn(appRefSpy, 'detachView');
    spyOn(service['componentRef'], 'destroy');

    service.hide(); // Call without showing loader

    expect(appRefSpy.detachView).not.toHaveBeenCalled();
    expect(service['componentRef']?.destroy).toBeUndefined();
    expect(service['isVisible']).toBeFalse();
  });
});
