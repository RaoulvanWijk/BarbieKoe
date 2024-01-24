import PageLayout from "@/components/Layout/PageLayout";
import InformationBlok from "@/components/Dashboard/InformationBlok";
import { useData } from "@/lib/hooks/fetch";
import SmallItem from "@/components/Reservation/SmallItem";
import { useEffect, useState } from "react";
// that api returns this data booking.id, first_name, last_name, phone, email, booking.arrival, booking.departure, booking.adult, booking.child, booking.young_child, booking.cost, booking_status, booking.notes, cars.license_plate, cars.car_status, address.house_number, address.city, address.country, address.streetname, address.zipcode, booking.camping_spot_id, camping_spots.spot_name

import { ReservationFetch } from "@/lib/types/database";

import "/resources/styles/pages/reservations.scss";

type SortType =
  | "created_first"
  | "created_last"
  | "arrival_first"
  | "arrival_last";

const sortReservations = (
  sort: SortType,
  reservations: ReservationFetch[] | []
) => {
  switch (sort) {
    case "created_first":
      return reservations.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
    case "created_last":
      return reservations.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    case "arrival_first":
      return reservations.sort((a, b) => {
        return new Date(a.arrival).getTime() - new Date(b.arrival).getTime();
      });
    case "arrival_last":
      return reservations.sort((a, b) => {
        return new Date(b.arrival).getTime() - new Date(a.arrival).getTime();
      });
    default:
      return reservations;
  }
};

export default function Reservations() {
  const reservations = useData<ReservationFetch[]>("/api/booking/all");

  // handle sort
  const [sort, setSort] = useState<SortType>("created_last");
  const [sortedReservations, setSortedReservations] = useState<
    ReservationFetch[] | undefined
  >(reservations);

  useEffect(() => {
    if (reservations) {
      setSortedReservations(reservations);
    }
  }, [reservations]);

  return (
    <PageLayout pageTitle="Reserveringen">
        <InformationBlok moreInfoProps={{ dontUse: true }}>
          <div className="reservation-header">
            <p>Zoek naar de reservering</p>

            <input
              type="text"
              onChange={(e) => {
                const search = e.target.value;
                if (search.length > 0) {
                  setSortedReservations(
                    reservations?.filter((r) => {
                      return (
                        r.first_name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        r.last_name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        r.email.toLowerCase().includes(search.toLowerCase()) ||
                        r.phone.toLowerCase().includes(search.toLowerCase()) ||
                        new Date(r.arrival).toLocaleString("nl-NL").includes(search.toLowerCase()) ||
                        new Date(r.departure).toLocaleString("nl-NL").includes(search.toLowerCase())
                      );
                    })
                  );
                } else {
                  setSortedReservations(
                    sortReservations(sort, reservations ?? [])
                  );
                }
              }}
              placeholder="Zoek naar de reservering"
              className=""
            />

            <select
              onChange={(e) => {
                setSort(e.target.value as SortType);
                setSortedReservations(
                  sortReservations(
                    e.target.value as SortType,
                    sortedReservations ?? []
                  )
                );
              }}
              value={sort}
            >
              <option value="created_last">
                Gereserveerd (nieuwste eerst)
              </option>
              <option value="created_first">Gereserveerd (oudste eerst)</option>
              <option value="arrival_first">Aankomst (oudste eerst)</option>
              <option value="arrival_last">Aankomst (nieuwste eerst)</option>
            </select>
          </div>
        </InformationBlok>
        {
          !reservations && (
            Array.from(Array(10).keys()).map((i) => (
              SmallItem({ reservation: {} as ReservationFetch })
            ))
          )
        }
        {
          sortedReservations?.length == 0 && (
            <InformationBlok moreInfoProps={{ dontUse: true }}>
              <p>Geen reserveringen gevonden</p>
            </InformationBlok>
          )
        }
      {sortedReservations?.map((reservation) => (
        <SmallItem reservation={reservation} />
      ))}
    </PageLayout>
  );
}
