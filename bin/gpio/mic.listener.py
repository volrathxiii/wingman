#!/usr/bin/env python
import argparse
import sys

# GPIO.setmode(GPIO.BCM)
# GPIO.setup(16, GPIO.OUT)
# GPIO.output(16, True)

def handle_led():
  try:
    import RPi.GPIO as GPIO
  except ModuleNotFoundError:
      print('Unable to load RPi.GPIO')
      sys.exit(1)
  channel = 16
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(channel, GPIO.OUT)
  GPIO.output(16, CLI_ARGS.enable)
  return GPIO.channel(channel)

def handle_args():
    parser = argparse.ArgumentParser(
        description="Tool for enabling or disabling LED to visualize listening or not"
    )
    parser.add_argument(
        "--enable",
        type=bool,
        default=False,
        help="Enables LED if true",
    )
    return parser.parse_args()

if __name__ == "__main__":
    CLI_ARGS = handle_args()
    handle_led()