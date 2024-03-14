import { getDatabase, ref, push, set, serverTimestamp } from 'firebase/database';
const database = getDatabase();
// generate a random alphanumeric string for the short URL key
 export function generateShortUrlKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 6; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

// save the long URL and generate a short URL key
export async function saveUrl(longUrl: string): Promise<string | null> {
  try {
    const shortUrlKey = generateShortUrlKey();
    await set(ref(database, `shortened_urls/${shortUrlKey}`), longUrl);
    return shortUrlKey;
  } catch (error) {
    console.error('Error saving URL:', error);
    throw error; 
  }
}