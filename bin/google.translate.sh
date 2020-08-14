#~/bin/bash
PLAYER=$(which mplayer);
# echo $PLAYER;
if [ ! -z "${PLAYER}" ]; then
  # say() { local IFS=+;$PLAYER -ao alsa,coreaudio -noconsolecontrols "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en"; }
  say() { local IFS=+;$PLAYER -noconsolecontrols "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en" -dumpstream -dumpfile bin/voice.mp3; }
  say $*
fi
# say() { local IFS=+;/usr/bin/mplayer -ao alsa,coreaudio -noconsolecontrols "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en"; }
# say $*
# say() { 
#   apiUrl="http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en";
#   echo "${apiUrl// /%20}";
#   curl ${apiUrl// /%20} --output voice.mp3; 
# }
