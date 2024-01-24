import { ReservationFetch } from "@/lib/types/database";

import ItemContent from "./ItemContent";

type LageItemProps = {
  reservation: ReservationFetch | undefined;
};

export default function LageItem(props: any) {
  const { reservation } = props;
  return (
    <div
      key={reservation?.id}
      className="reservation-item"
    >
      <div className="item-header">
        <h3 className="title">
          {reservation?.first_name} {reservation?.last_name}
        </h3>
        <p className="sub-title">
          {reservation?.email}
        </p>
      </div>
      <div className="content-container">
        <dl className="content">
          <ItemContent title="Aankomst datum" content={new Date(reservation?.arrival).toLocaleString("nl-NL")}/>
          <ItemContent title="Vertrek datum" content={new Date(reservation?.departure).toLocaleString("nl-NL")}/>
          <ItemContent title="Kosten" content={reservation?.cost}/>
          <ItemContent title="Aantal volwassenen" content={reservation?.adult}/>
          <ItemContent title="Aantal kinderen" content={reservation?.child}/>
          <ItemContent title="Aantal jonge kinderen" content={reservation?.young_child}/>
          <ItemContent title="Status" content={reservation?.booking_status}/>
          <ItemContent title="Notities" content={reservation?.notes === undefined ? undefined : "Geen notities"}/>
          <ItemContent title="Kenteken" content={reservation?.license_plate}/>
          <ItemContent title="Auto status" content={reservation?.car_status}/>
          <ItemContent title="Straat" content={reservation?.house_number}/>
          <ItemContent title="Stad" content={reservation?.zipcode}/>
          <ItemContent title="Land" content={reservation?.country}/>
          <ItemContent title="Plek" content={reservation?.spot_name}/>
        </dl>
      </div>
    </div>
  );
}
