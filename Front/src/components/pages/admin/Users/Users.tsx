import {useEffect, useState} from "react";
import {Report} from "../../../../typings/User";
import axiosService from "../../../../services/AxiosService";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "../../../atoms";
import {useTheme} from "@mui/material/styles";
import {useToast} from "../../../../contexts/ToastContext";
import theme from "../../../../theme";

const Categories = () =>
{
    interface ReportRows
    {
        id: number;
        offerId: number;
        reason: string;
    }

    const [reports, setReports] = useState<Report[]>([]);
    const [rows, setRows] = useState<ReportRows[]>([]);
    const theme = useTheme();
    const {showToast} = useToast();

    const loadReports = async () =>
    {
        try
        {
            const response = await axiosService.get('users/all');
            setReports(response.data.reports);
        } catch (error)
        {
            console.error("Error fetching reports:", error);
            setReports([]);
        }
    };

    const handleDelete = async (reportId: number) => {
        try
        {
            await axiosService.delete(`report/${reportId}`);
            setReports(reports.filter(report => report.id !== reportId));

            showToast({
                message: `L'annonce à été supprimée avec succès.`,
                position: { vertical: "bottom", horizontal: "right" },
                type: 'success'
            });
        }
        catch (error) {
            console.error("Error fetching reports:", error);
            showToast({
                message: `Un problème est survenus l'ors de la supression de l'annonce.`,
                position: { vertical: "bottom", horizontal: "right" },
                type: 'error'
            });
        }
    }

    useEffect(() =>
    {
        loadReports();
    }, []);

    useEffect(() =>
    {
        setRows(reports.map((report: Report) => ({
            id:      report.id,
            offerId: report.offer_id,
            reason:  report.reason
        })));
    }, [reports]);

    return (
        <>
            <h1 style={{color: theme.palette.custom.textColor}}>Tableau des utilisateurs report</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ID de l'annonce</TableCell>
                            <TableCell>Raison</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    <Link to={`/offers/${row.offerId}`}>
                                        {row.offerId}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.reason}</TableCell>
                                <TableCell sx={{ cursor: 'pointer' }}>
                                    <Button sx={{
                                        border:      '1px solid',
                                        borderColor: theme.palette.custom.danger
                                    }}
                                    onClick={() => handleDelete(row.id)}
                                    >
                                        <DeleteIcon sx={{color: theme.palette.custom.danger}}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Categories;