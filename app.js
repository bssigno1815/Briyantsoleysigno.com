// Sign-out handler (if present)
document.getElementById('signOutLink')?.addEventListener('click', async (e)=>{
  e.preventDefault();
  try{ await window.bss.signOut(window.bss.auth); }catch{}
  location.href='/index.html';
});
