import { InstagramIntegrationService } from './../../services/instagram-integration.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'tr-instagram-authentication-callback',
	templateUrl: './instagram-authentication-callback.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./instagram-authentication-callback.component.css']
})
export class InstagramAuthenticationCallbackComponent implements OnInit {
	exchangeTokenStatus: string;
	codeStatus: boolean = false;

	constructor(private router: Router, private insta: InstagramIntegrationService) { }

	ngOnInit() {
		const queryParams = this.router.routerState.snapshot.root.queryParams;
		const code = queryParams['code'];
		const error = queryParams['error'];
		const error_description = queryParams['error_description'];

		if (code) {
			this.codeStatus = true;
			this.insta.exchangeCodeWithToken(code)
				.subscribe(data => {
					this.exchangeTokenStatus = data['status'];
					setTimeout(() => {
						this.router.navigate(['/trips']);
					}, 5000)
				});
		}
		else {
			console.log(error, ": ", error_description);
		}
	}

}
