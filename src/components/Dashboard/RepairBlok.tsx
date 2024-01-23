import React from "react";
import "/resources/styles/components/dashboard/repair-blok.scss";

type RepairBlokProps = {
    type: string;
    status: string;
    description: string;
    location: string;
};
export default function RepairBlok(props: RepairBlokProps) {
    const { type, status, description, location } = props;
    return (
        <div className="repair-blok">
            <div className="repair-blok-left">
                <p>{type}</p>
                <p>{description}</p>
                <p>{location}</p>
            </div>
            <h2>{status}</h2>
        </div>
    );
}
