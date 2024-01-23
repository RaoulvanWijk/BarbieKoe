import PageLayout from "@/components/Layout/PageLayout";
import InformationBlok from "@/components/Dashboard/InformationBlok";
import RepairBlok from "@/components/Dashboard/RepairBlok";
import { useState, useEffect } from "react";

import { useData } from "@/lib/hooks/fetch";

export default function Dashboard() {
    // get arrivals data
    const arrivalsData: [] = useData("/api/booking/getArrivalsToday");
    // get camping spots data
    const campingSpotsData: any = useData("/api/booking/getInfoCampingSpots");
    const bookkeepingData: any = useData("/api/booking/getBookkeeping");
    const getAvailableSpotsData: any = useData(
        "/api/booking/getAvailableSpots"
    );

    console.log(campingSpotsData?.length);

    // get bookkeeping data
    const [geld, setGeld] = useState(0);
    const [arrivals, setArrivals] = useState<number | undefined>(undefined);

    useEffect(() => {
        let geld: number = 0;
        for (let i = 0; i < bookkeepingData?.length; i++) {
            geld += bookkeepingData[i]?.price ?? 0;
        }
        setGeld(geld);
        setArrivals(arrivalsData?.length ?? 0);
    }, []);
    return (
        <PageLayout pageTitle="Dashboard">
            <div className="container flex-col">
                <div className="container">
                    <InformationBlok name="Aankomsten vandaag">
                        <p>
                            {arrivals === undefined ? "Loading..." : arrivals}
                        </p>
                    </InformationBlok>
                    <InformationBlok name="Plekken over / totaal plekken">
                        <p>
                            {getAvailableSpotsData?.length == undefined ||
                            campingSpotsData?.length == undefined
                                ? "Loading..."
                                : `${getAvailableSpotsData?.length} / ${campingSpotsData?.length}`}
                        </p>
                    </InformationBlok>
                    <InformationBlok name="Inkomsten">
                        <p>€{geld}</p>
                    </InformationBlok>
                    <InformationBlok name="Anderen ingelogd">
                        <p>0</p>
                    </InformationBlok>
                </div>
                <div className="container">
                    <InformationBlok name="Onderhoud">
                        <RepairBlok
                            type="Elektriciteit"
                            description="Geen elektriciteit"
                            location="Huisje 1"
                            status="Gereed"
                        />
                        <RepairBlok
                            type="Elektriciteit"
                            description="Geen elektriciteit"
                            location="Huisje 1"
                            status="Beginnen"
                        />
                        <RepairBlok
                            type="Elektriciteit"
                            description="Geen elektriciteit"
                            location="Huisje 1"
                            status="Bezig"
                        />
                    </InformationBlok>
                </div>
                <div className="container">
                    <InformationBlok name="Berichten">
                        <p>0</p>
                    </InformationBlok>
                </div>
            </div>
        </PageLayout>
    );
}
