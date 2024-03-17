const Redis = require('ioredis')
// const redisClient = new Redis();
const rateLimiter = async (req, res, next) => {
    next()
    // try {
    //     const ip = req.connection.remoteAddress
    //     var numberOfReq = await redisClient.incr(ip);
    //     var ttll = await redisClient.ttl(ip);
    //     if (numberOfReq == 1) {
    //         await redisClient.expire(ip, 60);
    //         next()
    //     }
    //     else {
    //         if (numberOfReq < 20) next()
    //         else {
    //             const ttl = await redisClient.ttl(ip);
    //             if (ttl < 0) {
    //                 await redisClient.set(ip, 0);
    //             }
    //             res.status(400).send("Slow down bruh!")
    //         }
    //     }
    // }
    // catch (err) {
    //     console.log(err);
    // }
}
module.exports = rateLimiter