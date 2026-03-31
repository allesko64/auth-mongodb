import app from "./src/app.js"
import dbConnect from "./src/common/config/db.js";
import 'dotenv/config';
const PORT = process.env.PORT || 5000 

const start = async () => {
    await dbConnect()

    app.listen(PORT , ()=> {
        console.log(`The app is listening on ${PORT}`)
    })
}

start().catch((err) => {
    console.error("Error occurred" , err);
    process.exit(1);
})


