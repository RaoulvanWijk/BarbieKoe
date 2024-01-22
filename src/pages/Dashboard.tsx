import PageLayout from "@/components/Layout/PageLayout";
import InformationBlok from "@/components/Dashboard/InformationBlok";

import { useData } from "@/lib/hooks/fetch";

export default function Dashboard() {
    const arrivalsData: [] = useData("/api/booking/getArrivalsToday");
    const totalArrivals: number = arrivalsData?.length;
    console.log(totalArrivals);
    const campingSpotsData: any[] = useData("/api/booking/getInfoCampingSpots");
    const unOccupiedspots: number = campingSpotsData?.length;
    const getAvailableSpotsData: any[] = useData(
        "/api/booking/getAvailableSpots"
    );
    const getAvailableSpots: number = getAvailableSpotsData?.length;

    console.log(getAvailableSpots);
    return (
        <PageLayout>
            <h1>Dashboard</h1>
            {/* placeholder */}
            <div className="container flex-col">
                <div className="container">
                    <InformationBlok name="Aankomsten vandaag">
                        <p>{totalArrivals}</p>
                    </InformationBlok>
                    <InformationBlok name="Plekken over / plekken">
                        <p>
                            {getAvailableSpots} / {unOccupiedspots}
                        </p>
                    </InformationBlok>
                    <InformationBlok name="Lol" />
                    <InformationBlok name="Lol" />
                </div>
                <div className="container">
                    <InformationBlok name="Lol" />
                </div>
                <div className="container">
                    <InformationBlok name="Lol" />
                </div>
            </div>
        </PageLayout>
    );
}
