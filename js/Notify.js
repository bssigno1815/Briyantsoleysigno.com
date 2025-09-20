window.bssNotify = {
  async send({subject, text, html, toEmail, toPhone}) {
    // Email
    await fetch('/api/notify-email', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ subject, text, html, to: toEmail })
    });
    // SMS
    await fetch('/api/notify-sms', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text, to: toPhone })
    });
  }
};
