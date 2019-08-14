import "reflect-metadata";
import { getApp } from "./app";

(async () => {
    const port = 8080;
    const app = await getApp();
    app.listen(port, () => {
        console.log(`
        The server is running in port ${port}
        `);
    });
})();