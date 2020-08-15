#~/bin/bash
PLAYER=$(which mplayer);
if [ ! -z "${PLAYER}" ]; then
  say() { local IFS=+;$PLAYER -ao alsa,coreaudio -noconsolecontrols "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en"; }
  # say() { local IFS=+;$PLAYER -noconsolecontrols "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en" -dumpstream -dumpfile bin/voice.mp3; }
  say $*
fi
