import { ImageResponse } from 'next/og';
import { getSoftwareById } from '@/lib/software';

export const runtime = 'nodejs';
export const alt = 'Software Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const app = await getSoftwareById(slug);

  if (!app) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#090A0F',
            color: '#FFFFFF',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '40px 60px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 32,
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            Software Not Found
          </div>
        </div>
      ),
      size
    );
  }

  // Pre-fetch icon as Base64 Data URI if it is an image URL
  let iconBase64: string | null = null;
  if (app.icon && (app.icon.startsWith('http://') || app.icon.startsWith('https://'))) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(app.icon, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        const mimeType = res.headers.get('content-type') || 'image/png';
        iconBase64 = `data:${mimeType};base64,${Buffer.from(arrayBuf).toString('base64')}`;
      }
    } catch {
      // Graceful fallback to emoji if fetch times out
    }
  }

  const accentColor = app.color && app.color.startsWith('#') ? app.color : '#8B5CF6';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090A0F',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Soft Ambient Light Glowing from Accent Color */}
        <div
          style={{
            position: 'absolute',
            top: -150,
            left: 180,
            width: 700,
            height: 700,
            borderRadius: 350,
            background: `radial-gradient(circle, ${accentColor}33 0%, rgba(9, 10, 15, 0) 70%)`,
          }}
        />

        {/* Secondary Soft Ambient Glow in Lower Right */}
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            right: 140,
            width: 650,
            height: 650,
            borderRadius: 325,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(9, 10, 15, 0) 70%)',
          }}
        />

        {/* Rounded Glassmorphic Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '60px 68px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 40,
            boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            maxWidth: 1040,
            width: '86%',
            gap: 48,
          }}
        >
          {/* Rounded Glass Icon Frame */}
          <div
            style={{
              display: 'flex',
              width: 156,
              height: 156,
              borderRadius: 36,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {iconBase64 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconBase64}
                width={132}
                height={132}
                alt={app.name}
                style={{ objectFit: 'contain', borderRadius: 28 }}
              />
            ) : (
              <span style={{ fontSize: 76 }}>
                {app.icon && !app.icon.startsWith('http') ? app.icon : '⚡'}
              </span>
            )}
          </div>

          {/* Minimal App Title & Tagline Only */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 66,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-1.5px',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {app.name}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.4,
              }}
            >
              {app.tagline}
            </div>
          </div>
        </div>

        {/* Minimal Discreet Footer Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 34,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 16,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.35)',
            letterSpacing: '0.5px',
          }}
        >
          adityamali.com / cafe
        </div>
      </div>
    ),
    size
  );
}
