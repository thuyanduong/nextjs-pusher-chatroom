### Learning Notes and Tutorial

0. Credits and Inspiration

I built a chatroom app based off of [this project](https://github.com/thuyanduong/pusher-chatroom/tree/master)

1. [Create a NextJS App](https://nextjs.org/docs/getting-started/installation)

`https://nextjs.org/docs/getting-started/installation`

```
What is your project named? nextjs-pusher-chatroom
Would you like to use TypeScript? No
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? No
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias (@/*)? No
```

2. Start the App

`npm run dev`

Open up the app in the browser: http://localhost:3000/

3. [Learn Basic Tailwind](https://tailwindcss.com/docs/functions-and-directives)

You can edit the `globals.css` file and add custom CSS classes:

```css
@layer utilities {
  .custom-class {
    @apply text-red-700 bg-lime-600  /* red text with green background */;
  }

  body {
    @apply bg-zinc-100; /*Remove the body styling and use this instead*/
  }
}
```

```jsx
<div className="custom-class">
```

4. Create Header Component

```js
"use client";
// components/Header.js
export default function Header() {
  return (
    <div className="black-border">
      <h1>NextJS Pusher Chatroom App</h1>
    </div>
  );
}
```

5. Create Basic Home (ChatRoom) page

```js
"use client";
import Header from "@/components/Header";
// page.js
export default function Home() {
  return (
    <div className="chatroom-container">
      <Header />
    </div>
  );
}
```

6. Create Channels Component

```js
"use client";
// components/Channels.js
export default function Channels() {
  return (
    <div className="channels-container black-border">
      <div className="join-channel-container">
        <input
          className="channel-name-input"
          type="text"
          id="join-channel"
          minLength={4}
          maxLength={32}
          placeholder="Channel to join"
        />
        <button className="join-button">+Join</button>
      </div>

      <div className="channels-list">
        <h6 className="no-channels-joined">
          You haven't joined any channels yet
        </h6>
      </div>
    </div>
  );
}
```

```js
// page.js
export default function Home() {
  return (
    <div className="chatroom-container">
      <Header />
      <div className="chat-container">
        <Channels />
      </div>
    </div>
  );
}
```

7. Create Chat Component

```js
"use client";
// components/Chat.js
const maxLength = 256;
export default function Chat() {
  return (
    <div className="messages-container black-border">
      <div className="messages-list">
        <p className="no-new-messages">No new messages since joining...</p>
      </div>
      <div className="new-message-container">
        <textarea
          className="new-message-input"
          id="new-message"
          maxLength={maxLength}
          placeholder="Your message..."
        />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
}
```

```js
// page.js
export default function Home() {
  return (
    <div className="chatroom-container">
      <Header />
      <div className="chat-container">
        <Channels />
        <Chat />
      </div>
    </div>
  );
}
```
