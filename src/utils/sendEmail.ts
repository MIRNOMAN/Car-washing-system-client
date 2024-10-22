import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { TAuthEmail, TNotificationEmail } from '../types/email.emailjs.params.interface';

// email js configuration
const SERVICE_ID = "service_4416tnf";
const PUBLIC_KEY = "OtcUle7FaostuAbAz";
let TEMPLATE_ID: string;

async function sendEmail(templateId: number, templateParams: TAuthEmail | TNotificationEmail): Promise<EmailJSResponseStatus | null> {
    switch (templateId) {
        case 1:
            TEMPLATE_ID = 'template_pvj329w'; //OTP template ID
            break;
        case 2:
            TEMPLATE_ID = 'template_pvj329w'; //Notification template ID
            break;
        default:
            console.log("Invalid templateId");
            return null;
    }

    try {
        // Ensure templateParams has 'otp' field if it's an OTP email
        // if ('otp' in templateParams) {
        //     console.log('Sending OTP: ', templateParams.otp); // Debug log for OTP value
        // }

        const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return res;
    } catch (error) {
        console.log('Email send error: ', error);
        return null;
    }
}

export default sendEmail;
