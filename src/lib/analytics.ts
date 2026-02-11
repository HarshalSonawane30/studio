'use client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Firestore, Auth } from 'firebase/firestore';

// This is a simplified analytics event data type.
// In a real-world scenario, this would be much more structured.
type AnalyticsEventData = {
  [key: string]: any;
};

/**
 * Tracks an analytics event and saves it to Firestore.
 * @param firestore - The Firestore instance.
 * @param auth - The Auth instance, to get the current user.
 * @param eventType - A string identifying the type of event (e.g., 'user_login', 'post_like').
 * @param eventData - An object containing additional data about the event.
 */
export const trackEvent = async (
  firestore: Firestore,
  auth: Auth | null,
  eventType: string,
  eventData: AnalyticsEventData = {}
) => {
  // Ensure we have a Firestore instance before proceeding.
  if (!firestore) {
    console.error("Firestore instance not available for analytics tracking.");
    return;
  }

  try {
    const event = {
      userId: auth?.currentUser?.uid || 'anonymous',
      eventType,
      timestamp: serverTimestamp(),
      eventData: JSON.stringify(eventData),
      // In a real production app, a session ID would be managed more robustly.
      sessionId: 'session_placeholder',
    };
    // Add the new event document to the 'analyticsEvents' collection.
    await addDoc(collection(firestore, 'analyticsEvents'), event);
  } catch (error) {
    console.error("Error tracking event: ", error);
  }
};
