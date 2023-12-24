import { SignalRNotification } from "./signalRnotificationType";

export interface SignalRUserNotification extends SignalRNotification {
    AvatarDataBase64: string
}