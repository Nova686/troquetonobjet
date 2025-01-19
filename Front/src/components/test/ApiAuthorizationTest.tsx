import { useState } from "react";
import axiosService from "../../services/AxiosService";
import { Button, Typography } from "../atoms"
import { Box, CircularProgress } from "@mui/material";

const ApiAuthorizationTest: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [isResultSuccessful, setIsResultSuccessful] = useState<boolean>();

	const handleClick = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axiosService.get("/conversations");
			console.log(response);
			setIsResultSuccessful(true);	
		} catch (error) {
			console.log(error);
			setIsResultSuccessful(false);
		} finally {
			setLoading(false);
		}
	};
	
    return (
        <Box display="flex" flexDirection="column">
            <Button
				variant="contained"
				color="primary"
				type="submit"
				style={{ margin: '20px 0', width: "fit-content" }}
				onClick={handleClick}
				disabled={loading}
			>
				{loading ? <CircularProgress size={24} color="inherit" /> : 'Test'}
			</Button>

			{isResultSuccessful == undefined ? <></>
			:
			<Typography>{isResultSuccessful == true ? "Succès" : "Echec"}</Typography> 
			}
        </Box>
    )
}

export default ApiAuthorizationTest;
