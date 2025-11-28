/**
 * Feedback Store - Client-side feedback management
 * Handles local storage of feedback before syncing with backend
 */

export interface FeedbackRatings {
  service: number;
  ambiance: number;
  foodBeverage: number;
}

export interface FeedbackData {
  id: string;
  ratings: FeedbackRatings;
  averageRating: number;
  feedbackType: 'feedback' | 'suggestion' | 'request';
  feedbackText: string;
  discrepancyCategory: string | null;
  userId: string;
  timestamp: string;
  synced: boolean;
}

const STORAGE_KEY = 'coffeeshop_feedback_history';
const LAST_FEEDBACK_KEY = 'coffeeshop_last_feedback_date';

class FeedbackStore {
  private isBrowser = typeof window !== 'undefined';

  /**
   * Save feedback to local storage
   */
  save(feedbackData: Omit<FeedbackData, 'id' | 'synced'>): FeedbackData {
    if (!this.isBrowser) return { ...feedbackData, id: '', synced: false };

    const feedback: FeedbackData = {
      ...feedbackData,
      id: this.generateId(),
      synced: false
    };

    // Get existing feedback
    const history = this.getHistory();
    history.push(feedback);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    localStorage.setItem(LAST_FEEDBACK_KEY, new Date().toISOString());

    // Dispatch event for other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('feedback-submitted', { detail: feedback }));
    }

    // TODO: Queue for backend sync
    this.syncToBackend(feedback);

    return feedback;
  }

  /**
   * Get feedback history
   */
  getHistory(): FeedbackData[] {
    if (!this.isBrowser) return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading feedback history:', error);
      return [];
    }
  }

  /**
   * Check if user can submit feedback (anti-spam)
   * Returns true if user can submit, false if they need to wait
   */
  canSubmitFeedback(): { allowed: boolean; lastFeedback?: Date; daysUntilNext?: number } {
    if (!this.isBrowser) return { allowed: true };

    const lastFeedbackDate = localStorage.getItem(LAST_FEEDBACK_KEY);

    if (!lastFeedbackDate) {
      return { allowed: true };
    }

    const lastDate = new Date(lastFeedbackDate);
    const now = new Date();
    const daysSinceLastFeedback = Math.floor(
      (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Allow one feedback per month (30 days)
    const cooldownPeriod = 30;
    const allowed = daysSinceLastFeedback >= cooldownPeriod;

    return {
      allowed,
      lastFeedback: lastDate,
      daysUntilNext: allowed ? 0 : cooldownPeriod - daysSinceLastFeedback
    };
  }

  /**
   * Get unsynced feedback (to be sent to backend)
   */
  getUnsyncedFeedback(): FeedbackData[] {
    return this.getHistory().filter(f => !f.synced);
  }

  /**
   * Mark feedback as synced
   */
  markAsSynced(feedbackId: string): void {
    if (!this.isBrowser) return;

    const history = this.getHistory();
    const updated = history.map(f =>
      f.id === feedbackId ? { ...f, synced: true } : f
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Clear all feedback history (admin only)
   */
  clearHistory(): void {
    if (!this.isBrowser) return;

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_FEEDBACK_KEY);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sync feedback to backend (placeholder for Phase 2)
   */
  private async syncToBackend(feedback: FeedbackData): Promise<void> {
    try {
      // TODO: Implement backend API call
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(feedback)
      // });

      // if (response.ok) {
      //   this.markAsSynced(feedback.id);
      // }

      console.log('Feedback ready for backend sync:', feedback);
    } catch (error) {
      console.error('Error syncing feedback:', error);
    }
  }

  /**
   * Get feedback statistics
   */
  getStatistics() {
    const history = this.getHistory();

    if (history.length === 0) {
      return {
        totalFeedback: 0,
        averageRating: 0,
        feedbackCount: 0,
        suggestionCount: 0,
        requestCount: 0
      };
    }

    const totalRating = history.reduce((sum, f) => sum + f.averageRating, 0);

    return {
      totalFeedback: history.length,
      averageRating: totalRating / history.length,
      feedbackCount: history.filter(f => f.feedbackType === 'feedback').length,
      suggestionCount: history.filter(f => f.feedbackType === 'suggestion').length,
      requestCount: history.filter(f => f.feedbackType === 'request').length
    };
  }
}

// Export singleton instance
export const feedbackStore = new FeedbackStore();
