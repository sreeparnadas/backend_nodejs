💫✡🔯✴    TypeScript + Express + Prisma + MySQL backend

👉Step 1 — Create the backend folder
    npm init -y

👉Step 2 - Install Dependencies
    npm install express cors dotenv
    npm install prisma @prisma/client
    npm install --save-dev typescript ts-node ts-node-dev @types/node @types/express @types/cors

👉Step 3 — Create tsconfig.json
    npx tsc --init
    Replace contents with this current file's contents

👉Step 4 — Update package.json scripts (see scripts in package.json file)


Prisma ORM Setup
👉Step 5 — Initialize Prisma

    npx prisma init (This creates prisma/schema.prisma and .env, prisma.config.ts)

👉Step 6 — Create models folder
    mkdir prisma/models
    Create your model_name.prisma files

    ⭐ Go to prisma.config.ts -> Change [schema: "prisma/schema.prisma"] To [schema: "prisma"]


👉Step 7 -  Configure .env

👉 Step 8 - Validate schema
    npx prisma validate

👉 Step 9 - Run first migration
    npx prisma migrate dev --name init_list_models

This will read all .prisma files from prisma/ folder


❓ How to migrate after schema changes
Whenever you modify any .prisma file, run:
    # Create a new named migration
    npx prisma migrate dev --name add_column_to_list_master

    # Regenerate Prisma client only (no migration)
    npx prisma generate


Express Server & Source Code
👉 Step 10 - Go to project root folder. Create src/lib/prisma.ts

👉 Step 11 — Create src/middleware/errorHandler.ts


👉 Step 12 — Create src/controllers

👉 Step 13 — Create src/routes

👉 Step 14 — Create src/index.ts

👉 Step 15 — npm run dev





Whenever you change your .prisma model files, always run in this order:
# 1. Apply schema changes to DB
npx prisma migrate dev --name describe_your_change

# 2. Regenerate client
npx prisma generate

# 3. Open Studio (optional)
npx prisma studio

#How an API Request Flows?

Client (Postman / Frontend)
        ↓  HTTP Request
    Router  (routes/list.ts)
        ↓  calls
  Controller  (controllers/list.ts)
        ↓  queries
    Prisma  (talks to DB)
        ↓  returns data
  Controller  sends res.json()
        ↓
Client gets response