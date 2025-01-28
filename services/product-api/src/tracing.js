const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { TraceIdRatioBasedSampler, ParentBasedSampler } = require("@opentelemetry/sdk-trace-base");

// config exporter (gRPC to Tempo)
const collectorOptions = {
  url: "http://localhost:4317",
};
const exporter = new OTLPTraceExporter(collectorOptions);

// config resource (service)
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "product-api",
  [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
});

// config sampler (develop = 100% , production = 10%)
const sampler = new ParentBasedSampler({
  root: new TraceIdRatioBasedSampler(1),
});

// config Auto-Instrumentation
// 1. ignore http path /health, /healthz, /metrics
// 2. ignore net module (tcp.connect, dns.lookup)
const autoInstrumentations = getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-http': {
    ignoreIncomingRequestHook: (req) => {
      const ignoredPaths = ['/health', '/healthz', '/metrics'];
      return ignoredPaths.includes(req.url);
    },
  },
  '@opentelemetry/instrumentation-net': { enabled: false },
});

// Initialize the SDK
const sdk = new NodeSDK({
  traceExporter: exporter,
  resource: resource,
  sampler: sampler,
  instrumentations: [autoInstrumentations],
});
sdk.start();

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
const process = require("process");
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    sdk
      .shutdown()
      .then(
        () => console.log("SDK shut down successfully"),
        (err) => console.log("Error shutting down SDK", err)
      )
      .finally(() => process.exit(0));
  });
});
