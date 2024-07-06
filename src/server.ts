import app from "./app";


async function main () {
   app.listen(5000, () => {
    console.log(`server is running at port ${5000}`);
   })
}
main();