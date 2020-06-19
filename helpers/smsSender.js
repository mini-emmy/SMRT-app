import * as SMS from 'expo-sms';


export const SendSMS = async (SARNumber, message) => {

    const isAvailable = await SMS.isAvailableAsync();
    console.log(isAvailable);
    if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(SARNumber, message);
        console.log(result);
        return result
    } else {
        return "There's no SMS available on this device"
    }
}

