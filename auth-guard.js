(async function(){
  const { auth, db } = window.bss;
  const getRole = async (uid)=>{
    const snap = await window.bss.getDoc(window.bss.doc(db,'roles',uid));
    return snap.exists() ? snap.data().role : 'none';
  };

  window.bss.onAuthStateChanged(auth, async (user)=>{
    if(!user){ window.location.href='/index.html'; return; }
    const role = await getRole(user.uid);
    if(role!=='admin' && role!=='superadmin'){
      alert('Admins only'); window.location.href='/index.html';
    }
  });
})();
