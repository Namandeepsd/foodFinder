# Food Finder

Minimal food finder app built with Node.js, Express, EJS & MongoDB.

Features
- Find restaurants with search
- Create restaurants (CRUD)
- Rate restaurants (1-5 stars)
- Make reservations, mark as visited and cancel
- Dashboard shows upcoming reservations and recent visits

Run locally
1. Install dependencies

```powershell
npm install
```

2. Create a `.env` from `.env.example` and update `MONGO_URI`.
3. Seed sample data (optional) and start the server

```powershell
npm run seed
```

Start the server

```powershell
npm run dev
```

4. Open http://localhost:3000

Notes
- This app is minimal and not authenticated — reservations are stored against a restaurant but not a user. For production, add auth and validation.
- Customize styles in `public/css/styles.css` for theming.
