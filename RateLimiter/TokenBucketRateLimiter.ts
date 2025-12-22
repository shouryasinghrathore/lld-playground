
export class TokenBucketRateLimiter {
    private buckets = new Map<string, UserRequest>();

    constructor(private capacity: number, private refillrate: number) { }

    allowRequest(userId: string) {
        const now = Date.now();
        let bucket = this.buckets.get(userId);

        if (!bucket) {
            bucket = {
                tokens: this.capacity - 1,
                lastRefillTime: now
            }

            this.buckets.set(userId,bucket)
            return true;
        }

        const elapsedSeconds = (now-bucket.lastRefillTime)/1000;
        const tokensToAdd = elapsedSeconds  * this.refillrate;

        if(tokensToAdd > 0){
           bucket.tokens = Math.min(this.capacity,tokensToAdd+bucket.tokens);
           bucket.lastRefillTime = now;
        }
        if(bucket.tokens>=1){
            bucket.tokens-=1;
            return true;
        }
        return false;

    }

}

export type UserRequest = {
    tokens: number;
    lastRefillTime: number;
}