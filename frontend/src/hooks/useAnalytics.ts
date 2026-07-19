import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { AnalyticsSummary } from '../types/task.types';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AnalyticsSummary>('/analytics/summary')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}