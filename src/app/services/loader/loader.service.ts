import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  createComponent,
  Injector,
} from '@angular/core';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private componentRef!: ComponentRef<LoaderComponent>;
  private isVisible = false;

  constructor(private appRef: ApplicationRef) {}

  show(): void {
    if (this.isVisible) return;

    // Create the loader component dynamically
    this.componentRef = createComponent(LoaderComponent, {
      environmentInjector: this.appRef.injector,
    });

    // Attach the component to the application
    this.appRef.attachView(this.componentRef.hostView);

    // Append the component's DOM element to the body
    const domElem = this.componentRef.location.nativeElement;
    document.body.appendChild(domElem);

    this.isVisible = true;
  }

  hide(): void {
    if (!this.isVisible) return;

    // Detach and destroy the component
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.isVisible = false;
  }
}
