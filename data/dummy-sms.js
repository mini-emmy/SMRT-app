import SmsMessage from '../model/sms-message';


const SMSMESSAGES = [
    new SmsMessage(
      '1',
      '2020-06-11 12:23:12',
      'This is a message from YAS with a what3word location of risky.ambulance.column and that is an example of a typical message',
      'YAS',
       
    ),
    new SmsMessage(
        '2',
        '2020-06-10 12:23:12',
        'This is a message from Yorkshire Police with a grid reference location of SE 986323 and that is an example of a typical message',
        'Yorkshire Police'
    ),
    new SmsMessage(
        '3',
        '2020-06-09 12:23:12',
        'This is a message from Yorkshire Police with a grid reference location of SE 986323 and a what 3 word location of hello.drawer.clown that is an example of a typical message',
        'Yorkshire Police'
    )]

export default SMSMESSAGES;