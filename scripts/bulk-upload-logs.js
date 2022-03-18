const fs = require("fs");
const readline = require("readline");
const {skipDbSave} = require("../src/routes/route-helpers/request-helpers");
const Bottleneck = require("bottleneck");
const {saveRequest} = require("../src/routes/route-helpers/mongo-helpers");

const limiter = new Bottleneck({
    maxConcurrent: 4,
    minTime: 100
});

const processLineByLineAsync = async() => {
    const filePath = `${process.argv[2]}`;
    const fileStream = fs.createReadStream(filePath);
    const reqArr = []

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const req = JSON.parse(line);
        if (!skipDbSave(req, false)){
            reqArr.push(req)
        }
    }

    const allLogs = reqArr.map((req, i) => {
        return limiter.schedule(() => {
            return saveRequest(req, false, i);
        })
    })

    return Promise.all(allLogs);
};

(async () => {
   try {
       await processLineByLineAsync();
       console.log('finished processing');
   } catch (e){
       console.error(`There was an error processing these lines: `, e)
   }
})()