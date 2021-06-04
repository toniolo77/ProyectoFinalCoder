import winston, { format } from "winston";

const filterLevel = format((info, level) => {
  return (info.level === level) ? info : false
});

const Logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "loggin/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "loggin/warn.log", format: filterLevel('warn'), level: "warn" }),
  ],
});

export default Logger;