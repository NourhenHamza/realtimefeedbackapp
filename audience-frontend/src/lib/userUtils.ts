// src/lib/userUtils.ts

/**
 * Generate or retrieve a unique user ID for the current browser
 */
export function getUserId(): string {
  const STORAGE_KEY = 'audience_user_id';
  
  // Check if user already has an ID
  let userId = localStorage.getItem(STORAGE_KEY);
  
  if (!userId) {
    // Generate new unique ID
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY, userId);
  }
  
  return userId;
}

/**
 * Generate or retrieve a user name
 */
export function getUserName(): string | null {
  return localStorage.getItem('audience_user_name');
}

/**
 * Set user name
 */
export function setUserName(name: string): void {
  localStorage.setItem('audience_user_name', name.trim());
}

/**
 * Check if user has set their name
 */
export function hasUserName(): boolean {
  const name = getUserName();
  return !!name && name.trim().length > 0;
}