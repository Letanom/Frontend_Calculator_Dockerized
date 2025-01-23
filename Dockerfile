# Base image olarak node kullanıyoruz
FROM node:14

# Çalışma dizinini ayarlıyoruz
WORKDIR /app

# Gerekli dosyaları kopyalıyoruz
COPY package*.json ./

# Gerekli paketleri yüklüyoruz
RUN npm install

# Uygulama dosyalarını kopyalıyoruz
COPY . .

# Uygulamayı build ediyoruz
RUN npm run build

# Base image olarak nginx kullanıyoruz
FROM nginx:alpine

# Build edilen dosyaları nginx'in html dizinine kopyalıyoruz
COPY --from=0 /app/dist /usr/share/nginx/html

# Nginx'i çalıştırıyoruz
CMD ["nginx", "-g", "daemon off;"]

# Uygulamanın çalışacağı portu belirtiyoruz
EXPOSE 80

#build etmek için docker build -t frontend . yapılır

#çalıştırmak için docker run -p 8080:80 frontend yapılır
