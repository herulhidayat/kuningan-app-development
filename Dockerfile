# Gunakan base image yang sesuai
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Salin file package.json dan package-lock.json untuk install dependencies
COPY package*.json ./

# Install dependencies dengan mode CI untuk kestabilan
RUN npm ci

# Salin seluruh kode proyek ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Gunakan base image yang lebih kecil untuk menjalankan Next.js
FROM node:18-alpine AS runner
WORKDIR /app

# Tetapkan variabel lingkungan ke production
ENV NODE_ENV=production

# Hanya copy file yang dibutuhkan dari tahap builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Gunakan user non-root untuk keamanan
USER node

# Tentukan port yang akan digunakan dalam container
EXPOSE 3000

# Jalankan aplikasi dalam mode production
CMD ["npm", "run", "start"]