export interface Schedule {
    interval: number; // Subscription's interval given by merchant. Integer Required
    interval_unit: 'day' | 'week' | 'month'; // Interval temporal unit. String Required
    max_interval?: number; // Maximum interval of subscription. Integer Optional
    start_time?: string; // Timestamp of subscription in yyyy-MM-dd HH:mm:ss Z. String Optional
  }

  export interface RetrySchedule {
    interval: number; // Retry interval given by merchant. Integer Required
    interval_unit: 'minute' | 'hour' | 'day'; // Interval temporal unit. String Required
    max_interval?: number; // Maximum interval of retry. Integer Optional
  }

  export interface UpdateSchedule {
    interval: number; // Update interval given by merchant. Integer Required
    next_execution_at: string; // Timestamp of next update in yyyy-MM-dd HH:mm:ss Z. String Required
  }

  /**
   * Subscription Schedule
   * @see https://docs.midtrans.com/reference/subscription-schedule-object
   * @example 
   * "schedule": {}
   */
  export interface SubscriptionSchedule {
    interval: number; // Subscription's interval given by merchant. Integer Required
    interval_unit: 'day' | 'week' | 'month'; // Interval temporal unit. String Required
    max_interval?: number; // Maximum interval of subscription. Integer Optional
    current_interval?: number; // Current interval of subscription. Integer Optional
    start_time?: string; // Timestamp of subscription in yyyy-MM-dd HH:mm:ss Z. String Optional
    previous_execution_at?: string; // Timestamp of previous execution in yyyy-MM-dd HH:mm:ss Z. String Optional
    next_execution_at?: string; // Timestamp of next execution in yyyy-MM-dd HH:mm:ss Z. String Optional
  }