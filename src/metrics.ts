import metrics from "datadog-metrics";

const host = process.env.production ? "production" : "dev";
metrics.init({ prefix: "ROI_pizza.", host: host });

export default metrics;