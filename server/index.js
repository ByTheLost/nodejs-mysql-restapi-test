import "dotenv/config";
import app from "./app.js";

app.listen(process.env.PORT || 4000);
console.log(`Server on port ${process.env.PORT}`);