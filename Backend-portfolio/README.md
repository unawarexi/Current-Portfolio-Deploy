Backend-portfolio/
├── config/
│   ├── cloudinary.config.js    — Cloudinary init (CJS)
│   ├── constants.js            — HttpStatus, ErrorCodes, RateLimits, Upload
│   └── firebase.config.js      — Firebase Admin SDK init → exports { admin, db }
├── logs/
│   └── logger.js               — Structured logger (fixed: CJS, no env.config)
├── middlewares/
│   ├── auth.middleware.js       — JWT Bearer verify → req.admin
│   ├── ratelimit.middleware.js  — api/auth/upload limiters (no Redis)
│   └── validate.middleware.js  — requireFields() guard
├── modules/
│   ├── auth/
│   │   ├── auth.service.js      — login(password) → JWT token
│   │   ├── auth.controller.js   — POST /api/auth/login handler
│   │   └── auth.routes.js       — wires authLimiter + controller
│   ├── projects/
│   │   ├── projects.service.js  — Firestore CRUD via Admin SDK
│   │   ├── projects.controller.js — all 5 CRUD handlers
│   │   └── projects.routes.js   — public GET, protected POST/PATCH/DELETE
│   └── upload/
│       ├── upload.controller.js — single + multiple Cloudinary upload
│       └── upload.routes.js     — multer + auth + rate limit
├── services/
│   └── cloudinary.service.js   — uploadBuffer, uploadMany, deleteFile, deleteMany
├── index.js                     — Express app, routes mounted, no Cloudinary duplication
└── .env                         — APP_PASSWORD, CLOUDINARY_*, FIREBASE_SERVICE_ACCOUNT