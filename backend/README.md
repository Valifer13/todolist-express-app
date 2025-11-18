# How To Setup (pnpm)
1. pnpm i
2. pnpm approve-builds
3. cp .env.example .env
4. run `crypto.randomBytes(32).toString(hex)` in node console and copy the result
5. paste the result in .env in variable ACCESS_SECRET_KEY
6. paste your url database in .env DATABASE_URL variable. Ex: "mysql://root:@localhost:3306/mydatabase"
7. pnpm prisma generate
8. run `pnpm prisma migrate dev`
9. pnpm dev