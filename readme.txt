npm install @prisma/adapter-mariadb


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