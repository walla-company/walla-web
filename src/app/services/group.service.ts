import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Group } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupService {
    constructor(private http: Http) { }

    getAll(domain_id: string, filterFn: (g: Group) => boolean = null): Promise<Group[]> {
        return new Promise<Group[]>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + environment.API_TOKEN;
            this.http.get(environment.API_ENDPOINT + '/get_groups?' + query).map(res => res.json())
                .subscribe(oGroups => {
                    let arrGroups: Group[] = [];
                    for (let k in oGroups) {
                        if (oGroups.hasOwnProperty(k) && (!filterFn || filterFn(oGroups[k]))) {
                            arrGroups.push(oGroups[k]);
                        }
                    }
                    resolve(arrGroups);
                }, err => reject(err.message));
        });
    }
}
