import { NextResponse } from "next/server";

export function middleware(request) {
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="sr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>„Sajt je u pripremi“</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet" />
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: #fff;
            color: #000; /* crna boja slova */
            margin: 0;
            padding: 3rem 1rem;
            text-align: center;
            font-weight: 400; /* tanji font za tekst */
            font-style: italic;
          }
          h1 {
            font-weight: 400; /* deblji font za naslov */
            font-size: 4rem;
            margin-bottom: 1rem;
            font-style: italic;
          }
          img {
            margin-top: 20px;
            width: 150px;
            height: auto;
          }
          p {
            font-size: 1.5rem;
            margin: 0.5rem 0;
            font-weight: 300; /* tanji tekst */
          }
        </style>
      </head>
      <body>
        <h1>„Sajt je u pripremi“</h1>
     
      </body>
    </html>
    `,
    {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": "3600",
      },
    },
  );
}

export const config = {
  matcher: ["/", "/:path*"],
};
