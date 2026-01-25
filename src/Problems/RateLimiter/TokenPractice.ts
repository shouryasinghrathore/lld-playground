import { TokenBucketRateLimiter } from './TokenBucketRateLimiter';

const rateLimmiter = new TokenBucketRateLimiter(30, 1);

let userId = "12";

for (let i = 0; i < 31; i++) {
    console.log(rateLimmiter.allowRequest(userId));
}