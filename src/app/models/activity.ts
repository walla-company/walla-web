export class Activity {
    activity_id: string;
    start_time: number;
    end_time: number;
    title: string;
    public: boolean;
    host: string;
    details: string;
    host_group: string;
    host_group_name: string;
    host_group_short_name: string;
    interests: any;
    location: {
        name: string,
        address: string,
        lat: number,
        long: number
    };
}
