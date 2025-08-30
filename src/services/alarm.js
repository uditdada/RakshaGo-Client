// src/services/alarm.js
import { Howl } from "howler";

let alarm;
export function playAlarm() {
  if (!alarm) {
    alarm = new Howl({
      src: ["https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"],
      loop: true,
      volume: 0.8,
    });
  }
  if (alarm && !alarm.playing()) alarm.play();
}
export function stopAlarm() {
  if (alarm && alarm.playing()) alarm.stop();
}
