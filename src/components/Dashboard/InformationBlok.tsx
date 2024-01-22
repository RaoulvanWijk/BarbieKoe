import React from "react";
import "/resources/styles/components/dashboard/information-small.scss";

type InformationBlokProps = {
    name: string;
    children: React.ReactNode;
};
export default function InformationBlok(props: InformationBlokProps) {
    return (
        <div className="info-blok">
            <h1>{props.name}</h1>
            {props.children}
        </div>
    );
}
