import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { TAuthEmail, TNotificationEmail } from '../types/email.emailjs.params.interface';


// email js configuration
const SERVICE_ID = "service_4416tnf";
const PUBLIC_KEY = "OtcUle7FaostuAbAz";
let TEMPLATE_ID: string;

async function sendEmail(templateId: number, templateParams: TAuthEmail | TNotificationEmail): Promise<EmailJSResponseStatus | null> {
    switch (templateId) {
        case 1:
            TEMPLATE_ID = 'template_dj4c7qp'; //OTP
            break;
        case 2:
            TEMPLATE_ID = 'template_rl77sal'; //Notification
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