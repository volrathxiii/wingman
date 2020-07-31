import * as moment from 'moment'

type VocalFormat = "normal"|"daylight"|"oclock"|"before"|"past"

class TimeVocal
{
  private instance: moment.Moment
  private formatOptions: Array<VocalFormat>

  constructor(date?:string, format?:string, strict?:boolean)
  {
    this.instance = moment(date, format, strict)
    this.formatOptions= ["normal","daylight","oclock","before","past"]
  }

  random() {
    var format = this.formatOptions[Math.floor(Math.random() * this.formatOptions.length)];
    return this.format(format)
  }

  format(format:VocalFormat = "normal"):string {
    let _this = this
    let formats = {
      normal:():string=>{
        return _this.instance.format("h:mm A")
      },
      daylight: function():string {
        let hour = parseInt(_this.instance.format("H"))
        let displayHour = parseInt(_this.instance.format("h"))
        if(hour >= 4 && hour <= 11) return `${displayHour} in the morning`
        if(hour >= 12 && hour <= 17) return `${displayHour} in the afternoon`
        if(hour >= 18 || hour <= 3) return `${displayHour} in the evening`
      },
      oclock: function():string {
        let hour = parseInt(_this.instance.format("h"))
        let minutes = parseInt(_this.instance.format('m'))
        if(minutes >= 40) return `almost ${hour+1} o-clock`
        if(minutes >= 20 ) return `around mid ${hour} o-clock`
        if(minutes >= 5 ) return `just past ${hour} o-clock`
        return `${hour} o-clock`
      },
      past: function():string {
        return _this.instance.format('m [minutes past] h')
      },
      before: function():string {
        let hour = parseInt(_this.instance.format("h"))
        let minutes = parseInt(_this.instance.format('m'))

        return `${60 - minutes} minutes before ${hour + 1}`
      }
    }

    return formats[format]()

  }
}

export default TimeVocal