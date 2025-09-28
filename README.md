# Junction Vaasa 2025

**Tech stack**

- Mobile: React native
- Web app: Next.js
- Realtime Database: Convex
- Auth: Convex

**Hosting**

- Mobile: App Store/Play Store
- Web app: Vercel
- Database: Convex
- Auth: Convex

**Statistics and Data**

- Uptime statistics: SCADA integration

## Integration

Currently SCADA integration is mocked in `/api/mock/scada?customer_id=`
However, this can be changed in the environment variables file to integrate with existing OPC SCADA monitoring systems.

## Getting started

1. Make a copy of `.env.example` and fill the values in the file according to the comments.

```
cp example.env .env
```

2. Install dependencies

```
pnpm i
```

```
cd web
pnpx @convex-dev/auth
```

3. Run web application

```
cd ./web
pnpm dev
```

4. Run mobile application

```
cd ./mobile
pnpm run ios
# or
pnpm run android
# or
pnpm run web
```

## Architecture

The web app is meant for admin view, the mobile view is for Operators/Field crew.

## Cyber Security

Vercel and Convex are both SOC2 compliant. This app still needs to be audited for real critical infrastructure use.
