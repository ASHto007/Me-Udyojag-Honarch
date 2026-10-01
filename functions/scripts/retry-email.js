// Run with administrator Application Default Credentials; never bundle into React.
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
initializeApp({ projectId: 'mi-udyojak-honarach' });
const id = process.argv[2];
if (!id || !/^[a-f0-9]{64}$/.test(id)) throw new Error('Usage: node scripts/retry-email.js <enquiry-id>');
const db = getFirestore(), ref = db.collection('mail').doc(id);
await db.runTransaction(async tx => {
  const mail = await tx.get(ref);
  if (!mail.exists || mail.data().delivery?.state !== 'ERROR') throw new Error('Only failed notifications can be retried.');
  tx.update(ref, { 'delivery.state': 'RETRY' });
});
console.log('Failed notification queued for retry.');
