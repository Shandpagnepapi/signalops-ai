"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ANALYTICS_EVENTS, analyticsConfig, trackEvent } from "@/lib/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const lastDemoView = useRef<string | null>(null);
  const { gaId, metaPixelId, linkedInPartnerId } = analyticsConfig;

  useEffect(() => {
    if (pathname === "/demo" && lastDemoView.current !== pathname) {
      lastDemoView.current = pathname;
      trackEvent(ANALYTICS_EVENTS.demoViewed, {
        path: pathname
      });
    }
  }, [pathname]);

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="leadops-ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="leadops-meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {linkedInPartnerId ? (
        <Script id="leadops-linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = '${linkedInPartnerId}';
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName('script')[0];
              var b = document.createElement('script');
              b.type = 'text/javascript';
              b.async = true;
              b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      ) : null}
    </>
  );
}
