import React from "react";
import "/resources/styles/components/dashboard/information-small.scss";
import { Link } from "react-router-dom";

type InformationBlokProps = {
    name: string;
    children: React.ReactNode;
    route: string;
};
export default function InformationBlok(props: InformationBlokProps) {
    return (
        <div className="info-blok">
            <h1>{props.name}</h1>
            {props.children}
            <Link
                to={props.route}
                className="text-blue-400 mt-5 info-link-text"
            >
                Meer info →
            </Link>
        </div>
    );
}
