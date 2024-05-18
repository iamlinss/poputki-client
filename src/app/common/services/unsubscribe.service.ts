import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {LoaderService} from './loader.service';

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
  constructor(public loaderService: LoaderService) {
    super();
  }
  public ngOnDestroy(): void {
    this.loaderService.setLoading(false);
    this.next();
    this.complete();
  }
}
