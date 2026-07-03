import { useEffect, useState } from 'react';
import type { FetchState } from '../types';

export function useApiResource<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
) {
  const [state, setState] = useState<FetchState<T>>(() => ({
    status: 'loading',
  }));
  const [prevDeps, setPrevDeps] = useState<unknown[]>(deps);

  // Check if dependencies changed during rendering and adjust state immediately
  const depsChanged =
    prevDeps.length !== deps.length ||
    prevDeps.some((dep, index) => dep !== deps[index]);

  if (depsChanged) {
    setPrevDeps(deps);
    setState({ status: 'loading' });
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchFn()
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ status: 'success', data });
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', message: err.message });
        }
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
