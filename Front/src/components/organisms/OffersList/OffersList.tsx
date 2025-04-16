import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { OfferCard } from "..";
import { Offer } from "../../../typings/Offer";

interface OffersList {
	offers: Offer[] | null | undefined;
	loading?: boolean;
	error?: string | null;
}

const CARD_WIDTH = 250;
const GAP = 16;

const OffersList: FC<OffersList> = ({ offers, loading, error }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [offersPerRow, setOffersPerRow] = useState<number>(1);

	useEffect(() => {
		const measure = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				const count = Math.max(
					1,
					Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP))
				);
				setOffersPerRow(count);
			}
		};

		measure();

		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	const lastRowStartIndex = offers ? Math.floor(offers.length / offersPerRow) * offersPerRow : 0;
	const isSingleRow =  offers ? offers.length <= offersPerRow : true;

	return (<>
		{loading && <p style={{ color: "white" }}>Chargement des offres...</p>}
		{error && <p style={{ color: "red" }}>{error}</p>}

		{!loading && !error &&
			<Box
				ref={containerRef}
				display="grid"
				gridTemplateColumns={`repeat(auto-fit, ${CARD_WIDTH}px)`}
				justifyContent={isSingleRow ? "start" : "center"}
				gap={`${GAP}px`}
				width="100%"
			>
				{offers?.map((offer, i) => {
					const isInLastRow = i >= lastRowStartIndex;
					return(
						<div style={{ justifySelf: isInLastRow ? "start" : "center" }}>
							<OfferCard offer={offer} key={offer.id} />
						</div>
					);
				})}
			</Box>
		}
	</>);
}

export default OffersList;