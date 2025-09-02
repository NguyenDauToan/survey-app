import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// ES Module fix cho __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tạo server
const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, "db.json")); // File dữ liệu JSON
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Fake login endpoint (check từ db.json)
server.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Đọc db.json
  const db = JSON.parse(fs.readFileSync(join(__dirname, "db.json")));
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    return res.json({
      success: true,
      user: { id: user.id, displayname: user.displayname, email: user.email },
      token: "fake-jwt-token",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Email hoặc mật khẩu không đúng",
  });
});

// Router mặc định (các endpoint khác)
server.use(router);

// Chạy server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on http://localhost:${PORT}`);
});
