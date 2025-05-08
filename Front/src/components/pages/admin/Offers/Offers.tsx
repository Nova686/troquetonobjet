import {useEffect, useState} from "react";
import {Pagination} from "../../../../typings/Pagination";
import {Offer} from "../../../../typings/Offer";
import {useTheme} from "@mui/material/styles";
import {AxiosResponse} from "axios";
import axiosService from "../../../../services/AxiosService";
import { Pagination as PaginationItem} from "../../../molecules";
import {OffersList} from "../../../organisms";

const Offers = () =>
{
    const [offers, setOffers] = useState<Pagination<Offer> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const [page, setPage] = useState<number>(1);

    const handleOffers = async () =>
    {
        setLoading(true);

        try
        {
            const response: AxiosResponse = await axiosService.get("offers", {params: {page: page, nb_per_page: 20}});
            setOffers(response.data);
            setError(null);
        } catch (err)
        {
            setError("Une erreur s'est produite lors du chargement des offres.");
            console.error(err);
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        handleOffers();
    }, [page]);

    return (
        <div style={{marginBottom: '64px'}}>
            <h1 style={{color: theme.palette.custom.textColor}}>Liste des annonces</h1>

            <OffersList offers={offers?.list} loading={loading} error={error} isAdminPage={true}/>
            {offers &&
                <PaginationItem onPageChange={setPage} currentPage={offers!.page} totalPage={offers!.totalPage}/>}
        </div>
    );
}

export default Offers;