'use server';

import { vetProduct, VettingReport } from './vetting-engine';

/**
 * Server Action for Vetting
 * Can be called directly from Client Components
 */
export async function vetProductAction(url: string): Promise<VettingReport> {
  if (!url || !url.startsWith('http')) {
    throw new Error('Valid URL is required');
  }

  return await vetProduct(url);
}
