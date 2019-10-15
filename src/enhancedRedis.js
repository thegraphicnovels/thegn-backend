import Redis from "ioredis";

class EnhancedRedis extends Redis {
  set(key, value, options = {}) {
    if (options.ttl) return super.set(key, value, "ex", options.ttl);

    return super.set(key, value);
  }
}

export default EnhancedRedis;
