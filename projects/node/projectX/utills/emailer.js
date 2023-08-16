const sgMailer = require('@sendgrid/mail');
const {FROM_EMAIL,TEMPLATE_IDS} = require('../config/sgConfig');
sgMailer.setApiKey(process.env.SENDGRID_APIKEY);

exports.SendWelcomeEmail = async(email,displayName)=>{
    const msg = {
        to:email,
        from:FROM_EMAIL,
        template_id:TEMPLATE_IDS.WELCOME_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
            "NAME": displayName,
            "ROLE_URL": "www.google.com"    //this value is common so can be kept in config file
        }
    }
    try {
        const result = await sgMailer.send(msg)
    } catch (error) {
        console.log(error);
        return false
    }
}

exports.resetPassword=async(displayName,email,resetURL)=>{
    const msg = {
        to:email,
        from:FROM_EMAIL,
        template_id:TEMPLATE_IDS.FORGOT_PASSWORD_TEMPLATE_ID,
        dynamicTemplateData: {
            "NAME": displayName,
            "RESET_PASSWORD_LINK": resetURL
        }
    }
    try {
        const result = await sgMailer.send(msg)
    } catch (error) {
        console.log(error);
        return false
    }
}