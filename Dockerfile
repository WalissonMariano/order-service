# Etapa 1: Build da aplicação
FROM node:18 AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila a aplicação
RUN npm run build

# Etapa 2: Imagem final para execução
FROM node:18-alpine

WORKDIR /app

# Instala o netcat (nc)
RUN apk add --no-cache netcat-openbsd

# Copia os arquivos necessários da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta em que o servidor vai rodar
EXPOSE 3000

# Inicia a aplicação
CMD ["node dist/main.js"]
