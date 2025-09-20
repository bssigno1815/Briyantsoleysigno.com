(function(){
  const form = document.getElementById('vendorForm');
  const saveBtn = document.getElementById('saveDraftBtn');
  const badgeName = document.getElementById('badgeName');

  const DRAFT_KEY='bss.vendor.draft';

  form.addEventListener('input', ()=>{
    const name = form.name.value.trim();
    badgeName.textContent = name || 'Your Name';
  });

  // Load draft
  const raw = localStorage.getItem(DRAFT_KEY);
  if(raw){
    try{
      const d = JSON.parse(raw);
      Object.keys(d).forEach(k=>{ if(form[k]) form[k].value=d[k]; });
      badgeName.textContent = form.name.value || 'Your Name';
    }catch{}
  }

  // Save draft
  saveBtn.addEventListener('click', async ()=>{
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    // Persist draft in Firestore for admins
    const { db, addDoc, collection, serverTimestamp } = window.bss;
    await addDoc(collection(db,'vendors'), {
      ...data, status:'draft', createdAt: serverTimestamp()
    });
    alert('Draft saved. Admins can see it.');
  });

  // Finalize -> PDF + notify + mark status
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const { db, addDoc, collection, serverTimestamp } = window.bss;

    const docRef = await addDoc(collection(db,'vendors'), {
      ...data, status:'final', createdAt: serverTimestamp()
    });

    localStorage.removeItem(DRAFT_KEY);

    // Generate PDF
    await window.bssPDF.generateVendorPDF({ ...data, id: docRef.id });

    // Notify (email + sms)
    window.bssNotify.send({
      subject:'New Vendor Registration',
      text:`Vendor: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nStatus: final`,
      toEmail:'briyantsoleysigno1815@gmail.com',
      toPhone:'+15551234567'
    });

    alert('Registration finalized. PDF downloaded. Admins notified.');
  });
})();
