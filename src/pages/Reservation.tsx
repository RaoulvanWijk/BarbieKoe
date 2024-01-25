import PageLayout from "@/components/Layout/PageLayout"
import { useData } from "@/lib/hooks/fetch";
import { useParams } from "react-router-dom"
import { ReservationFetch } from "@/lib/types/database";

import LageItem from "@/components/Reservation/LageItem";
import Modal from "@/components/Layout/Modal";


export default function Reservation() {
  const id = useParams<{ id: string }>().id
  console.log(id);
  const reservation = useData<ReservationFetch[]>(`https://admin.barbiekoe.nl/api/booking/find/${id}`)
  return (
    <PageLayout pageTitle={`Reservering van ${reservation?.[0].first_name} ${reservation?.[0].last_name}`}>
      <LageItem reservation={reservation?.[0]} />

      <div>
        <Modal title="Weet u zeker dat u deze reservering wilt annuleren?">
          <>
          </>
        </Modal>
      </div>
    </PageLayout>

  )
}
