import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { TAuthEmail, TNotificationEmail } from '../interface/email.emailjs.params.interface';

// email js configuration
const SERVICE_ID = "rentngo";
const PUBLIC_KEY = "LHLlu1j3Zu_y4Qe8d";
let TEMPLATE_ID: string;

async function sendEmail(templateId: number, templateParams: TAuthEmail | TNotificationEmail): Promise<EmailJSResponseStatus | null> {
    switch (templateId) {
        case 1:
            TEMPLATE_ID = 'template_c57ck16'; //OTP
            break;
        case 2:
            TEMPLATE_ID = 'template_je509rr'; //Notification
            break;
        default:
            break;
    }

    try {
        const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}

export default sendEmail;