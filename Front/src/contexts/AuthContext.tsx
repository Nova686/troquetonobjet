import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "../typings/Auth";
import Cookies from "js-cookie";

interface AuthContextProps {
	user: User | null;
	login: (user: User, token: string, afterLogin: () => void) => void;
	logout: (afterLogout: () => void) => void;
	isConnected: () => boolean;
	editUser: (username?: string, phone?: string | null, avatar?: number) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authRef = { current: null as AuthContextProps | null };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	
	const login = (user: User, token: string, afterLogin: () => void) => {
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
		Cookies.set("auth_token", token, { secure: true, sameSite: "strict" });
		afterLogin();
	};
	
	const logout = (afterLogout: () => void) => {
		setUser(null);
		localStorage.removeItem("user");
		Cookies.remove("auth_token");
		afterLogout();
	};
	
	const isConnected = () => {
		return user !== null;
	};

	const editUser = (username?: string, phone?: string | null, avatar?: number) => {
		if (user != null) {
			const editedUser: User = {
				id: user.id,
				avatar: avatar ?? user.avatar,
				username: username ?? user.username,
				email: user.email,
				phone: phone ?? user.phone,
				email_verified_at: user.email_verified_at,
				created_at: user.created_at,
				updated_at: user.updated_at,
				is_admin: user.is_admin
			}
			localStorage.setItem("user", JSON.stringify(editedUser));
			setUser(editedUser);
		}
	}
	
	const contextValue = { user, isConnected, login, logout, editUser };

	useEffect(() => {
		const token = Cookies.get("auth_token");
		if (!token) {
			setUser(null);
			localStorage.removeItem("user");
		}
		authRef.current = contextValue;
	}, []);
	
	return (
		<AuthContext.Provider value={{ user, login, logout, isConnected, editUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const getAuthRef = () => authRef;