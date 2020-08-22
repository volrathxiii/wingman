#!/usr/bin/env python
import argparse
import sys

# GPIO.setmode(GPIO.BCM)
# GPIO.setup(16, GPIO.OUT)
# GPIO.output(16, True)

def handle_led():
  print('Running LED GPIO')
  try:
    import RPi.GPIO as GPIO
  except ModuleNotFoundError:
      print('Unable to load RPi.GPIO')
      sys.exit(1)

  channel = 16
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(channel, GPIO.OUT)
  if CLI_ARGS.enable == 0:
    GPIO.output(channel, False)
    GPIO.cleanup()
  elif CLI_ARGS.enable == 1:
    GPIO.output(channel, True)

def handle_args():
    parser = argparse.ArgumentParser(
        description="Tool for enabling or disabling LED to visualize listening or not"
    )
    parser.add_argument(
        "--enable",
        type=int,
        default=-1,
        help="Enables/disables LED",
    )
    return parser.parse_args()

if __name__ == "__main__":
    CLI_ARGS = handle_args()
    handle_led()