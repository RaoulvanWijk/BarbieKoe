import PageLayout from "@/components/Layout/PageLayout";
import InformationBlok from "@/components/Dashboard/InformationBlok";
import RepairBlok from "@/components/Dashboard/RepairBlok";
import { useState, useEffect } from "react";

import { useData } from "@/lib/hooks/fetch";

export default function Dashboard() {
    // get arrivals data
    const arrivalsData= useData<any>("/api/booking/info-arrivals");
    const currentAmountOnCamping = useData<any>("/api/booking/info-today");
    // get camping spots data
    const campingSpotsData = useData<any>("/api/booking/info-camping-spot");
    const bookkeepingData = useData<any>("/api/booking/bookkeeping");
    const getAvailableSpotsData = useData<any>(
        "/api/booking/info-available-spot"
    );

    // get bookkeeping data
    const [geld, setGeld] = useState(0);

    useEffect(() => {
        let geld: number = 0;
        for (let i = 0; i < bookkeepingData?.length; i++) {
            geld += bookkeepingData[i]?.price ?? 0;
        }
        console.log(geld);
        setGeld(geld);
    }, []);
    return (
        <PageLayout pageTitle="Dashboard">
            <div className="container flex-col">
                <div className="container">
                    <InformationBlok name="Aankomsten" route="/">
                        <p>
                            {arrivalsData?.length === undefined
                                ? "Loading..."
                                : arrivalsData?.length}
                        </p>
                    </InformationBlok>
                    <InformationBlok
                        name="Plekken over / totaal plekken"
                        route="/"
                    >
                        <p>
                            {getAvailableSpotsData?.length == undefined ||
                            campingSpotsData?.length == undefined
                                ? "Loading..."
                                : `${getAvailableSpotsData?.length} / ${campingSpotsData?.length}`}
                        </p>
                    </InformationBlok>
                    <InformationBlok name="Inkomsten" route="/">
                        <p>€{geld}</p>
                    </InformationBlok>
                    <InformationBlok name="Mensen op de camping" route="/">
                        <p>
                            {currentAmountOnCamping?.length === undefined || arrivalsData?.length === undefined
                                ? "Loading..."
                                : currentAmountOnCamping?.length - arrivalsData?.length}
                        </p>
                    </InformationBlok>
                </div>
                <div className="container">
                    <InformationBlok name="Onderhoud" route="/plaatsen">
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
                    <InformationBlok name="Berichten" route="/">
                        <p>0</p>
                    </InformationBlok>
                </div>
            </div>
        </PageLayout>
    );
}
