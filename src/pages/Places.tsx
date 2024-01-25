import PageLayout from "@/components/Layout/PageLayout";
import Place from "@/components/places/Place";
import PlacesDialog from "@/components/places/PlacesDialog";
import { useData } from "@/lib/hooks/fetch";
import { Spot } from "@/lib/types/database";

export default function Places() {
    // get places data
    const spotsData = useData<Spot[]>(
        "/api/booking/info-camping-spot"
    );

    const availableSpots = [];
    const unavailableSpots = [];

    for (let i = 0; i < (spotsData?.length ? spotsData?.length : 0); i++) {
        if (spotsData?.[i].spot_status === 0) {
            availableSpots.push(spotsData[i]);
        } else {
            unavailableSpots.push(spotsData?.[i]);
        }
    }

    // create 5 spots
    const availableSpotsData = availableSpots.slice(0, 5);
    const unavailableSpotsData = unavailableSpots.slice(0, 5);

    return (
        <PageLayout pageTitle="Plaatsen">
            <div className="place-container-info">
                <div className="place-container">
                    <h1 className="text-lg">Plekken</h1>
                    {availableSpotsData.map((spot) => {
                        return (
                            <Place
                                id={spot?.id}
                                name={spot?.spot_name}
                                notes={spot?.notes}
                                family={spot?.family}
                                type={spot?.accommodations_id}
                                key={spot?.id}
                            />
                        );
                    })}
                    <button
                        className="text-blue-400 mt-3"
                        onClick={() =>
                            (
                                document.querySelector(
                                    ".available_places"
                                ) as HTMLDialogElement
                            )?.showModal()
                        }
                    >
                        Meer plekken...
                    </button>
                </div>
                <div className="place-container">
                    <h1 className="text-lg">Vehuurde plekken</h1>
                    {unavailableSpotsData.map((spot) => {
                        return (
                            <Place
                                id={spot?.id}
                                name={spot?.spot_name}
                                notes={spot?.notes}
                                family={spot?.family}
                                type={spot?.spot_status}
                                key={spot?.id}
                            />
                        );
                    })}
                    <button
                        className="text-blue-400 mt-3"
                        onClick={() =>
                            (
                                document.querySelector(
                                    ".unavailable_places"
                                ) as HTMLDialogElement
                            )?.showModal()
                        }
                    >
                        Meer plekken...
                    </button>
                </div>
            </div>
            <PlacesDialog type="available_places" contents={availableSpots} />
            <PlacesDialog
                type="unavailable_places"
                contents={unavailableSpots}
            />
        </PageLayout>
    );
}
