import { useState } from "react";
import "/resources/styles/components/places/places.scss";
import PlaceInfoDialog from "./PlaceInfoDialog";

type PlaceBlokProps = {
    id: number | undefined;
    name: string | undefined;
    notes: string | undefined;
    family: string | undefined;
    type: number | undefined;
};
export default function Place(props: PlaceBlokProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="place">
            <hr />
            <div className="place-body">
                <div className="content">
                    <h1>{props.name}</h1>
                    <p>{props.notes}</p>
                    <p>{props.family}</p>
                    <p>{props.type == 1 ? "tent" : "camper"}</p>
                </div>
                <div>
                    <button
                        className="text-blue-400"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Meer info →{" "}
                    </button>
                </div>
            </div>
            <hr />
            {isModalOpen && (
                <PlaceInfoDialog
                    id={props.id}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
