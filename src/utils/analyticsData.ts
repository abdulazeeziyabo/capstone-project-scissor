import { logEvent, getAnalytics } from 'firebase/analytics';
import { Firebase } from './firebase';
import { ref, get } from 'firebase/database';
import { getDatabase } from "firebase/database";

const database = getDatabase(Firebase);
const analytics = getAnalytics(Firebase);

export async function getAnalyticsData() {
    try {
        const analyticsRef = ref(database, 'analyticsData'); 
        const snapshot = await get(analyticsRef);
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null; 
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        throw error;
      }
}
