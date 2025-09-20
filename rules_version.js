rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function isSignedIn() { return request.auth != null; }
    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(db)/documents/roles/$(request.auth.uid)).data.role in ['admin','superadmin'];
    }
    function isSuper() {
      return isSignedIn() &&
        get(/databases/$(db)/documents/roles/$(request.auth.uid)).data.role == 'superadmin';
    }

    // Roles docs: only superadmin can write roles; admins can read
    match /roles/{uid} {
      allow read: if isAdmin();
      allow write: if isSuper();
    }

    // Vendors (Ti Machann)
    match /vendors/{id} {
      // Anyone signed in can create a DRAFT
      allow create: if isSignedIn() && request.resource.data.status == 'draft';

      // Read: admins only
      allow read: if isAdmin();

      // Update/Finalize: admins only; must include a phone number to finalize
      allow update: if isAdmin() &&
        (
          request.resource.data.status == 'draft' ||
          (
            request.resource.data.status == 'final' &&
            request.resource.data.phone is string && request.resource.data.phone.size() >= 7
          )
        );

      // Delete: superadmin only
      allow delete: if isSuper();
    }
  }
}
