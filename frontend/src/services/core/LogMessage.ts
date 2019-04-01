/**
 * LogMessage tracks log level messages.
 * 
 * Log level messages are developer oriented.
 */
export default class LogMessage {
    public constructor(
        /**
         * Actual log message as a formatted string.
         */
        public message: string,
        /**
         * Date and time when message was created.
         */
        public created: Date = new Date()
    ) { }
}