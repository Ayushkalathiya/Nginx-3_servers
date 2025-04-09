# 🚀 NGINX Reverse Proxy + Load Balancer with Docker + Node.js

This demo sets up:

- ✅ NGINX running inside a Docker Ubuntu container
- ✅ Reverse proxy for 3 backend Node.js servers
- ✅ Round-robin load balancing
- ✅ Path-based routing using `/server1`, `/server2`, `/server3`

---

## 📦 Requirements

- Node.js & npm installed on your machine
- Docker installed and running

---

## 🧱 Project Structure
. ├── server1.js ├── server2.js ├── server3.js
---

## 🛠️ Step 1: Setup Node.js Servers (Host Machine - Windows/Linux/macOS)

Create 3 files in your project folder.

### ✅ server1.js
```js
const express = require('express');
const app = express();
app.use((req, res) => res.send('Response from Server 1'));
app.listen(3001, () => console.log('Server 1 running on port 3001'));
```
### ✅ server2.js
```js
const express = require('express');
const app = express();
app.use((req, res) => res.send('Response from Server 2'));
app.listen(3001, () => console.log('Server 2 running on port 3002'));
```

### ✅ server3.js
```js
const express = require('express');
const app = express();
app.use((req, res) => res.send('Response from Server 3'));
app.listen(3003, () => console.log('Server 3 running on port 3003'));
```
###  Install Dependencies
```js
npm init -y
npm install express
```

### Run All 3 Servers
```js
node server1.js
node server2.js
node server3.js
```

## 🐳 Step 2: Run Ubuntu + NGINX in Docker
### 🧱 Pull & Run Ubuntu Container
```js
docker run -it -p 8080:80 --name myubuntu ubuntu
```

### 📥 Install NGINX & Tools inside Ubuntu
```js
apt update
apt install -y nginx vim curl
```

```js nginx: ``` the web server / reverse proxy


```js vim: ``` text editor to modify config

```js curl: ``` test HTTP requests (optional)

### ▶️ Start NGINX
```js
service nginx start
```

## ⚙️ Step 3: Configure NGINX
### 📂 Open the Config File
```js
vim /etc/nginx/nginx.conf
```

## ✨ Option 1: Path-Based Routing

```js
events {}

http {
    server {
        listen 80;

        location /server1 {
            proxy_pass http://host.docker.internal:3001;
        }

        location /server2 {
            proxy_pass http://host.docker.internal:3002;
        }

        location /server3 {
            proxy_pass http://host.docker.internal:3003;
        }
    }
}
```

## ✨ Option 2: Round-Robin Load Balancing
```js
events {}

http {
    upstream backend {
        server host.docker.internal:3001;
        server host.docker.internal:3002;
        server host.docker.internal:3003;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}
```

###  Step 4: Restart NGINX
```js
nginx -s reload
```

### 🌐 Step 5: Test in Browser
## Oprion 1 : Path-Based Routing Test
 http://localhost:8080/server1
 
 http://localhost:8080/server2
 
 http://localhost:8080/server3
## Option 2 : Round-Robin Test
  Visit: http://localhost:8080
```js
Refresh to see rotating responses from server 1, 2, 3.
```

### 🔍 Notes
```js
host.docker.internal allows a Docker container to talk to the host system.

Port 8080 on your host is mapped to port 80 inside Docker Ubuntu.

Always run your Node.js servers before testing NGINX routing.
```




