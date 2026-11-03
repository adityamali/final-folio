import { ImageResponse } from 'next/og';
import { getSoftwareById } from '@/lib/software';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const alt = 'Software Café App Card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const app = await getSoftwareById(slug);

  // Load local Futura font for retro brutalist typography
  let fontData: Buffer | null = null;
  try {
    const fontPath = path.join(process.cwd(), 'public/fonts/futura.ttf');
    if (fs.existsSync(fontPath)) {
      fontData = fs.readFileSync(fontPath);
    }
  } catch (err) {
    console.warn('Could not load Futura font for OG image:', err);
  }

  if (!app) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FDFBF7',
            border: '14px solid #2D2D2D',
            fontFamily: fontData ? 'Futura, sans-serif' : 'sans-serif',
          }}
        >
          <div
            style={{
              backgroundColor: '#E05228',
              color: '#FFFFFF',
              border: '3px solid #2D2D2D',
              padding: '10px 24px',
              fontSize: 24,
              fontWeight: 900,
              boxShadow: '4px 4px 0px #2D2D2D',
              marginBottom: 20,
            }}
          >
            SOFTWARE CAFÉ
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#2D2D2D' }}>
            Tool Not Found
          </div>
        </div>
      ),
      {
        ...size,
        fonts: fontData
          ? [
              {
                name: 'Futura',
                data: fontData,
                style: 'normal',
                weight: 700,
              },
            ]
          : undefined,
      }
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
      // Graceful fallback to emoji or initial if fetch times out
    }
  }

  const primaryPlatform = (app.platforms && app.platforms[0] ? app.platforms[0].toUpperCase() : 'APP');
  const priceLabel = app.price === 0 ? 'FREE' : `$${app.price}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FDFBF7',
          border: '14px solid #2D2D2D',
          padding: '48px',
          fontFamily: fontData ? 'Futura, sans-serif' : 'sans-serif',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#E05228',
              color: '#FFFFFF',
              border: '3px solid #2D2D2D',
              padding: '8px 20px',
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: '4px 4px 0px #2D2D2D',
            }}
          >
            SOFTWARE CAFÉ
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              fontWeight: 700,
              color: '#2D2D2D',
              letterSpacing: 1,
            }}
          >
            ADITYAMALI.COM • PORTFOLIO
          </div>
        </div>

        {/* Center Hero Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '4px solid #2D2D2D',
            boxShadow: '12px 12px 0px #2D2D2D',
            padding: '36px',
            gap: '32px',
          }}
        >
          {/* App Icon Frame */}
          <div
            style={{
              display: 'flex',
              width: 140,
              height: 140,
              backgroundColor: '#FDFBF7',
              border: '4px solid #2D2D2D',
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {iconBase64 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconBase64}
                width={120}
                height={120}
                alt={app.name}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <span style={{ fontSize: 72 }}>
                {app.icon && !app.icon.startsWith('http') ? app.icon : '⚡'}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 900,
                color: '#2D2D2D',
                letterSpacing: '-1px',
                textTransform: 'uppercase',
              }}
            >
              {app.name}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                fontWeight: 700,
                color: '#008080',
              }}
            >
              {app.tagline}
            </div>

            {/* Badges Row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#F4C430',
                  color: '#2D2D2D',
                  border: '2px solid #2D2D2D',
                  padding: '6px 14px',
                  fontWeight: 900,
                  fontSize: 14,
                  boxShadow: '3px 3px 0px #2D2D2D',
                  textTransform: 'uppercase',
                }}
              >
                {app.category}
              </div>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#008080',
                  color: '#FDFBF7',
                  border: '2px solid #2D2D2D',
                  padding: '6px 14px',
                  fontWeight: 900,
                  fontSize: 14,
                  boxShadow: '3px 3px 0px #2D2D2D',
                  textTransform: 'uppercase',
                }}
              >
                {priceLabel}
              </div>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#E05228',
                  color: '#FDFBF7',
                  border: '2px solid #2D2D2D',
                  padding: '6px 14px',
                  fontWeight: 900,
                  fontSize: 14,
                  boxShadow: '3px 3px 0px #2D2D2D',
                  textTransform: 'uppercase',
                }}
              >
                {primaryPlatform}
              </div>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#FDFBF7',
                  color: '#2D2D2D',
                  border: '2px solid #2D2D2D',
                  padding: '6px 14px',
                  fontWeight: 900,
                  fontSize: 14,
                  boxShadow: '3px 3px 0px #2D2D2D',
                }}
              >
                v{app.version}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            color: '#2D2D2D',
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          <div style={{ display: 'flex' }}>
            ☕ Brewed with passion, served with pixel-perfect precision.
          </div>
          <div style={{ display: 'flex' }}>
            adityamali.com/cafe/{app.slug || app.name.toLowerCase()}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: 'Futura',
              data: fontData,
              style: 'normal',
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
