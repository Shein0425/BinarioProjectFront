// Represents the structure of user data that may include errors.
export interface Users {
    errors: string;
    result: Users[];
    idusers: number;
    fname: string;
    lname: string;
    email: string;
}

// Represents the structure of registered user data.
export interface regUsers {
    idusers: number;
    fname: string;
    lname: string;
    email: string;
}

// Represents the structure of login credentials.
export interface Login {
    email: string;
    password: string;
}
