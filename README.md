# Life RPG

The project is organized under one root folder:

- `client/` - React/Vite frontend
- `server/` - Express backend
- `scripts/` - shared development scripts

## Run frontend and backend together

From the project root, run:

```powershell
npm run dev
```

This opens the backend in a separate PowerShell window and starts the frontend in the current window. The frontend uses `http://localhost:5000/api` for local API requests by default.

You can also start the complete project from inside `client/`:

```powershell
npm run dev
```

Both commands use the same root launcher, so the backend starts automatically whenever the frontend is started this way.