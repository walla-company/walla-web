import { Domain } from './models/index';

export class AppSettings {
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
