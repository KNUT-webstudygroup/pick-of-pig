import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
        <script type="text/javascript" src={`http://maps.googleapis.com/maps/api/js?&key=${process.env.GOOGLE_MAP_ID}&libraries=places`} />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
