import {
  createLogger as winstonCreateLogger,
  format,
  transports,
} from "winston";

export const createLogger = (label: string) => {
  return winstonCreateLogger({
    level: "info",
    format: format.combine(
      format.label({ label }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(({ timestamp, level, message, label }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message, label }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
          })
        ),
      }),
      new transports.File({
        filename: "app.log",
        format: format.combine(
          format.printf(({ timestamp, level, message, label }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
          })
        ),
      }),
    ],
  });
};
