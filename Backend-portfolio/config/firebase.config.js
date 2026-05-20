// ============================================================================
// Firebase Admin SDK — initialise once, export db
// ============================================================================
const admin = require('firebase-admin');

function initFirebase() {
  if (admin.apps.length) return admin.app();

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT is not set. ' +
        'Paste the full service-account JSON as a single-line string in .env.'
    );
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(raw);
  } catch {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT is not valid JSON. ' +
        'Make sure you pasted the entire JSON as a single line.'
    );
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

initFirebase();

const db = admin.firestore();

module.exports = { admin, db };
