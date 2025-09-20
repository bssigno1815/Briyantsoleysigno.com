window.bssNotify = {
  // Replace with your integrations when ready
  async send({subject, text, toEmail, toPhone}){
    // EMAIL (option A): EmailJS (client-side)
    // emailjs.send('SERVICE_ID','TEMPLATE_ID',{subject, message:text, to_email: toEmail}, 'PUBLIC_KEY');

    // EMAIL (option B): Firebase Callable Function endpoint
    // await fetch('https://YOUR_FUNCTION_URL/sendEmail',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({toEmail, subject, text})});

    // SMS (Twilio/MessageBird/Nexmo via serverless function)
    // await fetch('https://YOUR_FUNCTION_URL/sendSMS',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({toPhone, text})});
  }
};
