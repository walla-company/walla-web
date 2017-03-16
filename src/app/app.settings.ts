import { Domain } from './models/index';

export class AppSettings {
    public static API_ENDPOINT: string = 'http://localhost:8080/api';
    // public static API_ENDPOINT: string = 'https://walla-server-test.herokuapp.com/api';
    public static API_TOKEN: string = '3eaf7dFmNF447d';

    public static getAllowedDomains(): Domain[] {
        return JSON.parse(localStorage.getItem('AllowedDomains'));
    }

    public static setAllowedDomains(domains: Domain[]) {
        localStorage.setItem('AllowedDomains', JSON.stringify(domains));
    }

    public static getCurrentDomain(): string {
        return JSON.parse(localStorage.getItem('CurrentDomain'));
    }

    public static setCurrentDomain(domain_id: string): Domain {
        localStorage.setItem('CurrentDomain', JSON.stringify(domain_id));
        return this.getDomain(domain_id);
    }

    public static getDomain(domain_id: string) {
        return this.getAllowedDomains().filter(d => d.id === domain_id)[0];
    }
}
