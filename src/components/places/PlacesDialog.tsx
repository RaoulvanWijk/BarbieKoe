import Place from "./Place";

type PlaceBlokProps = {
    type: string;
    contents: any[];
};
export default function PlacesDialog(props: PlaceBlokProps) {
    return (
        <dialog className={`${props.type} text-lg places-dialog`}>
            <div className="header">
                <h1>places dialog</h1>
                <button
                    className="text-blue-400 text-lg"
                    onClick={() =>
                        document.querySelector("." + props.type)?.close()
                    }
                >
                    x
                </button>
            </div>
            <div className="content">
                <div className="place-container">
                    {props.contents.map((spot) => {
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
                </div>
            </div>
        </dialog>
    );
}
