import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";
import type { Metric } from "web-vitals";

type WebVitalsOptions = {
  analyticsId?: string;
};

let isRegistered = false;

function onError(err: any) {
  console.error("[web-vitals]", err);
}

function onDebug(label: string, payload: any) {
  console.info("[web-vitals]", label, payload);
}

function sendToAnalytics(metric: Metric, options: WebVitalsOptions) {
  // const pageName = location.pathname;

  // const body = {
  //   dsn: options.analyticsId,
  //   id: metric.id,
  //   page: pageName,
  //   href: location.href,
  //   event_name: metric.name,
  //   value: metric.value.toString(),
  //   speed:
  //     "connection" in navigator &&
  //     navigator["connection"] &&
  //     "effectiveType" in navigator["connection"]
  //       ? navigator["connection"]["effectiveType"]
  //       : "",
  // };

  onDebug(metric.name, metric.value);
}

export async function webVitals(options: WebVitalsOptions = {}) {
  // Only register listeners once
  if (isRegistered) {
    return;
  }
  isRegistered = true;

  try {
    getFID((metric) => sendToAnalytics(metric, options));
    getTTFB((metric) => sendToAnalytics(metric, options));
    getLCP((metric) => sendToAnalytics(metric, options));
    getCLS((metric) => sendToAnalytics(metric, options));
    getFCP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    onError(err);
  }
}
