import PageLayout from "@/components/Layout/PageLayout"
import { useData } from "@/lib/hooks/fetch";
import { useParams } from "react-router-dom"

import LageItem from "@/components/Reservation/LageItem";
import { ReservationFetch } from "@/lib/types/database";


export default function Reservation() {
  const id = useParams<{ id: string }>().id
  console.log(id);
  const reservation = useData<ReservationFetch>(`/api/booking/find/${id}`)
  return (
    <PageLayout pageTitle={reservation?.first_name ?? "Loading..."}>
      <LageItem reservation={reservation} />
    </PageLayout>

  )
}
