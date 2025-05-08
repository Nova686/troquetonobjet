import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, adminRoute = false }: { children: ReactNode, adminRoute?: boolean }) => {
	const { isConnected, user } = useAuth();

	if (!isConnected()) {
		return <Navigate to="/auth/login" replace />;
	}

	if (adminRoute && user?.is_admin !== null && !user?.is_admin) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;