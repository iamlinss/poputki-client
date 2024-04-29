import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Using this service shouldn't implement OnDestroy in component
 *
 * @example
 *
 * *@Component({
 * 	selector: "app-component",
 * 	template: "",
 *  providers: [UnsubscribeService],
 * })
 * export class MyCmp {
 * 	public constructor(private unsubscribe$: UnsubscribeService) {}
 * }
 */
@Injectable()
export class UnsubscribeService extends Subject<void> implements OnDestroy {
  public ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
