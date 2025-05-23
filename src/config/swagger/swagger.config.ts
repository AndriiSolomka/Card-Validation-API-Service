export const SWAGGER_CONFIG = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment Card Validation API",
      version: "1.0.0",
      description: "API for validating payment card data",
    },
  },
  apis: ["./src/**/*.ts"],
};
