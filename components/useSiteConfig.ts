'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_NAV_SERVICES,
  DEFAULT_SITE_SETTINGS,
  mergeSiteSettings,
  type NavService,
  type SiteSettings,
} from '@/lib/siteDefaults';

interface SiteConfig {
  settings: SiteSettings;
  services: NavService[];
}

const FALLBACK: SiteConfig = { settings: DEFAULT_SITE_SETTINGS, services: DEFAULT_NAV_SERVICES };

// One request per page load, shared by every component that needs the admin-managed settings.
let cached: SiteConfig | null = null;
let inflight: Promise<SiteConfig> | null = null;

function loadSiteConfig(): Promise<SiteConfig> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch('/api/site-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        cached = {
          settings: mergeSiteSettings(data.settings),
          services: data.services?.length ? data.services : DEFAULT_NAV_SERVICES,
        };
        return cached;
      })
      .catch(() => FALLBACK)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export default function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(cached || FALLBACK);

  useEffect(() => {
    let active = true;
    loadSiteConfig().then((c) => active && setConfig(c));
    return () => {
      active = false;
    };
  }, []);

  return config;
}
