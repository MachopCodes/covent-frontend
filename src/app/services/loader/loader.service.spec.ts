import { TestBed } from '@angular/core/testing';
import { ApplicationRef, ComponentRef } from '@angular/core';
import { LoaderService } from './loader.service';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

xdescribe('LoaderService', () => {
  let service: LoaderService;
  let appRefSpy: jasmine.SpyObj<ApplicationRef>;
  let mockComponentRef: jasmine.SpyObj<ComponentRef<LoaderComponent>>;

  beforeEach(() => {
    // Mock ApplicationRef
    appRefSpy = jasmine.createSpyObj<ApplicationRef>('ApplicationRef', [
      'attachView',
      'detachView',
    ]);

    // Mock ComponentRef
    mockComponentRef = jasmine.createSpyObj<ComponentRef<LoaderComponent>>(
      'ComponentRef',
      ['destroy'],
      {
        hostView: jasmine.createSpyObj('hostView', ['']),
        location: jasmine.createSpyObj('location', ['nativeElement']),
      }
    );

    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        { provide: ApplicationRef, useValue: appRefSpy },
      ],
    });

    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should create and show loader component when show() is called', () => {
    spyOn(document.body, 'appendChild');
    spyOn(service as any, 'createComponent').and.returnValue(mockComponentRef);

    service.show();

    expect(appRefSpy.attachView).toHaveBeenCalledWith(
      mockComponentRef.hostView
    );
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(service['isVisible']).toBeTrue();
  });

  xit('should not create multiple loader components if already visible', () => {
    spyOn(document.body, 'appendChild');
    spyOn(service as any, 'createComponent').and.returnValue(mockComponentRef);

    service.show();
    service.show(); // Call again to test the guard

    expect(appRefSpy.attachView).toHaveBeenCalledTimes(1); // AttachView called only once
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(service['isVisible']).toBeTrue();
  });

  xit('should hide and destroy loader component when hide() is called', () => {
    spyOn(service as any, 'createComponent').and.returnValue(mockComponentRef);

    service.show(); // Make loader visible
    service.hide();

    expect(appRefSpy.detachView).toHaveBeenCalledWith(
      mockComponentRef.hostView
    );
    expect(mockComponentRef.destroy).toHaveBeenCalled();
    expect(service['isVisible']).toBeFalse();
  });

  xit('should not hide loader if it is not visible', () => {
    service.hide(); // Call without showing loader

    expect(appRefSpy.detachView).not.toHaveBeenCalled();
    expect(mockComponentRef.destroy).not.toHaveBeenCalled();
    expect(service['isVisible']).toBeFalse();
  });
});
