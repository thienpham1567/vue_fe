export interface UserType {
    userId?: number;
    password?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
}

export interface CreationParams {
    password?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
}

export interface LoginParams {
    email: String;
    password: String;
}