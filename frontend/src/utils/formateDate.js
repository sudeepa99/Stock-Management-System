export const formateDate=(date, config)=>{
    const defaultOption= {day:'numeric', month:'short', year:'numeric'}
    const option=config?config:defaultOption
    return new Date(date).toLocaleDateString('en-US',option)
}