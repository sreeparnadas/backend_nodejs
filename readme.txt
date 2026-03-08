npm install @prisma/adapter-mariadb


Whenever you change your .prisma model files, always run in this order:
# 1. Apply schema changes to DB
npx prisma migrate dev --name describe_your_change

# 2. Regenerate client
npx prisma generate

# 3. Open Studio (optional)
npx prisma studio