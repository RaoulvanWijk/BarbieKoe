import { useEffect, useState} from 'react'
import "/resources/styles/components/layout/page-header.scss";  
type PageHeaderProps = {
    pageTitle?: string;
    };
export default function PageHeader(props: PageHeaderProps) {
    let time =  new Date().toLocaleTimeString(
        "nl-NL", {hour: '2-digit', minute:'2-digit'}
      )
      let date = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    
      const [ctime,setTime] = useState(time)
      const [cdate,setDate] = useState(date)
      const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString(
          "nl-NL", {hour: '2-digit', minute:'2-digit'}
        )
        date = new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        setTime(time)
        setDate(date)
      }
    
      useEffect(()=>{
        setInterval(UpdateTime,1000)
      },[])
  return (
    <header className="page-header">
    <h1 className="page-title">{props.pageTitle}</h1>
    <p>
      {cdate}
    </p>
    <p>
      {/* Current time */}
      {ctime + " uur"}
    </p>
  </header>
  )
}
