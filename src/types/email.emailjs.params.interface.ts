export interface TAuthEmail {
    name: string | null;
    email: string | null;
    otp: string;
    [kye: string]: unknown;
}

export interface TNotificationEmail extends Pick<TAuthEmail, 'name' | 'email'> {
    subject: string
    description: string;
    [key: string]: unknown;
}