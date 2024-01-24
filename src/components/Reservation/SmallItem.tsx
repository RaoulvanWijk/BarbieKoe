import { ReservationFetch } from "@/lib/types/database";
import ItemContent from "./ItemContent";
import "/resources/styles/components/reservation/item.scss";
import { Link } from "react-router-dom";

type SmallItemProps = {
  reservation: ReservationFetch;
};
export default function SmallItem(props: SmallItemProps) {
  const { reservation } = props;
  console.log(reservation.id);

  return (
    <Link
      to={`/reservations/${reservation.id}`}
      key={reservation.id}
      className="reservation-item"
    >
      <div className="item-header">
        <h3 className="title">
          {
            reservation?.first_name !== undefined ? (
              reservation?.first_name + " " + reservation?.last_name
            ) : (
              <hr className="h-4 w-16 animate-pulse outline-none border-none bg-gray-300" />
            )
          }
        </h3>
        <p className="sub-title">
          {reservation?.email !== undefined ? (
            reservation?.email
          ) : (
            <hr className="h-4 w-16 animate-pulse outline-none border-none bg-gray-300" />
          )}
        </p>
      </div>
      <div className="content-container">
        <dl className="content">
          <ItemContent
            title="Aankomst datum"
            content={new Date(reservation.arrival).toLocaleString("nl-NL")}
          />
          <ItemContent
            title="Vertrek datum"
            content={new Date(reservation.departure).toLocaleString("nl-NL")}
          />
          <ItemContent title="Kosten" content={reservation.cost} />
          <ItemContent
            title="Status"
            content={
              reservation.booking_status === undefined ? undefined :
              (reservation.booking_status == 0 ? "Niet ingecheckt" : "Ingecheckt")
            }
          />
        </dl>
      </div>
    </Link>
  );
}
