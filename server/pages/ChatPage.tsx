import React from 'react';

export function ChatPage() {
  return (
    <html lang="en">
      <head>
        <title>Chat Page</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
        </nav>
        <main>
          <h1>Chat Page</h1>
          <form action="/api/traps" method="POST">
            <textarea name="message"></textarea>
            <button type="submit">Send</button>
          </form>
          <div hidden id="loading">Loading...</div>
          <h2 hidden>Thinking Traps</h2>
          <ul hidden id="traps"></ul>
        </main>
        <script type="module" src="/app.js"></script>
      </body>
    </html>
  );
}