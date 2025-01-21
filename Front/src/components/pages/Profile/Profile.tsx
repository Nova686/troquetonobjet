import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button, Typography } from "../../atoms";
import ApiAuthorizationTest from "../../test/ApiAuthorizationTest";

const Profile = () => {
	const { user, logout, isConnected } = useAuth();

	return (
		<div>
			{isConnected() ? (
				<>
					<Typography variant="h5" gutterBottom>
						Salut {user?.name}
					</Typography>
					<p>Email: {user?.email}</p>
					<p>Email vérifié : {user?.email_verified_at != null ? "oui" : "non"}</p>

					<Button
						variant="contained"
						color="error"
						onClick={logout}
						style={{ marginTop: '20px' }}
					>
						Déconnexion
					</Button>
				</>
			) : (
				<Navigate to="/auth/login" />
			)}
			<ApiAuthorizationTest />
		</div>
	);
};

export default Profile;