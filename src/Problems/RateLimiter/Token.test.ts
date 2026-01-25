import { TokenBucketRateLimiter } from "./TokenBucketRateLimiter";

function assert(cond: boolean, msg: string) {
    if (!cond) {
        console.error("❌ FAILED:", msg);
    } else {
        console.log("✅ PASSED:", msg);
    }
}

console.log("Running Tests...\n");


{
    const rateLimmiter = new TokenBucketRateLimiter(2, 1);
    for (let i = 0; i < 4; i++) {
        assert(rateLimmiter.allowRequest("a"), 'token bucket exahaust after 2 token consumed ');
    }
}
{
    const rateLimmiter = new TokenBucketRateLimiter(2, 1);
    for (let i = 0; i < 3; i++) {
        assert(rateLimmiter.allowRequest("a"), 'token bucket  for a ');
    }
    assert(rateLimmiter.allowRequest("b"), 'token bucket  for b ');
  
}


console.log("\n ALL TESTS COMPLETED");
