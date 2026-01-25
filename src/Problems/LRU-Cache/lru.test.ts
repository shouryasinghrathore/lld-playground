import { LRUCache } from "./LRUCache";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("❌ FAILED:", msg);
  } else {
    console.log("✅ PASSED:", msg);
  }
}

console.log("Running LRU Cache Tests...\n");

// Test 1: Basic put + get
{
  const cache = new LRUCache<number, number>(2);
  cache.put(1, 1);
  cache.put(2, 2);

  assert(cache.get(1) === 1, "Test 1: get(1) should return 1");
}

// Test 2: Eviction (least recently used)
{
  const cache = new LRUCache<number, number>(2);

  cache.put(1, 1);
  cache.put(2, 2);
  cache.put(3, 3); // should evict key 2 because 1 was accessed

  assert(cache.get(1) === null, "Test 2: key 1 should be evicted");
}

// Test 3: Access updates recency
{
  const cache = new LRUCache<number, number>(2);
  cache.put(1, 1);
  cache.put(2, 2);

  cache.get(1); // 1 is now MRU
  cache.put(3, 3); // evicts 2

  assert(cache.get(2) === null, "Test 3: key 2 must be evicted");
  assert(cache.get(1) === 1, "Test 4: key 1 should still exist");
  assert(cache.get(3) === 3, "Test 5: key 3 should be present");
}

// Test 4: Updating a key keeps order correct
{
  const cache = new LRUCache<string, string>(2);

  cache.put("a", "A");
  cache.put("b", "B");

  cache.put("a", "A-updated");

  assert(
    cache.get("a") === "A-updated",
    "Test 6: updated value should be returned"
  );

  cache.put("c", "C"); // evicts "b"

  assert(cache.get("b") === null, "Test 7: b should be evicted");
}

console.log("\n🎉 ALL TESTS COMPLETED");
