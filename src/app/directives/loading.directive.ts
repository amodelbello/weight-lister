import { Directive, Input, TemplateRef, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective {

  spinnerFactory: ComponentFactory<SpinnerComponent>
  spinnerComponent: ComponentRef<SpinnerComponent>

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { 
    this.spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

  @Input() set loading(isLoading: boolean) {
    if (isLoading) {
      this.viewContainer.clear();
      this.spinnerComponent = this.viewContainer.createComponent(this.spinnerFactory);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
