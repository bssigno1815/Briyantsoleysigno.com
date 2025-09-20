window.bssNotify = {
  async send({subject, text, html, toEmail, toPhone}) {
    // Fire email
    try {
      await fetch('/api/notify-email', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ subject, text, html, to: toEmail })
      });
    } catch(e) { console.warn('Email notify failed', e); }

    // Fire SMS
    try {
      await fetch('/api/notify-sms', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ text, to: toPhone })
      });
    } catch(e) { console.warn('SMS notify failed', e); }
  }
};
