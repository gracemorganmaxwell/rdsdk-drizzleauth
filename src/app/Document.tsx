import React from "react";
import type { ReactNode } from "react";
import "@/styles.css";

export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Gracie's Custard OS - CMS</title>
        <link rel="modulepreload" href="/src/client.tsx" />
        <link href="/src/styles.css" rel="stylesheet"></link>
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/src/client.tsx"></script>
      </body>
    </html>
  );
}
