This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
CityJabber is a web platform for discovering local businesses, reviews, and city-specific content. Built with React, Redux, Node/Express, Socket.io, and MongoDB/Mongoose, it features a modern, responsive design and advanced search capabilities.

Features
Home Page

Detects user’s city automatically, with the option to change it.

Search for businesses like Yelp, filtered by city and category.

Login details displayed at the top (Email/Facebook/Google).

Highlights best places in top cities and latest posts.

User Types

Regular User – Standard features.

City Manager – Manage cities, payments, and sponsored content.

Business Owner – Claim businesses, manage listings, reviews, and ads.

Notes:

Users can log in via Email, Facebook, or Google.

The system prevents duplicate accounts from multiple login methods.

Emails for account confirmation, welcome, and password recovery.

Search & Results

Full-text search for millions of businesses.

Supports SIC2, SIC4, SIC8 category filtering for precise results.

Listings include business name, categories, star rating, “Been here?” functionality, and top reviews.

Search results layout inspired by TripAdvisor, with filters on the left.

Business Listings

Displays full business details: Name, rating, categories, address, photos, amenities, and about section.

Shows whether a business is claimed or unclaimed, with the option to claim.

Features include: Reviews, Add Photo, Share, Save, Q&A with voting/reporting.

Review System

Users can write reviews only when logged in.

Rating system varies by business type (restaurants, hotels, attractions).

Review includes title, description, rating, photos, and advice.

Owners can reply; reviews and Q&A can be reported or liked.

Business & City Management

Business owners can claim and manage their business listings.

Options for Enhanced Business Profile and Sponsored Listings with Stripe payment integration.

City managers can claim cities, view payments, and manage sponsored content.

User & Business Dashboards

User Dashboard includes:

Profile settings, photo, birthday, city, social links.

Messages, notifications, collections (bookmarks), reviews, questions, followers/following.

Business Dashboard includes:

Activity overview (views, reviews, shares, saves).

Business management: update info, manage photos, respond to messages/reviews, customize ads, special offers, and announcements.

City Manager Dashboard includes:

Payment settings and statistics.

Manage businesses and sponsored listings in the city.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## React Theme

https://creativelayers.net/themes/gotrip-html/ui-elements.html
