/**
 * In-Memory & Persistent User Store with Automatic Account Linking
 */
class UserStore {
  constructor() {
    this.users = new Map(); // Keyed by User ID
    this.emailIndex = new Map(); // Keyed by normalized lowercase email
  }

  /**
   * Finds user by internal User ID
   */
  findById(id) {
    return this.users.get(id) || null;
  }

  /**
   * Finds user by verified email
   */
  findByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.toLowerCase().trim();
    const userId = this.emailIndex.get(normalizedEmail);
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  /**
   * Finds user by provider identity claims (e.g. google / google_1094827)
   */
  findByProvider(provider, providerId) {
    for (const user of this.users.values()) {
      const match = user.providers.find(
        (p) => p.provider === provider && p.providerId === String(providerId)
      );
      if (match) return user;
    }
    return null;
  }

  /**
   * Core Account Linking / User Provisioning Logic
   * If a user logs in with Google and later logs in with GitHub using the SAME verified email,
   * automatically links the providerId to the existing user record rather than creating a duplicate.
   */
  upsertOAuthUser({ email, name, avatar, provider, providerId, role = 'user' }) {
    const normalizedEmail = email ? email.toLowerCase().trim() : null;

    // 1. Check if user exists by exact provider identity
    let existingUser = this.findByProvider(provider, providerId);
    if (existingUser) {
      // Update profile info if changed
      if (name) existingUser.name = name;
      if (avatar) existingUser.avatar = avatar;
      return { user: existingUser, isNew: false, accountLinked: false };
    }

    // 2. Check if user exists by verified email (AUTOMATIC ACCOUNT LINKING)
    if (normalizedEmail) {
      existingUser = this.findByEmail(normalizedEmail);
      if (existingUser) {
        // Link new provider to existing account
        existingUser.providers.push({
          provider,
          providerId: String(providerId),
          linkedAt: new Date().toISOString()
        });
        if (avatar && !existingUser.avatar) existingUser.avatar = avatar;
        return { user: existingUser, isNew: false, accountLinked: true };
      }
    }

    // 3. Provision new user record if no existing account match
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newUser = {
      id: userId,
      email: normalizedEmail,
      name: name || 'Anonymous User',
      avatar: avatar || '',
      role: role,
      providers: [
        {
          provider,
          providerId: String(providerId),
          linkedAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    };

    this.users.set(userId, newUser);
    if (normalizedEmail) {
      this.emailIndex.set(normalizedEmail, userId);
    }

    return { user: newUser, isNew: true, accountLinked: false };
  }
}

export const userStore = new UserStore();
