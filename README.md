# __Next.js Teslo Shop eCommerce__
## 1) Docker
Levantar la base de datos localmente
```
docker-compose up -d
```
El -d, significa __detached__

## 2) URL de conexión local a MongoDB:
```
mongodb://localhost:27017/teslodb
```

## 3) Configurar las variables de entorno
Crear archivo __.env__ a partir de __.env.example__

## 4) Reconstruir los módulos de node y levantar el proyecto
```
yarn install
yarn dev
```

## 5) Llenar la base de datos con información de prueba
Llamar al siguiente endpoint:
```
http://localhost:3000/api/seed
```
