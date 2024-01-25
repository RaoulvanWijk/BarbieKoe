import { useData } from "@/lib/hooks/fetch";
import { Booking, Spot } from "@/lib/types/database";

type PlaceInfoProps = {
    id: number | undefined;
    onClose: () => void;
};
export default function PlaceInfoDialog(props: PlaceInfoProps) {
    const id = props.id;
    console.log(id);
    const spotsData = useData<Spot[]>(
        "/api/booking/info-camping-spot"
    );
    const bookingInfo = useData<Booking[]>(
        "/api/booking/all"
    );
    const spot = spotsData?.find((spot) => spot.id === id);
    const booking = bookingInfo?.find(
        (booking) => booking.camping_spot_id === id
    );

    console.log(booking ? booking : "Loading...");

    const available = spot?.spot_status === 0 ? "Ja" : "Nee";

    const otherContent = booking ? (
        <div>
            <p>
                Inwoner: {booking?.first_name} {booking?.last_name}
            </p>
            <p>
                Aankomst: {booking?.arrival} Vertrek: {booking?.departure}
            </p>
            <p>Telefoonnummer: {booking?.phone}</p>
            <p>Email: {booking?.email}</p>
        </div>
    ) : (
        <p>Vind andere data hier als er een bewoner is of is geweest!</p>
    );

    return (
        <dialog className={`${props.id} text-lg places-dialog`} open>
            <div className="header">
                <h1>plaats {spot ? spot.spot_name : "Loading..."}</h1>
                <button
                    className="text-blue-400 text-lg"
                    onClick={props.onClose}
                >
                    x
                </button>
            </div>
            <div className="content">
                <div className="place-container">
                    <p>Type: {spot ? spot.accommodation_type : "Loading..."}</p>
                    <p>Beschikbaar: {spot ? available : "Loading..."}</p>
                    <hr />
                    {otherContent}
                </div>
            </div>
        </dialog>
    );
}
