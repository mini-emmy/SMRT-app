import * as SMS from 'expo-sms';


export const SendSMS = async (SARNumber, message) => {

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(SARNumber, message);
        return result
    } else {
        return "There's no SMS available on this device"
    }
}

