export type SafeUser = {
    id: number;
    username: string;
    profile_picture: string | null;
    created_at: Date;
    updated_at: Date;
};

export type LoginUser = {
    id: number;
    username: string;
    password: string;
    profile_picture: string | null;
};

export type User = {
    id: number;
    username: string;
    password: string;
    profile_picture: string | null;
    created_at: Date;
    updated_at: Date;
};

export type Session = {
    id: number;
    userId: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserSession = {
    id: number;
    username: string;
    profile_picture: string | null;
    created_at: Date;
    updated_at: Date;
    token: string;
};

export type ResultSetHeader = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
    changedRows: number;
};

export type Booking = {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    arrival: string;
    departure: string;
    adult: number;
    child: number;
    young_child: number;
    cost: number;
    booking_status: number;
    notes: string;
    license_plate: string;
    car_status: number;
    house_number: string;
    city: string;
    country: string | null;
    streetname: string;
    zipcode: string;
    camping_spot_id: number;
    spot_name: string;
};

export type Spot = {
    accommodation_type: string;
    accommodations_id: number;
    id: number;
    notes: string;
    spot_name: string;
    spot_status: number;
    family: string;
};
