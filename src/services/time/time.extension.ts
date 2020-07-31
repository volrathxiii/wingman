import * as moment from 'moment'


// console.log(proto)

class TimeExtension
{
  private date:string
  private dateformat:string
  private strict:boolean
  private instance:moment.Moment

  constructor(date?:string, format?:string, strict?:boolean)
  {
    this.date = date
    this.dateformat = format
    this.strict = strict
    this.instance = moment(date, format, strict)
  }

  format(format?:string):string {
    return this.instance.format(format)
  }
}

console.log(new TimeExtension("20111031", "YYYYMMDD"))


export default TimeExtension