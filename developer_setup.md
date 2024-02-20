## How to Set Up this Project Locally

## Prerequisites

- You must have the latest, stable LTS version of [Node](https://nodejs.org/en) installed.
- NextJS requires at least Node version 18 or higher.
- To check what version of Node you have, run `node -v` in your CLI.
- You must have [PostgreSQL](https://www.postgresql.org/download/) installed.
- To check that you have PostgreSQL installed, run `postgres --version`.
- Check that you also have `psql` (a terminal-based interface to PostgreSQL) by running `psql --version`.

## Step 1. Installation

- Clone down this repo. Using your command line, navigate to inside this project's folder and run `npm install` to install dependencies.
- Create a file in this root folder and name them `.env`. This files will hold environment variables whose values will be different for each developer. Copy and paste the following into your `.env` file.

```
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
PUSHER_APP_ID=""
NEXT_PUBLIC_PUSHER_KEY=""
PUSHER_SECRET=""
NEXT_PUBLIC_PUSHER_CLUSTER=""
```

- Then run `npm run dev` to start the project.
- Note: Check your CLI to get the URL the server is running on. By default, it should be `http://localhost:3000`.
- Note: The app should start up, but the most the features WILL NOT work until the steps below are completed.

## Step 2. Database Set Up

- Create a new local Postgres database. Run `psql` in your command line.
- This will start the postgres shell, then create a new database called chatroomapp:

`annduong=# CREATE DATABASE chatroomapp;`

- Your postgres connection URL will be the following format: `postgres://[user]:[password]@localhost:[port]/chatroomapp`
- Add this URL to both postgres variables in your `.env` file. See below for an example:

```
"POSTGRES_PRISMA_URL="postgres://user:password@localhost:5432/chatroomapp"
"POSTGRES_URL_NON_POOLING"="postgres://user:password@localhost:5432/chatroomapp"
```

- In your terminal, run `npx prisma db push`.

To test that you've set up your database correctly, run `prisma studio` in the command line. If you get an error, run `npm i -g prisma`, then run `prisma studio` again. If everything is good, a GUI will open in your browser (navigate to `http://localhost:5555` if not automatically opened). 

## Step 3. Pusher Set Up

- Create a free [Pusher](https://pusher.com/) account.
- We want to create to work with Channels (not Beams). Click on the **Get Started** button under Channels.
- Name your app `nextjs-pusher-chatroom` or something similar to the name of this project.
- Select the cluster that is geographically closest to you.
- Leave all other options blank and click **Create app**.
- You'll be taken to some started documention. Instead, navigate to **App Settings** in the sidebar.
- Toggle **Enable client events** ON.
- Navigate to **App Keys**. Copy the following and paste it to the bottom of your `.env` file. Replace the values with your specific Pusher App keys.

```
PUSHER_APP_ID="1234567"
NEXT_PUBLIC_PUSHER_KEY="abc123def456ghi789jk"
PUSHER_SECRET="xyz123abc456asdf7890"
NEXT_PUBLIC_PUSHER_CLUSTER="us1"
```

To test that you've set up Pusher correctly, restart your app by killing the server and running `npm run dev` again. You should now be able to join channels and send messages.
